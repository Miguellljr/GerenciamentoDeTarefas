import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { prisma } from "../database/prisma";

export class AuthMiddleware {
  public ownerUserOrNot = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const userTokenId = Number(res.locals.decoded.sub);
    const userId = Number(req.params.userId);

    const userToken = await prisma.user.findFirst({
      where: { id: userTokenId },
    });

    if (!userToken) {
      throw new AppError("This user is not the task owner", 403);
    }

    if (userId === userTokenId) {
      return next();
    }

    throw new AppError("This user is not the task owner", 403);
  };
}

export const auth = new AuthMiddleware();
