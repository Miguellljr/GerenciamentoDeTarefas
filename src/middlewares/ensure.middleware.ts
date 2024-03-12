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

  public paramsUserIdExists = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { userId } = req.params;

    const foundUser= await prisma.user.findFirst({
      where: { id: Number(userId) },
    });

    if (!foundUser) {
      throw new AppError("User not found", 404);
    }

    res.locals = { ...res.locals, foundUser};
    return next();
  };

  public paramsCategoryIdExists = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { id } = req.params;

    const foundCategory = await prisma.category.findFirst({
      where: { id: Number(id) },
    });

    if (!foundCategory) {
      throw new AppError("Category not found", 404);
    }

    res.locals = { ...res.locals, foundCategory };
    return next();
  };

  public emailIsUnique = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { email } = req.body;

    if (!email) {
      return next();
    }

    const foundUser = await prisma.user.findFirst({
      where: { email },
    });

    if (!foundUser) {
      throw new AppError("This email is already registered", 409);
    }

    return next();
  };

  
}

export const ensure = new EnsureMiddleware();
