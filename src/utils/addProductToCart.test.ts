import { addProductToCart, updateProductInCart } from "./addProductToCart";
import { generateCartProductFixture } from "./tests-utils";

describe("addProductToCart", () => {
  it("should add a new products to an empty cart", () => {
    const product = generateCartProductFixture("productKey_10", 20);
    const results = addProductToCart([], product);

    expect(results).toEqual([product]);
  });

  it("should only increment the quantity if the product is present in the cart", () => {
    const productKey = "productKey_10";
    const quantity = 20;

    const product = generateCartProductFixture(productKey, quantity);

    const cart = [product];

    const results = addProductToCart(cart, product);
    expect(results).toEqual([
      {
        productKey,
        quantity: quantity + 1,
      },
    ]);
  });
});

describe("updateProductInCart", () => {
  it("returns the previous cart if the product is not found ", () => {
    const productOne = generateCartProductFixture("productKey_1", 20);
    const productTwo = generateCartProductFixture("productKey_2", 15);

    const cart = [productOne, productTwo];

    const updatedCart = updateProductInCart(cart, "productKey_NOT_FOUND", 12);

    expect(updatedCart).toEqual(cart);
  });

  it("udpates the product with the giver quantity", () => {
    const productOne = generateCartProductFixture("productKey_1", 20);

    const cart = [productOne];

    const updatedCart = updateProductInCart(cart, "productKey_1", 12);

    expect(updatedCart).toEqual([
      {
        productKey: "productKey_1",
        quantity: 12,
      },
    ]);
  });
});
