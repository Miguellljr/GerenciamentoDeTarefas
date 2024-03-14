import { Task } from "@prisma/client";
import { prisma } from "../database/prisma";
import {
  TaskReturn,
  TaskUpdate,
  TaskCreateService
} from "../interfaces/task.interface";
import { taskReturnSchema } from "../schemas/task.schema";

export class TaskService {
  public create = async ( payLoad : TaskCreateService): Promise<TaskReturn> => {
    const newTask = await prisma.task.create({ data: payLoad });
    return taskReturnSchema.parse(newTask);
  };

  public read = async (userId: number, search?: string): Promise<Array<TaskReturn>> => {
    
    if(search){
      const allTasks = await prisma.task.findMany({
        where: { category: { name: { contains: search, mode: "insensitive" } } },
      include: {category: true }});

      return taskReturnSchema.array().parse(allTasks);
    }

    const allTasks = await prisma.task.findMany({include: {category: true }, where: {userId}});

    return taskReturnSchema.array().parse(allTasks);
   
  };

  public retrieve = async (foundTask: Task): Promise<TaskReturn> => {
    return taskReturnSchema.parse(foundTask);
  };

  public update = async (
    taskId: number,
    data: TaskUpdate
  ): Promise<TaskReturn> => {
    const updateTask = await prisma.task.update({
      where: { id: taskId },
      data, include: {category: true}
    });

    return taskReturnSchema.parse(updateTask);
  };

  public delete = async (taskId: string): Promise<void> => {
    await prisma.task.delete({ where: { id: Number(taskId) } });
  };
}
