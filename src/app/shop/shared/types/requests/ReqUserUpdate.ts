export interface IReqUserUpdate {
  // firstname?: string;
  // lastname?: string;
  id: number;
  username: string;
  email: string;
  password: string;
  oldPassword?: string;
  picture?: any;
}
