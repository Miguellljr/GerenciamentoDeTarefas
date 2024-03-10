import { compare } from "bcrypt";
import { prisma } from "../database/prisma";
import { AppError } from "../errors";
import { SessionCreate, SessionReturn } from "../interfaces";
import { sign } from "jsonwebtoken";

export class SessionService {
  public login = async ({
    email,
    password,
  }: SessionCreate): Promise<SessionReturn> => {
    const foundUser = await prisma.user.findFirst({ where: { email } });

    if (!foundUser) {
      throw new AppError("User not exists", 404);
    }

    const pwdMatch = compare(password, foundUser.password);

    if (!pwdMatch) {
      throw new AppError("Email and password doesn't match", 401);
    }

    const secret = process.env.JWT_SECRET!;
    const expiresIn = process.env.EXPIRES_IN!;

    const token = sign({}, secret, {
      expiresIn,
      subject: String(foundUser.id),
    });
    
    return { token };
  };
}
