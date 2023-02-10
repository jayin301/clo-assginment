import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI ?? "";

mongoose.Promise = global.Promise;
const db = mongoose
  .connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  } as mongoose.ConnectOptions)
  .then(() => {
    console.log("Connected sucessfully to Database");
  })
  .catch((e: Error) => {
    console.log(e);
  });

export default db;
