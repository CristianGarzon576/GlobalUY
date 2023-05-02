import React from "react";
import { ReactComponent as LoginGlobalUY } from "../../assets/LoginImage.svg";
import { IconButton } from "../Button/IconButton";

export interface SectionProps {
  id: string;
  icon: string;
  label: string;
  onClick: () => void;
}

export interface SideBarProps {
  onLogout: () => void;
  sections: SectionProps[];
  currentSection: any;
  handledOnClick: (label: string) => void;
}

export const SideBar: (props: SideBarProps) => JSX.Element = ({
  onLogout,
  sections,
  currentSection,
  handledOnClick,
}) => {
  return (
    <div className="bg-white flex flex-col h-full w-full">
      <div className="flex justify-center items-center p-8">
        <LoginGlobalUY />
      </div>
      <div className="flex flex-col h-full justify-start p-8">
        {sections &&
          sections.length > 0 &&
          sections.map(({ label, icon }, index) => {
            const isSelected = label === currentSection.label;
            return (
              <div key={index} className="mb-7">
                <IconButton
                  icon={icon}
                  classes={
                    isSelected ? "font-bold text-blue" : "font-normal text-gray"
                  }
                  iconcolorclass={
                    isSelected ? "fill-[#006EAA]" : "fill-[#767676]"
                  }
                  label={label}
                  onClick={(e) => {
                    e?.preventDefault();
                    handledOnClick(label);
                  }}
                />
              </div>
            );
          })}
      </div>
      <div className="flex p-8">
        <IconButton
          classes="text-[#767676]"
          iconcolorclass="fill-[#767676]"
          onClick={onLogout}
          icon="exit"
          label="Cerrar"
        />
      </div>
    </div>
  );
};
