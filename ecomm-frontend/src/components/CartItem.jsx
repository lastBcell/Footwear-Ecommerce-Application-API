import React from 'react'
import { useState } from 'react'

function CartItem({data}) {

const [Price,SetPrice] = useState(data.productId.price)
const [Quant,SetQuant] = useState(data.quantity)
const [total,Settotal] = useState(Price*Quant)

  return (
    <div>
      <div className='relative w-full flex flex-row justify-between  bg-zinc-700 rounded p-2 text-zinc-400'>
      <div className=" py-1">
        <p className="">{data.productId.brand}</p>
        <p className="">{data.productId.model}</p>
        <p className="">{data.productId.category}</p>
        <p className="">price:{data.productId.price}Rs</p>
        <p className="">Size:{data.productId.size}</p>
        <p className="">Quantity:{data.quantity}</p>
        <p className="text-lime-500">Total:{total}</p>
      </div>

        <div className='flex flex-col justify-end p-1'>
        {/* <button  className='p-1 text-white bg-red-500 mt-3 rounded hover:bg-red-700 ease-in duration-[0.2s]' >remove</button> */}
        <button  className='p-1 border-2 text-red-400 border-red-400 rounded hover:bg-red-700 hover:text-white hover:border-red-700 ease-in duration-[0.2s]' >Remove</button>


        </div>


      </div>
        
      {/* {console.log("props",data)}
      {console.log("tt",total)} */}
      
      
    </div>
  )
}

export default CartItem
