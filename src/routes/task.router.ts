import { Router } from "express";
import { TaskController } from "../controller";
import { ensure, permission } from "../middlewares";
import { taskCreateSchema, taskUpdateSchema } from "../schemas/task.schema";
import { auth } from "../middlewares/auth.middleware";

export const taskRouter = Router();
const controller = new TaskController();

taskRouter.use(auth.isAuthenticated);

taskRouter.post(
  "",
  ensure.ValidBody(taskCreateSchema),
  ensure.bodyCategoryExists,
  controller.create
);

taskRouter.get("", controller.read);

taskRouter.get(
  "/:id",
  ensure.paramsTaskIdExists,
  permission.ownerUserOrNot,
  controller.retrieve
);

taskRouter.patch(
  "/:id",
  ensure.paramsTaskIdExists,
  ensure.ValidBody(taskUpdateSchema),
  permission.ownerUserOrNot,
  ensure.bodyCategoryExists,
  controller.update
);

taskRouter.delete(
  "/:id",
  ensure.paramsTaskIdExists,
  permission.ownerUserOrNot,
  controller.delete
);
