import { CartProduct } from "./../typing/common";
import R from "ramda";

export function addProductToCart(cart: CartProduct[], product: CartProduct) {
  const productInCartIndex = cart.findIndex(
    (cartProduct) => cartProduct.productKey === product.productKey
  );

  if (productInCartIndex === -1) {
    cart.push(product);

    return cart;
  }

  const { quantity, productKey } = product;

  return R.update(
    productInCartIndex,
    { productKey, quantity: quantity + 1 },
    cart
  );
}

export function updateProductInCart(
  cart: CartProduct[],
  productKey: string,
  quantity: number
) {
  const productInCartIndex = cart.findIndex(
    (cartProduct) => cartProduct.productKey === productKey
  );

  if (productInCartIndex === -1) {
    return cart;
  }

  return R.update(productInCartIndex, { productKey, quantity }, cart);
}
