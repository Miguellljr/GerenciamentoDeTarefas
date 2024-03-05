import { z } from "zod";
import { categoryCreateSchema, categorySchema } from "../schemas/category.schema";

type CategoryCreate = z.infer<typeof categoryCreateSchema>;
type CategoryReturn = z.infer<typeof categorySchema>;


export { CategoryCreate, CategoryReturn };
