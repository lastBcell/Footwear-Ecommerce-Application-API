import React, { useState,useEffect } from 'react'
import logo from "../assets/alt-mage.png"
import download from "../assets/download.png"
import { CiCoinInsert } from "react-icons/ci";
import { useParams } from 'react-router-dom';
import axios from "axios"

function ProductDetail() {

    const {id} = useParams()
    
    const [Product,SetProduct] = useState({})
    useEffect(()=>{
        axios.get('https://footwear-ecommerce-application-api.onrender.com/user/product/'+id)
        .then(response=>{
            SetProduct(response.data.product)
        })
    },[id]);
    // const {products} =data;
//    console.log(Product.model)




    return (
        <div className='relative w-full flex justify-center  h-screen bg-zinc-800 '>
          
             
            <main className='flex flex-col md:flex-row absolute w-[80vw] translate-y-20 h-[80vh]  bg-zinc-700 rounded-md'>
            <h1 className=" absolute -top-15 left-0 text-[2em] md:text-[3em] font-bold  text-lime-500">
            Product Info
          </h1>
                <div className='relative w-full h-full bg-zinc-700 rounded   '>
                    <img src={download} alt="image of product" className='rounded-l  object-cover  w-full h-full  '/>
                </div>
                <div className='rounded-r md:px-10 p-3 md:pt-10 gap-3 relative w-full h-full bg-zinc-600 flex flex-col text-zinc-300'>
                    <h1 className=' font-semibold text-2xl md:text-5xl md:my-15 my-2 '>{Product.model}</h1>
                   
                    <h1 className=' font-semibold text-xl md:text-3xl'>{Product.brand} <span className='text-xl'>{Product.category}</span> </h1>
                    <p className='text-xl md:text-3xl'>size:{Product.size}</p>
               
                   
                    <span className='flex flex-row '>  <p className=' font-semibold md:py-3 text-3xl md:text-6xl inline-block'>{Product.price} </p> <CiCoinInsert className='inline-block invisible md:visible' size={"5em"} /></span>
                    

                <button className='absolute left-3 right-3 bottom-4  p-3 text-white bg-lime-500 mt-3 rounded hover:bg-lime-700 ease-in duration-[0.2s]'>Add to Cart</button>
                </div>


            </main>

        </div>
    )
}

export default ProductDetail
