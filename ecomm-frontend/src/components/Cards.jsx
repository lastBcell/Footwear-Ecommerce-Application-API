import React from "react";

export default function Card(props) {
  return (
    <div className=" z-[6] bg-zinc-700  aspect-3/4 text-sm sm:h-[20em] sm:w-[15em] p-2 m-1 sm:p-3 sm:m-3 rounded-md text-zinc-400">
      <div className="bg-zinc-600 w-full h-[80%] flex rounded-md"></div>
      <div className=" py-1">
        <p className="">{props.data.brand} {props.data.brand}</p>
        <p className="">price:{props.data.price}Rs</p>
        <p className="">Size:{props.data.size}</p>
      </div>

      {console.log(props.data)}
    </div>
  );
}
