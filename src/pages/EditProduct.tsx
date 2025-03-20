import React, { createContext, useState } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import AddVariant from "../components/sections/Add-Product/AddVariant";
import { TAddProductData, TEditProductData } from "../types/product.type";
import { TFieldError } from "../types/util.type";
import { AddProductContext } from "./AddProduct";
import EditCategories from "../components/sections/Edit-Product/EditCategories";
import EditProductImages from "../components/sections/Edit-Product/EditProductImages";
import EditSpecifications from "../components/sections/Edit-Product/EditSpecifications";
import EditVariants from "../components/sections/Edit-Product/EditVariants";
import EditProductBrand from "../components/sections/Edit-Product/EditProductBrand";
import { validateEditProductData } from "../utils/function";

const defaultValue: TEditProductData = {
  name: "Wireless Earbuds",
  description: "High-quality noise-canceling wireless earbuds with long battery life.",
  warranty: "1 year",
  brand: null,
  categories: [{ id: 1, name: "Audio", hierarchyStr: "Electronics > Audio" }],
  availableQuantity: 100,
  sku: "WB12345",
  images: [
    {
      id: 3,
      url: "https://img.freepik.com/premium-photo/smartphone-balancing-with-pink-background_23-2150271746.jpg",
    },
    {
      id: 3,
      url: "https://img.freepik.com/premium-photo/smartphone-balancing-with-pink-background_23-2150271746.jpg",
    },
    {
      id: 3,
      url: "https://img.freepik.com/premium-photo/smartphone-balancing-with-pink-background_23-2150271746.jpg",
    },
  ], // Will be filled with uploaded image files
  specifications: [
    { id: 3, name: "Battery Life", value: "24 hours" },
    { id: 34, name: "Bluetooth Version", value: "5.3" },
  ],

  variants: [
    {
      id: 2,
      colorName: "Black",
      colorCode: "#000000",
      availableQuantity: 50,
      sku: "WB12345-BLK",
      attributes: [{ name: "Size", value: "Standard" }],
      price: 99.99,
      offerPrice: 79.99,
    },
  ],
  price: 99.99,
  offerPrice: 79.99,
};

export const EditProductContext = createContext<{
  data: TEditProductData;
  updateData: (data: TAddProductData) => void;
  updateFieldValue: (name: keyof TAddProductData, value: any) => void;
} | null>(null);

