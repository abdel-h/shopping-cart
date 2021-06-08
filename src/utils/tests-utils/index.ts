import { CartProduct } from "../../typing/common";

const productFixture = {
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

export const generateProductFixture = (type: "full" | "empty-quantity") => {
  switch (type) {
    case "empty-quantity":
      return emptyQuantityProductFixture;
    case "full":
      return productFixture;
  }
};

export const generateCartProductFixture = (
  productKey: string,
  quantity: number
): CartProduct => {
  return {
    productKey,
    quantity,
  };
};
