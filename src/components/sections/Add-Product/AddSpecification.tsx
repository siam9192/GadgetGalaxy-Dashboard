import React, { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { getFormValues } from "../../../utils/function";
import { TFieldError } from "../../../types/util.type";
import { AddProductContext } from "../../../pages/AddProduct";

type TSpec = {
  name: string;
  value: string;
};

const AddSpecification = () => {
  const [specifications, setSpecifications] = useState<TSpec[]>([]);
  const [error, setError] = useState<TFieldError>({});
  const ref = useRef<HTMLFormElement>(null);
  const context = useContext(AddProductContext);
   
  const handelAddSpec = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError({});
    const err: TFieldError = {};
    const values = getFormValues(e.target as HTMLFormElement, ["name", "value"]) as TSpec;
    if (!values.name.replace(" ", "").length) {
      err.name = "Name is empty";
    }
    if (!values.value.replace(" ", "").length) {
      err.value = "Value is empty";
    }
    if (Object.keys(err).length) return setError(err);
    setSpecifications((prev) => [...prev, values]);
    ref.current?.reset();
  };
 

  const handelRemoveSpec = (index: number) =>
    setSpecifications(specifications.filter((_, idx) => index !== idx));

  useEffect(()=>{
    if(!context) return;
    const {data,updateData} = context
    updateData({...data,specifications})
  },[specifications],
)
  return (
    <div className="mt-5 dark:bg-dark-secondary bg-white p-5 rounded-lg">
      <h3 className="dark:text-dark-text-primary font-medium text-xl">Specification</h3>
      <div className="p-3 mt-3  border-2 border-white/20 rounded-lg    space-y-3">
        <form ref={ref} onSubmit={handelAddSpec}>
          <div className="grid  grid md:grid-cols-2 grid-cols-1 md:gap-5 gap-2">
            <div className=" space-y-2">
              <h6 className="dark:text-dark-text-primary">Name</h6>
              <input
                type="text"
                name="name"
                className="w-full p-2  border-2 dark:border-white/10 border-gray-600/20  rounded-lg focus:outline-2 outline-primary focus:border-none  dark:text-white/80"
              />
              {error.name && <p className="text-red-600 mt-1">{error.name}</p>}
            </div>
            <div className=" space-y-2">
              <h6 className="dark:text-dark-text-primary">Value</h6>
              <input
                type="text"
                name="value"
                className="w-full p-2  border-2 dark:border-white/10 border-gray-600/20  rounded-lg focus:outline-2 outline-primary focus:border-none  dark:text-white/80"
              />
              {error.value && <p className="text-red-600 mt-1">{error.value}</p>}
            </div>
          </div>
          <div className="mt-3 text-end">
            <button type="submit" className="text-primary font-medium">
              Add
            </button>
          </div>
        </form>
        <div>
          <h5 className=" text-primary text-xl ">Specs</h5>
          <div className="mt-2">
            {specifications.map((_, index) => (
              <div
                className={`mt-2 space-y-1 p-1 ${index !== specifications.length - 1 ? "border-b" : ""} dark:border-white/15 border-gray-700/15 `}
              >
                <h5 className="dark:text-white font-medium text-lg">{_.name}</h5>
                <p className="dark:text-dark-text-primary">{_.value}</p>
                <div className="flex items-center justify-end gap-2 text-sm">
                  <button onClick={() => handelRemoveSpec(index)} className="text-info font-medium">
                    Remove
                  </button>
                  <button className="text-primary font-medium">Edit</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <div>
    <h5 className=' text-primary text-xl '>
        Previous
    </h5>
       <div className='mt-2'>
       {
            Array.from(({length:10})).map((_,index)=>(
                <div className={`mt-2 space-y-1 p-1 ${index !== 9 ? 'border-b':'' } border-white/15 `}>
                    <h5 className='dark:text-white font-medium text-lg'>Spec-{index+1}</h5>
                     <p className='dark:text-dark-text-primary'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi, architecto!</p>
                    <div className='flex items-center justify-end gap-2 text-sm'>
                    <button className='text-info font-medium'>Remove</button>
                    <button className='text-primary font-medium'>Edit</button>
                    </div>
                </div>
            ))
        }
       </div>
    </div> */}
      </div>
    </div>
  );
};

export default AddSpecification;
