import React from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { RiImageAiFill } from "react-icons/ri";
import AddProductImages from "../components/sections/Add-Product/AddProductImages";
import AddSpecification from "../components/sections/Add-Product/AddSpecification";
import AddVariant from "../components/sections/Add-Product/AddVariant";
const AddProduct = () => {
  return (
    <div>
      <div className="flex items-center gap-4 dark:bg-transparent bg-white p-5">
        <button className="text-xl text-primary px-2 py-4  dark:bg-dark-secondary bg-white rounded-lg">
          <HiArrowLongLeft />
        </button>
        <div>
          <p className="dark:text-dark-text-primary text-gray-600">Back to product list</p>
          <h1 className="mt-1 text-xl dark:text-white text-black font-medium">Add New Product</h1>
        </div>
      </div>
      <div className="lg:mt-10 mt-7 grid lg:grid-cols-2 grid-cols-1 gap-10 ">
        <div>
          <div className="dark:bg-dark-secondary bg-white p-5 rounded-lg">
            <h3 className="dark:text-dark-text-primary font-medium text-xl">Description</h3>
            <div className="p-3 mt-3  border-2 border-white/20 rounded-lg    space-y-3">
              <div className=" space-y-2">
                <h6 className="dark:text-dark-text-primary">Product Name</h6>
                <input
                  type="text"
                  className="w-full p-2  border-2 dark:border-white/10 border-gray-600/20  rounded-lg focus:outline-2 outline-primary focus:border-none  dark:text-white/80"
                />
              </div>
              <div className=" space-y-2">
                <h6 className="dark:text-dark-text-primary">Description</h6>
                <textarea
                  placeholder="Write something about product.."
                  className="w-full p-2 text-white/75  border-2 dark:border-white/10 border-gray-600/20 rounded-lg focus:outline-2 outline-primary focus:border-none  h-60 resize-none"
                />
              </div>
            </div>
          </div>
          {/* Add Category */}
          <div className="mt-5 dark:bg-dark-secondary bg-white p-5 rounded-lg">
            <h3 className="dark:text-dark-text-primary font-medium text-xl">Category</h3>
            <div className="p-3 mt-3  border-2 border-white/20 rounded-lg    space-y-3">
              <div className=" space-y-2">
                <h6 className="dark:text-dark-text-primary">Product Category-1</h6>
                <input
                  type="text"
                  className="w-full p-2  border-2 dark:border-white/10 border-gray-600/20  rounded-lg focus:outline-2 outline-primary focus:border-none  dark:text-white/80"
                />
              </div>
              <div className=" space-y-2">
                <h6 className="dark:text-dark-text-primary">Product Category-2</h6>
                <input
                  type="text"
                  className="w-full p-2  border-2 dark:border-white/10 border-gray-600/20  rounded-lg focus:outline-2 outline-primary focus:border-none  dark:text-white/80"
                />
              </div>
              <div className=" space-y-2">
                <h6 className="dark:text-dark-text-primary">Product Category-3</h6>
                <input
                  type="text"
                  className="w-full p-2  border-2 dark:border-white/10 border-gray-600/20  rounded-lg focus:outline-2 outline-primary focus:border-none  dark:text-white/80"
                />
              </div>
              <div className="text-end">
                <button className="text-primary font-medium">Add More</button>
              </div>
            </div>
          </div>
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
          {/* Add specification */}
 <AddSpecification/>
 {/* Add Variant */}
        <AddVariant/>
        </div>
        <div>
          <AddProductImages />
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
          <div className="mt-8 flex justify-between items-center">
            <div>
              <button className="px-6 py-3 bg-white dark:bg-dark-secondary dark:text-white  rounded-md shadow">
                Discard
              </button>
            </div>
            <div className="flex items-center justify-end gap-2">
              <button className="px-6 py-3 bg-blue-100 text-primary font-medium  rounded-md ">
                Schedule
              </button>
              <button className="px-6 py-3  bg-primary text-white font-medium  rounded-md ">
                Add Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
