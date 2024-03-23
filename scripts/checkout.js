import { cart, deleteCart, deleteCartFromHTML, updateCartQuantity, updateCart } from "../data/cart.js";
import { products } from "../data/products.js"
import { formatCurrency } from "./utils/money.js";

updateCartQuantity('.js-cart-quantity');
let orderSummuryHTML = '';
cart.forEach(cartItem => {
  const { productId, quantity } = cartItem;
  let matchingItem;
  products.forEach(product => {
    if (product.id === productId) {
      matchingItem = product;
    }
  });

  orderSummuryHTML += `
    <div class="checkout js-checkout-${matchingItem.id}">
    <h2>Delivery date: Tuesday, June 21</h2>
    <div class="checkout-product-grid">
      <div class="product-img">
        <img src=${matchingItem.image} alt="product">
      </div>
      <div class="product-detail">
        <h3 class="delivery-product__name">${matchingItem.name}</h3>
        <h4 class="delivery-product__price">$${formatCurrency(matchingItem.priceCents)}</h4>
        <div class="action">
        <span class="js-cart-quantity" data-product-id="${matchingItem.id}">Quantity: ${quantity}</span>
        <span class="delivery-product-action js-update-links" data-product-id="${matchingItem.id}">Update</span>
        <span class="delivery-product-action js-delete-links" data-product-id="${matchingItem.id}">Delete</span>
        </div>
        <div class="update-container">
        <span class="js-cart-quantity">Quantity: </span>
        <input placeholder="${quantity}..." class="js-quantity-input-${matchingItem.id}">
        <span class="delivery-product-action js-save-links"  data-product-id="${matchingItem.id}">Save</span>
        <span class="delivery-product-action js-cancel-links"  data-product-id="${matchingItem.id}">Cancel</span>
        
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
      // delete from cart
      deleteCart(productId);
      updateCartQuantity('.js-cart-quantity');

      // delete from HTML
      deleteCartFromHTML(productId);
    });
  });

// update
// open update 
document.querySelectorAll('.js-update-links')
  .forEach(updateLink => {
    updateLink.addEventListener('click', () => {
      const { productId } = updateLink.dataset;
      const container = document.querySelector(`.js-checkout-${productId}`);
      container.classList.add('is-cart-editing');
    });
  });

// cancel
document.querySelectorAll('.js-cancel-links')
  .forEach(cancelLink => {
    cancelLink.addEventListener('click', () => {
      const { productId } = cancelLink.dataset;
      const container = document.querySelector(`.js-checkout-${productId}`);
      container.classList.remove('is-cart-editing')
    });
  });

document.querySelectorAll('.js-save-links')
  .forEach(saveLink => {
    const { productId } = saveLink.dataset;
    saveLink.addEventListener('click', () => {
      updateCart(productId);
    });
  });
