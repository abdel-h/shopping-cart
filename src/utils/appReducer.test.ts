import { reducer } from "./appReducer";
import { Product, Store } from "./../typing/common";

describe("reducer", () => {
  const defaultStore: Store = {
    productsList: [],
    cart: [],
    orders: [],
  };

  const mockedProductOne: Product = {
    productKey: "someproductKey3",
    quantity: 3,
  };

  const mockedProductTwo: Product = {
    productKey: "someproductKey2",
    quantity: 3,
  };

  it("should add products to cart", () => {
    const store = reducer(defaultStore, {
      type: "ADD_TO_CART",
      value: [mockedProductOne, mockedProductTwo],
    });

    expect(store).toEqual({
      productsList: [],
      cart: [mockedProductOne, mockedProductTwo],
      orders: [],
    });
  });

  it("should update quantity of a cart item", () => {
    const store = reducer(defaultStore, {
      type: "UPDATE_PRODUCT",
      productKey: "someproductKey3",
      quanity: 20,
    });

    expect(store).toEqual({
      productsList: [],
      cart: [
        {
          productKey: "someproductKey3",
          quantity: 20,
        },
        mockedProductTwo,
      ],
      orders: [],
    });
  });

  it("should reset the cart", () => {
    const store = reducer(defaultStore, {
      type: "RESET_CART",
    });

    expect(store).toEqual({
      productsList: [],
      cart: [],
      orders: [],
    });
  });

  it("should create a new order", () => {
    const store = reducer(
      {
        productsList: [],
        cart: [mockedProductOne, mockedProductTwo],
        orders: [],
      },
      {
        type: "CREATE_ORDER",
      }
    );

    expect(store).toEqual({
      productsList: [],
      cart: [mockedProductOne, mockedProductTwo],
      orders: [[mockedProductOne, mockedProductTwo]],
    });
  });
});
