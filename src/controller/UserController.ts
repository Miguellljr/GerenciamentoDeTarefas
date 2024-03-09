import { Request, Response } from "express";
import { UserService } from "../services/userService";

export class UserController {
  private userService: UserService = new UserService();

  public create = async (req: Request, res: Response): Promise<Response> => {
    const newUser = await this.userService.create(req.body);
    return res.status(201).json(newUser);
  };

  public read = async (req: Request, res: Response): Promise<Response> => {
    const newUser = await this.userService.read();
    return res.status(200).json(newUser);
  };

}
