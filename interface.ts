export interface IUser {
  avatar: string;
  profesi: string;
  isAdmin: boolean;
  _id: string;
  fullname: string;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface IResponse {
  message: string;
  user: IUser;
}
