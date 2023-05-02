import React from "react";
import IcomoonReact from "icomoon-react";
import iconSet from "./selection.json";

export interface IconProps {
  size?: string | number | undefined;
  icon: string;
  className?: string;
}

export const Icon: (props: IconProps) => JSX.Element = ({
  className,
  size = "22px",
  icon,
}) => {
  return (
    <IcomoonReact
      className={className}
      iconSet={iconSet}
      size={size}
      icon={icon}
    />
  );
};
