import React, { useEffect } from 'react'
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


function Register() {
    // const {id} = useParams();
    

  const URL = import.meta.env.VITE_OPEN_URL;
    var [name, setName] = useState('');
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [passwordConf, setPasswordConf] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    var [succMessage, setsuccMessage] = useState('');
    var [mobile, setMobile] = useState('');
    var [role, setRole] = useState('user');

    var navigate = useNavigate();
    // useEffect(()=>{
    //     setRole(id);
    //     console.log(role);
    // }),[];
    
    

    function registerUser(){
        // setErrorMessage('Password and Confirm Password do not match')

        var user = {
            name: name,
            email: email,
            password: password,
            confirmPassword: passwordConf,
            mobile: mobile,
            role:role,
        }
        
        axios.post(`${URL}/user/register`,user)
        .then(response=>{
            setErrorMessage('');
            setsuccMessage(response.data.message);
             setTimeout(() => navigate('/login'), 2000);
            // console.log("response::",response)
        }).catch(error=>{
            if(error.response?.data?.message){
                setErrorMessage(error.response.data.message);
            }else{
                setErrorMessage('Failed to connect to api');
            }
        })
    }




  return (
    <div className=' relative h-screen w-full bg-zinc-800'>
    <div className='absolute  p-5 flex flex-col  justify-center top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] w-[90%] sm:w-[25em] bg-zinc-700 rounded-md'>
    <h1 className=' absolute -top-15 left-0 text-[3em] font-bold  text-lime-500'>Register</h1>
    {errorMessage && <p className='  text-red-500 text-sm tracking-tight'>{errorMessage}</p>}
    {succMessage && <p className='  text-lime-500 text-sm tracking-tight'>{succMessage}</p>}
    <label htmlFor="text" className='text-zinc-200 font-base '>Name</label>

    <input id='text' name='text' type="text" className='outline-none border-1 text-zinc-300 p-2 rounded'value={name}
                        onInput={(event)=>setName(event.target.value)} />
    <label htmlFor="email" className='text-zinc-200 font-base mt-3'>Email</label> 

    <input id='email' name='email' type="email" className='outline-none border-1 text-zinc-300 p-2 rounded' value={email}
                        onInput={(event)=>setEmail(event.target.value)}/>
    <label htmlFor="mobile" className='text-zinc-200 font-base mt-3'>Mobile</label>
    <input type="text" max="10" name='mobile' id='mobile' className='outline-none border-1 text-zinc-300 p-2 rounded'value={mobile}
                        onInput={(event)=>setMobile(event.target.value)} />
    

    <label htmlFor="password" className='text-zinc-200 font-base mt-3'>Password</label>

    <input type="password" name='password' id='password' className='outline-none border-1 text-zinc-300 p-2 rounded'value={password}
                        onInput={(event)=>setPassword(event.target.value)} />
    <label htmlFor="confirmpassword" className='text-zinc-200 font-base mt-3'>Confirm Password</label>

    <input type="password" name='confirmpassword' id='confirmpassword' className='outline-none border-1 text-zinc-300 p-2 rounded'value={passwordConf}
                        onInput={(event)=>setPasswordConf(event.target.value)} />
{/*     
    <label htmlFor="address" className='text-zinc-200 font-base mt-3'>Address</label>
    <textarea name="address"   id="address" className='outline-none border-1 text-zinc-300 p-2 rounded '></textarea> */}
   
    <button className='w-full p-3 text-white bg-lime-500 mt-3 rounded hover:bg-lime-700 ease-in duration-[0.2s]'onClick={registerUser}>Submit</button>
   
    </div>

  </div>
  )
}

export default Register
