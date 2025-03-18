import React from 'react'
import AddVariantPopup from '../../ui/AddVariantPopup'

const AddVariant = () => {
  return (
    <div className="mt-5 dark:bg-dark-secondary bg-white p-5 rounded-lg">
            <h3 className="dark:text-dark-text-primary font-medium text-xl">Variant</h3>
            <div className="p-3 mt-3  border-2 border-white/20 rounded-lg    ">
              <div className=" space-y-2">
                <div className="w-full p-3  border-2 dark:border-white/10 border-gray-600/20  rounded-lg focus:outline-2 outline-primary focus:border-none  dark:text-white/80 flex items-center justify-between">
                  <p>Product variants</p>
               <AddVariantPopup/>
                </div>
              </div>
            </div>
          </div>
  )
}

export default AddVariant