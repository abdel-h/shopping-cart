import { createEvent, fireEvent, render } from "@testing-library/react";
import React from "react";
import { SingleProduct } from "./Product";

describe("Product", () => {
  const mockHandleChange = jest.fn();

  const renderProduct = (quantity: number) => {
    return render(
      <SingleProduct
        product={{
          productKey: "somerandomKey",
          quantity,
        }}
        onChange={mockHandleChange}
      />
    );
  };

  it("should render a disabled reset button when quanity is 0", async () => {
    const { findByText } = renderProduct(0);

    const resetButton = await findByText("Reset Quantity", {
      selector: "button",
    });

    expect(resetButton.hasAttribute("disabled")).toBeTruthy();
  });

  it("should handle reset", async () => {
    const { findByText } = renderProduct(10);

    const resetButton = await findByText("Reset Quantity", {
      selector: "button",
    });

    fireEvent(resetButton, createEvent.click(resetButton));

    expect(mockHandleChange).toHaveBeenCalled();
  });

  it("should handle quanity change", async () => {
    const { findByRole } = renderProduct(10);

    const input = await findByRole("textbox");
    fireEvent(input, createEvent.change(input, { target: { value: 2 } }));

    expect(mockHandleChange).toHaveBeenCalledWith(2);
  });
});
