// Creates the posts table. Run with: npm run db:init (loads .env.local).
import pg from "pg";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set (put it in .env.local or .env).");
  process.exit(1);
}
const local = /@(localhost|127\.0\.0\.1)[:/]/.test(url);
const client = new pg.Client({
  connectionString: url,
  ssl: local ? undefined : { rejectUnauthorized: false },
});
await client.connect();
await client.query(`CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description_html text NOT NULL,
  photo_key text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
)`);
await client.query(`CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  pin_hash text NOT NULL,
  created_at timestamptz DEFAULT now()
)`);
await client.query(`CREATE TABLE IF NOT EXISTS admin_otps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES admin_users ON DELETE CASCADE,
  code_hash text NOT NULL,
  expires_at timestamptz NOT NULL,
  attempts int NOT NULL DEFAULT 0,
  used boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
)`);
await client.query(`CREATE TABLE IF NOT EXISTS rate_limits (
  key text PRIMARY KEY,
  window_start timestamptz NOT NULL DEFAULT now(),
  count int NOT NULL DEFAULT 1
)`);
await client.end();
console.log("tables ready");
