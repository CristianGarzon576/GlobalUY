import React from "react";
import { Icon } from "../Icon/Icon";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  icon: string;
  iconcolorclass: string;
  classes: string;
  size?: string | number;
}

export const IconButton: (props: IconButtonProps) => JSX.Element = (props) => {
  const { label, icon, iconcolorclass = "", classes, size = undefined } = props;
  return (
    <button {...props} className={`${classes}`}>
      <div className="flex justify-start items-center ">
        <span className={`${label ? "mr-3" : ""} self-centers`}>
          <Icon className={iconcolorclass} icon={icon} size={size} />
        </span>
        {label}
      </div>
    </button>
  );
};
