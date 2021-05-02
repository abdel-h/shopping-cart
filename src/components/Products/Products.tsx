import React, { useState } from "react";
import { Button, CardColumns } from "react-bootstrap";
import { Product } from "../../typing/common";
import { SingleProduct } from "./Product";

type Props = {
  products: Product[];
  onSubmit: (products: Product[]) => void;
};

export function ProductsContainer({ products, onSubmit }: Props) {
  const formInitialState = products.reduce<{
    [productKey: string]: number;
  }>((acc, { productKey }) => {
    acc[productKey] = 0;
    return acc;
  }, {});

  const [formState, setFormState] = useState<{
    [productKey: string]: number;
  }>(formInitialState);

  const isFormEmpty = Object.values(formState).every(
    (quantity) => quantity === 0
  );

  function handleReset() {
    setFormState(formInitialState);
  }

  function handleAddToCart() {
    const formStateToArray = Object.entries(formState ?? {}).map(
      ([productKey, quantity]) => ({
        productKey,
        quantity,
      })
    );

    onSubmit(formStateToArray);
  }

  function handleProductQuantityChange(productKey: string) {
    return (value: number) => {
      setFormState((state) => ({
        ...state,
        [productKey]: value,
      }));
    };
  }

  return (
    <div>
      <div className="d-flex justify-content-end mb-3">
        <Button disabled={isFormEmpty} onClick={handleReset} className="mr-3">
          Reset
        </Button>
        <Button disabled={isFormEmpty} onClick={handleAddToCart}>
          Add to cart
        </Button>
      </div>

      <CardColumns>
        {products.map(({ productKey }) => (
          <SingleProduct
            key={productKey}
            product={{
              productKey: productKey,
              quantity: formState[productKey],
            }}
            onChange={handleProductQuantityChange(productKey)}
          />
        ))}
      </CardColumns>
    </div>
  );
}
