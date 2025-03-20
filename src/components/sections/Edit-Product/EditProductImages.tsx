import React, { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { RiImageAiFill } from "react-icons/ri";
import { EditProductContext } from "../../../pages/EditProduct";

const EditProductImages = () => {
  const context = useContext(EditProductContext);

  const imageInputRef = useRef<HTMLInputElement>(null); // Ref for the file input element
  const [replaceIndex, setReplaceIndex] = useState<null | number>(null); // State to track which image to replace

  const minImages = 2; // Minimum required images
  const maximumImagesLength = 10; // Maximum allowed images

  // Filter out deleted images while keeping new uploads (Files)
  const images = (context?.data.images || []).filter((_) => {
    if (_ instanceof File) return true; // Keep newly uploaded files
    if (_.isDeleted) return false; // Remove images marked as deleted
    return true; // Keep existing images that are not deleted
  });

  // Handles file selection when images are added or replaced
  const imageInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (!files) return; // Exit if no files were selected

    // Validate each file's size (max 5MB)
    for (let i = 0; i < files?.length; i++) {
      const file = files[i];
      if (file.size > 5 * 1024 * 1024) return; // If file exceeds 5MB, exit
    }

    // If replacing an image, update the selected index
    if (replaceIndex !== null) {
      const file = files[0]; // Only one file is needed for replacement
      if (!file) return; // Exit if no file is selected

      context?.updateData({
        ...context.data,
        images: images.map(
          (_, index) => (index === replaceIndex ? file : _), // Replace image at replaceIndex
        ),
      } as any);

      setReplaceIndex(null); // Reset replaceIndex after replacement
      return;
    }

    // Otherwise, add new images while ensuring max limit is not exceeded
    const newLength = images.length + files.length;
    if (newLength > maximumImagesLength) return; // Prevent exceeding max limit
    context?.updateData({ ...context.data, images: [...images, ...files] } as any);
  };

  // Removes an image from the list (marks existing images as deleted)
  const handelRemoveImage = (index: number) => {
    const updatedImages = images
      .map((_, idx) => {
        if (idx !== index) return _; // Keep all other images

        if (_ instanceof File) return undefined; // Remove newly added files
        _.isDeleted = true; // Mark existing image as deleted
        return _;
      })
      .filter((_) => typeof _ !== "undefined"); // Filter out removed images

    context?.updateData({ ...context.data, images: updatedImages as any });
  };

  // Opens file input for replacing an image at a specific index
  const openReplace = (index: number) => {
    const current = imageInputRef.current;
    if (!current) return; // Exit if file input is not available

    setReplaceIndex(index); // Set index for replacement
    current.click(); // Open file selection dialog
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
            <img
              src={
                _ instanceof File ? URL.createObjectURL(_) : (_ as { id: number; url: string }).url
              }
              alt=""
              className="rounded-lg  aspect-square"
            />
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

export default EditProductImages;
