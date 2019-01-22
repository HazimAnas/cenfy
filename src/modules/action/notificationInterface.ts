import { IUser } from "../user/userInterface";

interface INotification {
  from: IUser;
  message: string;
  type: string;
}

export { INotification };
