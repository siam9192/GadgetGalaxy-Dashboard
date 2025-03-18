import React from 'react'

const AddVariantForm = () => {
  return (
   <form>

<div>  <h1 className='text-2xl  dark:text-white text-black font-medium'>Add Product Variant</h1>
    <div className='mt-10'>
           {/* Inventory */}
  <div className="mt-5 dark:bg-dark-secondary bg-white p-5 rounded-lg">
    <h3 className="dark:text-dark-text-primary font-medium text-xl">Inventory</h3>
    <div className="p-3 mt-3  border-2 border-white/20 rounded-lg    grid grid-cols-2 gap-2">
      <div className=" space-y-2">
        <h6 className="dark:text-dark-text-primary">Quantity</h6>
        <input
          type="text"
          className="w-full p-2  border-2 dark:border-white/10 border-gray-600/20  rounded-lg focus:outline-2 outline-primary focus:border-none  dark:text-white/80"
        />
      </div>
      <div className=" space-y-2">
        <h6 className="dark:text-dark-text-primary">SKU</h6>
        <input
          type="text"
          className="w-full p-2  border-2 dark:border-white/10 border-gray-600/20  rounded-lg focus:outline-2 outline-primary focus:border-none  dark:text-white/80"
        />
      </div>
    </div>
  </div>
      {/* Pricing */}
      <div className="mt-5 dark:bg-dark-secondary bg-white p-5 rounded-lg">
    <h3 className="dark:text-dark-text-primary font-medium text-xl">Pricing</h3>
    <div className="p-3 mt-3  border-2 border-white/20 rounded-lg    grid grid-cols-2 gap-2">
      <div className=" space-y-2">
        <h6 className="dark:text-dark-text-primary">Price$</h6>
        <input
          type="number"
          className="w-full p-2  border-2 dark:border-white/10 border-gray-600/20  rounded-lg focus:outline-2 outline-primary focus:border-none  dark:text-white/80"
        />
      </div>
      <div className=" space-y-2">
        <h6 className="dark:text-dark-text-primary">Offer Price$</h6>
        <input
          type="number"
          className="w-full p-2  border-2 dark:border-white/10 border-gray-600/20  rounded-lg focus:outline-2 outline-primary focus:border-none  dark:text-white/80"
        />
      </div>
    </div>
  </div>
    </div></div>

   <div className='mt-5 flex items-center justify-end gap-2'>
   <button className='text-white font-medium px-6 py-2 bg-info rounded-lg'>
        Discard
    </button>
   <button className='text-white font-medium px-6 py-2 bg-primary rounded-lg'>
        Add
    </button>
   </div>
   </form>
  )
}

export default AddVariantForm