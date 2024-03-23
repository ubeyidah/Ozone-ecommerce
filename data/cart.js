export let cart = JSON.parse(localStorage.getItem('cart')) || [];

// add products to cart
export const addToCart = (productId) => {
  const cartQuantitySelecotr = +document.querySelector(`.js-quantit-selector-${productId}`).value;
  let matchItem;

  cart.forEach(item => {
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
      quantity: cartQuantitySelecotr
    });
  }
  saveCart();
}


// update and display the quantity of the cart
export function updateCartQuantity(elementClass) {
  let cartQuantity = 0;
  cart.forEach(item => cartQuantity += item.quantity);
  document.querySelectorAll(elementClass).forEach(element => {
    const { productId } = element.dataset;
    if (!productId) {
      element.textContent = cartQuantity;
    } else {
      cart.forEach(item => {
        if (item.productId === productId) {
          element.textContent = item.quantity;
        };
      });
    };
  });
}

// save cart in localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}


// delete cart
export const deleteCart = productId => {
  const newCart = cart.filter(cartItem => cartItem.productId !== productId);
  cart = newCart;
  saveCart();
}

// delete from HTML or render HTML
export const deleteCartFromHTML = (productId) => {
  const container = document.querySelector(`.js-checkout-${productId}`);
  container.remove();
}


// update

export const updateCart = (productId) => {
  const container = document.querySelector(`.js-checkout-${productId}`);
  const inputEl = document.querySelector(`.js-quantity-input-${productId}`);
  const quantityValue = +inputEl.value;

  container.classList.add('is-cart-editing');
  if (!quantityValue || quantityValue < 1 || quantityValue >= 1000) {
    inputEl.style.borderColor = "red";
    return;
  }

  cart.forEach(cartItem => {
    if (cartItem.productId === productId) {
      cartItem.quantity = quantityValue;
    }
  });
  saveCart();
  updateCartQuantity('.js-cart-quantity');
  container.classList.remove('is-cart-editing');
}