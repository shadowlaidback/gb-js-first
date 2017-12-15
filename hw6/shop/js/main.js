"use strict";
/**
 * Home work 6
 */

/* --- 2 --- */

function createElement(node, classElement){
  var element = document.createElement(node);

  if(typeof classElement !== "undefined"){
    element.classList.add(classElement);
  }

  return element;
}

function findElementCart(idProduct){
  var cartItems = document.getElementsByClassName(classCartItems);

  for (var i = 0; i < cartItems.length; i++) {
    if (cartItems[i].getAttribute('data-product') == idProduct){
      return cartItems[i];
    }
  }
}

function createElementCart(idProduct, nameProduct, priceProduct, quantity) {
  var cartItem = createElement('div', classCartItems),
      cartItemName = createElement('div', classCartItemsName),
      cartItemPrice = createElement('div', classCartItemsPrice),
      cartItemCount = createElement('div', classCartItemsCount);

  cartItem.setAttribute('data-product', idProduct);
  cartItem.setAttribute('data-price', priceProduct);
  cartItem.setAttribute('data-quantity', quantity);

  cartItemCount.setAttribute('id', classCartItemsCount + '-' + idProduct);

  cartItemName.innerText = nameProduct;
  cartItemPrice.innerText = priceProduct;
  cartItemCount.innerText = quantity;

  cartItem.appendChild(cartItemName);
  cartItem.appendChild(cartItemPrice);
  cartItem.appendChild(cartItemCount);
  return cartItem;
}

function updateTotalSum(){
  var cartItems = document.getElementsByClassName(classCartItems),
      totalSum = 0,
      totalSumElement = document.getElementById(classTotalSum);

  if (cartItems.length > 0){
    for (var i = 0; i < cartItems.length; i++) {
      var price = cartItems[i].getAttribute('data-price'),
          quantity = cartItems[i].getAttribute('data-quantity');

      totalSum += quantity * price;
    }
    totalSumElement.innerText = totalSum;
  }
}

function updateCartItem(cartItem){
  var idProduct = cartItem.getAttribute('data-product'),
      quantity = cartItem.getAttribute('data-quantity');

  quantity = +quantity + defaultQuantityAddCart;

  cartItem.setAttribute('data-quantity', quantity);

  document.getElementById(classCartItemsCount + '-' + idProduct).innerText = quantity;
}

function addToCart(event){
  event.preventDefault();
  var button = event.target;
  if(button.classList.contains(classButtonAddtoCart)) {


    var idProduct = button.getAttribute('data-product'),
        nameProduct = button.getAttribute('data-name'),
        priceProduct = button.getAttribute('data-price'),
        cartItem = findElementCart(idProduct);

    if (cartItem !== null && typeof cartItem !== 'undefined') {
      updateCartItem(cartItem, defaultQuantityAddCart);
    } else {
      var cart = document.getElementById(classCart),
          totalSum = document.getElementById(classTotalSum),
          cartItem = createElementCart(idProduct, nameProduct, priceProduct, defaultQuantityAddCart);

      cart.appendChild(cartItem);
    }
    updateTotalSum();
  }
  event.stopPropagation();
}
/* --- end --- */

var productList = document.getElementById('product-list'),
    classButtonAddtoCart = 'product-add-cart',
    classTotalSum = 'total-price',
    classCart = 'cart-items',
    classCartItems = 'cart-item',
    classCartItemsName = 'item-name',
    classCartItemsPrice = 'item-price',
    classCartItemsCount = 'item-count',
    defaultQuantityAddCart = 1;

/**
 * Инициализация
 */
function init() {
  productList.addEventListener('click', addToCart);
}



window.onload = init;