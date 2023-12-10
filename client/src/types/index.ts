export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  picturePath: string;
  friends: [];
  location: string;
  occupation: string;
  viewedProfile: number;
  impressions: number;
};

export type Post = {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  location: string;
  description: string;
  picturePath: string;
  userPicturePath: string;
  // likes: {
  //   type: Map;
  //   of: boolean;
  // };
  comments: [];
};
