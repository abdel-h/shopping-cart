import React from "react";
import { Button, Form } from "react-bootstrap";
import { Product } from "../../typing/common";

type Props = {
  product: Product;

  onChange: (value: number) => void;
};

export function SingleProduct({ product, onChange }: Props) {
  const { quantity } = product;

  function handleReset() {
    onChange(0);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;

    onChange(parseInt(value));
  }

  return (
    <div key={product.productKey}>
      <Form.Label column sm="2">
        Quantity
      </Form.Label>
      <Form.Control
        size="sm"
        type="number"
        role="textbox"
        onChange={handleChange}
      />
      <Button disabled={quantity === 0} onClick={handleReset}>
        Reset Quantity
      </Button>
    </div>
  );
}
