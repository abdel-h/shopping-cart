export type Route = "home" | "products_list" | "cart";

export type Product = {
  productKey: string;
  quantity: number;
  name?: string;
  price?: number;
  photo?: string;
};

export type Store = {
  productsList: Product[];
  cart: Product[];
  paidProducts: Product[];
};
