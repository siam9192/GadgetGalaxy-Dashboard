import { AnyZodObject } from "zod";
import { IParam } from "../interfaces/response.interface";
import { NavigateFunction } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { TFieldError, TRoute, TRouterRoute, TSidebarRoute } from "../types/util.type";
import { TAddProductData, TEditProductData } from "../types/product.type";
import { ro } from "date-fns/locale";
export const getFormValues = (target: HTMLFormElement, names: string[]) => {
  const obj: Record<string, string> = {};
  names.forEach((name) => {
    const input = target.elements.namedItem(name) as HTMLInputElement | null;
    if (input) {
      obj[name] = input.value;
    }
  });
  return obj;
};

export const zodParse = (schema: AnyZodObject, data: any) => {
  return schema.parse(data);
};

export const paramsToString = (params: IParam[]) => {
  if (!params.length) return "";
  const searchParams = new URLSearchParams();
  params.forEach((param) => {
    if (param.value) {
      searchParams.append(param.name, param.value.toString());
    }
  });
  return searchParams.toString();
};

export const handelSearch = (params: IParam[], navigate: NavigateFunction, search?: string) => {
  const urlSearchParams = new URLSearchParams(search);
  params.forEach((param) => {
    param.value && urlSearchParams.set(param.name, param.value as string);
  });
  const paramsStr = urlSearchParams.toString();
  navigate(window.location.pathname + paramsStr ? `?${paramsStr}` : "");
};

export const getTimeAgo = (date: string): string => {
  const currentDate = new Date().getTime();
  const targetDate = new Date(date).getTime();
  const difference = currentDate - targetDate; // Time difference in milliseconds

  const minutes = 60 * 1000;
  const hours = 60 * minutes;
  const days = 24 * hours;

  if (difference >= days) {
    return `${Math.floor(difference / days)} days ago`;
  }
  if (difference >= hours) {
    return `${Math.floor(difference / hours)} hours ago`;
  }
  if (difference >= minutes) {
    return `${Math.floor(difference / minutes)} minutes ago`;
  }

  return `just now`;
};

export const uploadImageToImgBB = async (file: File) => {
  const response = await axios.post(
    `${process.env.IMG_BB_UPLOAD_URL}?key=${process.env.IMG_BB_API_KEY}` as string,
    { image: file },
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );

  const url = response.data.data.display_url;
  if (!url) throw new Error();
  return url;
};

export const formatSidebarRoutes = (routes: TRoute[]): TSidebarRoute[] => {
  return routes.map((route) => {
    const item: TSidebarRoute = {
      title: route.title,
      path: route.path,
      icon: route.icon,
    };
    if (route.children && route.children.length)
      item.children = formatSidebarRoutes(route.children);
    return item;
  });
};

export const formatRouterRoutes = (routes: TRoute[]): TRouterRoute[] => {

 return routes.map((route) => {
    const item: TRouterRoute = {
      path: route.path.slice(1,route.path.length),
    };
  
    if(route.element) item.element = route.element
    
    if (route.children && route.children.length) item.children = formatRouterRoutes(route.children);
    
    return item;
  });

};

