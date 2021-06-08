import { generateCartProductFixture } from "./tests-utils/index";
import { reducer } from "./appReducer";
import { Product, StoreState } from "./../typing/common";

describe("reducer", () => {
  const defaultStore: StoreState = {
    productsList: [],
    cart: [],
    orders: [],
  };

  it("should add products to cart", () => {
    const productOne = generateCartProductFixture("productKey_1", 20);
    const productTwo = generateCartProductFixture("productKey_2", 15);

    let store = reducer(defaultStore, {
      type: "ADD_TO_CART",
      value: productOne,
    });

    store = reducer(store, {
      type: "ADD_TO_CART",
      value: productTwo,
    });

    expect(store).toEqual({
      productsList: [],
      cart: [productOne, productTwo],
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
