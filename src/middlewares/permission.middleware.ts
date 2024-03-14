import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { prisma } from "../database/prisma";

export class PermissionMiddleware {
  public ownerUserOrNot = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const userTokenId = Number(res.locals.decoded.sub);
    const taskUserId = Number(res.locals.foundTask.user.id);

    const userToken = await prisma.user.findFirst({
      where: { id: userTokenId },
    });

    if (!userToken) {
      throw new AppError("This user is not the task owner", 403);
    }

    if (taskUserId === userTokenId) {
      return next();
    }

    throw new AppError("This user is not the task owner", 403);
  };
}

export const permission = new PermissionMiddleware();
