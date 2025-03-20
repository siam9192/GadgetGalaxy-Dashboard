import React, { useContext } from "react";
import AddVariantPopup from "../../ui/AddVariantPopup";
import { AddProductContext } from "../../../pages/AddProduct";
import { TbCurrencyTaka } from "react-icons/tb";
import { IoTrashOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { EditProductContext } from "../../../pages/EditProduct";
import { TAddVariant } from "../../../types/product.type";
const EditVariants = () => {
  const context = useContext(EditProductContext);
  const variants = (context?.data.variants || []).filter(
    (_) => _.isDeleted === undefined || _.isDeleted === false,
  );

  // Throw an error on context not found
  if (!context) throw new Error();
  const removeVariant = (index: number) => {
    const updatedVariants = variants
      ?.map((_, idx) => {
        if (idx !== index) return _;
        if (!_.id) return undefined;
        _.isDeleted = true;
        return _;
      })
      .filter((_) => typeof _ !== "undefined");
    context.updateData({ ...context.data, variants: updatedVariants } as any);
  };

  const handelOnAdd = (variant: TAddVariant) => {
    context.updateData({ ...context.data, variants: [...variants, variant] } as any);
  };
  return (
    <div className="mt-5 dark:bg-dark-secondary bg-white p-5 rounded-lg">
      <h3 className="dark:text-dark-text-primary font-medium text-xl">Variant</h3>
      <div className="p-3 mt-3  border-2 dark:border-white/20 border-gray-700/20 rounded-lg    ">
        <div className=" space-y-2">
          <div className="w-full p-3  border-2 dark:border-white/10 border-gray-600/20  rounded-lg focus:outline-2 outline-primary focus:border-none  dark:text-white/80 flex items-center justify-between">
            <p>Product variants</p>
            <AddVariantPopup onAdd={handelOnAdd} currentVariants={context.data.variants} />
          </div>
        </div>
        <div className="mt-4  grid grid-cols-1 gap-3">
          <div className="flex gap-2 justify-end items-center">
            <h4 className="text-lg dark:text-dark-text-primary font-medium">Variants</h4>
            <div className="size-6 rounded-full bg-primary flex justify-center items-center text-white  font-primary">
              5
            </div>
          </div>
          {variants?.map((variant, index) => (
            <div
              key={index}
              className="p-3  border-2 dark:border-white/15 border-blue-100  rounded-lg"
            >
              <div className="flex items-center gap-2 ">
                <div
                  className="size-5 rounded-full outline-1 outline-offset-2 outline-secondary"
                  style={{ backgroundColor: variant.colorCode }}
                ></div>
                <h3 className="text-lg font-medium dark:text-dark-text-primary">
                  {variant.colorName}
                </h3>
              </div>
              <p className="mt-2 dark:text-dark-text-primary text-sm">
                Storage:128GB||RAM:GB||Origin:China
              </p>
              <div className="mt-3 flex items-center flex-wrap gap-4">
                <h4 className="text-primary font-medium">
                  <span className="dark:text-dark-text-primary text-gray-800">
                    Price:
                    <span>
                      <TbCurrencyTaka className="inline text-xl " />{" "}
                    </span>
                  </span>{" "}
                  {variant.price}
                </h4>
                <h4 className="text-primary font-medium">
                  <span className="dark:text-dark-text-primary text-gray-800">
                    Offer price:
                    <span>
                      <TbCurrencyTaka className="inline text-xl" />{" "}
                    </span>
                  </span>{" "}
                  {variant.offerPrice || "N/A"}
                </h4>
                <h4 className="text-primary font-medium">
                  <span className="dark:text-dark-text-primary text-gray-800">Quantity:</span>{" "}
                  {variant.availableQuantity}
                </h4>
                <h4 className="text-primary font-medium">
                  <span className="dark:text-dark-text-primary text-gray-800">SKU:</span>{" "}
                  {variant.sku}
                </h4>
              </div>
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => removeVariant(index)}
                  className="text-xl p-2 bg-red-100 rounded-full"
                >
                  <IoTrashOutline />
                </button>
                <button className="text-xl p-2 bg-blue-100 rounded-full">
                  <MdOutlineEdit />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditVariants;
