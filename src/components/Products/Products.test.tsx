import React from "react";

import { createEvent, fireEvent, render } from "@testing-library/react";
import { ProductsContainer } from "./Products";

describe("ProductsContainer", () => {
  const handleSubmitMock = jest.fn();

  const emptyProductsArrayMock = [
    {
      productKey: "somerandomKEy",
      quantity: 0,
    },
    {
      productKey: "somerandomKEy1",
      quantity: 0,
    },
    {
      productKey: "somerandomKEy2",
      quantity: 0,
    },
  ];

  const filledProductsArrayMock = [
    {
      productKey: "somerandomKEy",
      quantity: 1,
    },
    {
      productKey: "somerandomKEy1",
      quantity: 0,
    },
    {
      productKey: "somerandomKEy2",
      quantity: 0,
    },
  ];

  const renderProductsContainer = (products: any) => {
    const utils = render(
      <ProductsContainer products={products} onSubmit={handleSubmitMock} />
    );

    function getPageButtons() {
      return {
        resetButton: utils.getByText("Reset"),
        addToCartButton: utils.getByText("Add to cart"),
      };
    }

    function findPageInputs() {
      return {
        inputs: utils.findAllByRole("textbox"),
      };
    }

    return {
      ...utils,
      getPageButtons,
      findPageInputs,
    };
  };

  it("should render the inputs based on the products list provided", async () => {
    const { findPageInputs } = renderProductsContainer(emptyProductsArrayMock);
    const inputs = await findPageInputs().inputs;

    expect(inputs).toHaveLength(emptyProductsArrayMock.length);
  });

  it("should have add to cart button disabled if all quanities are 0", () => {
    const { getPageButtons } = renderProductsContainer(emptyProductsArrayMock);
    const addToCartButton = getPageButtons().addToCartButton;

    expect(addToCartButton.hasAttribute("disabled")).toBeTruthy();
  });

  it("should have reset button disabled if all quanities are 0", () => {
    const { getPageButtons } = renderProductsContainer(emptyProductsArrayMock);
    const resetButton = getPageButtons().resetButton;

    expect(resetButton.hasAttribute("disabled")).toBeTruthy();
  });

  it("should correctly add to cart the quantity of each product", async () => {
    const { findPageInputs, getPageButtons } = renderProductsContainer(
      emptyProductsArrayMock
    );
    const inputs = await findPageInputs().inputs;

    inputs.forEach((input) => {
      fireEvent(input, createEvent.change(input, { target: { value: 2 } }));
    });

    const addToCartButton = getPageButtons().addToCartButton;

    fireEvent(addToCartButton, createEvent.click(addToCartButton));

    expect(handleSubmitMock).toHaveBeenCalledWith([
      {
        productKey: "somerandomKEy",
        quantity: 2,
      },
      {
        productKey: "somerandomKEy1",
        quantity: 2,
      },
      {
        productKey: "somerandomKEy2",
        quantity: 2,
      },
    ]);
  });
});
