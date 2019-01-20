interface IServiceProvider {
  displayName: string;
  description: string;
  category: [{name: string}];
  images: [{loc: string}];
  user: string;
  status: boolean;
}

export { IServiceProvider };
