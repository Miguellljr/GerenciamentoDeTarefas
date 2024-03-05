import { Router } from "express";
import { TaskController } from "../controller";
import { ensure } from "../middlewares";
import { taskCreateSchema } from "../schemas/task.schema";

export const taskRouter = Router();
const controller = new TaskController();

taskRouter.post(
  "",
  ensure.ValidBody(taskCreateSchema),
  ensure.bodyCategoryExists,
  controller.create
);

taskRouter.get("", controller.read);

taskRouter.get("/:id", ensure.paramsTaskIdExists, controller.retrieve);

taskRouter.patch(
  "/:id",
  ensure.paramsTaskIdExists,
  ensure.bodyCategoryExists,
  controller.update
);

taskRouter.delete("/:id", ensure.paramsTaskIdExists, controller.delete);
