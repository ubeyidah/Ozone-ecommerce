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
    })
  }
  saveCart();
}


// update and display the quantity of the cart
export function updateCartQuantity(elementClass) {
  let cartQuantity = 0;
  cart.forEach(item => cartQuantity += item.quantity);
  document.querySelectorAll(elementClass).forEach(element => element.textContent = cartQuantity);
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
