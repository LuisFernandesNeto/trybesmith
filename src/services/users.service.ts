import jwt from 'jsonwebtoken';
import connection from '../models/connection';
import UserModel from '../models/users.model';
import User, { Login } from '../interfaces/users.interface';
import HttpException from '../http.exception';

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

  public login = async (login: Login) =>  {
    const user = await this.model.getByUsername(login.username);

    if (!user || user.password !== login.password) {
      throw new HttpException(401, 'Username or password invalid');
    }
    
    return this.generateToken(user);
    
  }
}
