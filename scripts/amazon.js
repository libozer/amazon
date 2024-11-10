import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";

let timeAdded = {};

products.forEach((product) => {
  const mainBlock = document.querySelector(".js-products-grid");
  mainBlock.innerHTML += `
            <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${product.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png"
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
          </div>

          <div class="product-price">$${(product.priceCents / 100).toFixed(
            2
          )}</div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
            product.id
          }">Add to Cart</button>
        </div>
    `;
});

updateCartQuantity();

function updateCartQuantity() {
  let sumQuantity = 0;

  let quantityCart = JSON.parse(localStorage.getItem("carts"));
  quantityCart.forEach((cart) => {
    sumQuantity += Number(cart.quantity);
    console.log(sumQuantity);
  });
  document.querySelector(".js-cart-quantity").innerHTML = sumQuantity;
}

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    const addCart = document.querySelector(`.js-added-to-cart-${productId}`);

    if (!addCart.classList.contains("added-to-cart-opacity")) {
      addCart.classList.add("added-to-cart-opacity");
    }

    clearTimeout(timeAdded[productId]);
    timeAdded[productId] = setTimeout(() => {
      if (addCart.classList.contains("added-to-cart-opacity")) {
        addCart.classList.remove("added-to-cart-opacity");
      }
    }, 2000);

    addToCart(productId);
    updateCartQuantity();
    console.log(cart);
  });
});
