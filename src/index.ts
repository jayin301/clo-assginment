import express, { Application, Request, Response } from "express";
import YAML from "yamljs";
import dotenv from "dotenv";
import AppRoutes from "./modules/app/app.route";
import "./config/mogoose";
import "./config/redis";
import { swaggerUi, specs } from "./swagger/swagger";
import path from "path";

// configurations
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;
const base: string = process.env.base_url ?? "/api/v1";
// const swaggerSpec = YAML.load(
//   path.join(__dirname, "../src/swagger/swagger.yaml/")
// );

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Application routing
app.get("/", (req: Request, res: Response) => {
  res.status(200).send({ data: "HI TEST APPLICATION" });
});
app.use(base, AppRoutes);

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}!`));

// Handle unhandled promise rejections and exceptions
process.on("unhandledRejection", (err: any) => {
  console.log(err);
});

process.on("uncaughtException", (err: any) => {
  console.log(err.message);
});
