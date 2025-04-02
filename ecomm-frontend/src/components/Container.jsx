import axios from "axios";
import React from 'react'
import Card from './Cards'
import { useEffect, useState } from "react";


const Container = () => {
  var [posts, setPosts]=useState([]);
  function fetchPosts(){
    axios.get('http://localhost:3000/user/showallproducts')
    .then(response=>{
        setPosts( response.data.products)
        // console.log(posts)
    })
  }
  useEffect(()=>{
    fetchPosts()
},[])
useEffect(() => {
  // console.log(posts); // This will log whenever posts are updated
}, [posts]);
  return (
    <div className="pt-[25%] sm:pt-[8em] grid grid-cols-2 gap-1 sm:flex sm:gap-1 sm:flex-wrap sm:flex-row p-5 w-full min-h-screen h-full bg-zinc-800 ">
     { posts.map((item,index)=>(
                <Card data={item} key={index} />
                ))}
    
  
  
  </div>
  )
}

export default Container
