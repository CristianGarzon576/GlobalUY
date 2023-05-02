import { googleLogout } from "@react-oauth/google";
import { User, UserToLoggin, googleUser } from "../models/user";
import { users } from "./mocks";

const loginUser = (existUser: User) => {
  const stringData = JSON.stringify(existUser);
  const token = btoa(stringData);
  localStorage.setItem("user", token);
  localStorage.setItem("fromForm", "true");
  return existUser;
};

const loginWithForm: (user: UserToLoggin) => User | null = (
  user,
) => {
  const { email, password } = user;
  const localUserList = localStorage.getItem("users")
  const list = localUserList ? JSON.parse(localUserList) : users; 
  const existUser = list.find((element: User) => element.email === email);

  if (existUser && existUser.password) {
    if (existUser.password === password) {
      return loginUser(existUser);
    }
    return null;
  }
  if (existUser) {
    return loginUser(existUser);
  }
  return null;
};

const loginWithGoogle: (data: any) => boolean = (data) => {
  const { credential } = data;
  localStorage.setItem("user", credential);
  localStorage.setItem("fromForm", "false");
  return true;
};

const userIsLoged: () => boolean = () => {
  return !!localStorage.getItem("user");
};

export const getLogedUser = () => {
  const valueForm = localStorage.getItem("fromForm") || "";
  if (valueForm === "true") {
    const token: string = localStorage.getItem("user") || "";
    const user = atob(token);
    return user;
  } else {
    return googleUser;
  }
};

const logout: () => void = () => {
  const isFromForm = localStorage.getItem("fromForm");
  if (isFromForm == "true") {
    googleLogout();
  }
  localStorage.removeItem("user");
  localStorage.removeItem("fromForm");
};

export { loginWithForm, loginWithGoogle, logout, userIsLoged };
