import { S3Client } from "bun";

export const minio = new S3Client({
  accessKeyId: process.env.MINIO_ACCESS_KEY ?? "admin",
  secretAccessKey: process.env.MINIO_SECRET_KEY ?? "password",
  endpoint: process.env.MINIO_URL ?? "http://localhost:9000",
  bucket: process.env.MINIO_BUCKET ?? "uploads",
});
