// =====================================
// Haat2Bari Cart & WhatsApp Order
// =====================================

const WHATSAPP_NUMBER = "919832495276";

let cart = [];


// =====================================
// ADD TO CART
// =====================================

function addToCart(name, price) {

  const existingProduct = cart.find(item => item.name === name);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      name: name,
      price: Number(price),
      quantity: 1
    });
  }

  updateCart();

  const cartSection = document.getElementById("cart");

  if (cartSection) {
    cartSection.scrollIntoView({
      behavior: "smooth"
    });
  }
}


// =====================================
// UPDATE CART
// =====================================

function updateCart() {

  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  if (!cartItems || !cartTotal) {
    return;
  }

  if (cart.length === 0) {

    cartItems.innerHTML = `
      <p>আপনার Cart এখনো খালি।</p>
    `;

    cartTotal.textContent = "0";

    return;
  }

  let total = 0;

  cartItems.innerHTML = "";

  cart.forEach((item, index) => {

    const itemTotal = item.price * item.quantity;

    total += itemTotal;

    cartItems.innerHTML += `
      <div class="cart-item">

        <div>
          <strong>${item.name}</strong>
          <br>
          ₹${item.price} × ${item.quantity}
          = ₹${itemTotal}
        </div>

        <div style="
          display:flex;
          align-items:center;
          gap:6px;
        ">

          <button
            onclick="decreaseQuantity(${index})"
            style="
              width:32px;
              height:32px;
              border:none;
              border-radius:6px;
              background:#eeeeee;
              cursor:pointer;
              font-size:18px;
            ">
            −
          </button>

          <strong>${item.quantity}</strong>

          <button
            onclick="increaseQuantity(${index})"
            style="
              width:32px;
              height:32px;
              border:none;
              border-radius:6px;
              background:#087f3e;
              color:white;
              cursor:pointer;
              font-size:18px;
            ">
            +
          </button>

          <button
            onclick="removeFromCart(${index})"
            style="
              border:none;
              background:#ffe5e5;
              color:#d00000;
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


// =====================================
// INCREASE QUANTITY
// =====================================

function increaseQuantity(index) {

  if (cart[index]) {
    cart[index].quantity += 1;
  }

  updateCart();
}


// =====================================
// DECREASE QUANTITY
// =====================================

function decreaseQuantity(index) {

  if (!cart[index]) {
    return;
  }

  cart[index].quantity -= 1;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  updateCart();
}


// =====================================
// REMOVE PRODUCT
// =====================================

function removeFromCart(index) {

  if (cart[index]) {
    cart.splice(index, 1);
  }

  updateCart();
}


// =====================================
// CREATE PRODUCT TEXT FROM CART
// =====================================

function getCartProducts() {

  if (cart.length === 0) {
    return "";
  }

  let productsText = "";

  cart.forEach(item => {

    const itemTotal = item.price * item.quantity;

    productsText +=
      `${item.name} × ${item.quantity} = ₹${itemTotal}\n`;

  });

  return productsText.trim();
}


// =====================================
// GET CART TOTAL
// =====================================

function getCartTotal() {

  let total = 0;

  cart.forEach(item => {

    total += item.price * item.quantity;

  });

  return total;
}


// =====================================
// GO TO ORDER
// =====================================

function goToOrder() {

  if (cart.length === 0) {

    alert("প্রথমে Cart-এ কিছু Product যোগ করুন।");

    return;
  }

  const productsText = getCartProducts();

  const productsInput =
    document.getElementById("productsInput");

  if (productsInput) {
    productsInput.value = productsText;
  }

  const orderSection =
    document.getElementById("order");

  if (orderSection) {

    orderSection.scrollIntoView({
      behavior: "smooth"
    });

  }
}


// =====================================
// WHATSAPP ORDER
// =====================================

const orderForm = document.getElementById("orderForm");

if (orderForm) {

  orderForm.addEventListener("submit", function(e) {

    e.preventDefault();

    // Check WhatsApp number
    if (
      !WHATSAPP_NUMBER ||
      WHATSAPP_NUMBER.includes("X")
    ) {

      alert("WhatsApp number ঠিক করুন।");

      return;
    }


    // Customer information
    const name =
      document.getElementById("name").value.trim();

    const phone =
      document.getElementById("phone").value.trim();

    const area =
      document.getElementById("area").value.trim();

    const address =
      document.getElementById("address").value.trim();

    const payment =
      document.getElementById("payment").value;

    const note =
      document.getElementById("note").value.trim();


    // =================================
    // IMPORTANT:
    // Products ALWAYS come from Cart
    // =================================

    let products = getCartProducts();

    let total = getCartTotal();


    // If Cart is empty, check manual input
    if (!products) {

      const productsInput =
        document.getElementById("productsInput");

      if (productsInput) {
        products = productsInput.value.trim();
      }
    }


    // No product = stop order
    if (!products) {

      alert("প্রথমে Cart-এ Product যোগ করুন।");

      return;
    }


    // =================================
    // WHATSAPP MESSAGE
    // =================================

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


    // WhatsApp URL
    const whatsappURL =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


    // Open WhatsApp
    window.open(whatsappURL, "_blank");

  });

}


// =====================================
// START CART
// =====================================

updateCart();