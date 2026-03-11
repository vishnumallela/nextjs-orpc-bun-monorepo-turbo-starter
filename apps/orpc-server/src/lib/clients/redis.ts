import { RedisClient } from "bun";

export const redis = new RedisClient(
  `${process.env.REDIS_URL ?? "redis://admin:password@localhost:6379"}`
);
