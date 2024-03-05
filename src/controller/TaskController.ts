import { Request, Response } from "express";
import { TaskService } from "../services/taskService";

export class TaskController {
  private taskService: TaskService = new TaskService();

  public create = async (req: Request, res: Response): Promise<Response> => {
    const newTask = await this.taskService.create(req.body);
    return res.status(201).json(newTask);
  };

  public read = async (req: Request, res: Response): Promise<Response> => {
    if(req.query.category){
      const allTasks = await this.taskService.read(req.query.category as string);
     return res.status(200).json(allTasks);
    }
    const allTasks = await this.taskService.read();
    return res.status(200).json(allTasks);
  };

  public retrieve = async (_: Request, res: Response): Promise<Response> => {
    const { foundTask } = res.locals;
    const task = await this.taskService.retrieve(foundTask);

    return res.status(200).json(task);
  };

  public update = async (req: Request, res: Response): Promise<Response> => {
    const { foundTask } = res.locals;

    const updateTask = await this.taskService.update(foundTask.id, req.body);

    return res.status(200).json(updateTask);
  };

  public delete = async (req: Request, res: Response): Promise<Response> => {
    const { foundTask } = res.locals;

    await this.taskService.delete(foundTask.id);

    return res.status(204).json();
  };
}
