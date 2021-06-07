export type Route = "home" | "products_list" | "cart";

export type Product = {
  productKey: string;
  quantity: number;
  name?: string;
  description?: string;
  price?: number;
  photo?: string;
};

export type StoreState = {
  productsList: Product[];
  cart: Product[];
  orders: Product[][];
};

type AddToCartAction = {
  type: "ADD_TO_CART";
  value: Product[];
};

type PayCartAction = {
  type: "PAY_CART";
  value: Product[];
};

type UpdateProductAction = {
  type: "UPDATE_PRODUCT";
  productKey: string;
  quanity: number;
};

type ResetCartAction = {
  type: "RESET_CART";
};

type CreateOrderAction = {
  type: "CREATE_ORDER";
};

export type StoreAction =
  | AddToCartAction
  | PayCartAction
  | UpdateProductAction
  | ResetCartAction
  | CreateOrderAction;
