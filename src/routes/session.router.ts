import { Router } from "express";
import { ensure } from "../middlewares";
import { sessionCreateSchema } from "../schemas";
import { SessionController } from "../controller";

export const sessionRouter = Router();
const controller = new SessionController();

sessionRouter.post(
  "",
  ensure.ValidBody(sessionCreateSchema),
  controller.login
);

