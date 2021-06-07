import React from "react";

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ProductItem } from "./Item";
import { Product } from "../../typing/common";

const productFixture: Product = {
  productKey: "productKey",
  quantity: 200,
  name: "Product title",
  description:
    "You can't buy your future, but you can do it. Money is nothing, you'reverything.",
  price: 200,
};

const emptyQuantityProductFixture = {
  productKey: "productKey",
  quantity: 0,
  name: "Product title",
  description:
    "You can't buy your future, but you can do it. Money is nothing, you'reverything.",
  price: 200,
};

const generateProductFixture = (type: "full" | "empty-quantity") => {
  switch (type) {
    case "empty-quantity":
      return emptyQuantityProductFixture;
    case "full":
      return productFixture;
  }
};
describe.only("Product Item", () => {
  const handleAddToCart = jest.fn();

  const renderProduct = (product: Product) => {
    const utils = render(
      <ProductItem product={product} onAddToCart={handleAddToCart} />
    );

    const { getByRole, getByText } = utils;

    const getTitle = getByRole("heading", {
      name: product.name,
    });

    const getDescription = getByText(product?.description ?? "");

    const getPrice = getByRole("heading", { name: `$${product.price}` });

    const getAddToCartButton = getByRole("button", {
      name: /add to card/i,
    });

    return {
      ...utils,
      getTitle,
      getDescription,
      getPrice,
      getAddToCartButton,
    };
  };

  it("renders the product elements correctly", () => {
    const {
      getTitle,
      getDescription,
      getPrice,
      getAddToCartButton,
    } = renderProduct(generateProductFixture("full"));

    expect(getTitle).not.toBeNull();
    expect(getDescription).not.toBeNull();
    expect(getPrice).not.toBeNull();
    expect(getAddToCartButton).not.toBeNull();
  });

  it("adds to cart an item, when the add to cart button is clicked", () => {
    const { getAddToCartButton } = renderProduct(
      generateProductFixture("full")
    );

    userEvent.click(getAddToCartButton);
    expect(handleAddToCart).toBeCalled();
    expect(handleAddToCart).toBeCalledWith(
      generateProductFixture("full").productKey
    );
  });

  it("renders a disabled add to cart if the quantity is 0", () => {
    const { getAddToCartButton } = renderProduct(
      generateProductFixture("empty-quantity")
    );

    expect(getAddToCartButton).toHaveAttribute("disabled");
  });
});
