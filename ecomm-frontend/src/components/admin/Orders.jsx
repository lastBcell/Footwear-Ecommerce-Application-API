import React from 'react'
import AdminNavbar from './AdminNavbar'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
function Orders() {
  const navigate = useNavigate()

     var [order, setPosts]=useState([]);
      function fetchPosts(){
        axios.get('http://localhost:3000/admin/allorders')
        .then(response=>{
            setPosts( response.data)
        })
      }
      useEffect(()=>{
        fetchPosts()
    },[])

    function gotoUpdate(id){
      
      navigate(`orderupdate/${id}`)
    }
    // console.log(order)


    return (
        <>
      <div className="w-full h-screen bg-zinc-800 ">
        <AdminNavbar />

        <div className="pt-25 overflow-x-auto  text-zinc-300 p-2">
      <table className="min-w-full text-center">
        <thead>
          <tr className="bg-zinc-700 text-zinc-300">
            <th className="p-4">User Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Product ID</th>
            <th className="p-4">Price</th>
            <th className="p-4">Quantity</th>
            <th className="p-4">Total Amount</th>
            <th className="p-4">Status</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {order.map((order) => (
            <tr key={order._id} className="border-t">
              <td className="p-4">{order.user.name}</td>
              <td className="p-4">{order.user.email}</td>
              <td className="p-4">{order.products[0].product._id}</td>
              <td className="p-4">${order.products[0].product.price}</td>
              <td className="p-4">{order.products[0].quantity}</td>
              <td className="p-4">${order.totalAmount}</td>
              <td className="p-4">{order.status}</td>
              <td className="p-4 space-x-2">
                 <button onClick={()=>{gotoUpdate(order._id)}}  className=' p-3  text-white bg-yellow-500 mt-3 rounded hover:bg-yellow-700 ease-in duration-[0.2s]'>Update</button>
                <button  className='p-3 text-white bg-red-500 mt-3 rounded hover:bg-red-700 ease-in duration-[0.2s]' >Delete</button>
                <button  className='p-3 text-white bg-zinc-500 mt-3 rounded hover:bg-zinc-700 ease-in duration-[0.2s]' >Details</button>
                
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

export default Orders
