import React, { useState } from "react";
import { IoFootstepsOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { removeUser } from "../../src/store/authSlice";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  var user = useSelector(store=>store.auth.user);
  var token = useSelector(store=>store.auth.token);
  console.log(user,token)
  const Logout = () =>{
    if(user){
           
            dispatch(removeUser());
            navigate('/login');
  }}

  return (
    <div>
      <div className=" fixed z-[7] bg-zinc-800 text-zinc-500 flex items-center w-full justify-between p-4 px-6">
        <span className="flex items-center gap-2 ">
          <IoFootstepsOutline size="2em" />
          <h1 className="font-bold text-2xl">Foostah..</h1>
        </span>

        <div className="hidden sm:flex gap-3">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          isActive ? "bg-zinc-700 text-lime-400 p-2 px-3 rounded " : "text-zinc-500 hover:bg-zinc-700  p-2 px-3 rounded d "
        }
      >
        Home
      </NavLink>
      {/* <NavLink
        to="/aboutus"
        className={({ isActive }) =>
          isActive ? "bg-zinc-700 text-lime-400 p-2 px-3 rounded" : "text-zinc-500 hover:bg-zinc-700 p-2 px-3 rounded"
        }
      >
        About us
      </NavLink> */}
      <NavLink
        to="/container"
        className={({ isActive }) =>
          isActive ? "bg-zinc-700 text-lime-400 p-2 px-3 rounded" : "text-zinc-500 hover:bg-zinc-700 p-2 px-3 rounded"
        }
      >
        All Products
      </NavLink>
    </div>
        
    <div className="hidden sm:block ">
    <NavLink
        to="/cart"
        className={({ isActive }) =>
          isActive ? "bg-zinc-700 text-lime-400 p-2 px-3 rounded" : "text-zinc-500 hover:bg-zinc-700 p-2 px-3 rounded"
        }
      >
       Cart
      </NavLink>
          {/* <button className="hover:bg-zinc-700 p-2 px-3 rounded">SignIn</button> */}
           {/* <NavLink
        to="/register"
        className={({ isActive }) =>
          isActive ? "bg-zinc-700 text-lime-400 p-2 px-3 rounded" : "text-zinc-500 hover:bg-zinc-700 p-2 px-3 rounded"
        }
      >
       Register
      </NavLink> */}
      
          {/* <button className="hover:bg-zinc-700 p-2 px-3 rounded">SignIn</button> */}
        
       {user ?  <button className="hover:bg-zinc-700 p-2 px-3 rounded" onClick={Logout}>Logout</button>  :<NavLink
        to="/login"
        className={({ isActive }) =>
          isActive ? "bg-zinc-700 text-lime-400 p-2 px-3 rounded" : "text-zinc-500 hover:bg-zinc-700 p-2 px-3 rounded"
        }
      >
      Login
      </NavLink>}
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
         to="/"
         end
         className={({ isActive }) =>
           isActive ? "block py-3 text-2xl bg-zinc-700" : "block py-3 text-2xl hover:bg-zinc-600"
         }
         onClick={() => setIsOpen(false)}
       >
         Home
       </NavLink>
       {/* <NavLink
         to="/aboutus"
         className={({ isActive }) =>
           isActive ? "block py-3 text-2xl bg-zinc-700" : "block py-3 text-2xl hover:bg-zinc-600"
         }
         onClick={() => setIsOpen(false)}
       >
         About us
       </NavLink> */}
       <NavLink
         to="/container"
         className={({ isActive }) =>
           isActive ? "block py-3 text-2xl bg-zinc-700" : "block py-3 text-2xl hover:bg-zinc-600"
         }
         onClick={() => setIsOpen(false)}
       >
         All products
       </NavLink>

       <NavLink
         to="/cart"
         className={({ isActive }) =>
           isActive ? "block py-3 text-2xl bg-zinc-700" : "block py-3 text-2xl hover:bg-zinc-600"
         }
         onClick={() => setIsOpen(false)}
       >
         Your Cart
       </NavLink>

     </div>
     
      )}
    </div>
  );
};

export default Navbar;
