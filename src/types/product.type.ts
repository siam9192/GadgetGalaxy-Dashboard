import { TChoseBrand } from "./brand.type";
import { TAddCategory, TEditCategory } from "./category.type";

export type TAddProductData = {
  name: string;
  description: string;
  warranty: string;
  brand: TChoseBrand | null;
  categories: TAddCategory[];
  availableQuantity: number | null;
  sku: string;
  images: File[];
  specifications: TAddSpecification[];
  variants: TAddVariant[];
  price: number | null;
  offerPrice: number | null;
};

export type TAddVariant = {
  colorName: string;
  colorCode: string;
  availableQuantity: number | null;
  sku: string;
  attributes: { name: string; value: string }[];
  price: number | null;
  offerPrice: number | null;
};

export type TAddSpecification = { name: string; value: string };

export type TEditImage = { id: number; url: string; isDeleted?: boolean } | File; // New uploaded image

export type TEditSpecification = TAddSpecification & {
  id?: number;
  isDeleted?: boolean;
};

export type TEditVariant = TAddVariant & {
  id?: number;
  isDeleted?: boolean;
};

export type TEditProductData = Omit<
  TAddProductData,
  "categories" | "images" | "specifications" | "variants"
> & {
  categories: TEditCategory[];
  images: TEditImage[];
  specifications: TEditSpecification[];
  variants: TEditVariant[];
};
