import React from "react";
import Card from "./Cards";
import Navbar from "./Navbar";
import Container from "./Container";

const Foreground = () => {
  return (
    //    <div ref ={ref} className=' fixed z-[3] w-full h-screen flex gap-5 flex-wrap p-5 '>
    //        {/* { data.map((item,index)=>(
    //             <Card data={item} key={index} reference={ref}/>
    //             ))} */}
    // </div>
    <>
      <div className="   w-full h-full bg-zinc-800 ">
        {/* <h1 className='z-[2] absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] font-semibold text-[14vw] leading-none tracking-tighter text-zinc-900'>Foostah.</h1> */}
        {/* <Background/> */}
        <Navbar />
        <Container />
      </div>
    </>
  );
};

export default Foreground;
