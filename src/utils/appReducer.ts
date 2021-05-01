import { Product, Store } from "./../typing/common";
import { addProductToCart, updateProductInCart } from "./addProductToCart";

const productsList: Product[] = [
  {
    productKey: "produit_1",
    name: "Produit 1",
    quantity: 20,
  },
  {
    productKey: "produit_2",
    name: "Produit 2",
    quantity: 20,
  },
  {
    productKey: "produit_3",
    name: "Produit 3",
    quantity: 20,
  },
];

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

type Action = AddToCartAction | PayCartAction | UpdateProductAction;

export const defaultStore = {
  productsList,
  cart: [],
  paidProducts: [],
};

export const reducer = (store: Store, action: Action): Store => {
  switch (action.type) {
    case "ADD_TO_CART": {
      return {
        ...store,
        cart: addProductToCart(store.cart, action.value),
      };
    }

    case "UPDATE_PRODUCT": {
      return {
        ...store,
        cart: updateProductInCart(
          store.cart,
          action.productKey,
          action.quanity
        ),
      };
    }

    default: {
      return store;
    }
  }
};
