import React from 'react'

function register() {
  return (
    <div className=' relative h-screen w-full bg-zinc-800'>
    <div className='absolute  p-5 flex flex-col  justify-center top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] w-[90%] sm:w-[25em] bg-zinc-700 rounded-md'>
    <h1 className=' absolute -top-15 left-0 text-[3em] font-bold  text-lime-500'>Register</h1>
    <label htmlFor="email" className='text-zinc-200 font-base '>Name</label>

    <input id='text' name='text' type="text" className='outline-none border-1 text-zinc-300 p-2 rounded' />
    <label htmlFor="email" className='text-zinc-200 font-base mt-3'>Email</label> 

    <input id='email' name='email' type="email" className='outline-none border-1 text-zinc-300 p-2 rounded' />
    <label htmlFor="password" className='text-zinc-200 font-base mt-3'>Password</label>

    <input type="password" name='password' id='password' className='outline-none border-1 text-zinc-300 p-2 rounded' />
    <label htmlFor="confirmpassword" className='text-zinc-200 font-base mt-3'>Confirm Password</label>

    <input type="password" name='confirmpassword' id='confirmpassword' className='outline-none border-1 text-zinc-300 p-2 rounded' />
    
    <label htmlFor="address" className='text-zinc-200 font-base mt-3'>Address</label>
    <textarea name="address"   id="address" className='outline-none border-1 text-zinc-300 p-2 rounded '></textarea>
   
    <button className='w-full p-3 text-white bg-lime-500 mt-3 rounded hover:bg-lime-700 ease-in duration-[0.2s]'>Submit</button>
   
    </div>

  </div>
  )
}

export default register
