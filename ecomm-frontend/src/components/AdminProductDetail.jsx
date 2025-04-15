import React from "react";
import logo from "../assets/alt-mage.png"
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const AdminProductDetail = () => {


  const {id} = useParams()
    
  const [Product,SetProduct] = useState({})
  useEffect(()=>{
      axios.get('http://localhost:3000/admin/Adminproduct/'+id)
      .then(response=>{
          SetProduct(response.data.product)
      })
  },[id]);
  // console.log(Product)

  return (
    <div className=" relative h-screen  w-full  bg-zinc-800">
      <div className="  flex flex-row justify-center gap-2 translate-y-20  bg-zinc-800 ">
        <div className="relative  p-5 flex  flex-col justify-center w-[90%] sm:w-[25em] bg-zinc-700 rounded-md">
          <h1 className=" absolute -top-15 left-0 text-[3em] font-bold  text-lime-500">
            Product Info
          </h1>
          <label htmlFor="brand" className="text-zinc-200 font-base ">
            Brand
          </label>

          <input
            id="brand"
            name="brand"
            type="text"
            className="outline-none border-1 text-zinc-300 p-2 rounded"
            value={Product.brand}
          />
          <label htmlFor="category" className="text-zinc-200 font-base mt-3">
            Category
          </label>

          <input
            id="category"
            name="category"
            type="text"
            className="outline-none border-1 text-zinc-300 p-2 rounded"
            value={Product.category}
          />
          <label htmlFor="Size" className="text-zinc-200 font-base mt-3">
            Size
          </label>

          <input
            type="text"
            name="Size"
            id="Size"
            className="outline-none border-1 text-zinc-300 p-2 rounded"
            value={Product.size}
          />
          <label htmlFor="Model" className="text-zinc-200 font-base mt-3">
            Model
          </label>

          <input
            type="text"
            name="Model"
            id="Model"
            className="outline-none border-1 text-zinc-300 p-2 rounded"
            value={Product.model}

          />

          <label htmlFor="Price" className="text-zinc-200 font-base mt-3">
            Price
          </label>
          <input
            type="text"
            name="Price"
            id="Price"
            className="outline-none border-1 text-zinc-300 p-2 rounded"
            value={Product.price}

          />
     
          <button className="w-full p-3 text-white bg-lime-500 mt-3 rounded hover:bg-lime-700 ease-in duration-[0.2s]">
            Submit
          </button>


        </div>

        {/* #second part */}
        <div className="relative  p-5 flex  flex-col justify-center w-[90%]  sm:w-[25em] bg-zinc-700 rounded-md">
        <label htmlFor="Stocks" className="text-zinc-200 font-base mt-3">
            Stocks
          </label>
          <input
            type="text"
            name="Stocks"
            id="Stocks"
            className="outline-none border-1 text-zinc-300 p-2 rounded"
            value={Product.stock}

          />

          <label htmlFor="Stocks" className="text-zinc-200 font-base mt-3">
            Status
          </label>
          {/* <input
            type="text"
            name="Status"
            id="Status"
            className="outline-none border-1 text-zinc-300 p-2 rounded"
            value={Product.status}

          /> */}
          <select name="status" id="status"  className="text-zinc-200 font-base  py-3 border-1 ">
           
           <option className="" value={Product.status}>{Product.status}</option>
         <option value="show">show</option>
         <option value="suspend">suspend</option>
         

       </select>

          
          <div>
         
            <img src={logo} alt="abc" className="w-full h-50 my-3  bg-zinc-600 text-zinc-300"  />
          </div>
           <div className="">

          <label className="  text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
          <input className=" w-full text-md p-2 rounded cursor-pointer text-gray-400 focus:outline-none bg-zinc-800 border-gray-600 placeholder-gray-400" id="file_input" type="file" />
           </div>

        </div>
      </div>
    </div>
  );
};

export default AdminProductDetail;

