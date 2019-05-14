interface IServiceProvider {
  displayName: string;
  description: string;
  category: [{name: string}];
  images: [{loc: string}];
  user: string;
  status: boolean;
  rank: number;
  statistics: [{name: number}];
  customers: [{userName: string}];
  ads: [{id: string}];
}

export { IServiceProvider };
