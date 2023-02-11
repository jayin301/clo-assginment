import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "../config/logger";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI ?? "";

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);
const db = mongoose
  .connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  } as mongoose.ConnectOptions)
  .then(() => {
    logger.info("Connected sucessfully to Database");
  })
  .catch((e: Error) => {
    logger.error(e);
  });

export default db;
