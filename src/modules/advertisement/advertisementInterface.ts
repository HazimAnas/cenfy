interface IAdsvertisement {
  name: string;
  description: string;
  images: [{loc: string}];
  user: string;
  status: boolean;
  dateCreated: Date;
  statistics: [{name: number}];
}

export { IAdsvertisement };
