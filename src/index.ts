import express, { Application, Request, Response } from "express";
import logger from "./config/logger";
import morgan from "morgan";
import YAML from "yamljs";
import dotenv from "dotenv";
import AppRoutes from "./modules/app/app.route";
import "./config/mogoose";
import "./config/redis";
import { swaggerUi } from "./swagger/swagger";
import path from "path";

// configurations
dotenv.config();
const app: Application = express();
const base: string = process.env.base_url ?? "/api";
const combined =
  ':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';
const morganFormat = process.env.NODE_ENV !== "production" ? "dev" : combined;
const swaggerYaml = YAML.load(path.join(__dirname, "../../swagger.yaml"));
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerYaml));
app.use(morgan(morganFormat, { stream: logger.stream }));

// Application routing
app.get("/", (req: Request, res: Response) => {
  res.status(200).send({ data: "HI TEST APPLICATION" });
});
app.use(base, AppRoutes);

// Handle unhandled promise rejections and exceptions
process.on("unhandledRejection", (err: any) => {
  logger.error(err.message);
});

process.on("uncaughtException", (err: any) => {
  logger.error(err.message);
});

export default app;
