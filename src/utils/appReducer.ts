import { Product, Store, StoreAction } from "./../typing/common";
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

export const defaultStore = {
  productsList,
  cart: [],
  paidProducts: [],
};

export const reducer = (store: Store, action: StoreAction): Store => {
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
