import { z } from "zod";
import {
  taskCreateSchema,
  taskReturnSchema,
  taskUpdateSchema,
} from "../schemas/task.schema";

type TaskCreate = z.infer<typeof taskCreateSchema>;
type TaskUpdate = z.infer<typeof taskUpdateSchema>;
type TaskReturn = z.infer<typeof taskReturnSchema>;

export { TaskCreate, TaskUpdate, TaskReturn };
