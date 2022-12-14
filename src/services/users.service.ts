import jwt from 'jsonwebtoken';
import connection from '../models/connection';
import UserModel from '../models/users.model';
import User from '../interfaces/users.interface';

export default class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  } 

  public generateToken = (user: User) => {
    const payload = { username: user.username, vocation: user.vocation, level: user.level };
    return jwt.sign(
      payload, 
      process.env.JWT_SECRET as string,
      { algorithm: 'HS256', expiresIn: '1d' },
    );
  };

  public async create(user: User): Promise<string> {
    const u = await this.model.create(user);

    const generate = this.generateToken(u);

    return generate;
  }
}
