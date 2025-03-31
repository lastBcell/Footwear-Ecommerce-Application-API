import React from "react";
import { IoFootstepsOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className=" bg-zinc-800 flex align-center w-full justify-between p-4 px-6 text-zinc-300 ">
        <span className="flex flex-row gap-2">
          <IoFootstepsOutline size="2em" />
          <h1 className=" font-bold text-2xl">Foostah.</h1>
        </span>

        <div className="sm:flex  gap-3 hidden sm:flex-row">
          <p className=" hover:bg-zinc-700 transition-all p-2 px-3 rounded">
            Something
          </p>
          <p className="hover:bg-zinc-700 transition-all p-2 px-3 rounded">
            About
          </p>
          <p className="hover:bg-zinc-700 transition-all p-2 px-3 rounded">
            Home
          </p>
        </div>
        <div className="p-2 invisible sm:visible">logout</div>
        <div className="p-2 visible sm:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <RxHamburgerMenu size={"1.5em"} />
          </button>
        </div>
        </div>

        {isOpen && (<div className="py-15 visible sm:invisible absolute top-[5em] bg-zinc-500 w-full text-center h-[20em]  ">
        <p className=" hover:bg-zinc-700 transition-all p-2 px-3 rounded font-semibold text-3xl text-zinc-400">
            Home
          </p>
          <p className="hover:bg-zinc-700 transition-all p-2 px-3 rounded font-semibold text-3xl text-zinc-400">
            About
          </p>
          <p className="hover:bg-zinc-700 transition-all p-2 px-3 rounded font-semibold text-3xl text-zinc-400">
            Something
          </p>

        </div>) }
        

    </div>
  );
};

export default Navbar;
