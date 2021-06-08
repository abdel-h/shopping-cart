import { Product, StoreState, StoreAction } from "./../typing/common";
import { addProductToCart, updateProductInCart } from "./addProductToCart";

import create from "zustand";

const productsList: Product[] = [
  {
    productKey: "productkey_1",
    name: "Product 1",
    quantity: 20,
    price: 2,
  },
  {
    productKey: "productkey_2",
    name: "Product 2",
    quantity: 20,
    price: 2,
  },
  {
    productKey: "productkey_3",
    name: "Product 3",
    quantity: 20,
    price: 2,
  },
];

export const defaultStore: StoreState = {
  productsList,
  cart: [],
  orders: [],
};

type Store = {
  state: StoreState;
  dispatch: (action: StoreAction) => any;
};

export const useStore = create<Store>((set) => ({
  state: defaultStore,
  dispatch: (action: StoreAction) =>
    set((store) => {
      return {
        ...store,
        state: reducer(store.state, action),
      };
    }),
}));

export const reducer = (store: StoreState, action: StoreAction): StoreState => {
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

    case "RESET_CART": {
      return {
        ...store,
        cart: [],
      };
    }

    case "CREATE_ORDER": {
      return {
        ...store,
        orders: [...store.orders, store.cart],
      };
    }

    default: {
      return store;
    }
  }
};
