import { Request, Response } from "express";
import { TaskService } from "../services/taskService";

export class TaskController {
  private taskService: TaskService = new TaskService();

  public create = async (req: Request, res: Response): Promise<Response> => {
    const userId = +res.locals.decoded.sub

    const payLoad = {
      ...req.body,
      userId
    }
    const newTask = await this.taskService.create(payLoad);
    return res.status(201).json(newTask);
  };

  public read = async (req: Request, res: Response): Promise<Response> => {
    const userId = Number(res.locals.decoded.sub)

    if(req.query.category){
      const allTasks = await this.taskService.read( userId, req.query.category as string);
     return res.status(200).json(allTasks);
    }
    const allTasks = await this.taskService.read( userId );
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
