import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Aboutus() {
  return (
    <div className="bg-zinc-800 ">
      <Navbar />
      <div className="text-zinc-300  h-screen pt-25 p-3">
        <h1 className="">About Us</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident,sunt in culpa
          qui officia deserunt mollit anim id est laborum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident,sunt in culpa
          qui officia deserunt mollit anim id est laborum.
        </p>
        <Link to="/"> Go Home </Link>
      </div>
    </div>
  );
}

export default Aboutus;
