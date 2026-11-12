import { randomInt } from "node:crypto";
import { Resend } from "resend";
import { esc, INK, label, sans, shell, title } from "./emailKit";
import { from } from "./mail";
import { pool } from "./db";
import { hashCode, same } from "./token";

export type AdminUser = { id: string; email: string; pin_hash: string };

export async function userByEmail(email: string) {
  const { rows } = await pool().query<AdminUser>(
    "SELECT id, email, pin_hash FROM admin_users WHERE email = $1",
    [email],
  );
  return rows[0] ?? null;
}

export async function userById(id: string) {
  const { rows } = await pool().query<AdminUser>(
    "SELECT id, email, pin_hash FROM admin_users WHERE id = $1",
    [id],
  );
  return rows[0] ?? null;
}

// Seconds the caller must still wait before another code may be sent (0 = go ahead).
export async function resendWait(userId: string) {
  const { rows } = await pool().query<{ wait: number }>(
    `SELECT GREATEST(0, CEIL(60 - EXTRACT(EPOCH FROM (now() - max(created_at)))))::int AS wait
     FROM admin_otps WHERE user_id = $1`,
    [userId],
  );
  return rows[0]?.wait ?? 0;
}

// Replaces any older unused code with a fresh 6-digit one and emails it to the admin only.
// Returns an error message, or null when sent.
export async function sendCode(user: AdminUser): Promise<string | null> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return "Could not send the code.";
  const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
  const db = pool();
  await db.query(
    "UPDATE admin_otps SET used = true WHERE user_id = $1 AND NOT used",
    [user.id],
  );
  const { rows } = await db.query<{ id: string }>(
    `INSERT INTO admin_otps (user_id, code_hash, expires_at)
     VALUES ($1, $2, now() + interval '10 minutes') RETURNING id`,
    [user.id, hashCode(user.id, code)],
  );
  const { error } = await new Resend(key).emails.send({
    from: from(),
    to: user.email,
    subject: "Your admin sign-in code",
    html: shell(
      "Admin",
      [
        `${label("Sign-in code")}${title("Your code")}`,
        `<div style="font:900 40px/1 'Courier New',monospace;letter-spacing:.3em;color:${INK};border:3px solid ${INK};border-radius:10px;padding:16px 20px;display:inline-block">${esc(code)}</div>`,
        `<p style="margin:0;font:15px/1.6 ${sans}">It expires in 10 minutes. If you did not try to sign in, ignore this email.</p>`,
      ],
      "Sent from the rhuzz portfolio &middot; admin sign-in",
    ),
    text: `Your admin sign-in code is ${code}. It expires in 10 minutes. If you did not try to sign in, ignore this email.`,
  });
  if (error) {
    console.error("[admin] otp mail", error.name);
    await db.query("UPDATE admin_otps SET used = true WHERE id = $1", [
      rows[0].id,
    ]);
    return "Could not send the code.";
  }
  return null;
}

// Counts the attempt first (max 5 per code), compares in constant time, then burns the code atomically.
export async function checkCode(userId: string, code: string) {
  const db = pool();
  const { rows } = await db.query<{ id: string; code_hash: string }>(
    `UPDATE admin_otps SET attempts = attempts + 1
     WHERE id = (SELECT id FROM admin_otps
                 WHERE user_id = $1 AND NOT used AND expires_at > now()
                 ORDER BY created_at DESC LIMIT 1)
       AND attempts < 5
     RETURNING id, code_hash`,
    [userId],
  );
  if (!rows[0] || !same(rows[0].code_hash, hashCode(userId, code)))
    return false;
  const burned = await db.query(
    "UPDATE admin_otps SET used = true WHERE id = $1 AND NOT used RETURNING id",
    [rows[0].id],
  );
  return burned.rowCount === 1;
}
