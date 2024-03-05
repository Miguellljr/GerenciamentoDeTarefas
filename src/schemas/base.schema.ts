import { string, z } from "zod";

export const baseSchema = z.object({
  id: z
    .number()
    .positive()
});
