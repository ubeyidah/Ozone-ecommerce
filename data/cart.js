export let cart = JSON.parse(localStorage.getItem("cart")) || [
  {
    deliveryDateId: "1",
    productId: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
    quantity: 4,
  },
  {
    deliveryDateId: "3",
    productId: "54e0eccd-8f36-462b-b68a-8182611d9add",
    quantity: 4,
  },
];

// add products to cart
export const addToCart = (productId) => {
  const cartQuantitySelecotr = +document.querySelector(
    `.js-quantit-selector-${productId}`
  ).value;
  let matchItem;

  cart.forEach((item) => {
    if (productId === item.productId) {
      matchItem = item;
    }
  });

  // check if the product in the cart
  if (matchItem) {
    matchItem.quantity += cartQuantitySelecotr;
  } else {
    cart.push({
      productId,
      quantity: cartQuantitySelecotr,
      deliveryDateId: "1",
    });
  }
  saveCart();
};

// update and display the quantity of the cart
export function updateCartQuantity(elementClass) {
  let cartQuantity = 0;
  cart.forEach((item) => (cartQuantity += item.quantity));
  document.querySelectorAll(elementClass).forEach((element) => {
    const { productId } = element.dataset;
    if (!productId) {
      element.textContent = cartQuantity;
    } else {
      cart.forEach((item) => {
        if (item.productId === productId) {
          element.textContent = item.quantity;
        }
      });
    }
  });
}

// save cart in localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// delete cart
export const deleteCart = (productId) => {
  const newCart = cart.filter((cartItem) => cartItem.productId !== productId);
  cart = newCart;
  saveCart();
};

// update

export const updateCart = (productId, notification) => {
  const container = document.querySelector(`.js-checkout-${productId}`);
  const inputEl = document.querySelector(`.js-quantity-input-${productId}`);
  const quantityValue = +inputEl.value;
  container.classList.add("is-cart-editing");
  // validation
  if (!quantityValue || quantityValue < 1 || quantityValue >= 1000) {
    inputEl.style.borderColor = "red";
    let timeout;
    notification("Fill out the filed.", timeout);
    return;
  }

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cartItem.quantity = quantityValue;
    }
  });
  saveCart();
  updateCartQuantity(".js-cart-quantity");
  inputEl.value = "";
  container.classList.remove("is-cart-editing");
  let timeout;
  notification("Updated!", timeout, "sucess");
};

// update delivery option

export function updateDeliveryOption(productId, deliveryOptionId) {
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      cartItem.deliveryDateId = deliveryOptionId;
      saveCart();
    }
  });
}
