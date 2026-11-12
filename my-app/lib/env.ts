// Names only: values are never put into messages or logs.
const AUTH = ["ADMIN_PASSWORD", "ADMIN_SESSION_SECRET"];
const DB = ["DATABASE_URL"];
const S3 = [
  "S3_ENDPOINT",
  "S3_REGION",
  "S3_BUCKET",
  "S3_ACCESS_KEY_ID",
  "S3_SECRET_ACCESS_KEY",
];

const missing = (names: string[]) => names.filter((n) => !process.env[n]);
export const missingAuth = () => missing(AUTH);
export const missingDb = () => missing(DB);
export const missingS3 = () => missing(S3);
