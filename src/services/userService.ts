import { hash } from "bcrypt";
import { prisma } from "../database/prisma";
import { UserCreate, UserReturn } from "../interfaces";
import { userReturnSchema } from "../schemas/user.schema";

export class UserService {
  public create = async ({ ...payLoad }: UserCreate): Promise<UserReturn> => {
    payLoad.password = await hash(payLoad.password, 10);

    const newUser = await prisma.user.create({ data: payLoad });

    return userReturnSchema.parse(newUser);
  };

  public read = async (userId: number): Promise<UserReturn> => {

    const user= await prisma.user.findFirst({where: {id: userId}});

    return userReturnSchema.parse(user);
  };
}
