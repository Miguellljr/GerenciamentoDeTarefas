import { z } from "zod";
import { sessionCreateSchema } from "../schemas";
import { UserReturn } from "./user.interface";

type SessionCreate = z.infer<typeof sessionCreateSchema>;
type SessionReturn = {
  accessToken: string;
  user: UserReturn
};

export { SessionCreate, SessionReturn };
