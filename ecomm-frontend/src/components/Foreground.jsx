import React from "react";
import Card from "./Cards";
import Navbar from "./Navbar";

const Foreground = () => {
  // icon,description,filesize,closeordownload,tagdetails
  // const data = [
  //     {
  //         id:1,
  //         description:"This is as test for the ract demo i am careting right now is it cool ir shit right now",
  //         fileSize:"78mb",
  //         close:true,
  //         tag:{isOpen:true,tagTittle:"Downloading",tagColor:"blue"}
  //     },
  //      {
  //         id:2,
  //         description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit, tenetur!",
  //         fileSize:"90mb",
  //         close:false,
  //         tag:{isOpen:false,tagTittle:"",tagColor:"blue"}
  //     },
  //     {
  //         id:3,
  //         description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit, tenetur!",
  //         fileSize:"8mb",
  //         close:false,
  //         tag:{isOpen:true,tagTittle:"Completed",tagColor:"green"}
  //     },
  //     {
  //         id:4,
  //         description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit, tenetur!",
  //         fileSize:"10mb",
  //         close:false,
  //         tag:{isOpen:true,tagTittle:"yes Done",tagColor:""}
  //     }
  // ]

  return (
    //    <div ref ={ref} className=' fixed z-[3] w-full h-screen flex gap-5 flex-wrap p-5 '>
    //        {/* { data.map((item,index)=>(
    //             <Card data={item} key={index} reference={ref}/>
    //             ))} */}
    // </div>
    <>
      <div className="fixed z-[3] w-full h-screen">
        <Navbar/>
        <div className="  flex gap-5 flex-wrap p-5  ">
          <Card />
        </div>
      </div>
    </>
  );
};

export default Foreground;
