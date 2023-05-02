import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { LoginContent } from "../../components/LoginContent/LoginContent";
import { loginWithForm, loginWithGoogle, userIsLoged } from "../../utils/login";
import { UserToLoggin } from "../../models/user";
import { useAppDispatch } from "../../hooks/hooks";
import { ReactComponent as LogoBackground } from "../../assets/LoginBackground.svg";
import {
  loginUserReducer,
  loginWithGoogleReducer,
} from "../../store/features/users/users";

export const Login: () => JSX.Element = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const existUserLogged = userIsLoged();
    if (existUserLogged) {
      navigate("/dashboard");
    }
  }, [user]);

  const onSuccessMessage = (response: any) => {
    loginWithGoogle(response);
    dispatch(loginWithGoogleReducer());
    navigate("/dashboard");
  };

  const onErrorMessage = () => {};

  const onLogin = (login: UserToLoggin) => {
    dispatch(loginUserReducer(login));
  };
  const onSignUp = () => {
    navigate("/register");
  };

  return (
    <div className="h-screen grid place-items-center">
      <div className="absolute left-0">
        <LogoBackground />
      </div>
      <div className="ablsolute z-10">
        <LoginContent
          onLogin={onLogin}
          onSignUp={onSignUp}
          onSuccessMessage={onSuccessMessage}
          onErrorMessage={onErrorMessage}
        />
      </div>
    </div>
  );
};
