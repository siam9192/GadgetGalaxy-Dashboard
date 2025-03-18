import React, { useState } from 'react'
import AddVariantForm from '../forms/AddVariantForm'

const AddVariantPopup = () => {
    const [isOpen,setIOpen] = useState(false)
  return (
    <>
      <button onClick={()=>setIOpen(true)} className="text-primary  font-medium">+ Add variant</button>
      {
        isOpen ? <div onClick={()=>setIOpen(false)} className='fixed inset-0 w-full h-full dark:bg-white/5 bg-gray-900/25 z-50 flex justify-center items-center'>
            <div onClick={(e)=>e.stopPropagation()} className='dark:bg-dark-primary  bg-white lg:p-10 p-5 lg:w-1/2 w-10/12  rounded-lg'>
          <AddVariantForm/>
            </div>
        </div>
        :
        null
      } 
    </>
  )
}

export default AddVariantPopup