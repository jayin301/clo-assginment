import { createClient } from "redis";
import dotenv from "dotenv";
import logger from "./logger";

dotenv.config();

const client = createClient({
  url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
  legacyMode: true,
});

client.on("error", (err) => logger.info("Redis Client Error", err));

(async () => {
  await client.connect();
  logger.info("Cache is connected and ready");
})();

client.connect().then();

export default client.v4;
