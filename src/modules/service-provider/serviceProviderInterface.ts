interface IServiceProvider {
  displayName: string;
  description: string;
  category: [{name: string}];
  images: [{loc: string}];
  user: string;
  status: boolean;
  dateCreated: Date;
  rank: number;
  statistics: {
    view: number,
    contact: number};
  customers: [{user: string}];
  ads: [{id: string}];
}

export { IServiceProvider };
