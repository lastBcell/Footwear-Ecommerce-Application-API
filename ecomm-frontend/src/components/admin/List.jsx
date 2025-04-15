import React from 'react'
import AdminNavbar from './AdminNavbar'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




function List() {

  const navigate = useNavigate()
  
  var [products, setPosts]=useState([]);
  function fetchPosts(){
    axios.get('http://localhost:3000/admin/allproducts')
    .then(response=>{
        setPosts( response.data.products)
        // console.log(posts)
    })
  }
  useEffect(()=>{
    fetchPosts()
},[])

function GotoUpdate(id){
  navigate(`AdminProductDetails/${id}`)
}
function GetQr(id){
  navigate(`getqr/${id}`)
}
 
  return (
    
    <>
    <div className="  w-full h-screen bg-zinc-800 ">
      <AdminNavbar />
       <div className="pt-25 overflow-x-auto  text-zinc-300 p-2">
      <table className="min-w-full text-center  ">
        <thead>
          <tr className="bg-zinc-700 text-zinc-300 ">
            <th className="p-4">Brand</th>
            <th className="p-4">Category</th>
            <th className="p-4">Model</th>
            <th className="p-4">Size</th>
            <th className="p-4">Price</th>
            <th className="p-4">Stock</th>
            <th className="p-4">Status</th>
            <th className="p-4">Image</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-t">
              <td className="p-4">{product.brand}</td>
              <td className="p-4">{product.category}</td>
              <td className="p-4">{product.model}</td>
              <td className="p-4">{product.size}</td>
              <td className="p-4">Rs{product.price}</td>
              <td className="p-4">{product.stock}</td>
              <td className="p-4">{product.status}</td>
              <td className="p-4"><img src={product.image} alt={product.model} className="h-16 w-16 object-cover rounded" /></td>
              <td className=" space-x-2">
               
                <button onClick={() => GotoUpdate(product._id)} className=' p-3  text-white bg-yellow-500 mt-3 rounded hover:bg-yellow-700 ease-in duration-[0.2s]'>Update</button>
                <button onClick={() => GetQr(product._id)} className='p-3 text-white bg-teal-500 mt-3 rounded hover:bg-teal-700 ease-in duration-[0.2s]'>QRcode</button>
                <button  className='p-3 text-white bg-red-500 mt-3 rounded hover:bg-red-700 ease-in duration-[0.2s]' >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
       
    </div> 
  </>
  )
}

export default List
