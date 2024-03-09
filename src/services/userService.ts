import { prisma } from "../database/prisma";
import { UserCreate, UserReturn } from "../interfaces";
import { userReturnSchema } from "../schemas/user.schema";

export class UserService {
  public create = async ({ ...payLoad }: UserCreate): Promise<UserReturn> => {
    const newUser = await prisma.user.create({ data: payLoad });

    return userReturnSchema.parse(newUser);
  };

  public read = async (): Promise<Array<UserReturn>> => {
    const allUsers = await prisma.user.findMany({
      include: { category: true },
    });

    return userReturnSchema.array().parse(allUsers);
  };
}
