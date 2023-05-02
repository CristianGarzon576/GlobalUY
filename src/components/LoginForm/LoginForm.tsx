import React, { useState } from "react";
import { Button, VARIANT } from "../Button/Button";
import { UserToLoggin } from "../../models/user";
import { Link } from "react-router-dom";

export interface LoginFormProps {
  onLogin: (props: UserToLoggin) => void;
}

export const LoginForm: (props: LoginFormProps) => JSX.Element = ({
  onLogin,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handledEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const handledPassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handledLogin = () => {
    const user: UserToLoggin = {
      email: email,
      password: password,
    };
    setPassword("");
    setEmail("");
    onLogin(user);
  };

  return (
    <div className="flex w-full flex-col pb-6">
      <div className="flex flex-col w-full pb-6 px-10">
        <label className="text-blue mb-1" htmlFor="email">
          CORREO ELECTRÓNICO
        </label>
        <input
          className="w-full border-b-2 border-b-blue h-12 p-3 rounded"
          type="email"
          value={email}
          onChange={handledEmail}
          name="email"
          id="email"
        />
      </div>
      <div className="flex flex-col w-full pb-6 px-10">
        <label className="text-blue" htmlFor="password">
          CONTRASEÑA
        </label>
        <input
          className="w-full border-b-2 border-b-blue h-12 p-3 rounded"
          type="password"
          value={password}
          onChange={handledPassword}
          name="password"
          id="password"
        />
      </div>
      <div className="flex justify-end pb-6 px-10">
        <Link to="/recovery" className="text-blue underline">
          ¿Olvidaste tu contraseña?
        </Link>
      </div>
      <div className="flex h-12 w-full px-6 self-center">
        <Button
          onClick={handledLogin}
          label={"Iniciar sesión"}
          variant={VARIANT.primary}
        />
      </div>
    </div>
  );
};
