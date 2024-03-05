import { z } from "zod";
import { baseSchema } from "./base.schema";
import { categoryCreateSchema, categorySchema } from "./category.schema";

const taskSchema = baseSchema.extend({
  title: z.string(),
  content: z.string(),
  categoryId: z.number().positive().nullish(),
  finished: z.boolean().default(false),
  category: categorySchema.nullish(),
});

const taskCreateSchema = taskSchema.omit({ id: true, category: true  });

const taskUpdateSchema = taskCreateSchema.partial();

const taskReturnSchema = taskSchema.omit({categoryId: true});

const taskCategorySchema = taskSchema.omit({category: true});

export { taskSchema, taskCreateSchema, taskReturnSchema, taskUpdateSchema,  taskCategorySchema };
