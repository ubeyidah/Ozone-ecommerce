let productsHTML = '';
products.forEach(product => {
  productsHTML += `
  <div class="product-container">
    <div class="product-container__img center">
      <img src="${product.image}" alt="${product.name}">
    </div>

    <p class="product-container__name">${product.name}</p>
    <div class="product-container__rating center"><img src="images/ratings/rating-${product.rating.stars * 10}.png"
        alt="rating"><span>${product.rating.count}</span>
    </div>
    <p class="product-container__pricing">$${(product.priceCents / 100).toFixed(2)}</p>

    <select name="product" class="product-container__selector">
      <option value="1">1</option>
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
    <div class="add-to-cart center">
      <img src="images/icons/checkmark.png" alt="checkmark">Added
    </div>
    <button class="product-container__add-btn js-add-to-cart-btn" data-product-id="${product.id}">
       Add to Cart
    </button>
  </div>
  `;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;


// make the button interactive
document.querySelectorAll('.js-add-to-cart-btn')
  .forEach(button => {
    button.addEventListener("click", () => {
      const { productId } = button.dataset;
      let matchItem;

      cart.forEach(item => {
        if (productId === item.productId) {
          matchItem = item;
        }
      });

      // check if the product in the cart
      if (matchItem) {
        matchItem.quantity++;
      } else {
        cart.push({
          productId,
          quantity: 1
        })
      }

      console.log(cart);
      updateCartQuantity();
    });
  });


function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach(item => cartQuantity += item.quantity);
  document.querySelector('.js-cart-quantity')
    .textContent = cartQuantity > 99 ? 99 + ' +' : cartQuantity;
}