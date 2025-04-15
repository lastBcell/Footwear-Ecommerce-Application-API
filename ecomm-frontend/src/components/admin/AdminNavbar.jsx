import React, { useState } from "react";
import { IoFootstepsOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className=" fixed z-[7] bg-zinc-800 text-zinc-500 flex items-center w-full justify-between p-4 px-6">
        <span className="flex items-center gap-2 ">
          <IoFootstepsOutline size="2em" />
          <h1 className="font-bold text-2xl">Foostah <span className="text-lime-500">Admin</span></h1>
        </span>

        <div className="hidden sm:flex gap-3">
      <NavLink
        to="/lists"
        end
        className={({ isActive }) =>
          isActive ? "bg-zinc-700 text-lime-400 p-2 px-3 rounded " : "text-zinc-500 hover:bg-zinc-700  p-2 px-3 rounded d "
        }
      >
       lists
      </NavLink>
      <NavLink
        to="/orders"
        className={({ isActive }) =>
          isActive ? "bg-zinc-700 text-lime-400 p-2 px-3 rounded" : "text-zinc-500 hover:bg-zinc-700 p-2 px-3 rounded"
        }
      >
      Orders
      </NavLink>
      <NavLink
        to="/stocks"
        className={({ isActive }) =>
          isActive ? "bg-zinc-700 text-lime-400 p-2 px-3 rounded" : "text-zinc-500 hover:bg-zinc-700 p-2 px-3 rounded"
        }
      >
        Stocks
      </NavLink>
    </div>
        
        <div className="hidden sm:block p-2">
          <button className="hover:bg-zinc-700 p-2 px-3 rounded">Logout</button>
        </div>

        <div className="sm:hidden p-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <RxHamburgerMenu size={"1.5em"} />
          </button>
        </div>
      </div>

      {isOpen && (
       <div className="fixed z-[8] top-[5em] left-0 bg-zinc-900 w-full text-center text-zinc-500 sm:hidden">
       <NavLink
         to="/lists"
         end
         className={({ isActive }) =>
           isActive ? "block py-3 text-2xl bg-zinc-700" : "block py-3 text-2xl hover:bg-zinc-600"
         }
         onClick={() => setIsOpen(false)}
       >
       Lists
       </NavLink>
       <NavLink
         to="/orders"
         className={({ isActive }) =>
           isActive ? "block py-3 text-2xl bg-zinc-700" : "block py-3 text-2xl hover:bg-zinc-600"
         }
         onClick={() => setIsOpen(false)}
       >
         Orders
       </NavLink>
       <NavLink
         to="/stocks"
         className={({ isActive }) =>
           isActive ? "block py-3 text-2xl bg-zinc-700" : "block py-3 text-2xl hover:bg-zinc-600"
         }
         onClick={() => setIsOpen(false)}
       >
         Stocks
       </NavLink>
     </div>
     
      )}
    </div>
  );
};

export default Navbar;
