import React from "react";
import { GoogleLogin } from "@react-oauth/google";

export interface LoginFormProps {
  onSuccess: (props: any) => void;
  onError: () => void;
}

export const GoogleButton: (props: LoginFormProps) => JSX.Element = ({
  onSuccess,
  onError,
}) => {
  return (
    <>
      <GoogleLogin onSuccess={onSuccess} onError={onError} />
    </>
  );
};
