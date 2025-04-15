import React from "react";
import { useNavigate } from "react-router-dom";
import download from "../assets/download.png"


export default function Card(props) {
  const navigate = useNavigate()
  function goto(){
    // console.log("clicked")
    // console.log(props.data._id)
  
    navigate( `/ProductDetail/${props.data._id}`)

  }
  
  return (
    <div onClick={goto} className=" z-[6] bg-zinc-700  aspect-3/4 text-sm sm:h-[20em] sm:w-[15em] p-2 m-1 sm:p-3 sm:m-3 rounded-md text-zinc-400">
      <div className="bg-zinc-600 w-full h-[80%] flex rounded-md">
         <img src={download} alt="image of product" className=' rounded object-cover  w-full h-full  '/>
      </div>
      <div className=" py-1">
        <p className="">{props.data.brand} {props.data.model}</p>
        <p className="">price:{props.data.price}Rs</p>
        <p className="">Size:{props.data.size}</p>
      </div>

      {/* {console.log(props.data)} */}
    </div>
  );
}
