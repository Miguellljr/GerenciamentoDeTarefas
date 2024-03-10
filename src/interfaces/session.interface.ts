import { z } from "zod";
import { sessionCreateSchema } from "../schemas";

type SessionCreate = z.infer<typeof sessionCreateSchema>;
type SessionReturn = {
  token: string;
};

export { SessionCreate, SessionReturn };
