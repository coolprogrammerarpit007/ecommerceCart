`use strict`;

// Getting Acess to all the dynamic elements

const addCartBtn = document.getElementById(`add-Cart-Btn`);
const increaseQtyBtn = document.getElementById(`plus-btn`);
const decreaseQtyBtn = document.getElementById(`minus-btn`);
const showQty = document.querySelector(`.item-qty`);

const optionProducts = document.querySelectorAll(`.choice-img`);

// ***********************************
// adding feature of product choices to the the, so when any product got chosen it's styling got changed

const userChoosenProduct = (choice) => {
  // Changing the style of the product
  optionProducts.forEach((optionChoice) => {
    if (optionChoice !== choice) {
      optionChoice.classList.remove(`active`);
    } else {
      optionChoice.classList.add(`active`);
    }
  });
};

optionProducts.forEach((optionChoice) => {
  optionChoice.addEventListener(`click`, function (e) {
    userChoosenProduct(optionChoice);
  });
});
