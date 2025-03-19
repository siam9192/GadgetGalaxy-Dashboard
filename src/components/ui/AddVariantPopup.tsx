import React, { useContext, useState } from "react";
import AddVariantForm from "../forms/AddVariantForm";
import { AddProductContext } from "../../pages/AddProduct";
import { TAddVariant } from "../../types/product.type";

const AddVariantPopup = () => {
  const [isOpen, setIOpen] = useState(false);
  const context = useContext(AddProductContext)
  const handelOnAdd = (variant:TAddVariant)=>{
  if(!context) return
  const {data,updateData} = context
   updateData({...data,variants:[...data.variants,variant]})
   setIOpen(false)
  }

 
  return (
    <>
      <button onClick={() => setIOpen(true)} className="text-primary  font-medium">
        + Add variant
      </button>
      {isOpen ? (
        <div
          onClick={() => setIOpen(false)}
          className="fixed inset-0 w-full h-full dark:bg-white/10 bg-gray-900/25 z-50 flex justify-center items-center "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="dark:bg-dark-primary  bg-white lg:p-10 p-5 lg:w-1/2 md:w-10/12 w-[90%] max-h-[90vh] overflow-y-auto no-scrollbar  rounded-lg"
          >
            <AddVariantForm onAdd={handelOnAdd} onDiscard={() => setIOpen(false)} />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AddVariantPopup;
