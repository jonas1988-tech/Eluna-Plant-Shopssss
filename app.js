const closeButton = document.querySelector(".close");
const openButton = document.querySelector(".ham");
const menu = document.querySelector(".menu");

closeButton.addEventListener("click", () => {
  menu.style.visibility = "hidden";
});

openButton.addEventListener("click", () => {
  menu.style.visibility = "visible";
});

function searchProducts() {
  let input = document.getElementById('input').value.toLowerCase();
  let items = document.getElementsByClassName('items');
  
  for (let i = 0; i < items.length; i++) {
    let itemName = items[i].querySelector('.name').textContent.toLowerCase();
    
    if (itemName.includes(input)) {
      items[i].style.display = "block";
    } else {
      items[i].style.display = "none";
    }
  }
}

const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
  button.addEventListener('click', addToCartClicked);
});

function addToCartClicked(event) {
  const button = event.target;
  const item = button.parentElement;
  const name = item.querySelector('.name').textContent;
  const price = item.querySelector('.price').textContent;
  addItemToCart(name, price);
}

function addItemToCart(name, price) {
  const cartRow = document.createElement('div');
  cartRow.classList.add('cart-row');
  const cartItems = document.querySelector('.cart-items');
  const cartItemNames = cartItems.querySelectorAll('.cart-item-name');
  
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].textContent === name) {
      alert('This item is already added to the cart');
      return;
    }
  }
  
  const cartRowContents = `
    <div class="cart-item">
      <span class="cart-item-name">${name}</span>
      <span class="cart-item-price">${price}</span>
      <button class="remove-item">Remove</button>
    </div>`;
  
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  updateCartTotal();
  
  const removeButton = cartRow.querySelector('.remove-item');
  removeButton.addEventListener('click', removeItemFromCart);
}

function updateCartTotal() {
  const cartItemPrices = document.querySelectorAll('.cart-item-price');
  let total = 0;
  
  for (let i = 0; i < cartItemPrices.length; i++) {
    const priceText = cartItemPrices[i].textContent;
    const price = parseFloat(priceText.substring(1));
    
    if (!isNaN(price)) {
      total += price;
    }
  }
  
  total = Math.round(total * 100) / 100;
  const cartTotalPrice = document.querySelector('.cart-total-price');
  cartTotalPrice.textContent = '₱' + total.toFixed(2);
}

function removeItemFromCart(event) {
  if (event.target.classList.contains('remove-item')) {
    const cartItem = event.target.parentElement;
    const itemPrice = parseFloat(cartItem.children[1].textContent.substring(1));
    
    // Remove the cart item
    cartItem.remove();
  
    // Update the total price
    const cartTotalPrice = document.querySelector('.cart-total-price');
    const totalPrice = parseFloat(cartTotalPrice.textContent.substring(1));
    cartTotalPrice.textContent = '₱' + (totalPrice - itemPrice).toFixed(2);
  }
}

const backToTopBtn = document.getElementById("backToTop");

// Function to scroll back to top
function scrollToTop() {
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, Opera
  document.body.scrollTop = 0; // For Safari
}

//
