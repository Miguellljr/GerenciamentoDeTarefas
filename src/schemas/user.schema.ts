import { z } from "zod";
import { baseSchema } from "./base.schema";

const userSchema = baseSchema.extend({
  name: z.string().min(1),
  email: z.string().min(1).email(),
  password: z.string(),
});

const userCreateSchema = userSchema.omit({ id: true });

const userReturnSchema = userSchema.omit({ password: true });

export { userSchema, userCreateSchema, userReturnSchema };