const EditProduct = () => {
  const [data, setData] = useState<TEditProductData>(defaultValue);
  const [fieldErrors, setFieldErrors] = useState<TFieldError>({});

  const updateFieldValue = (name: keyof TAddProductData, value: any) => {
    const temp: any = data;
    temp[name] = value;
    setData(temp);
  };

  const handelSubmit = () => {
    setFieldErrors({});
    // Validation
    const validationErrors = validateEditProductData(data)
    if(Object.keys(validationErrors).length){
      setFieldErrors(validationErrors);
    }
  };
  const defaultValues = defaultValue;

  return (
    <EditProductContext.Provider value={{ data, updateData: setData, updateFieldValue }}>
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
                    defaultValue={defaultValues.name}
                    onChange={(e) => updateFieldValue("name", e.target.value)}
                    className="w-full p-2  border-2 dark:border-white/10 border-gray-600/20  rounded-lg focus:outline-2 outline-primary focus:border-none  dark:text-white/80"
                  />
                </div>
                <div className=" space-y-2">
                  <h6 className="dark:text-dark-text-primary">Description</h6>
                  <textarea
                    defaultValue={defaultValues.description}
                    onChange={(e) => updateFieldValue("description", e.target.value)}
                    placeholder="Write something about product.."
                    className="w-full p-2 dark:text-white/75  border-2 dark:border-white/10 border-gray-600/20 rounded-lg focus:outline-2 outline-primary focus:border-none  h-60 resize-none"
                  />
                </div>
                <div className=" space-y-2">
                  <h6 className="dark:text-dark-text-primary">Warranty</h6>
                  <textarea
                    defaultValue={defaultValues.warranty}
                    onChange={(e) => updateFieldValue("warranty", e.target.value)}
                    placeholder="Write something about product warranty.."
                    className="w-full p-2 dark:text-white/75  border-2 dark:border-white/10 border-gray-600/20 rounded-lg focus:outline-2 outline-primary focus:border-none  h-60 resize-none"
                  />
                </div>
              </div>
            </div>
            {/* Add Brand */}
            <EditProductBrand />
            {/* Add Category */}
            <EditCategories />
            {/* Inventory */}
            <div className="mt-5 dark:bg-dark-secondary bg-white p-5 rounded-lg">
              <h3 className="dark:text-dark-text-primary font-medium text-xl">Inventory</h3>
              <div className="p-3 mt-3  border-2 border-white/20 rounded-lg    grid grid-cols-2 gap-2">
                <div className=" space-y-2">
                  <h6 className="dark:text-dark-text-primary">Quantity</h6>
                  <input
                    type="number"
                    defaultValue={defaultValues.availableQuantity!}
                    onChange={(e) =>
                      updateFieldValue("availableQuantity", parseInt(e.target.value))
                    }
                    className="w-full p-2  border-2 dark:border-white/10 border-gray-600/20  rounded-lg focus:outline-2 outline-primary focus:border-none  dark:text-white/80"
                  />
                </div>
                <div className=" space-y-2">
                  <h6 className="dark:text-dark-text-primary">SKU</h6>
                  <input
                    type="text"
                    defaultValue={defaultValues.sku!}
                    onChange={(e) => updateFieldValue("sku", e.target.value)}
                    className="w-full p-2  border-2 dark:border-white/10 border-gray-600/20  rounded-lg focus:outline-2 outline-primary focus:border-none  dark:text-white/80"
                  />
                </div>
              </div>
            </div>
            {/* Add specification */}
            <EditSpecifications />
            {/* Add Variant */}
            <EditVariants />
          </div>
          <div>
            <EditProductImages />
            {/* Pricing */}
            <div className="mt-5 dark:bg-dark-secondary bg-white p-5 rounded-lg">
              <h3 className="dark:text-dark-text-primary font-medium text-xl">Pricing</h3>
              <div className="p-3 mt-3  border-2 border-white/20 rounded-lg    grid grid-cols-2 gap-2">
                <div className=" space-y-2">
                  <h6 className="dark:text-dark-text-primary">Price$</h6>
                  <input
                    type="number"
                    onChange={(e) => updateFieldValue("price", parseInt(e.target.value))}
                    className="w-full p-2  border-2 dark:border-white/10 border-gray-600/20  rounded-lg focus:outline-2 outline-primary focus:border-none  dark:text-white/80"
                  />
                </div>
                <div className=" space-y-2">
                  <h6 className="dark:text-dark-text-primary">Offer Price$</h6>

                  <input
                    type="number"
                    onChange={(e) => updateFieldValue("offerPrice", parseInt(e.target.value))}
                    className="w-full p-2  border-2 dark:border-white/10 border-gray-600/20  rounded-lg focus:outline-2 outline-primary focus:border-none  dark:text-white/80"
                  />
                </div>
              </div>
            </div>
            {Object.keys(fieldErrors).length ? (
              <div className="mt-5 dark:bg-dark-secondary bg-white p-5 rounded-lg ">
                {Object.entries(fieldErrors).map(([key, value], index) => (
                  <p key={index} className="text-info font-medium md:text-[1rem] text-sm">
                    {value}
                  </p>
                ))}
              </div>
            ) : null}
            <div className="mt-8 flex justify-between items-center">
              <div>
                <button className="px-6 py-3 bg-white dark:bg-dark-secondary dark:text-white  rounded-md shadow">
                  Discard
                </button>
              </div>
              <div className="flex items-center justify-end gap-2">
                {/* <button className="px-6 py-3 bg-blue-100 text-primary font-medium  rounded-md ">
                  Schedule
                </button> */}
                <button
                  onClick={handelSubmit}
                  // disabled={Object.keys(validateProductData(data)).length>0}
                  className="px-6 py-3  bg-primary disabled:bg-blue-100 disabled:text-primary text-white font-medium  rounded-md "
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </EditProductContext.Provider>
  );
};

export default EditProduct;
