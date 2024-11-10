import { cart } from "../data/cart.js";
import { products } from "../data/products.js";

cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let matchingProduct;
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });
  const container = document.querySelector(".order-summary");
  const innerHTML = `
 <div class="cart-item-container">
            <div class="delivery-date">Delivery date: Tuesday, June 21</div>

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src="${matchingProduct.image}"
              />

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">$${(
                  matchingProduct.priceCents / 100
                ).toFixed(2)}</div>
                <div class="product-quantity">
                  <span> Quantity: <span class="quantity-label">${
                    cartItem.quantity
                  }</span> </span>
                  <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id-update="${
                    matchingProduct.id
                  }">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id-delete="${
                    matchingProduct.id
                  }">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                  />
                  <div>
                    <div class="delivery-option-date">Tuesday, June 21</div>
                    <div class="delivery-option-price">FREE Shipping</div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                  />
                  <div>
                    <div class="delivery-option-date">Wednesday, June 15</div>
                    <div class="delivery-option-price">$4.99 - Shipping</div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                  />
                  <div>
                    <div class="delivery-option-date">Monday, June 13</div>
                    <div class="delivery-option-price">$9.99 - Shipping</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
`;

  container.innerHTML += innerHTML;
});

function updateCartQuantity() {
  let sumQuantity = 0;

  let quantityCart = JSON.parse(localStorage.getItem("carts"));
  quantityCart.forEach((cart) => {
    sumQuantity += Number(cart.quantity);
  });

  document.querySelector(".js-return-to-home-link").innerHTML = sumQuantity;
}

updateCartQuantity();

document.querySelectorAll(".js-update-quantity-link").forEach((button) => {
  button.addEventListener("click", () => {
    const dataAtribute = button.dataset.productIdUpdate;
    cart.forEach((item) => {
      if (item.productId === dataAtribute) {
        item.quantity++;
      }

      localStorage.setItem("carts", JSON.stringify(cart));
    });
  });
});

document.querySelectorAll(".js-delete-quantity-link").forEach((button) => {
  button.addEventListener("click", () => {
    const dataAtribute = button.dataset.productIdDelete;
    cart.forEach((item) => {
      if (item.productId === dataAtribute) {
        item.quantity--;
      }
    });

    localStorage.setItem("carts", JSON.stringify(cart));
  });
});
