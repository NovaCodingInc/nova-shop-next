export enum ORDER_BY {
  NEWEST = 0,
  OLDEST,
  MOST_PRICE,
  LEAST_PRICE,
}

export type product_type = {
  id: number;
  name: string;
  brand: string;
  category: string;
  summary: string;
  description: string;
  pictureFileName: string;
  pictureUri: string;
  quantityInStock: number;
  price: number;
  galleries: [];
};
export type category_type = {
  id: number;
  category: string;
 
};

