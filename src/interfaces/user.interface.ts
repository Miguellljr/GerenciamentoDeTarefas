import { z } from "zod";
import { userCreateSchema, userReturnSchema} from "../schemas";

type UserCreate = z.infer<typeof userCreateSchema>;
type UserReturn = z.infer<typeof userReturnSchema>;

export { UserCreate, UserReturn };
