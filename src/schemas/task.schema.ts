import { z } from "zod";
import { baseSchema } from "./base.schema";
import { categorySchema } from "./category.schema";


const taskSchema = baseSchema.extend({
  title: z.string().min(1),
  content: z.string(),
  finished: z.boolean().default(false),

  category: categorySchema.nullish(),
});

const taskCreateSchema = taskSchema
  .omit({ id: true, category: true})
  .extend({ categoryId: z.number().positive().nullish() });

const taskUpdateSchema = taskCreateSchema.partial();

const taskReturnSchema = taskSchema

export {
  taskSchema,
  taskCreateSchema,
  taskReturnSchema,
  taskUpdateSchema,
};
