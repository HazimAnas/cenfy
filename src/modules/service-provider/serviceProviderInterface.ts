interface IServiceProvider {
  displayName: string;
  description: string;
  categories: [{name: string}];
  address: {
    line1: string;
    line2: string;
    state: string;
    postcode: string;
    lat: string;
    long: string;
  };
  images: [{imagetype: string, loc: string}];
  user: string;
  status: boolean;
  dateCreated: Date;
  rank: number;
  statistics: {
    favorite: number,
    view: number,
    contact: number};
  customers: [{user: string}];
  followers: [{user: string}];
  ads: [{id: string}];
}

export { IServiceProvider };
