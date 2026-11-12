import { Pool } from "pg";
import { missingDb } from "./env";

export type Post = {
  id: string;
  title: string;
  descriptionHtml: string;
  photoKey: string | null;
  createdAt: string;
};

type Row = {
  id: string;
  title: string;
  description_html: string;
  photo_key: string | null;
  created_at: Date;
};

const g = globalThis as unknown as { __pool?: Pool };

function pool() {
  if (missingDb().length) throw new Error("Database not configured");
  if (!g.__pool) {
    const url = process.env.DATABASE_URL!;
    const local = /@(localhost|127\.0\.0\.1)[:/]/.test(url);
    g.__pool = new Pool({
      connectionString: url,
      ssl: local ? undefined : { rejectUnauthorized: false },
      max: 5,
      connectionTimeoutMillis: 5000,
    });
    g.__pool.on("error", () => {}); // idle-client errors must not crash the server
  }
  return g.__pool;
}

const map = (r: Row): Post => ({
  id: r.id,
  title: r.title,
  descriptionHtml: r.description_html,
  photoKey: r.photo_key,
  createdAt: r.created_at.toISOString(),
});

const cols = "id, title, description_html, photo_key, created_at";

export async function listPosts(): Promise<Post[]> {
  const { rows } = await pool().query<Row>(
    `SELECT ${cols} FROM posts ORDER BY created_at DESC`,
  );
  return rows.map(map);
}

export async function getPost(id: string): Promise<Post | null> {
  const { rows } = await pool().query<Row>(
    `SELECT ${cols} FROM posts WHERE id = $1`,
    [id],
  );
  return rows[0] ? map(rows[0]) : null;
}

export async function createPost(
  title: string,
  html: string,
  photoKey: string | null,
) {
  const { rows } = await pool().query<Row>(
    `INSERT INTO posts (title, description_html, photo_key) VALUES ($1, $2, $3) RETURNING ${cols}`,
    [title, html, photoKey],
  );
  return map(rows[0]);
}

export async function updatePost(
  id: string,
  title: string,
  html: string,
  photoKey: string | null,
) {
  const { rows } = await pool().query<Row>(
    `UPDATE posts SET title = $2, description_html = $3, photo_key = $4, updated_at = now() WHERE id = $1 RETURNING ${cols}`,
    [id, title, html, photoKey],
  );
  return rows[0] ? map(rows[0]) : null;
}

export async function deletePost(id: string): Promise<Post | null> {
  const { rows } = await pool().query<Row>(
    `DELETE FROM posts WHERE id = $1 RETURNING ${cols}`,
    [id],
  );
  return rows[0] ? map(rows[0]) : null;
}

// Public pages never crash when the database is missing or down: they get the fallback.
export async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}
