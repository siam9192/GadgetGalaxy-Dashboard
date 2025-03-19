import React, { FormEvent, useEffect, useRef, useState } from "react";
import { TFieldError } from "../../types/util.type";
import { getFormValues } from "../../utils/function";
import { TAddVariant } from "../../types/product.type";

type TAttribute = {
  name: string;
  value: string;
};

interface IProps {
  onAdd: (data:TAddVariant) => void;
  onDiscard: () => void;
}

const AddVariantForm = ({ onAdd, onDiscard }: IProps) => {
  const [selectedColor, setSelectedColor] = useState<{ name: string; colorCode: string } | null>(
    null,
  );
  const [attributes, setAttributes] = useState<TAttribute[]>([]);
  const [attributeName, setAttributeName] = useState("");
  const [attributeValue, setAttributeValue] = useState("");
  const ref = useRef<HTMLFormElement>(null);
  const prevColors = [
    { name: "Red", colorCode: "#FF0000" },
    { name: "Blue", colorCode: "#0000FF" },
    { name: "Green", colorCode: "#008000" },
    { name: "Yellow", colorCode: "#FFFF00" },
    { name: "Purple", colorCode: "#800080" },
  ];
  const [error, setError] = useState<TFieldError>({});

  const handelAddAttribute = () => {
    setError({});
    const err: TFieldError = {};
    const values: TAttribute = { name: attributeName, value: attributeValue };
    if (!values.name.replace(" ", "").length) {
      err["att.name"] = "Name is empty";
    } else if (values.name.replace(" ", "").length > 12) {
      err["att.name"] = "Name can't be getter than 12 character";
    }

    if (!values.value.replace(" ", "").length) {
      err["att.value"] = "Value is empty";
    } else if (values.value.replace(" ", "").length > 12) {
      err["att.value"] = "Value can't be getter than 12 character";
    }
    if (Object.keys(err).length) return setError(err);
    setAttributes((prev) => [...prev, values]);
  };

  const handelRemove = (index: number) => {
    setAttributes((prev) => prev.filter((_, idx) => index !== idx));
  };

  const handleAddVariant = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    // Extract form values
    const values = getFormValues(form, [
      "inventory.sku",
      "inventory.availableQuantity",
      "pricing.price",
      "pricing.offerPrice",
      "color.name",
      "color.code",
    ]);

    console.log(values)

    // Validation logic
    let errors: Record<string, string> = {};

    if (
      !values["inventory.availableQuantity"] ||
      isNaN(Number(values["inventory.availableQuantity"])) ||
      Number(values["inventory.availableQuantity"]) < 0
    ) {
      errors["inventory.availableQuantity"] = "Quantity must be a valid non-negative number.";
    }

    if (
      !values["inventory.sku"] 
    ) {
      errors["inventory.sku"] = "sku is required minium 2 and max 10 character";
    }

    if (
      !values["pricing.price"] ||
      isNaN(Number(values["pricing.price"])) ||
      Number(values["pricing.price"]) <= 0
    ) {
      errors["pricing.price"] = "Price must be a valid positive number.";
    }

    if (
      values["pricing.offerPrice"] &&
      (isNaN(Number(values["pricing.offerPrice"])) || Number(values["pricing.offerPrice"]) < 0)
    ) {
      errors["pricing.offerPrice"] = "Offer price must be a valid non-negative number.";
    }

    if(Number( values["pricing.offerPrice"])> Number(values["pricing.price"]))  errors["pricing.offerPrice"] = "Offer price can not be getter than main price";
     
    if (!values["color.name"] || values["color.name"].trim() === "") {
      errors["color.name"] = "Color name is required.";
    }

    const hexColorPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (!values["color.code"] || !hexColorPattern.test(values["color.code"])) {
      errors["color.code"] = "Color code must be a valid hex code (e.g., #ff5733).";
    }

    if (Object.keys(errors).length > 0) {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      return setError(errors);
    }
    const data = {
        sku: values["inventory.sku"],
        availableQuantity: parseInt(values[ "inventory.availableQuantity"]),
        price:parseInt(values ["pricing.price"]),
        offerPrice:parseInt(values[ "inventory.offerPrice"]),
        colorName:values["color.name"],
        colorCode: values["color.code"],
        attributes
    }
   onAdd(data)
  };


  return (
    <form ref={ref} onSubmit={handleAddVariant}>
      <div>
        {" "}
        <h1 className="text-2xl  dark:text-white text-black font-medium">Add Product Variant</h1>
        <div className="mt-10">
          {/* Color */}
          <div className="mt-5 dark:bg-dark-secondary bg-white p-5 rounded-lg">
            <h3 className="dark:text-dark-text-primary font-medium text-xl">Color</h3>
            <div className="mt-2 flex items-center flex-wrap gap-2 select-none">
              {prevColors.map((_, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedColor(_);
                  }}
                  className={`flex items-center gap-2  px-4 py-2 rounded-full ${selectedColor?.name === _.name ? "dark:bg-dark-light bg-blue-100" : " dark:bg-dark-secondary"} hover:cursor-pointer`}
                >
                  <p className="tex-lg dark:text-dark-text-primary">{_.name}</p>
                  <div
                    className="size-5 rounded-full"
                    style={{ backgroundColor: _.colorCode }}
                  ></div>
                </div>
              ))}
            </div>
            <div className="p-3 mt-3  border-2 dark:border-white/20 border-gray-600/20 rounded-lg    grid grid-cols-2 gap-2">
              <div className=" space-y-2">
                <h6 className="dark:text-dark-text-primary">Color name</h6>
                <input
                  type="text"
                  name="color.name"
                  className="w-full p-2  border-2 dark:border-white/10 border-gray-600/20  rounded-lg focus:outline-2 outline-primary focus:border-none  dark:text-white/80"
                  defaultValue={selectedColor?.name}
                />
              </div>
              <div className=" space-y-2">
                <h6 className="dark:text-dark-text-primary">Chose color</h6>
                <input
                  type="color"
                  name="color.code"
                  className=" w-1/2  border-none outline-none  h-10 rounded-lg"
                  defaultValue={selectedColor?.colorCode}
                />
              </div>
            </div>
          </div>
          {/*Attributes */}
          <div className="mt-5 dark:bg-dark-secondary bg-white p-5 rounded-lg">
            <h3 className="dark:text-dark-text-primary font-medium text-xl">Attributes</h3>
            <div className="p-3 mt-3  border-2 dark:border-white/20 border-gray-600/20 rounded-lg    grid grid-cols-2 gap-2">
              <div className=" space-y-2">
                <h6 className="dark:text-dark-text-primary">Name</h6>
                <input
                  onChange={(e) => setAttributeName(e.target.value)}
                  type="text"
                  className="w-full p-2  border-2 dark:border-white/10 border-gray-600/20  rounded-lg focus:outline-2 outline-primary focus:border-none  dark:text-white/80"
                />
                {error["att.name"] && <p className="text-red-600 mt-1">{error["att.name"]}</p>}
              </div>
              <div className=" space-y-2">
                <h6 className="dark:text-dark-text-primary">Value</h6>
                <input
                  type="text"
                  onChange={(e) => setAttributeValue(e.target.value)}
                  className="w-full p-2  border-2 dark:border-white/10 border-gray-600/20  rounded-lg focus:outline-2 outline-primary focus:border-none  dark:text-white/80"
                />
                {error["att.value"] && <p className="text-red-600 mt-1">{error["att.value"]}</p>}
              </div>
            </div>
            <div onClick={handelAddAttribute} className="mt-3 text-end">
              <button type="button" className="text-primary font-medium">
                Add
              </button>
            </div>
            <div className="mt-3  grid grid-cols-1 gap-2">
              {attributes.map((att, index) => (
                <div key={index} className="space-y-1 p-3 dark:bg-dark-primary  bg-gray-50">
                  <div className="text-end">
                    <button
                      onClick={() => handelRemove(index)}
                      type="button"
                      className="text-info font-medium"
                    >
                      Remove
                    </button>
                  </div>
                  <h6 className="dark:text-dark-text-primary text-lg font-medium">{att.name}</h6>
                  <p className="dark:text-dark-text-primary">{att.value}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Inventory */}
          <div className="mt-5 dark:bg-dark-secondary bg-white p-5 rounded-lg">
            <h3 className="dark:text-dark-text-primary font-medium text-xl">Inventory</h3>
            <div className="p-3 mt-3  border-2 dark:border-white/20 border-gray-600/20 rounded-lg    grid grid-cols-2 gap-2">
              <div className=" space-y-2">
                <h6 className="dark:text-dark-text-primary">Quantity</h6>
                <input
                  type="number"
                  name="inventory.availableQuantity"
                  className="w-full p-2  border-2 dark:border-white/10 border-gray-600/20  rounded-lg focus:outline-2 outline-primary focus:border-none  dark:text-white/80"
                />
              </div>
              <div className=" space-y-2">
                <h6 className="dark:text-dark-text-primary">SKU</h6>
                <input
                  type="text"
                  name="inventory.sku"
                  className="w-full p-2  border-2 dark:border-white/10 border-gray-600/20  rounded-lg focus:outline-2 outline-primary focus:border-none  dark:text-white/80"
                />
              </div>
            </div>
          </div>
          {/* Pricing */}
          <div className="mt-5 dark:bg-dark-secondary bg-white p-5 rounded-lg">
            <h3 className="dark:text-dark-text-primary font-medium text-xl">Pricing</h3>
            <div className="p-3 mt-3  border-2 dark:border-white/20 border-gray-600/20 rounded-lg    grid md:grid-cols-2 gap-2">
              <div className=" space-y-2">
                <h6 className="dark:text-dark-text-primary">Price$</h6>
                <input
                  type="number"
                  name="pricing.price"
                  className="w-full p-2  border-2 dark:border-white/10 border-gray-600/20  rounded-lg focus:outline-2 outline-primary focus:border-none  dark:text-white/80"
                />
              </div>
              <div className=" space-y-2">
                <h6 className="dark:text-dark-text-primary">Offer Price$(optional)</h6>
                <input
                  type="number"
                  name="pricing.offerPrice"
                  className="w-full p-2  border-2 dark:border-white/10 border-gray-600/20  rounded-lg focus:outline-2 outline-primary focus:border-none  dark:text-white/80"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-end gap-2">
        <button onClick={onDiscard} className="text-white font-medium px-6 py-2 bg-info rounded-lg">
          Discard
        </button>
        <button type="submit" className="text-white font-medium px-6 py-2 bg-primary rounded-lg">
          Add
        </button>
      </div>
      <div className="mt-2">
        {Object.entries(error).map(([key, value], index) => (
          <p key={index} className="text-info font-medium md:text-[1rem] text-sm">
            {value}
          </p>
        ))}
      </div>
    </form>
  );
};

export default AddVariantForm;
