import { Request, Response } from 'express';
import statusCodes from '../statusCodes';
import UserService from '../services/users.service';
import { readSync } from 'fs';

export default class UserController {
  constructor(private userSevice = new UserService()) { }

  public create = async (req: Request, res: Response) => {
    const user = req.body;
    
    const token = await this.userSevice.create(user);
    res.status(statusCodes.CREATED).json({ token });
  };

  public login = async (req: Request, res: Response) => {
    const { body } = req;
    
    if(!body.username) {
      return res.status(statusCodes.BAD_REQUEST).json({ message: '"username" is required' });
    }

    if(!body.password) {
      return res.status(statusCodes.BAD_REQUEST).json({ message: '"password" is required' });
    }

    const token = await this.userSevice.login(body);

    res.status(statusCodes.CREATED).json({ token });
  };
}