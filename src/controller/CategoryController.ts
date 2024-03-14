import { Request, Response } from "express";
import { CategoryService } from "../services/categoryService";
import { AppError } from "../errors";

export class CategoryController {
  private categoryService: CategoryService = new CategoryService();

  public create = async (req: Request, res: Response): Promise<Response> => {
    const newCategory = await this.categoryService.create(
      req.body,
      Number(res.locals.decoded.sub)
    );
    return res.status(201).json(newCategory);
  };

  public delete = async (req: Request, res: Response): Promise<Response> => {
    const userId = Number(res.locals.decoded.sub)
    const category = res.locals.foundCategory

    if(category.user.id != userId){
      throw new AppError("This user is not the category owner", 403);
    }

    await this.categoryService.delete(category.id);

    return res.status(204).json();
  };
}
