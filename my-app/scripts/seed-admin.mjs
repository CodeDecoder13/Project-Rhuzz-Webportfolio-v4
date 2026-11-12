// Creates or updates the admin user. Run with: npm run db:seed (reads ADMIN_EMAIL and ADMIN_SEED_PIN).
import pg from "pg";
import { hashPin } from "../lib/pin.ts";

const { DATABASE_URL: url, ADMIN_EMAIL, ADMIN_SEED_PIN: pin } = process.env;
const email = ADMIN_EMAIL?.trim().toLowerCase();
if (!url || !email || !pin) {
  console.error("Set DATABASE_URL, ADMIN_EMAIL and ADMIN_SEED_PIN first.");
  process.exit(1);
}
if (!/^\d{6}$/.test(pin)) {
  console.error("ADMIN_SEED_PIN must be exactly 6 digits.");
  process.exit(1);
}
const local = /@(localhost|127\.0\.0\.1)[:/]/.test(url);
const client = new pg.Client({
  connectionString: url,
  ssl: local ? undefined : { rejectUnauthorized: false },
});
await client.connect();
await client.query(
  `INSERT INTO admin_users (email, pin_hash) VALUES ($1, $2)
   ON CONFLICT (email) DO UPDATE SET pin_hash = EXCLUDED.pin_hash`,
  [email, hashPin(pin)],
);
await client.end();
console.log(`seeded ${email}`);
