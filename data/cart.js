export const cart = JSON.parse(localStorage.getItem("carts")) || [];

export function addToCart(productId) {
  let matchingItem;
  cart.forEach((value) => {
    if (productId === value.productId) {
      matchingItem = value;
    }
  });

  const quantitySelector = document.querySelector(
    `.js-quantity-selector-${productId}`
  ).value;

  if (matchingItem) {
    matchingItem.quantity += Number(quantitySelector);
  } else {
    cart.push({
      productId: productId,
      quantity: Number(quantitySelector),
    });
  }

  localStorage.setItem("carts", JSON.stringify(cart));
}
