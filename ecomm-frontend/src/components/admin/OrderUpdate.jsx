import React from "react";
// import logo from "../assets/alt-mage.png"
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';


const OrderUpdate = () => {



  const {id} = useParams()
    
  const [Product,SetProduct] = useState({})
  const [User,SetUser] = useState({})
  const [data,Setdata] = useState({})
  useEffect(()=>{
      axios.get('http://localhost:3000/admin/getorder/'+id)
      .then(response=>{
          SetProduct(response.data.products[0])
          SetUser(response.data.user)
          Setdata(response.data)
      })
  },[id]);
  // console.log(User)
  // console.log(Product)
  // console.log(data)


  return (
    <div className=" relative h-screen  w-full  bg-zinc-800">
      <div className="  flex flex-row justify-center gap-2 translate-y-20  bg-zinc-800 ">
        <div className="relative  p-5 flex  flex-col justify-center w-[90%] sm:w-[25em] bg-zinc-700 rounded-md">
          <h1 className=" absolute -top-15 left-0 text-[3em] font-bold  text-lime-500">
            Order Update
          </h1>
          <label htmlFor="brand" className="text-zinc-200 font-base ">
            username
          </label>

          <input
            id="username"
            name="username"
            type="text"
            className="outline-none border-1 text-zinc-300 p-2 rounded"
            value={User.name}
          />
          <label htmlFor="category" className="text-zinc-200 font-base mt-3">
          Email
          </label>

          <input
            id="Email"
            name="Email"
            type="email"
            className="outline-none border-1 text-zinc-300 p-2 rounded"
            value={User.email}
          />
          <label htmlFor="Size" className="text-zinc-200 font-base mt-3">
          Product ID
          </label>

          <input
            type="text"
            name="Product ID"
            id="Product ID"
            className="outline-none border-1 text-zinc-300 p-2 rounded"
            value={Product._id}
          />
          {/* <label htmlFor="Model" className="text-zinc-200 font-base mt-3">
          Price
          </label>

          <input
            type="text"
            name="Price"
            id="Price"
            className="outline-none border-1 text-zinc-300 p-2 rounded"
            // value={Product.product.price}

          /> */}

          <label htmlFor="Price" className="text-zinc-200 font-base mt-3">
          Quantity
          </label>
          <input
            type="text"
            name="Quantity"
            id="Quantity"
            className="outline-none border-1 text-zinc-300 p-2 rounded"
            value={Product.quantity}

          />

<label htmlFor="Price" className="text-zinc-200 font-base mt-3">
Total Amount
          </label>
          <input
            type="text"
            name="Total Amount"
            id="Total Amount"
            className="outline-none border-1 text-zinc-300 p-2 rounded"
            value={data.totalAmount}

          />
           <label htmlFor="status" className="text-zinc-200 font-base mt-3">
           Status
          </label>
          {/* <input
            type="text"
            name="Status"
            id="Status"
            className="outline-none border-1 text-zinc-300 p-2 rounded"
            value={data.status}

          /> */}
          <select name="status" id="status"  className="text-zinc-200 font-base mt-3 py-3 border-1 ">
           
              <option className="" value={data.status}>{data.status}</option>
            <option value="completed">Completed</option>
            <option value="dispached">Dispached</option>
            <option value="pending">Pending</option> 

          </select>
     
          <button className="w-full p-3 text-white bg-lime-500 mt-3 rounded hover:bg-lime-700 ease-in duration-[0.2s]">
            Submit
          </button>


        </div>

        {/* #second part */}
    
      </div>
    </div>
  );
};

export default OrderUpdate;

