import React from "react";
import Navbar from "./Navbar";
import CartItem from "./CartItem";
import { useState, useEffect } from "react";
import axios from "axios";

const Cart = () => {
  var [Cart, SetCart] = useState([]);
  const id = "67b6f43c122ac9053122b457";
  function fetchCart() {
    axios
      .get(`http://localhost:3000/user/getcart/${id}`)
      .then((response) => {
        SetCart(response.data);
      });
  }
  useEffect(() => {
    fetchCart();
  }, []);
  // console.log(Cart);
  return (
    <div className="relative w-full h-screen bg-zinc-800 text-zinc-900">
      <Navbar />

      <div className="absolute w-full min-h-[50%] flex  flex-col p-2 gap-2 top-20">
        {Cart.map((item, index) => (
          <CartItem data={item} key={index} />,
          <CartItem data={item} key={index} />
          
        ))}
         
      </div>
      
      

      <div className="absolute bottom-5 left-2 right-2  ">
        {Cart.length !=0 &&  <button className='w-full m-0 py-3 text-white bg-lime-500  rounded hover:bg-lime-700 ease-in duration-[0.2s]'>Buy Items</button> }
      </div>
    </div>
  );
};

export default Cart;
