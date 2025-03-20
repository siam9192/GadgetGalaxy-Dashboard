import { HiArrowLongLeft } from "react-icons/hi2";
import { TFieldError } from "../types/util.type";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { RiImageAiFill } from "react-icons/ri";
import ChoseCategory from "../components/ui/ChoseCategory";
import { IChoseCategory } from "../types/category.type";
import { getFormValues } from "../utils/function";

const AddProductCategory = () => {
  const [fieldErrors, setFieldErrors] = useState<TFieldError>({});
  const [image, setImage] = useState<File | null>(null);
  const [parentCategory, setParentCategory] = useState<IChoseCategory | null>(null);

  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const handelImageInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const file = files[0];
    if (file.size > 1024 * 1024 * 5) return;
    setImage(file);
  };

  const onChoseParentCategory = (cate: IChoseCategory) => setParentCategory(cate);
  const handelSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    const values = getFormValues(e.target as HTMLFormElement, ["name", "description"]);

    const errors: TFieldError = {};

    if (values.name.length < 3 || values.name.length > 20) {
      errors.name = "Name must be between 3 and 20 characters.";
    }

    if (values.description.length < 20 || values.description.length > 1000) {
      errors.description = "Description must be between 20 and 1000 characters.";
    }

    // Handle errors (e.g., displaying them in the UI)
    if (Object.keys(errors).length > 0) {
      return setFieldErrors(errors);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 dark:bg-transparent bg-white p-5">
        <button className="text-xl text-primary px-2 py-4  dark:bg-dark-secondary bg-white rounded-lg">
          <HiArrowLongLeft />
        </button>
        <div>
          <p className="dark:text-dark-text-primary text-gray-600">Back to category list</p>
          <h1 className="mt-1 text-xl dark:text-white text-black font-medium">
            Add New Product Category
          </h1>
        </div>
      </div>
      <form
        onSubmit={handelSubmit}
        className="lg:mt-10 mt-7 grid lg:grid-cols-2 grid-cols-1 gap-10 "
      >
        {/* Col-1 */}
        <div className="grid grid-cols-1 gap-10">
          {/* Cover photo */}

          <div
            onClick={() => imageInputRef.current?.click()}
            className="dark:bg-dark-secondary bg-white p-5 rounded-lg"
          >
            <h1 className="text-xl dark:text-dark-text-primary">Cover Image</h1>
            {!image ? (
              <div className=" hover:cursor-pointer aspect-square bg-blue-50 dark:bg-dark-primary flex items-center justify-center flex-col text-center p-2 border-2 dark:border-white/10 border-gray-600/10 rounded-lg size-60 mx-auto">
                <span className="text-black dark:text-white text-6xl">
                  <RiImageAiFill />
                </span>
                <div className="text-sm">
                  <button
                    type="button"
                    className="text-primary font-medium border-b-2 border-primary font-primary "
                  >
                    Click to upload
                  </button>
                  <p className="mt-1 dark:text-dark-text-primary text-gray-700">Or drag and drop</p>
                </div>
              </div>
            ) : (
              <div className="size-52 mt-3 mx-auto">
                <img src={URL.createObjectURL(image)} alt="" className="size-52" />
              </div>
            )}
          </div>

          <input
            type="file"
            onChange={handelImageInputOnChange}
            className="hidden"
            ref={imageInputRef}
          />
          <div className="dark:bg-dark-secondary bg-white p-5 rounded-lg ">
            <div className="mt-3 space-y-2">
              <h6 className="dark:text-dark-text-primary">Chose parent category (optional)</h6>
              <ChoseCategory notIn={[]} onChose={onChoseParentCategory} />
            </div>
            <div className="mt-3 space-y-2">
              <h6 className="dark:text-dark-text-primary">Category Name</h6>
              <input
                type="text"
                name="name"
                className="w-full p-2  border-2 dark:border-white/10 border-gray-600/20  rounded-lg focus:outline-2 outline-primary focus:border-none  dark:text-white/80"
              />
            </div>
            <div className="mt-3 space-y-2">
              <h6 className="dark:text-dark-text-primary">Description</h6>
              <textarea
                name="description"
                placeholder="Write something about category.."
                className="w-full p-2 dark:text-white/75  border-2 dark:border-white/10 border-gray-600/20 rounded-lg focus:outline-2 outline-primary focus:border-none  h-60 resize-none"
              />
            </div>
          </div>
          <div className="mt-3">
            {Object.keys(fieldErrors).length ? (
              <div className=" dark:bg-dark-secondary bg-white p-5 rounded-lg ">
                {Object.entries(fieldErrors).map(([key, value], index) => (
                  <p key={index} className="text-info font-medium md:text-[1rem] text-sm">
                    {value}
                  </p>
                ))}
              </div>
            ) : null}
            <div className="mt-3 flex items-center gap-2 justify-end">
              <button className="px-6 py-3 bg-primary text-white  rounded-md">Submit</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProductCategory;
