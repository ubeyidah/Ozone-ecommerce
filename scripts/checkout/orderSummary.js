import {
  cart,
  deleteCart,
  updateCartQuantity,
  updateCart,
  updateDeliveryOption,
} from "./../../data/cart.js";
import { getProduct, products } from "./../../data/products.js";
import formatCurrency from "./../utils/money.js";
import { notification } from "./../utils/alert.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "./../../data/deliveryOptions.js";
import datePicker from "./../utils/date.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary() {
  updateCartQuantity(".js-cart-quantity");
  let orderSummuryHTML = "";
  cart.forEach((cartItem) => {
    const { productId, quantity } = cartItem;
    let matchingItem = getProduct(productId);
    // working for days based on the user selection
    let matchingDeliveryOption = getDeliveryOption(cartItem.deliveryDateId);

    const daysString = datePicker(matchingDeliveryOption.deliveryDays);

    orderSummuryHTML += `
    <div class="checkout js-checkout-${matchingItem.id}">
    <h2>Delivery date: ${daysString}</h2>
    <div class="checkout-product-grid">
      <div class="product-img">
        <img src=${matchingItem.image} alt="product">
      </div>
      <div class="product-detail">
        <h3 class="delivery-product__name">${matchingItem.name}</h3>
        <h4 class="delivery-product__price">$${formatCurrency(
          matchingItem.priceCents
        )}</h4>
        <div class="action">
        <span class="js-cart-quantity" data-product-id="${
          matchingItem.id
        }">Quantity: ${quantity}</span>
        <span class="delivery-product-action js-update-links" data-product-id="${
          matchingItem.id
        }">Update</span>
        <span class="delivery-product-action js-delete-links" data-product-id="${
          matchingItem.id
        }">Delete</span>
        </div>
        <div class="update-container">
        <span>Quantity: </span>
        <input name="input-${productId}" placeholder="..." autofocus class="js-quantity-input-${
      matchingItem.id
    } js-quantity-input"  data-product-id="${matchingItem.id}">
        <span class="delivery-product-action js-save-links"  data-product-id="${
          matchingItem.id
        }">Save</span>
        <span class="delivery-product-action js-cancel-links"  data-product-id="${
          matchingItem.id
        }">Cancel</span>
        </div>
        </div>
        <div class="delivery-options">
        <h3>Choose a delivery option:</h3>
        ${deliveryOptionHTML(matchingItem.id, cartItem.deliveryDateId)}
      </div>
      </div>
    </div>
  `;
  });

  document.querySelector(".js-order-summary-lists").innerHTML =
    orderSummuryHTML;

  //generate delivery options
  function deliveryOptionHTML(productId, deliveryId) {
    let html = "";
    deliveryOptions.forEach((option) => {
      //working with price
      const priceString = !option.priceCents
        ? "FREE"
        : `$${formatCurrency(option.priceCents)}`;
      //workin with delivery date
      const daysString = datePicker(option.deliveryDays);
      //working with option selection
      const isChecked = deliveryId === option.id ? "checked" : "";
      html += `
    <div class="option js-delivery-option" data-product-id="${productId}" data-option-id="${
        option.id
      }">
      <input type="radio" name="option-${productId}" ${isChecked} id="option2-${
        productId + deliveryId
      }">
      <div>
        <label for="option2-${productId + deliveryId}">${daysString}</label>
        <p>${priceString} - Shipping</p>
      </div>
    </div>`;
    });

    return html;
  }

  // delete cart
  document.querySelectorAll(".js-delete-links").forEach((del) => {
    del.addEventListener("click", () => {
      const { productId } = del.dataset;
      // delete from cart
      deleteCart(productId);
      updateCartQuantity(".js-cart-quantity");
      renderPaymentSummary();
    });
  });

  // update
  document.querySelectorAll(".js-update-links").forEach((updateLink) => {
    updateLink.addEventListener("click", () => {
      const { productId } = updateLink.dataset;
      const container = document.querySelector(`.js-checkout-${productId}`);
      container.classList.add("is-cart-editing");
    });
  });

  // cancel
  document.querySelectorAll(".js-cancel-links").forEach((cancelLink) => {
    cancelLink.addEventListener("click", () => {
      const { productId } = cancelLink.dataset;
      const container = document.querySelector(`.js-checkout-${productId}`);
      container.classList.remove("is-cart-editing");
    });
  });

  // update the cart
  document.querySelectorAll(".js-save-links").forEach((saveLink) => {
    const { productId } = saveLink.dataset;
    saveLink.addEventListener("click", () => {
      updateCart(productId, notification);
      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".js-quantity-input").forEach((input) => {
    input.addEventListener("keydown", (e) => {
      const { productId } = input.dataset;
      if (e.key === "Enter") {
        updateCart(productId, notification);
        renderPaymentSummary();
      }
    });
  });

  // update delivery option
  document.querySelectorAll(".js-delivery-option").forEach((optionLink) => {
    optionLink.addEventListener("click", () => {
      const { productId, optionId } = optionLink.dataset;
      updateDeliveryOption(productId, optionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
