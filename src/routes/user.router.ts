import { Router } from "express";
import { ensure } from "../middlewares";
import { UserController } from "../controller/UserController";
import { userCreateSchema } from "../schemas";

export const userRouter = Router();
const controller = new UserController();

userRouter.post(
  "",
  ensure.ValidBody(userCreateSchema),
  ensure.emailIsUnique,
  controller.create
);

userRouter.get("/profile", controller.read);
