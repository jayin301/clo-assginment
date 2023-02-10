// import express, { Application, Request, Response } from "express";
// // import cors from "cors";
// import dotenv from "dotenv";

// // configurations
// dotenv.config();
// import "./config/mongoose";
// import "./config/redis";
// import AppRoutes from "./modules/app/app.route";

// // Boot express
// const app: Application = express();
// const port = process.env.PORT || 3000;
// const base: string = process.env.base_url ?? "/api/v1";

// // middlewares
// // app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// // Application routing
// app.get("/", (req: Request, res: Response) => {
//   res.status(200).send({ data: "HI TEST APPLICATION" });
// });
// app.use(base, AppRoutes);

// // Start server
// app.listen(port, () => console.log(`Server is listening on port ${port}!`));

// // Handle unhandled promise rejections and exceptions
// process.on("unhandledRejection", (err: any) => {
//   console.log(err);
// });

// process.on("uncaughtException", (err: any) => {
//   console.log(err.message);
// });
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI ?? "";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node Express API with Swagger",
      version: "0.1.0",
      description:
        "clo-assignment result API with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "jeonghwa min",
        email: "mocajay.jh@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8888/",
      },
    ],
  },
  apis: ["./dist/modules/app/routes.js"],
};

const specs = swaggerJsdoc(options);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

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

const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server hello");
});

app.listen(port, () => {
  console.log(
    `⚡️[server]: Server is running at http://localhost:${port} and hello`
  );
});
