import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const PUBLIC_PREFIX = "/uploads/";

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

  await mkdir(UPLOAD_DIR, { recursive: true });

  const nameExt = path.extname(file.name);
  const ext = SAFE_EXT.test(nameExt) ? nameExt : mimeExt;
  const filename = `${prefix}-${randomUUID()}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, filename), buffer);

  return `${PUBLIC_PREFIX}${filename}`;
}

export async function deleteUploadedImage(imageUrl: string | null | undefined) {
  if (!imageUrl || !imageUrl.startsWith(PUBLIC_PREFIX)) return;
  const filePath = path.join(process.cwd(), "public", imageUrl);
  try {
    await unlink(filePath);
  } catch {
    // File may already be gone; nothing to do.
  }
}
