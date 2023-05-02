import React, { Children, createContext, useContext } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { getLogedUser, userIsLoged } from "../utils/login";

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

export const GlobalProvider: (props: Props) => JSX.Element = ({ children }) => {
  const isUserLogged = userIsLoged();
  const user = isUserLogged ? getLogedUser() : null;
  const initialStore = store(user);

  return <Provider store={initialStore}>{children}</Provider>;
};
