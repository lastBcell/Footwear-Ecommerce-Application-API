import React from 'react'

const login = () => {
  return (
    <div className=' relative h-screen w-full bg-zinc-800'>
      <div className='absolute  p-5 flex flex-col  justify-center top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] w-[90%] sm:w-[25em] bg-zinc-700 rounded-md'>
      <h1 className=' absolute -top-15 left-0 text-[3em] font-bold  text-lime-500'>Login</h1>
      <label htmlFor="email" className='text-zinc-200 font-semibold '>Email</label>
      <input id='email' name='email' type="email" className='outline-none border-2 text-zinc-300 p-2 rounded' />
    <label htmlFor="password" className='text-zinc-200 font-semibold mt-3'>Password</label>
    <input type="password" name='password' id='password' className='outline-none border-2 text-zinc-300 p-2 rounded' />
    <button className='w-full p-3 text-white bg-lime-500 mt-3 rounded hover:bg-lime-700 ease-in duration-[0.2s]'>Login</button>
    


      </div>
    </div>
  )
}

export default login
