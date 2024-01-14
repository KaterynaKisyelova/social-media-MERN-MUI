export type GeneralFields = {
  _id: string;
  firstName: string;
  lastName: string;
  location: string;
  occupation: string;
  picturePath: string;
};

export type User = GeneralFields & {
  email: string;
  password: string;
  friends: GeneralFields[];
  viewedProfile: number;
  impressions: number;
};

export type Post = Omit<GeneralFields, "occupation"> & {
  userId: string;
  description: string;
  userPicturePath: string;
  likes: { [key: string]: string };
  comments: string[];
};

export type InitialValuesRegister = Omit<
  GeneralFields,
  "_id" | "picturePath"
> & {
  email: string;
  password: string;
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
