`use strict`;
import { products } from "./products.js";
// import { cart } from "./cart.js";

// state variable
let count = 0;
let cart = [];
// Getting Acess to all the dynamic elements

const addCartBtn = document.getElementById(`add-Cart-Btn`);
const increaseQtyBtn = document.getElementById(`plus-btn`);
const decreaseQtyBtn = document.getElementById(`minus-btn`);
const showQty = document.querySelector(`.item-qty`);

const optionProducts = document.querySelectorAll(`.choice-img`);

const productImg = document.querySelector(`.product-img`);
const cartBtn = document.querySelector(`.cart-img`);
const productTopPart = document.querySelector(`.product-top-part`);
const productShoppingCart = document.querySelector(`.navbar-product-cart`);

// When Page Loads at start
// *************************************
// *************************************
userChoosenProduct(optionProducts[0]);
generateProduct(0);

// **************************************
// **************************************

// Generating Dynamic HTML FOR the product

function generateProduct(index) {
  // State variables
  let productHTML = ``;
  // creating product image and inserting it into the dom
  productImg.innerHTML = ``;

  const productImage = document.createElement(`img`);
  productImage.src = `${products[index][`image`]}`;
  productImage.classList.add(`img-product`);
  productImage.setAttribute(`alt`, `Product-${index + 1} Image`);

  productImg.append(productImage);

  // ***************************
  // ***************************
  // Generating HTML For the Product Details
  productHTML = `
   <div class="company" data-product-id="${products[index][`id`]}">
          <p class="product-company">sneaker company</p>
    </div>

    <div class="product-title">
      <h2>${products[index][`title`]}</h2>
    </div>

    <div class="product-description">
        <p>
            These low-profile sneakers are your perfect casual wear
            companion. Featuring a durable rubber outer sole, they will
            withstand everything the weather can offer.
        </p>
    </div>

    <div class="product-pricing">
        <p class="discounted-price">$${products[index][`discountPrice`].toFixed(
          2
        )}</p>
        <p class="total-discount">
        ${products[index][`percentage`]}%
        </p>
    </div>

    <div class="actual-price">
        $${products[index].actualPrice.toFixed(2)}
    </div>

  
  `;

  // Appending it to the dom
  productTopPart.innerHTML = productHTML;
}

// ***********************************
// ***********************************

// adding feature of product choices to the the, so when any product got chosen it's styling got changed

function userChoosenProduct(choice) {
  // Changing the style of the product
  optionProducts.forEach((optionChoice) => {
    if (optionChoice !== choice) {
      optionChoice.classList.remove(`active`);
    } else {
      optionChoice.classList.add(`active`);
    }
  });
}

optionProducts.forEach((optionChoice, index) => {
  optionChoice.addEventListener(`click`, function (e) {
    userChoosenProduct(optionChoice);
    generateProduct(index);
  });
});

// ***********************************
// ***********************************

// Adding updating product qty feature to the cart
increaseQtyBtn.addEventListener(`click`, function (e) {
  count++;
  showQty.textContent = count;
});

decreaseQtyBtn.addEventListener(`click`, function (e) {
  // condition to check if count < 0 and re-assign value of count
  count <= 0 ? (count = 0) : count--;
  showQty.textContent = count;
});

// **********************************
// **********************************

// Adding add to cart button feature

addCartBtn.addEventListener(`click`, function (e) {
  // Getting the productId of the product
  const div = document.querySelector(`.company`);
  const productId = div.dataset.productId;

  // Now checking if product is already in the cart

  let mathcingItem;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      mathcingItem = cartItem;
    }
  });

  if (mathcingItem) {
    // updating the product quantity
    if (count > 0) {
      mathcingItem.qty += count;
    } else {
      mathcingItem.qty += 1;
    }
  } else {
    // Adding product to the cart
    cart.push({
      productId: productId,
      qty: count > 0 ? count : 1,
    });
  }

  console.log(cart);

  // function to update total products at cart
  totalCartProducts();
});

// ***********************************
// ***********************************

// Now adding feature to show items in the product-cart

cartBtn.addEventListener(`click`, (e) => {
  // Itterating over cart

  // console.log(`cart got open`);
  let cartItemHTML = ``;
  cart.forEach((cartItem) => {
    // **************************
    // **************************

    // finding the productId from the products

    let mathcingItem;

    products.forEach((productItem) => {
      if (cartItem.productId === productItem.id) {
        mathcingItem = productItem;
      }
    });

    // ***************************
    // ***************************
    cartItemHTML += `
       <div class="product-row product-row-${cartItem.productId}">
         <div class="product-row-img-container">
           <img class="product-row-img" src="${mathcingItem[`image`]}">
         </div>
         <p class="row-product-name">
           ${mathcingItem[`title`]}
         </p>
         <p class="row-product-qty">
           Item Quantity:
           ${cartItem.qty}
         </p>
         <p class="row-total-product-price">
           Product-Price:
           ${cartItem.qty * mathcingItem.discountPrice}
         </p>
         <div class="delete-btn" data-cart-id="${cartItem.productId} ">
           <img class="delete-btn-icon" src="../images/icon-delete.svg">
         </div>
       </div>
     `;
  });

  // Appending all these producs to the cart

  productShoppingCart.innerHTML = cartItemHTML;

  // *******************************
  // *******************************

  // Showing and hiding the product Cart

  productShoppingCart.classList.toggle(`hidden-cart`);

  // *********************************
  // *********************************

  // Feature to remove product from shopping cart

  const deleteBtns = document.querySelectorAll(`.delete-btn`);

  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener(`click`, function (e) {
      const productId = deleteBtn.dataset.cartId;
      // console.log(typeof productId);
      removeProduct(productId);
    });
  });
});

// function to remove product from the cart

function removeProduct(productId) {
  const newProductId = productId.trim().toString();
  cart.forEach((cartItem, i) => {
    let newCartProductId = cartItem.productId.trim().toString();

    if (newCartProductId === newProductId) {
      // finding index of the cartItem

      let itemIndex = cart.indexOf(cartItem);

      // removing item from the cart
      cart.splice(itemIndex, 1);

      // now updating cart dom
      document.querySelector(`.product-row-${cartItem.productId}`).remove();
    }
  });

  totalCartProducts();
  console.log(cart);
}

// function to get the total products at the cart

function totalCartProducts() {
  let totalCartItems = cart.length;

  // updating the total products at the cart dom

  document.getElementById(`total-cart-products`).textContent = totalCartItems;
}

totalCartProducts();
