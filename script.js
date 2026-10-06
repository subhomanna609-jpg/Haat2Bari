// ===============================
// Haat2Bari Cart & WhatsApp
// ===============================

// Your WhatsApp number
const WHATSAPP_NUMBER = "919832495276";

// Cart
let cart = [];


// ===============================
// ADD TO CART
// ===============================

function addToCart(name, price) {

  const existingProduct = cart.find(item => item.name === name);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1
    });
  }

  updateCart();

  // Scroll to cart
  document.getElementById("cart").scrollIntoView({
    behavior: "smooth"
  });
}


// ===============================
// UPDATE CART
// ===============================

function updateCart() {

  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  if (cart.length === 0) {

    cartItems.innerHTML = "<p>আপনার Cart এখনো খালি।</p>";
    cartTotal.textContent = "0";

    return;
  }

  let total = 0;

  cartItems.innerHTML = "";

  cart.forEach((item, index) => {

    const itemTotal = item.price * item.quantity;

    total += itemTotal;

    cartItems.innerHTML += `
      <div class="cart-item" style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:10px;
        padding:12px 0;
        border-bottom:1px solid #eee;
      ">

        <div>
          <strong>${item.name}</strong>
          <br>
          ₹${item.price} × ${item.quantity}
          = ₹${itemTotal}
        </div>

        <div style="display:flex;align-items:center;gap:6px;">

          <button onclick="decreaseQuantity(${index})"
            style="
              width:32px;
              height:32px;
              border:none;
              border-radius:6px;
              background:#eee;
              cursor:pointer;
            ">
            −
          </button>

          <strong>${item.quantity}</strong>

          <button onclick="increaseQuantity(${index})"
            style="
              width:32px;
              height:32px;
              border:none;
              border-radius:6px;
              background:#087f3e;
              color:white;
              cursor:pointer;
            ">
            +
          </button>

          <button onclick="removeFromCart(${index})"
            style="
              border:none;
              background:#ffe5e5;
              color:#d00;
              padding:6px 8px;
              border-radius:6px;
              cursor:pointer;
            ">
            ✕
          </button>

        </div>

      </div>
    `;
  });

  cartTotal.textContent = total;
}


// ===============================
// INCREASE QUANTITY
// ===============================

function increaseQuantity(index) {

  cart[index].quantity++;

  updateCart();
}


// ===============================
// DECREASE QUANTITY
// ===============================

function decreaseQuantity(index) {

  cart[index].quantity--;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  updateCart();
}


// ===============================
// REMOVE PRODUCT
// ===============================

function removeFromCart(index) {

  cart.splice(index, 1);

  updateCart();
}


// ===============================
// GO TO ORDER
// ===============================

function goToOrder() {

  if (cart.length === 0) {

    alert("প্রথমে Cart-এ কিছু Product যোগ করুন।");

    return;
  }

  let productsText = "";

  cart.forEach(item => {

    productsText +=
      `${item.name} × ${item.quantity} = ₹${item.price * item.quantity}\n`;

  });

  document.getElementById("productsInput").value = productsText;

  document.getElementById("order").scrollIntoView({
    behavior: "smooth"
  });
}


// ===============================
// WHATSAPP ORDER
// ===============================

document.getElementById("orderForm").addEventListener("submit", function(e) {

  e.preventDefault();

  if (!WHATSAPP_NUMBER || WHATSAPP_NUMBER.includes("X")) {

    alert("প্রথমে script.js ফাইলে আপনার WhatsApp number বসান।");

    return;
  }

  const name =
    document.getElementById("name").value.trim();

  const phone =
    document.getElementById("phone").value.trim();

  const area =
    document.getElementById("area").value.trim();

  const address =
    document.getElementById("address").value.trim();

  const products =
    document.getElementById("productsInput").value.trim();

  const payment =
    document.getElementById("payment").value;

  const note =
    document.getElementById("note").value.trim();


  if (!products) {

    alert("প্রথমে Cart-এ Product যোগ করুন।");

    return;
  }


  let total = 0;

  cart.forEach(item => {

    total += item.price * item.quantity;

  });


  const message =
`🛒 *New Haat2Bari Order*

👤 Name: ${name}

📞 Mobile: ${phone}

📍 Area: ${area}

🏠 Address:
${address}

🛍️ Products:
${products}

💰 Total: ₹${total}

💳 Payment: ${payment}

📝 Note:
${note || "None"}

Please confirm my order.`;


  const url =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


  window.open(url, "_blank");

});