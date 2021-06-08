import React from "react";
import { render } from "@testing-library/react";

import { ProductsContainer } from "./Products";

describe("Products list component", () => {
  it("renders a list of products", () => {
    const { debug } = render(<ProductsContainer />);

    debug();
  });
});
