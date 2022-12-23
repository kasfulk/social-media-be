export interface UserPayload {
  username?: string;
}

export interface PostPayload {
  image: string;
  caption: string;
  userId: number;
}
