interface IUser {
  userName: string;
  password: string;
  email: string;
  displayName: string;
  address: string;
  phoneNumber: string;
  serviceProvider: string;

  isValidPassword(password: string): boolean;
}

export { IUser };
