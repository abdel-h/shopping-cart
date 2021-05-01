import { reducer } from "./appReducer";
import { Product, Store } from "./../typing/common";

describe("reducer", () => {
  const defaultStore: Store = {
    productsList: [],
    cart: [],
    paidProducts: [],
  };

  const mockedProductOne: Product = {
    productKey: "someproductKey3",
    quantity: 3,
  };

  const mockedProductTwo: Product = {
    productKey: "someproductKey2",
    quantity: 3,
  };

  it("should correctly add products to cart", () => {
    const store = reducer(defaultStore, {
      type: "ADD_TO_CART",
      value: [mockedProductOne, mockedProductTwo],
    });

    expect(store).toEqual({
      productsList: [],
      cart: [mockedProductOne, mockedProductTwo],
      paidProducts: [],
    });
  });

  it("shoudl correcty update quantity of a cart item", () => {
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
      paidProducts: [],
    });
  });
});
