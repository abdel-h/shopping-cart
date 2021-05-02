import React from "react";

import { createEvent, fireEvent, render } from "@testing-library/react";

import { CartPanel } from "./CartPanel";
import { Product } from "../../typing/common";

describe("CartPanel", () => {
  const dispatchMock = jest.fn();
  const cartMock = [
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

  const emptyCartMock = [
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

  const renderCartPanel = (cart: Product[]) => {
    return render(<CartPanel dispatch={dispatchMock} cart={cart} />);
  };

  it("should render all cart elements", async () => {
    const { findAllByRole } = renderCartPanel(cartMock);

    const inputs = await findAllByRole("textbox");

    expect(inputs).toHaveLength(cartMock.length);
  });

  it("should dispatch UPDATE_PRODUCT on each product quantity change", async () => {
    const { findAllByRole } = renderCartPanel(cartMock);

    const inputs = await findAllByRole("textbox");

    inputs.forEach((input, index) => {
      fireEvent(input, createEvent.change(input, { target: { value: 2 } }));

      expect(dispatchMock).toHaveBeenCalledWith({
        type: "UPDATE_PRODUCT",
        productKey: cartMock[index].productKey,
        quanity: 2,
      });
    });
  });

  it("should render a disabled Pay button when all the cart items quantities are 0", () => {
    const { getByText } = renderCartPanel(emptyCartMock);

    const payButton = getByText("Pay");

    expect(payButton.hasAttribute("disabled")).toBeTruthy();
  });

  it("should create a new order and reset cart when the pay button is clicked", () => {
    const { getByText } = renderCartPanel(cartMock);

    const payButton = getByText("Pay");

    fireEvent(payButton, createEvent.click(payButton));

    expect(dispatchMock).toHaveBeenNthCalledWith(1, {
      type: "CREATE_ORDER",
    });

    expect(dispatchMock).toHaveBeenNthCalledWith(2, {
      type: "RESET_CART",
    });
  });
});
