import { prisma } from "../database/prisma";
import { CategoryCreate, CategoryReturn } from "../interfaces";
import { categorySchema } from "../schemas/category.schema";

export class CategoryService {
  public create = async (
    payload: CategoryCreate,
    userId: number
  ): Promise<CategoryReturn> => {
    const newCategory = await prisma.category.create({
      data: { ...payload, userId },
    });

    return categorySchema.parse(newCategory);
  };

  public delete = async (CategoryId: string): Promise<void> => {
    await prisma.category.delete({ where: { id: Number(CategoryId) } });
  };
}
