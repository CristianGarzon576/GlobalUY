import React from "react";
import { Icon } from "../Icon/Icon";

interface SearchProps {
  placeholder: string;
  handledOnSearch: (search: string) => void;
}

export const Search: (props: SearchProps) => JSX.Element = ({
  placeholder,
  handledOnSearch,
}) => {
  return (
    <div className=" flex justify-arround items-center rounded border-2 border-gray text-gray">
      <input
        className="h-10 w-96 pl-1 outline-0"
        type="text"
        onChange={(e) => handledOnSearch(e.target.value)}
        placeholder={placeholder}
      />
      <div className="pr-1">
        <Icon className="fill-[#979797]" icon={"search"} />
      </div>
    </div>
  );
};
