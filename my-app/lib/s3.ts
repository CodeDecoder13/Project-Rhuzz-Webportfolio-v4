import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { missingS3 } from "./env";

const g = globalThis as unknown as { __s3?: S3Client };

function client() {
  if (missingS3().length) throw new Error("Bucket not configured");
  return (g.__s3 ??= new S3Client({
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION,
    forcePathStyle: true,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID!,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
    },
  }));
}

const Bucket = () => process.env.S3_BUCKET!;

export const putPhoto = (Key: string, Body: Uint8Array, ContentType: string) =>
  client().send(
    new PutObjectCommand({ Bucket: Bucket(), Key, Body, ContentType }),
  );

export async function deletePhoto(Key: string | null) {
  if (!Key || !Key.startsWith("posts/")) return;
  try {
    await client().send(new DeleteObjectCommand({ Bucket: Bucket(), Key }));
  } catch {
    // an orphaned object is harmless; never block the post change on it
  }
}

export async function getPhoto(Key: string) {
  const r = await client().send(
    new GetObjectCommand({ Bucket: Bucket(), Key }),
  );
  return r.Body ? r.Body.transformToWebStream() : null;
}
