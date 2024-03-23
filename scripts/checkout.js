import { cart, deleteCart } from "../data/cart.js";
import { products } from "../data/products.js"
import { formatCurrency } from "./utils/money.js";

let orderSummuryHTML = '';
cart.forEach(cartItem => {
  const { productId } = cartItem;
  let matchingItem;
  products.forEach(product => {
    if (product.id === productId) {
      matchingItem = product;
    }
  });

  orderSummuryHTML += `
    <div class="checkout">
    <h2>Delivery date: Tuesday, June 21</h2>
    <div class="checkout-product-grid">
      <div class="product-img">
        <img src=${matchingItem.image} alt="product">
      </div>
      <div class="product-detail">
        <h3 class="delivery-product__name">${matchingItem.name}</h3>
        <h4 class="delivery-product__price">$${formatCurrency(matchingItem.priceCents)}</h4>
        <div>
          <span>Quantity: 2</span>
          <span class="delivery-product-action">Update</span>
          <span class="delivery-product-action js-delete-links" data-product-id="${matchingItem.id}">Delete</span>
        </div>
      </div>
      <div class="delivery-options">
        <h3>Choose a delivery option:</h3>

        <div class="option">
          <input type="radio" name="option-${matchingItem.id}" id="option1-${matchingItem.id}">
          <div>
            <label for="option1-${matchingItem.id}">Tuesday, June 21</label>
            <p>FREE Shipping</p>
          </div>
        </div>

        <div class="option">
          <input type="radio" name="option-${matchingItem.id}" checked id="option2-${matchingItem.id}">
          <div>
            <label for="option2-${matchingItem.id}">Wednesday, June 15</label>
            <p>$4.99 - Shipping</p>
          </div>
        </div>

        <div class="option">
          <input type="radio" name="option-${matchingItem.id}" id="option3-${matchingItem.id}">
          <div>
            <label for="option3-${matchingItem.id}">Monday, June 13</label>
            <p>$9.99 - Shipping</p>
          </div>
        </div>

      </div>
      </div>
    </div>
  `;
});

document.querySelector('.js-order-summary-lists')
  .innerHTML = orderSummuryHTML;


// delete cart
document.querySelectorAll('.js-delete-links')
  .forEach(del => {
    del.addEventListener('click', () => {
      const { productId } = del.dataset;
      deleteCart(productId);
    })
  })