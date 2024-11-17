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
 <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
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
                  <span class="update-quantity-link link-primary js-update-quantity-link js-update-quantity-link-${
                    matchingProduct.id
                  }" data-product-id-update="${matchingProduct.id}">
                    Update
                  </span>
                  <input class="quantity-input quantity-input-none js-quantity-input-${
                    matchingProduct.id
                  }">
                  <span class="save-quantity-link save-quantity-link-none link-primary js-save-quantity-link-${
                    matchingProduct.id
                  }">Save</span>
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

function saveQuantity(inputElement, spanElement, update, item) {
  let valueInput = Number(inputElement.value);
  if (valueInput < 0 || valueInput > 1000 || isNaN(valueInput)) {
    alert("Введите коректное значение");
    return;
  }
  if (
    !inputElement.classList.contains("quantity-input-none") &&
    !spanElement.classList.contains("save-quantity-link-none")
  ) {
    update.classList.toggle("js-update-opacity");
    inputElement.classList.add("quantity-input-none");
    spanElement.classList.add("save-quantity-link-none");
  }
  item.quantity = valueInput;

  let quantity = document.querySelector(".quantity-label");
  quantity.innerHTML = valueInput;

  localStorage.setItem("carts", JSON.stringify(cart));
}

function updateCartQuantity() {
  let sumQuantity = 0;

  let quantityCart = JSON.parse(localStorage.getItem("carts")) || [];
  quantityCart.forEach((cart) => {
    sumQuantity += Number(cart.quantity);
  });

  document.querySelector(
    ".js-return-to-home-link"
  ).innerHTML = `${sumQuantity} items`;
}

updateCartQuantity();

document.querySelectorAll(".js-update-quantity-link").forEach((button) => {
  button.addEventListener("click", () => {
    const dataAtribute = button.dataset.productIdUpdate;

    cart.forEach((item) => {
      if (item.productId === dataAtribute) {
        let inputElement = document.querySelector(
          `.js-quantity-input-${dataAtribute}`
        );

        let spanElement = document.querySelector(
          `.js-save-quantity-link-${dataAtribute}`
        );

        let update = document.querySelector(
          `.js-update-quantity-link-${dataAtribute}`
        );

        if (
          inputElement.classList.contains("quantity-input-none") &&
          spanElement.classList.contains("save-quantity-link-none")
        ) {
          update.classList.toggle("js-update-opacity");
          inputElement.classList.remove("quantity-input-none");
          spanElement.classList.remove("save-quantity-link-none");
        }

        spanElement.addEventListener(
          "click",
          () => {
            saveQuantity(inputElement, spanElement, update, item);

            updateCartQuantity();
          },
          { once: true }
        );

        inputElement.addEventListener("keyup", (event) => {
          if (event.key === "Enter") {
            saveQuantity(inputElement, spanElement, update, item);

            updateCartQuantity();
          }
        });
      }
    });
  });
});

document.querySelectorAll(".js-delete-quantity-link").forEach((button) => {
  button.addEventListener("click", () => {
    const dataAtribute = button.dataset.productIdDelete;

    cart.forEach((item, index) => {
      if (item.productId === dataAtribute) {
        cart.splice(index, 1);

        let removeElement = document.querySelector(
          `.js-cart-item-container-${dataAtribute}`
        );

        removeElement.remove();
        localStorage.setItem("carts", JSON.stringify(cart));

        updateCartQuantity();
      }
    });

    console.log(cart);
    localStorage.setItem("carts", JSON.stringify(cart));
  });
});
