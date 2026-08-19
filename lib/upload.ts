import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import path from "path";

const REGION = process.env.NEXT_PUBLIC_AWS_REGION!;
const BUCKET = process.env.NEXT_PUBLIC_AWS_S3_BUCKET!;
const KEY_PREFIX = "uploads/";
const PUBLIC_BASE_URL = `https://${BUCKET}.s3.${REGION}.amazonaws.com/`;

const s3 = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_S3_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_S3_KEY!,
  },
});

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const SAFE_EXT = /^\.[a-zA-Z0-9]{2,5}$/;

export async function saveUploadedImage(file: File, prefix: string): Promise<string> {
  const mimeExt = ALLOWED_TYPES[file.type];
  if (!mimeExt) {
    throw new Error("Format gambar tidak didukung. Gunakan JPG, PNG, WEBP, atau GIF.");
  }
  if (file.size > MAX_SIZE) {
    throw new Error("Ukuran gambar maksimal 5MB.");
  }

  const nameExt = path.extname(file.name);
  const ext = SAFE_EXT.test(nameExt) ? nameExt : mimeExt;
  const key = `${KEY_PREFIX}${prefix}-${randomUUID()}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: buffer,
      ContentType: file.type,
    })
  );

  return `${PUBLIC_BASE_URL}${key}`;
}

export async function deleteUploadedImage(imageUrl: string | null | undefined) {
  if (!imageUrl || !imageUrl.startsWith(PUBLIC_BASE_URL)) return;
  const key = imageUrl.slice(PUBLIC_BASE_URL.length);
  try {
    await s3.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
  } catch {
    // Object may already be gone; nothing to do.
  }
}
