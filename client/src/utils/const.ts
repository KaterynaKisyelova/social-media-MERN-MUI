import { LoginFields, RegisterFields } from "../types";

export const LOGIN_TEXT = "LOGIN";
export const REGISTER_TEXT = "REGISTER";
export const CREATE_ACCOUNT_TEXT = `Don't have an account? Sign Up here.`;
export const LOGIN_ACCOUNT_TEXT = `Already have an account? Login here.`;

export const formRegisterFields: { label: string; name: RegisterFields }[] = [
  { label: "First Name", name: "firstName" },
  { label: "Last Name", name: "lastName" },
  { label: "Location", name: "location" },
  { label: "Occupation", name: "occupation" },
];

export const formLoginFields: {
  label: string;
  name: LoginFields;
  type?: string;
}[] = [
  { label: "Email", name: "email" },
  { label: "Password", name: "password", type: "password" },
];
