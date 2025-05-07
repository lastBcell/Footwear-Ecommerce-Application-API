import React from 'react'
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser,setToken } from "../../store/authSlice";


const Login = () => {
    const URL = import.meta.env.VITE_OPEN_URL;
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    var [succMessage, setsuccMessage] = useState('');
    
    const dispatch = useDispatch();
    
    // var [isAdmin, setisAdmin] = useState("");

    var navigate = useNavigate()

        function attemptLogin() {
          const user = {
            email:email,
            password:password
          }
          // console.log(user)
        axios.post(`${URL}/user/login`,user).then(response=>{
            setErrorMessage('');
            setsuccMessage(response.data.message)
            
           


            const isAdmin = response.data.user.role
            const loginUser = response.data.user
            const token =  response.data.token
             dispatch(setUser(loginUser));
             dispatch(setToken(token));

             
              navigate('/')
            // console.log(res ponse.data.token)
            // console.log(response.data.user)
            // console.log("role is",isAdmin)
            
            if(isAdmin == "admin"){
              // console.log("yes it is admin")
              navigate('/lists')
            }
        }).catch(error=>{
            if(error.response?.data?.message){
                setErrorMessage(error.response.data.message)
                
            
            }else{
                setErrorMessage('Failed to login user. Please contact admin')
            }
        })
    }


  return (
    <div className=' relative h-screen w-full bg-zinc-800'>
      <div className='absolute  p-5 flex flex-col  justify-center top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] w-[90%] sm:w-[25em] bg-zinc-700 rounded-md'>
      <h1 className=' absolute -top-15 left-0 text-[3em] font-bold  text-lime-500'>Login</h1>
       {errorMessage && <p className='  text-red-500 text-sm tracking-tight'>{errorMessage}</p>}
        {succMessage && <p className='  text-lime-500 text-sm tracking-tight'>{succMessage}</p>}
      <label htmlFor="email" className='text-zinc-200 font-semibold '>Email</label>
      <input id='email' name='email' type="email" className='outline-none border-2 text-zinc-300 p-2 rounded' value={email}
                        onInput={(event)=>setEmail(event.target.value)} />
    <label htmlFor="password" className='text-zinc-200 font-semibold mt-3'>Password</label>
    <input type="password" name='password' id='password' className='outline-none border-2 text-zinc-300 p-2 rounded'  value={password}
                        onInput={(event)=>setPassword(event.target.value)}/>
    <button className='w-full p-3 text-white bg-lime-500 mt-3 rounded hover:bg-lime-700 ease-in duration-[0.2s]'  onClick={attemptLogin}>Login</button>
    


      </div>
    </div>
  )
}

export default Login
