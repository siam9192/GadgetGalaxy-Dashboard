import React, { useEffect, useRef, useState } from "react";
interface IProps {
  defaultValue?: string;
  notIn: number[];
  onChose: (category: ICategory) => void;
  isOptional?:boolean
  placeholder?:string
}
interface ICategory {
  id: number;
  name: string;
  hierarchyStr: string;
}

const ChoseCategory = ({defaultValue,notIn,onChose,isOptional}: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const categories: ICategory[] = [
    
    { id: 1, name: "Smartphones", hierarchyStr: "/product/phone" },
    { id: 2, name: "Laptops", hierarchyStr: "/product/laptop" },
    { id: 3, name: "Tablets", hierarchyStr: "/product/tablet" },
    { id: 4, name: "Accessories", hierarchyStr: "/product/accessory" },
    { id: 5, name: "Smartwatches", hierarchyStr: "/product/smartwatch" },
  ];
  const refOptions = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [value, setValue] = useState<ICategory | null>(categories[0]);
  const [inputValue, setInputValue] = useState("");
  const inputRefCurrent = inputRef.current;

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

  // Add category
  const handelChose = (category: ICategory) => {
    const inputRefCurrent = inputRef.current;
    inputRefCurrent!.value = "";
    setValue(category);
  };
  const clear = ()=>{
    setValue(null)
    inputRefCurrent!.value = "";
  }
  return (
    <div className="relative">
      <input
        type="text"
        ref={inputRef}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        placeholder={"Chose.."}
        defaultValue={value?.name}
        onFocus={() => {
          setIsOpen(true);
          if (!inputRefCurrent) return;
          // Reset value as empty on focus in input
          setValue(null);
          inputRefCurrent.value = "";
        }}
        className="w-full px-2 py-3  border-2 dark:border-white/10 border-gray-600/20  rounded-lg focus:outline-2 outline-primary focus:border-none  dark:text-white/80"
      />
      <div  className="text-end mt-2">
        <button type="button" onClick={clear} className="text-red-600 font-medium">
          Clear
        </button>
      </div>
      {isOpen ? (
        <div
          ref={refOptions}
          className="absolute w-full h-52 overflow-y-auto  no-scrollbar dark:bg-dark-primary  bg-white rounded-lg shadow-2xl px-2  py-3"
        >
          {categories.map((_, index) => (
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
    </div>
  );
};

export default ChoseCategory;
