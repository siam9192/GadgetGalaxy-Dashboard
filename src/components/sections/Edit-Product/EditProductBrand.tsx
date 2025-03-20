import React, { useContext, useEffect, useRef, useState } from "react";
import { TChoseBrand } from "../../../types/brand.type";
import { EditProductContext } from "../../../pages/EditProduct";

const brands: TChoseBrand[] = [
  { id: 1, name: "Apple" },
  { id: 2, name: "Samsung" },
  { id: 3, name: "Sony" },
  { id: 4, name: "Microsoft" },
  { id: 5, name: "Dell" },
  { id: 6, name: "HP" },
  { id: 7, name: "Lenovo" },
  { id: 8, name: "Asus" },
  { id: 9, name: "Google" },
  { id: 10, name: "OnePlus" },
];
const EditProductBrand = () => {
  const [isOpen, setIsOpen] = useState(false);
  const context = useContext(EditProductContext);
  const [value, setValue] = useState<TChoseBrand | null>(context?.data.brand || null);
  const refOptions = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const inputRefCurrent = inputRef.current;

  const [inputValue, setInputValue] = useState("");

  // useEffect close the options box when click outside of box
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const current = refOptions.current;
      if (!current) return;
      const target = event.target as Node;
      if (isOpen && !current.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [isOpen]);

  useEffect(() => {
    context?.updateData({ ...context.data, brand: value } as any);
  }, [value]);

  return (
    <div className="mt-5 dark:bg-dark-secondary bg-white p-5 rounded-lg">
      <h3 className="dark:text-dark-text-primary font-medium text-xl">Brand</h3>
      <div className="p-3 mt-3  border-2 dark:border-white/20 border-gray-700/15 rounded-lg    space-y-3">
        <div className=" space-y-2 relative">
          <h6 className="dark:text-dark-text-primary">Product Brand</h6>
          <input
            type="text"
            ref={inputRef}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            defaultValue={value ? value.name : ""}
            onFocus={() => {
              setIsOpen(true);
              if (!inputRefCurrent) return;
              // Reset value as empty on focus in input
              setValue(null);
              inputRefCurrent.value = "";
            }}
            className="w-full px-2 py-3  border-2 dark:border-white/10 border-gray-600/20  rounded-lg focus:outline-2 outline-primary focus:border-none  dark:text-white/80"
          />
          {isOpen ? (
            <div
              ref={refOptions}
              className="absolute w-full h-52 overflow-y-auto  no-scrollbar dark:bg-dark-primary  bg-white rounded-lg shadow-2xl p-2 z-40"
            >
              {brands
                .filter((brand) => brand.id !== value?.id)
                .map((_, index) => (
                  <div
                    key={_.id}
                    onClick={() => {
                      // Set current value in state and input
                      setValue(_);
                      inputRefCurrent!.value = _.name;
                      setIsOpen(false);
                    }}
                    className="w-full p-2 dark:hover:bg-dark-light hover:bg-gray-100 space-y-1 hover:cursor-pointer"
                  >
                    <h5 className="dark:text-white font-medium">{_.name}</h5>
                  </div>
                ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default EditProductBrand;
