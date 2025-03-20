import { useContext, useEffect, useRef, useState } from "react";
import { AddProductContext } from "../../../pages/AddProduct";
import { RxCross1 } from "react-icons/rx";
import { EditProductContext } from "../../../pages/EditProduct";
interface ICategory {
  id: number;
  name: string;
  hierarchyStr: string;
}

const categories: ICategory[] = [
  { id: 1, name: "Smartphones", hierarchyStr: "/product/phone" },
  { id: 2, name: "Laptops", hierarchyStr: "/product/laptop" },
  { id: 3, name: "Tablets", hierarchyStr: "/product/tablet" },
  { id: 4, name: "Accessories", hierarchyStr: "/product/accessory" },
  { id: 5, name: "Smartwatches", hierarchyStr: "/product/smartwatch" },
];

const EditCategories = () => {
  const context = useContext(EditProductContext);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<ICategory | null>(categories[0]);
  const refOptions = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const inputRefCurrent = inputRef.current;

  const [inputValue, setInputValue] = useState("");

  // Add category
  const addCategory = () => {
    if (!context || !value) return;

    const { data, updateData } = context;
    updateData({ ...data, categories: [...data.categories, value] });
    inputRefCurrent!.value = "";
    setValue(null);
  };

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

  const removeCategory = (index: number) => {
    if (!context) return;
    context.updateData({
      ...context.data,
      categories: context.data.categories.filter((_, idx) => idx !== index),
    });
  };

  return (
    <div className="mt-5 dark:bg-dark-secondary bg-white p-5 rounded-lg">
      <h3 className="dark:text-dark-text-primary font-medium text-xl">Category</h3>
      <div className="p-3 mt-3  border-2 dark:border-white/20 border-gray-700/15 rounded-lg    space-y-3">
        <div className=" space-y-2 relative">
          <h6 className="dark:text-dark-text-primary">Product Category</h6>
          <input
            type="text"
            ref={inputRef}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
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
              {categories
                .filter((category) => context?.data.categories.includes(category) === false)
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
                    <p className="dark:text-dark-text-primary text-sm">{_.hierarchyStr}</p>
                  </div>
                ))}
            </div>
          ) : null}
          {value !== null ? (
            <div className="text-end">
              {/* Add button */}
              <button
                disabled={value === null}
                onClick={addCategory}
                className="mt-2 text-end font-medium text-primary"
              >
                Add
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-2 space-y-2 p-3">
        {context?.data.categories.map((category, index) => (
          <div
            key={index}
            className="border-2 p-3 dark:border-white/10 border-blue-100 rounded-lg relative"
          >
            <h3 className="text-lg  dark:text-dark-text-primary text-gray-900 font-medium">
              <span className="text-primary font-medium">{index + 1}.</span>
              {category.name}
            </h3>
            <p className="dark:text-dark-text-primary  text-gray-700 text-sm">
              {category.hierarchyStr}
            </p>
            <button
              onClick={() => removeCategory(index)}
              className="p-2 dark:bg-dark-light rounded-full dark:text-white text-black absolute top-1 right-1"
            >
              <RxCross1 />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditCategories;
