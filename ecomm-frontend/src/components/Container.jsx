import axios from "axios";
import React from 'react'
import Card from './Cards'
import { useEffect, useState } from "react";


const Container = () => {
  var [posts, setPosts]=useState([]);
  function fetchPosts(){
    axios.get('https://footwear-ecommerce-application-api.onrender.com/user/showallproducts')
    // https://footwear-ecommerce-application-api.onrender.com/
    .then(response=>{
        setPosts( response.data.products)
        // console.log(posts)
    })
  }
  useEffect(()=>{
    fetchPosts()
},[])

  return (
    <div className="relative pt-[25%] sm:pt-[8em] grid grid-cols-2 gap-1 sm:flex sm:gap-1 sm:flex-wrap sm:flex-row p-5 w-full min-h-screen h-full bg-zinc-800 ">
     { posts.map((item,index)=>(
                <Card data={item} key={index} />
                ))}
    
     {posts.length == 0 && <h1 className='absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] font-semibold text-[14vw] leading-none tracking-tighter text-zinc-900'>Loading...</h1>}
     {/* {console.log(posts.length)}  */}
  
  </div>
  )
}

export default Container
