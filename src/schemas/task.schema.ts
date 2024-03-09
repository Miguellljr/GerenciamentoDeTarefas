import { z } from "zod";
import { baseSchema } from "./base.schema";
import { categorySchema } from "./category.schema";
import { userSchema } from "./user.schema";

const taskSchema = baseSchema.extend({
  title: z.string().min(1),
  content: z.string(),
  categoryId: z.number().positive().nullish(),
  finished: z.boolean().default(false),
  category: categorySchema.nullish(),
  user: userSchema.nullish()
});

const taskCreateSchema = taskSchema.omit({ id: true, category: true  });

const taskUpdateSchema = taskCreateSchema.partial();

const taskReturnSchema = taskSchema.omit({categoryId: true});

const taskCategorySchema = taskSchema.omit({category: true});

export { taskSchema, taskCreateSchema, taskReturnSchema, taskUpdateSchema,  taskCategorySchema };
