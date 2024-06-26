import "express-async-errors";
import express, { json } from "express";
import helmet from "helmet";
import { categoryRouter, sessionRouter, taskRouter } from "./routes";
import { handleErrors } from "./middlewares";
import { userRouter } from "./routes/user.router";


export const app = express();

app.use(json());
app.use(helmet());

app.use("/tasks", taskRouter);
app.use("/categories", categoryRouter);
app.use("/users/login", sessionRouter);
app.use("/users", userRouter);


app.use(handleErrors)

