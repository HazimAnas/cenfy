interface IUser {
  userName: string;
  password: string;
  email: string;
  displayName: string;
  address: {
    line1: string;
    line2: string;
    state: string;
    postcode: string;
    lat: string;
    long: string;
  };
  phoneNumber: string;
  serviceProvider: string;
  dateCreated: Date;
  loggedIn: boolean;
  isValidPassword(password: string): boolean;
}

export { IUser };
