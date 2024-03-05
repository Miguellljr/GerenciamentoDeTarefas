import { Router } from "express";
import { CategoryController } from "../controller";
import { ensure } from "../middlewares";
import { categoryCreateSchema } from "../schemas/category.schema";

export const categoryRouter = Router();
const controller = new CategoryController();

categoryRouter.post(
  "",
  ensure.ValidBody(categoryCreateSchema),
  controller.create
);

categoryRouter.delete("/:id", ensure.paramsCategoryIdExists, controller.delete)


