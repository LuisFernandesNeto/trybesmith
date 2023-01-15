interface User {
  id?: number;
  username: string;
  vocation: string;
  level: number;
  password: string;
}

export type Login = {
  username: string;
  password: string;
}
    
export default User;