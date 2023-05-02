import React from "react";
import { GoogleButton } from "../GoogleButton/GoogleButton";
import { LoginForm } from "../LoginForm/LoginForm";
import { Button, VARIANT } from "../Button/Button";
import { ReactComponent as LoginGlobalUY } from "../../assets/LoginImage.svg";
import { Link } from "react-router-dom";

export interface LoginContentProps {
  onSignUp: () => void;
  onSuccessMessage: (props: any) => void;
  onErrorMessage: () => void;
  onLogin: (props: any) => void;
}

export const LoginContent: (props: LoginContentProps) => JSX.Element = ({
  onSignUp,
  onSuccessMessage,
  onErrorMessage,
  onLogin,
}) => {
  return (
    <div className="w-96 bg-ligth-gray flex flex-col items-center rounded-lg">
      <div className="px-24 pt-10 pb-6">
        <LoginGlobalUY />
      </div>
      <div className="flex items-center w-full">
        <LoginForm onLogin={onLogin} />
      </div>
      <div className="mb-6">
        <div className="flex flex-row justify-center items-center px-8">
          <div className="hr mr-4"> </div>
          <span className="text-gray text-sm"> o ingresar con </span>
          <div className="hr ml-4"> </div>
        </div>
        <div className="flex justify-center items-center my-6">
          <GoogleButton onSuccess={onSuccessMessage} onError={onErrorMessage} />
        </div>
        <div className="flex justify-center items-center">
          <Link
            to="https://accounts.google.com/signup/v2/webcreateaccount?flowName=GlifWebSignIn&flowEntry=SignUp"
            target="_blank"
          >
            <span className="text-gray"> ¿No tienes una cuenta? </span>
          </Link>
        </div>
      </div>
      <div className="h-14 w-full px-6 mb-10">
        <Button
          onClick={onSignUp}
          variant={VARIANT.secondary}
          label="Registrarme"
        />
      </div>
    </div>
  );
};
