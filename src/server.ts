import "dotenv/config";
import express from "express";
import morgan from "morgan";
import "reflect-metadata";
import { createConnection } from "typeorm";
import router from "./api";
import { trim, errorHandler, notFound } from "./middleware";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../swagger.json";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(trim);
app.use("/api/v1", router);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  try {
    await createConnection();
    console.log("Database connected");
  } catch (error) {
    console.error(error);
  }
  console.log(`Listening at http://localhost:${PORT}`);
});
