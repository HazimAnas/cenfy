import { IServiceProvider } from "../service-provider/serviceProviderInterface";
import { IUser } from "../user/userInterface";

interface INotification {
  from: IUser;
  string: IServiceProvider;
}

export { INotification };
