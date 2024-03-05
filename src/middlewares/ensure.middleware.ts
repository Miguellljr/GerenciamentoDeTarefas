import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { AppError } from "../errors";
import { prisma } from "../database/prisma";

class EnsureMiddleware {
  public ValidBody =
    (schema: AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction): void => {
      req.body = schema.parse(req.body);
      return next();
    };

  public bodyCategoryExists = async (
    req: Request,
    _: Response,
    next: NextFunction
  ): Promise<void> => {
    const { categoryId } = req.body;
    if (!categoryId) return next();

    const foundCategory = await prisma.category.findFirst({
      where: { id: categoryId },
    });

    if (!foundCategory) {
      throw new AppError("Category not found", 404);
    }

    return next();
  };

  public bodyTaskIdExists = async (
    { body: { taskId } }: Request,
    _: Response,
    next: NextFunction
  ): Promise<void> => {
    const foundTask = await prisma.task.findFirst({
      where: { id: Number(taskId) },
    });

    if (!foundTask) {
      throw new AppError("Task not found", 404);
    }

    return next();
  };

  public paramsTaskIdExists = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { id } = req.params;

    const foundTask = await prisma.task.findFirst({
      where: { id: Number(id) },
      include: { category: true },
    });

    if (!foundTask) {
      throw new AppError("Task not found", 404);
    }

    res.locals = { ...res.locals, foundTask };
    return next();
  };
}

export const ensure = new EnsureMiddleware();
