import { Request, Response } from 'express';
import statusCodes from '../statusCodes';
import UserService from '../services/users.service';

export default class UserController {
  constructor(private userSevice = new UserService()) { }

  public create = async (req: Request, res: Response) => {
    const user = req.body;
    
    const token = await this.userSevice.create(user);
    res.status(statusCodes.CREATED).json({ token });
  };
}