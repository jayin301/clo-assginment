import { createClient } from "redis";
import dotenv from "dotenv";
import logger from "./logger";

dotenv.config();

const client = createClient({
  url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
  legacyMode: true,
});

client.on("error", (err) => logger.info("Redis Client Error", err));
client.on("end", (msg) => logger.info("Redist Client[END]", msg));
client.on("reconnecting", (msg) => logger.info("Redist Client[RECONN]", msg));
client.on("connect", (msg) => logger.info("Redist Client[CONN]", msg));
client.on("ready", (msg) => logger.info("Redist Client[READY]", msg));

if (process.env.NODE_ENV !== "test") {
  (async () => {
    await client.connect();
    logger.info("Cache is connected and ready");
  })();
}

export default client;