export function validateProductData(product: TAddProductData) {
  const errors: TFieldError = {};

  // Name validation
  if (!product.name.trim()) {
    errors.name = "Product name is required.";
  } else if (product.name.length < 3 || product.name.length > 100) {
    errors.name = "Product name must be between 3 and 100 characters.";
  }

  // Description validation
  if (!product.description.trim()) {
    errors.description = "Product description is required.";
  } else if (product.description.length < 10 || product.description.length > 1000) {
    errors.description = "Product description must be between 10 and 1000 characters.";
  }

  // Warranty validation
  if (!product.warranty.trim()) {
    errors.warranty = "Warranty information is required.";
  } else if (product.warranty.length < 5 || product.warranty.length > 200) {
    errors.warranty = "Warranty must be between 5 and 200 characters.";
  }

  if (!Array.isArray(product.categories) || product.categories.length === 0) {
    errors.categories = "At least one category is required.";
  }

  if (
    product.availableQuantity !== null &&
    (typeof product.availableQuantity !== "number" || product.availableQuantity < 0)
  ) {
    errors.availableQuantity = "Available quantity must be a non-negative number.";
  }

  if (!product.sku.trim()) {
    errors.sku = "SKU is required.";
  }

  if (
    !Array.isArray(product.images) ||
    product.images.some((img) => !(img instanceof File)) ||
    product.images.length < 2
  ) {
    errors.images = "Minimum 4 product images are required.";
  }

  if (!Array.isArray(product.specifications) || !product.specifications.length) {
    errors.specifications = "At least one specification is required.";
  }

  if (!Array.isArray(product.variants)) {
    errors.variants = "Variants must be an array.";
  }

  if (!product.price && (typeof product.price !== "number" || product.price <= 0)) {
    errors.price = "Valid price is required.";
  }

  if (
    product.offerPrice &&
    (typeof product.offerPrice !== "number" ||
      product.offerPrice <= 0 ||
      product.offerPrice > (product.price as number))
  ) {
    errors.offerPrice =
      "Offer price must be a positive number and less than or equal to the price.";
  }

  return Object.keys(errors).length ? errors : {};
}

export function validateEditProductData(product: TEditProductData) {
  const errors: TFieldError = {};
  // Name validation
  if (!product.name.trim()) {
    errors.name = "Product name is required.";
  } else if (product.name.length < 3 || product.name.length > 100) {
    errors.name = "Product name must be between 3 and 100 characters.";
  }

  // Description validation
  if (!product.description.trim()) {
    errors.description = "Product description is required.";
  } else if (product.description.length < 10 || product.description.length > 1000) {
    errors.description = "Product description must be between 10 and 1000 characters.";
  }

  // Warranty validation
  if (!product.warranty.trim()) {
    errors.warranty = "Warranty information is required.";
  } else if (product.warranty.length < 5 || product.warranty.length > 200) {
    errors.warranty = "Warranty must be between 5 and 200 characters.";
  }

  // Category validation
  if (
    !Array.isArray(product.categories) ||
    product.categories.filter((_) => _.isDeleted !== true).length === 0
  ) {
    errors.categories = "At least one category is required.";
  }

  // Stock quantity validation
  if (
    product.availableQuantity !== null &&
    (typeof product.availableQuantity !== "number" || product.availableQuantity < 0)
  ) {
    errors.availableQuantity = "Available quantity must be a non-negative number.";
  }
  // Sku validation

  if (!product.sku.trim()) {
    errors.sku = "SKU is required.";
  }

  
  // Images validation
  if (
    !Array.isArray(product.images) ||
   
    product.images.filter((_) => (_ instanceof File ? true : _.isDeleted !== true)).length < 2
  ) {
    errors.images = "Minimum 2 product image is required";
  }

  // Spec validation
  if (
    !Array.isArray(product.specifications) ||
    !product.specifications.filter((_) => _.isDeleted !== true).length
  ) {
    errors.specifications = "At least one Specifications is required.";
  }

  // Variant validation
  if (!Array.isArray(product.variants)) {
    errors.variants = "Variants must be an array.";
  }

  // Pricing

  if (!product.price && (typeof product.price !== "number" || product.price <= 0)) {
    errors.price = "Valid Price is required";
  }

  if (
    product.offerPrice &&
    (typeof product.offerPrice !== "number" ||
      product.offerPrice <= 0 ||
      product.offerPrice > (product.price as number))
  ) {
    errors.offerPrice =
      "Offer price must be a positive number and less than or equal to the price.";
  }

  // if (product.scheduledAt !== null && isNaN(Date.parse(product.scheduledAt))) {
  //   errors.scheduledAt = "Invalid date format for scheduledAt.";
  // }

  return Object.keys(errors).length ? errors : {};
}

