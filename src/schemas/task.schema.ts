import { z } from "zod";
import { baseSchema } from "./base.schema";
import { categorySchema } from "./category.schema";
import { userReturnSchema, userSchema } from "./user.schema";


const taskSchema = baseSchema.extend({
  title: z.string().min(1),
  content: z.string(),
  finished: z.boolean().default(false),

  category: categorySchema.nullish(),

  owner: userSchema.nullish(),
});

const taskCreateSchema = taskSchema
  .omit({ id: true, category: true, owner: true })
  .extend({ ownerId: z.number().positive().nullish() })
  .extend({ categoryId: z.number().positive().nullish() });

const taskUpdateSchema = taskCreateSchema.partial();

const taskReturnSchema = taskSchema.extend({owner: userReturnSchema});

const taskCategorySchema = taskSchema.omit({ category: true, owner: true });

export {
  taskSchema,
  taskCreateSchema,
  taskReturnSchema,
  taskUpdateSchema,
  taskCategorySchema,
};
