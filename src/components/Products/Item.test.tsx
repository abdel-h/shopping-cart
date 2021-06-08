import React from "react";

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ProductItem } from "./Item";
import { Product } from "../../typing/common";
import { generateProductFixture } from "../../utils/tests-utils";

describe("Product Item", () => {
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
    const fixture = generateProductFixture("full");
    const { getAddToCartButton } = renderProduct(fixture);

    userEvent.click(getAddToCartButton);
    expect(handleAddToCart).toBeCalled();
    expect(handleAddToCart).toBeCalledWith(fixture.productKey);
  });

  it("renders a disabled add to cart if the quantity is 0", () => {
    const { getAddToCartButton } = renderProduct(
      generateProductFixture("empty-quantity")
    );

    expect(getAddToCartButton).toHaveAttribute("disabled");
  });
});
