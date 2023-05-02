import React from "react";

export enum VARIANT {
  primary = "primary",
  secondary = "secondary",
}

const Variant = {
  primary: "background-gradient-button text-white rounded",
  secondary: "bg-white text-blue border-blue border-2 rounded-sm",
  disabled: "bg-soft-gray text-white rounded ",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant: VARIANT;
}

export const Button: (props: ButtonProps) => JSX.Element = (props) => {
  const { variant, label, disabled = false } = props;
  const variantClasses = !disabled ? Variant[variant] : Variant.disabled;
  return (
    <button {...props} className={`w-full h-full ${variantClasses}`}>
      {label}
    </button>
  );
};
