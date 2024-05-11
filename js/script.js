`use strict`;

// storing product Section variable
const productSection = document.querySelector(`.product-section`);

// clearing product section
productSection.innerHTML = ``;

// Dynamically generating html content
let html = `<div class="product-item">
          <img src="${product[0].image}" alt="product item" id="img-${
  product[0].id
}" />
        </div>
        <div class="product-details">
          <p>sneaker company</p>
          <div class="heading">
            <h1 id="title-${product[0].id}">${product[0].title}</h1>
          </div>
          <div class="product-description">
            <p>
              These low-profile sneakers are your perfect casual wear companion.
              Featuring a durable rubber outer sole, they will withstand
              everything the weather can offer.
            </p>
          </div>
          <div class="product-pricing">
            <div class="prices">
              <span class="discounted-price">$${product[0].discountPrice.toFixed(
                2
              )}</span>
              <span class="actual-price">$${product[0].actualPrice.toFixed(
                2
              )} </span>
            </div>
            <div class="discount">
              <span>${product[0].percentage}%</span>
            </div>
          </div>
          <div class="cart-buttons">
            <div class="item-count">
              <img src="./images/icon-minus.svg" alt="pus" id="minus-btn" />
              <span class="count-text">0</span>
              <img src="./images/icon-plus.svg" alt="" id="plus-btn" />
            </div>
            <button class="addBtn">Add to cart</button>
          </div>
        </div>`;

// Injecting dynamically generated html into product section
productSection.innerHTML = html;

// state variable
let count = 0;
let checkoutBtn;
// storing add product button
const addBtn = document.querySelector(`.addBtn`);

// storing increment product item into button
const incrementItem = document.getElementById(`plus-btn`);

// storing decrement product item into button
const decrementItem = document.getElementById(`minus-btn`);

// storing counted text into button
const productAdded = document.querySelector(`.count-text`);

// storing the cart button
const cartBtn = document.querySelector(`.cart-img`);

// storing product cart button
const productCart = document.querySelector(`.product-cart`);

// storing product item into row
const productRow = document.querySelector(`.row`);

// Modifying product items quantity

// Incrementing
incrementItem.addEventListener(`click`, (e) => {
  count++;
  console.log(count);
  productAdded.textContent = count;
});

// decrementing
decrementItem.addEventListener(`click`, (e) => {
  if (count > 0) {
    count--;
    productAdded.textContent = count;
  }
});

// Adding Product to the cart
addBtn.addEventListener(`click`, (e) => {
  // if added products greater 0
  if (count > 0) {
    // storing product name
    const productName = document.getElementById(
      `title-${product[0].id}`
    ).textContent;

    // storing product image
    const productImg = product[0].image;

    // storing product price
    const productPrice = product[0].discountPrice;

    // checking if product already in cart or not

    let newItem;
    let productItem = ``;
    let newCartItem = ``;
    cart.forEach((item) => {
      if (item.productName === productName) {
        newItem = item;
      }
    });
    // if item in cart aready then update quantity
    if (newItem) {
      // updating previous item quantity
      newItem.qty += count;

      // updting dom and showing updated price
      document.querySelector(`.total-price`).innerHTML = `$${newItem.price} X ${
        newItem.qty
      }  <span> $${newItem.price * newItem.qty}</span>`;
    }
    // if not then add new product to the cart
    else {
      cart.push({
        productImage: productImg,
        productName: productName,
        qty: count,
        price: productPrice,
      });

      // Adding product to the dom cart
      newCartItem += `
    <img src="${cart[0].productImage}" alt="cart item"  />
    <div class="item-details">
      <p>${cart[0].productName}</p>
      <p class="total-price">$${cart[0].price} X ${cart[0].qty}  <span> $${
        cart[0].price * cart[0].qty
      }</span></p>
    </div>
    <img src="./../images/icon-delete.svg" id="delete-btn"/>
    `;
      document.querySelector(`.row`).innerHTML = newCartItem;
    }

    // checking if cart contains checkout button
    if (!productCart.contains(checkoutBtn)) {
      checkoutBtn = document.createElement(`button`);
      checkoutBtn.textContent = `Checkout`;
      checkoutBtn.setAttribute(`id`, `checkout`);
      productCart.append(checkoutBtn);
    }

    // deleting product items from the cart

    // storing the delete button
    const deleteBtn = document.getElementById(`delete-btn`);

    // Adding event to the delete button
    deleteBtn.addEventListener(`click`, (e) => {
      // getting parent EL of delete button
      const parentEl = deleteBtn.parentElement;

      // removing chid element of delete button

      // getting parent element's last child
      let child = parentEl.lastElementChild;

      // removing all child elements from the product
      while (child) {
        parentEl.removeChild(child);
        child = parentEl.lastElementChild;
      }

      // setting state variables to the default value
      cart = [];
      productItem = ``;
      newCartItem = ``;

      // removing the checkout button
      checkoutBtn.remove();
    });

    // Checkout Product Items
    checkoutBtn.addEventListener(`click`, (e) => {
      productCart.classList.add(`hidden-cart`);
    });
  }
});

cartBtn.addEventListener(`click`, (e) => {
  productCart.classList.toggle(`hidden-cart`);
});
