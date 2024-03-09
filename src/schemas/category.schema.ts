import { z } from "zod";
import { baseSchema } from "./base.schema";
import { userSchema } from "./user.schema";

const categorySchema = baseSchema.extend({
  name: z.string(),
  user: userSchema.nullish()
});

const categoryCreateSchema = categorySchema.omit({ id: true });

export { categoryCreateSchema, categorySchema };
