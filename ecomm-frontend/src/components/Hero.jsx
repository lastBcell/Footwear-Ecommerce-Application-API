import React from 'react'
import Navbar from './Navbar'
import { IoFootstepsOutline } from "react-icons/io5";
import * as motion from "motion/react-client"

const Hero = () => {
  return (
    <div className='relative w-full h-screen bg-zinc-800 text-zinc-900  '>
        <Navbar/>
        <div className='blur-md absolute opacity-90 text-zinc-700 top-1/2 left-1/2 text-[37vw] -translate-x-[50%] -translate-y-[50%]'><IoFootstepsOutline /></div>
        <motion.h1
         initial={{ opacity: 0, scale: 0.9 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{
             duration: 0.4,
             scale: { type: "spring", visualDuration: 0.8, bounce: 0.1 },
         }}
        className='drop-shadow-xl text-lime-500  absolute leading-none tracking-tighter top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] text-[14vw] font-semibold'>Foostahh*</motion.h1>
        <h1 className=' absolute leading-none tracking-tighter bottom-2 left-1/2 -translate-x-[50%] -translate-y-[90%]  text-zinc-500 md:text-sm text-[0.7em] w-full text-center'>Footwear website based on Nothing</h1>
    </div>
  )
}

export default Hero
