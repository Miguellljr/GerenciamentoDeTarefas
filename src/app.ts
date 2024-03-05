import "express-async-errors";
import express, { json } from "express";
import helmet from "helmet";
import { categoryRouter, taskRouter } from "./routes";
import { handleErrors } from "./middlewares";

export const app = express();

app.use(json());
app.use(helmet());

app.use("/tasks", taskRouter);
app.use("/categories", categoryRouter);


app.use(handleErrors)
