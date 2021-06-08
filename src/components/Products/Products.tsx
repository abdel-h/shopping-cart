import React from "react";
import { useStore } from "../../utils/appReducer";
import { ProductItem } from "./Item";

export function ProductsContainer() {
  const { state, dispatch } = useStore();

  const { productsList } = state;

  function handleAddToCart(productKey: string) {
    const product = productsList.find(
      (product) => product.productKey === productKey
    );

    if (product) {
      dispatch({ type: "ADD_TO_CART", value: product });
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
      {productsList.map((product) => (
        <ProductItem
          key={product.productKey}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}
