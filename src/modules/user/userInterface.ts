interface IUser {
  userName: string;
  password: string;
  email: string;
  displayName: string;
  address: string;
  phoneNumber: string;
  serviceProvider: string;
  dateCreated: Date;
  loggedIn: boolean;
  isValidPassword(password: string): boolean;
}

export { IUser };
