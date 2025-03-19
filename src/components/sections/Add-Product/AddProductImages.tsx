import React, { ChangeEvent, useRef, useState } from "react";
import { RiImageAiFill } from "react-icons/ri";

const AddProductImages = () => {
  const [images, setImages] = useState<File[]>([]); // State to store selected images
  const imageInputRef = useRef<HTMLInputElement>(null); // Ref for the file input element
  const [replaceIndex, setReplaceIndex] = useState<null | number>(null); // State to track which image to replace

  const minImages = 2; // Minimum number of images required
  const maximumImagesLength = 10; // Maximum allowed images

  const imageInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (!files) return; // If no files were selected, exit the function

    // Loop through selected files to check size constraints
    for (let i = 0; i < files?.length; i++) {
      const file = files[0];
      if (file.size > 5 * 1024 * 1014) return; // If file size exceeds 5MB, exit function
    }

    // If replaceIndex is null, add new images instead of replacing
    if (replaceIndex === null) {
      const newLength = images.length + files.length;
      if (newLength > maximumImagesLength) {
        return; // If adding new images exceeds the maximum limit, do nothing
      }
      setImages((prev) => [...prev, ...files]); // Append new images to state
    } else {
      // If replaceIndex is set, replace the selected image
      const file = files[0];
      if (!file) return; // If no file is selected, exit

      setImages(
        images.map((_, index) => {
          if (index === replaceIndex)
            return file; // Replace the image at replaceIndex
          else return _; // Keep other images unchanged
        }),
      );
      setReplaceIndex(null); // Reset replaceIndex after replacement
    }
  };

  // Function to remove an image from the list
  const handelRemoveImage = (index: number) => {
    setImages(images.filter((_, idx) => index !== idx)); // Remove the image at the given index
  };

  // Function to open the file input for replacing an image
  const openReplace = (index: number) => {
    const current = imageInputRef.current;
    if (!current) return; // If the input element is not found, exit
    setReplaceIndex(index); // Set the index of the image to be replaced
    current.click(); // Open the file input dialog
  };

  return (
    <div className="dark:bg-dark-secondary bg-white p-5 rounded-lg">
      <div className="flex items-center justify-between">
        <h3 className="dark:text-dark-text-primary font-medium text-xl">Product Images</h3>
        <p className="dark:text-white font-medium text-lg">
          {images.length}/<span className="text-primary">{maximumImagesLength}</span>
        </p>
      </div>
      <input
        ref={imageInputRef}
        onChange={imageInputOnChange}
        type="file"
        multiple={replaceIndex === null}
        accept="image/*"
        className="hidden"
      />

      <div className="p-3 mt-3  border-2 dark:border-white/20  border-gray-600/20 rounded-lg   grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto no-scrollbar ">
        <div
          onClick={() => imageInputRef.current?.click()}
          className=" hover:cursor-pointer aspect-square bg-blue-50 dark:bg-dark-primary flex items-center justify-center flex-col text-center p-2 border-2 dark:border-white/10 border-gray-600/10 rounded-lg"
        >
          <span className="text-black dark:text-white text-6xl">
            <RiImageAiFill />
          </span>
          <div className="text-sm">
            <button className="text-primary font-medium border-b-2 border-primary font-primary ">
              Click to upload
            </button>
            <p className="mt-1 dark:text-dark-text-primary text-gray-700">Or drag and drop</p>
          </div>
        </div>
        {images.map((_, index) => (
          <div
            key={index}
            className=" group hover:outline-none outline-2 outline-blue-100 dark:outline-dark-text-primary  outline-offset-2 rounded-lg relative"
          >
            <img src={URL.createObjectURL(_)} alt="" className="rounded-lg  aspect-square" />
            <div className="absolute bg-gray-900/40 w-full h-full inset-0 rounded-lg  group-hover:flex  flex-col justify-center items-center gap-2 group-hover:block  hidden">
              <button
                onClick={() => openReplace(index)}
                className="bg-white text-black font-medium px-4 py-2 rounded-md"
              >
                Replace
              </button>
              <button
                onClick={() => handelRemoveImage(index)}
                className="bg-white text-black font-medium px-4 py-2 rounded-md"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddProductImages;
