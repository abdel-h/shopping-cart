import React from "react";
import { Button, Card, Form } from "react-bootstrap";

type Props = {
  product: {
    productKey: string;
    quantity: number;
  };

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
    <>
      <Card>
        <Card.Img
          variant="top"
          height={150}
          style={{ objectFit: "cover" }}
          src="https://images.unsplash.com/photo-1593280443077-ae46e0100ad1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1275&q=80"
        />
        <Card.Body>
          <Card.Title>Product name</Card.Title>
          <Card.Text>
            <div className="align-items-center d-flex">
              <Form.Control
                size="sm"
                type="number"
                role="textbox"
                onChange={handleChange}
                value={quantity}
                className="mr-4"
                min={0}
              />
              <Button
                disabled={quantity === 0}
                onClick={handleReset}
                className="w-100"
              >
                Reset Quantity
              </Button>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
