// =========================================
// HAAT2BARI
// PROFESSIONAL CART + SEARCH + CATEGORY
// ORDER ID + DELIVERY + WHATSAPP
// =========================================

const WHATSAPP_NUMBER = "919832495276";

let cart = [];


// =========================================
// ADD TO CART
// =========================================

function addToCart(name, price) {

  price = Number(price);

  const existing = cart.find(function(item) {
    return item.name === name;
  });

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1
    });
  }

  updateCart();

  const cartBox = document.getElementById("cart");

  if (cartBox) {
    cartBox.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}


// =========================================
// UPDATE CART
// =========================================

function updateCart() {

  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  if (!cartItems || !cartTotal) {
    return;
  }

  if (cart.length === 0) {

    cartItems.innerHTML =
      "<p>আপনার Cart এখনো খালি।</p>";

    cartTotal.textContent = "0";

    return;
  }

  let total = 0;

  cartItems.innerHTML = "";

  cart.forEach(function(item, index) {

    const itemTotal =
      item.price * item.quantity;

    total += itemTotal;

    const cartItem =
      document.createElement("div");

    cartItem.className = "cart-item";

    cartItem.innerHTML = `
      <div>
        <strong>${item.name}</strong>
        <br>
        ₹${item.price} × ${item.quantity}
        = <strong>₹${itemTotal}</strong>
      </div>

      <div class="cart-buttons">

        <button
          type="button"
          class="qty-btn"
          onclick="decreaseQuantity(${index})">
          −
        </button>

        <strong>${item.quantity}</strong>

        <button
          type="button"
          class="qty-btn"
          onclick="increaseQuantity(${index})">
          +
        </button>

        <button
          type="button"
          class="remove-btn"
          onclick="removeFromCart(${index})">
          ✕
        </button>

      </div>
    `;

    cartItems.appendChild(cartItem);

  });

  cartTotal.textContent = total;
}


// =========================================
// INCREASE
// =========================================

function increaseQuantity(index) {

  if (!cart[index]) return;

  cart[index].quantity++;

  updateCart();
}


// =========================================
// DECREASE
// =========================================

function decreaseQuantity(index) {

  if (!cart[index]) return;

  cart[index].quantity--;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  updateCart();
}


// =========================================
// REMOVE
// =========================================

function removeFromCart(index) {

  if (!cart[index]) return;

  cart.splice(index, 1);

  updateCart();
}


// =========================================
// SEARCH + CATEGORY
// =========================================

function filterProducts() {

  const searchInput =
    document.getElementById("productSearch");

  const categoryFilter =
    document.getElementById("categoryFilter");

  const products =
    document.querySelectorAll(".product-card");

  if (!searchInput || !categoryFilter) {
    return;
  }

  const searchText =
    searchInput.value
      .toLowerCase()
      .trim();

  const selectedCategory =
    categoryFilter.value;

  products.forEach(function(product) {

    const nameElement =
      product.querySelector("h3");

    const name =
      nameElement
        ? nameElement.textContent
            .toLowerCase()
            .trim()
        : "";

    const category =
      product.dataset.category || "";

    const matchesSearch =
      searchText === "" ||
      name.includes(searchText);

    const matchesCategory =
      selectedCategory === "all" ||
      category === selectedCategory;

    product.style.display =
      matchesSearch && matchesCategory
        ? ""
        : "none";

  });
}


// =========================================
// DELIVERY CHARGE
// =========================================

function getDeliveryCharge() {

  const deliverySelect =
    document.getElementById("deliveryDistance");

  if (!deliverySelect) {
    return 0;
  }

  return Number(deliverySelect.value) || 0;
}


// =========================================
// UPDATE DELIVERY CHARGE
// =========================================

function updateDeliveryCharge() {

  const select =
    document.getElementById("deliveryDistance");

  const chargeInput =
    document.getElementById("deliveryCharge");

  if (!select || !chargeInput) {
    return;
  }

  const charge =
    Number(select.value) || 0;

  chargeInput.value =
    "₹" + charge;
}


// =========================================
// GO TO ORDER
// =========================================

function goToOrder() {

  if (cart.length === 0) {

    alert(
      "প্রথমে Cart-এ Product যোগ করুন।"
    );

    return;
  }

  const productsInput =
    document.getElementById("productsInput");

  if (productsInput) {

    productsInput.value =
      cart.map(function(item) {

        return (
          item.name +
          " × " +
          item.quantity +
          " = ₹" +
          (item.price * item.quantity)
        );

      }).join("\n");

  }

  updateDeliveryCharge();

  const order =
    document.getElementById("order");

  if (order) {

    order.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }
}


// =========================================
// CREATE ORDER ID
// =========================================

function createOrderID() {

  const now = new Date();

  const date =
    now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0");

  const random =
    Math.floor(1000 + Math.random() * 9000);

  return "HB-" + date + "-" + random;
}


// =========================================
// SUBMIT ORDER
// =========================================

function submitOrder(event) {

  event.preventDefault();

  if (cart.length === 0) {

    alert(
      "প্রথমে Cart-এ Product যোগ করুন।"
    );

    return;
  }


  const name =
    document.getElementById("name")?.value.trim() || "";

  const phone =
    document.getElementById("phone")?.value.trim() || "";

  const area =
    document.getElementById("area")?.value.trim() || "";

  const address =
    document.getElementById("address")?.value.trim() || "";

  const payment =
    document.getElementById("payment")?.value ||
    "Cash on Delivery";

  const note =
    document.getElementById("note")?.value.trim() ||
    "None";


  // DELIVERY
  const deliveryCharge =
    getDeliveryCharge();


  // PRODUCTS
  const products =
    cart.map(function(item) {

      return (
        item.name +
        " × " +
        item.quantity +
        " = ₹" +
        (item.price * item.quantity)
      );

    }).join("\n");


  // PRODUCT TOTAL
  const productsTotal =
    cart.reduce(function(sum, item) {

      return sum +
        (item.price * item.quantity);

    }, 0);


  // GRAND TOTAL
  const grandTotal =
    productsTotal +
    deliveryCharge;


  // ORDER ID
  const orderID =
    createOrderID();


  // WHATSAPP MESSAGE
  const message =
`🛒 *New Haat2Bari Order*

🆔 Order ID: ${orderID}

👤 Name: ${name}

📞 Mobile: ${phone}

📍 Area: ${area}

🏠 Address:
${address}

🛍️ Products:
${products}

💰 Products Total: ₹${productsTotal}

🚚 Delivery Charge: ₹${deliveryCharge}

💵 *Grand Total: ₹${grandTotal}*

💳 Payment: ${payment}

📝 Note:
${note}

Please confirm my order.`;


  const whatsappURL =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(message);


  // OPEN WHATSAPP
  window.open(
    whatsappURL,
    "_blank"
  );


  // CUSTOMER CONFIRMATION
  setTimeout(function() {

    alert(
      "✅ Order Ready!\n\n" +
      "Order ID: " + orderID +
      "\n\n" +
      "WhatsApp-এ আপনার Order পাঠানো হয়েছে।\n" +
      "Grand Total: ₹" + grandTotal
    );

  }, 800);

}


// =========================================
// PAGE LOAD
// =========================================

document.addEventListener(
  "DOMContentLoaded",
  function() {

    updateCart();

    updateDeliveryCharge();


    const search =
      document.getElementById("productSearch");

    const category =
      document.getElementById("categoryFilter");


    if (search) {

      search.addEventListener(
        "input",
        filterProducts
      );

    }


    if (category) {

      category.addEventListener(
        "change",
        filterProducts
      );

    }

  }
);