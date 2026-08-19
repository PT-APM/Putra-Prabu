import "dotenv/config";
import { readFile, readdir } from "fs/promises";
import path from "path";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { prisma } from "@/lib/db";

const REGION = process.env.NEXT_PUBLIC_AWS_REGION!;
const BUCKET = process.env.NEXT_PUBLIC_AWS_S3_BUCKET!;
const PUBLIC_BASE_URL = `https://${BUCKET}.s3.${REGION}.amazonaws.com/`;
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

const CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

const s3 = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_S3_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_S3_KEY!,
  },
});

async function migrateFile(filename: string): Promise<string> {
  const ext = path.extname(filename).toLowerCase();
  const key = `uploads/${filename}`;
  const buffer = await readFile(path.join(UPLOAD_DIR, filename));
  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: buffer,
      ContentType: CONTENT_TYPES[ext] ?? "application/octet-stream",
    })
  );
  return `${PUBLIC_BASE_URL}${key}`;
}

async function main() {
  let diskFiles: string[] = [];
  try {
    diskFiles = await readdir(UPLOAD_DIR);
  } catch {
    console.log("No public/uploads directory found, nothing to migrate from disk.");
  }

  const localImageWhere = { imageUrl: { startsWith: "/uploads/" } } as const;
  const select = { id: true, imageUrl: true } as const;

  const [newsRows, serviceRows, leaderRows] = await Promise.all([
    prisma.newsArticle.findMany({ where: localImageWhere, select }),
    prisma.service.findMany({ where: localImageWhere, select }),
    prisma.leader.findMany({ where: localImageWhere, select }),
  ]);

  // Find every DB row still referencing a local /uploads/ path.
  type ModelName = "newsArticle" | "service" | "leader";
  const referenced: { model: ModelName; id: string; imageUrl: string }[] = [
    ...newsRows.map((r) => ({ model: "newsArticle" as const, id: r.id, imageUrl: r.imageUrl })),
    ...serviceRows.map((r) => ({ model: "service" as const, id: r.id, imageUrl: r.imageUrl })),
    ...leaderRows.map((r) => ({ model: "leader" as const, id: r.id, imageUrl: r.imageUrl })),
  ];

  if (referenced.length === 0) {
    console.log("No DB rows reference local /uploads/ files. Nothing to migrate.");
  }

  const orphans = diskFiles.filter((f) => !referenced.some((r) => r.imageUrl === `/uploads/${f}`));
  if (orphans.length > 0) {
    console.log(`Skipping ${orphans.length} file(s) on disk with no matching DB row (not uploaded):`, orphans);
  }

  const uploaded = new Map<string, string>(); // old relative path -> new S3 url
  for (const { imageUrl } of referenced) {
    const filename = imageUrl.replace("/uploads/", "");
    if (uploaded.has(imageUrl)) continue;
    if (!diskFiles.includes(filename)) {
      console.warn(`DB references ${imageUrl} but file is missing on disk, skipping.`);
      continue;
    }
    const newUrl = await migrateFile(filename);
    uploaded.set(imageUrl, newUrl);
    console.log(`Uploaded ${imageUrl} -> ${newUrl}`);
  }

  for (const row of referenced) {
    const newUrl = uploaded.get(row.imageUrl);
    if (!newUrl) continue;
    const data = { imageUrl: newUrl };
    if (row.model === "newsArticle") {
      await prisma.newsArticle.update({ where: { id: row.id }, data });
    } else if (row.model === "service") {
      await prisma.service.update({ where: { id: row.id }, data });
    } else {
      await prisma.leader.update({ where: { id: row.id }, data });
    }
    console.log(`Updated ${row.model} id=${row.id}: ${row.imageUrl} -> ${newUrl}`);
  }

  console.log("Migration complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
