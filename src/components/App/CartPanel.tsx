import React from "react";
import { Button } from "react-bootstrap";
import { Product, StoreAction } from "../../typing/common";
import { SingleProduct } from "../Products/Product";

type Props = {
  cart: Product[];
  dispatch: React.Dispatch<StoreAction>;
};

export function CartPanel({ cart, dispatch }: Props) {
  function handleQuantityChange(productKey: string) {
    return (value: number) => {
      dispatch({ type: "UPDATE_PRODUCT", productKey, quanity: value });
    };
  }

  function handlePayOrder() {
    dispatch({ type: "CREATE_ORDER" });
    dispatch({ type: "RESET_CART" });
  }

  const isCartEmpty = cart.every(({ quantity }) => quantity === 0);

  return (
    <>
      <div>Cart Page content</div>
      {cart.map(({ productKey, quantity }) => (
        <SingleProduct
          key={productKey}
          product={{
            productKey,
            quantity,
          }}
          onChange={handleQuantityChange(productKey)}
        />
      ))}
      <Button disabled={isCartEmpty} onClick={handlePayOrder}>
        Pay
      </Button>
    </>
  );
}
