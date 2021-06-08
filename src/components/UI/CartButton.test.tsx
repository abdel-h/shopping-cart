import React from "react";
import { render, within } from "@testing-library/react";
import { CartButton } from "./CartButton";
import { generateCartProductFixture } from "../../utils/tests-utils";
import * as store from "../../utils/appReducer";

const defaultStoreCart = [
  generateCartProductFixture("productKey_10", 1),
  generateCartProductFixture("productKey_3", 1),
];

describe("CartButton", () => {
  it("renders a button with a default text", () => {
    const { getByRole } = render(<CartButton />);
    const button = getByRole("button", { name: /view cart/i });

    expect(button).not.toBeNull();
  });

  it("renders a button with number of items in the cart", () => {
    const { getByRole } = render(<CartButton />);
    const button = getByRole("button", { name: /view cart/i });

    expect(button).not.toBeNull();
  });

  it("will not render the badge if there are no items in the cart", () => {
    jest.spyOn(store, "useStore").mockReturnValue({ state: { cart: [] } });

    const { getByRole } = render(<CartButton />);

    const button = getByRole("button", {
      name: /view cart/i,
    });

    const countTextContainer = within(button).queryByText("0");

    expect(countTextContainer).toBeNull();
  });
  it("renders a badge with the cart items count", () => {
    jest
      .spyOn(store, "useStore")
      .mockReturnValue({ state: { cart: defaultStoreCart } });

    const { getByRole } = render(<CartButton />);

    const button = getByRole("button", {
      name: /view cart/i,
    });

    const countTextContainer = within(button).getByText(
      defaultStoreCart.length
    );

    expect(countTextContainer.textContent).toBe(`${defaultStoreCart.length}`);
  });
});
