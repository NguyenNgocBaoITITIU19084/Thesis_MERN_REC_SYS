import React, { useState } from "react";

import DropDown from "./DropDown";
import { IoIosArrowDown } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
const OptionList = ({ data, title }) => {
  const [dropDown, setDropDown] = useState(false);
  return (
    <div
      className="relative h-[60px] mt-[10px] mr-[10px] w-[200px] hidden 1000px:block"
      onClick={() => setDropDown(!dropDown)}
    >
      <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
      <button
        className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
      >
        {title}
      </button>
      <IoIosArrowDown
        size={20}
        className="absolute right-2 top-4 cursor-pointer"
      />
      {dropDown ? (
        <DropDown data={data} title={title} setDropDown={setDropDown} />
      ) : null}
    </div>
  );
};

export default OptionList;
