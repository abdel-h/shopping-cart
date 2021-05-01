import { Product } from "./../typing/common";

import { addProductToCart } from "./addProductToCart";

describe("addProductToCart", () => {
  const mockedProductOne: Product = {
    productKey: "someproductKey",
    quantity: 10,
  };

  const mockedProductTwo: Product = {
    productKey: "someproductKey2",
    quantity: 3,
  };

  it("should add a new products to an empty cart", () => {
    const results = addProductToCart([], [mockedProductOne, mockedProductTwo]);

    expect(results).toEqual([mockedProductOne, mockedProductTwo]);
  });

  it("should only increment the quantity if the product is present in the cart", () => {
    const cart = [mockedProductOne];

    const results = addProductToCart(cart, [mockedProductOne]);
    expect(results).toEqual([
      {
        productKey: "someproductKey",
        quantity: 20,
      },
    ]);
  });
});
