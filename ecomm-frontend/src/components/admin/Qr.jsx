import React from "react";

import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

function Qr() {
    const {id} = useParams()
    
    const [Product,SetProduct] = useState({})
    const [data,SetData] = useState({})
    useEffect(()=>{
        axios.get('http://localhost:3000/admin/v2/productqr/'+id)
        .then(response=>{
            SetProduct(response.data.qrdata)
            SetData(response.data.product)
        })
    },[]);
    console.log(Product)
    return (
       <div className="bg-zinc-600 w-full h-screen flex  flex-col justify-center">
                <h1 className="text-center md:text-[2em] text-[0.8em] font-semibold text-zinc-300 m-3"> QRcode of the Product : <span className="text-lime-400">{data.brand} {data.category} {data.model} </span> </h1>
               <img src={Product} alt="image of product" className=' rounded object-cover  w-100 h-100 mx-auto'/>
            </div>
    )
}

export default Qr
