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

export type InitialValuesRegister = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  location: string;
  occupation: string;
  picture: File | "";
};

export type InitialValuesLogin = {
  email: string;
  password: string;
};

export type LoginFields = keyof InitialValuesLogin;

export type RegisterFields = keyof Omit<
  InitialValuesRegister,
  LoginFields | "picture"
>;
