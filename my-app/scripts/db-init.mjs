// Creates the posts table. Run with: npm run db:init (loads .env.local).
import pg from "pg";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set (put it in .env.local).");
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
await client.end();
console.log("posts table ready");
