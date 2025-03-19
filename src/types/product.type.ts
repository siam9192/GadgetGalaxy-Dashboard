


export type TAddProductData = {
  name: string;
  description: string;
  categories: string[];
  availableQuantity: number | null;
  sku: string;
  productImages: string[];
  specifications: TAddSpecification[];
  variants: TAddVariant[];
  price: number | null;
  offerPrice: number | null;
  scheduledAt: string | null; 
};

export type TAddVariant ={
    colorName: string;
    colorCode: string;
    availableQuantity: number | null;
    sku: string;
    attributes: { name: string; value: string }[];
    price: number | null;
    offerPrice: number | null;
  }

  export type TAddSpecification = { name: string; value: string }