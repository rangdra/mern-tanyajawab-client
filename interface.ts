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

export interface IQuestion {
  tags: string[];
  photos: { public_id: string; url: string }[];
  voteScore: number;
  _id: string;
  title: string;
  body: string;
  userId: IUser;
  answers: object[];
  votes: IVote[];
  createdAt: string;
  updatedAt: string;
  slug: string;
}

export interface IVote {
  _id: string;
  value: number;
  userId: string | IUser;
  updatedAt: string;
  createdAt: string;
}
