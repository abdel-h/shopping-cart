import { Product } from "./../typing/common";

export function addProductToCart(cart: Product[], products: Product[]) {
  return products.reduce((acc, product) => {
    const { productKey } = product;

    const productInCartIndex = acc.findIndex(
      (product) => product.productKey === productKey
    );

    if (productInCartIndex !== -1) {
      acc[productInCartIndex] = {
        ...cart[productInCartIndex],
        quantity: cart[productInCartIndex].quantity + product.quantity,
      };

      return acc;
    }

    acc.push(product);

    return acc;
  }, cart);
}

export function updateProductInCart(
  cart: Product[],
  productKey: string,
  quantity: number
) {
  const productIndex = cart.findIndex(
    (product) => product.productKey === productKey
  );

  if (productIndex !== -1) {
    cart[productIndex].quantity = quantity;
  }

  return [...cart];
}
