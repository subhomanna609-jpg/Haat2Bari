// =========================================
// HAAT2BARI
// FINAL CART + SEARCH + CATEGORY
// ORDER ID + DELIVERY + TOTAL + WHATSAPP
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
// PRODUCT TOTAL
// =========================================

function getProductsTotal() {

  return cart.reduce(function(sum, item) {

    return sum + (item.price * item.quantity);

  }, 0);
}


// =========================================
// UPDATE ORDER TOTAL
// =========================================

function updateOrderTotal() {

  const productsTotal = getProductsTotal();
  const deliveryCharge = getDeliveryCharge();
  const grandTotal = productsTotal + deliveryCharge;

  const productsTotalElement =
    document.getElementById("orderProductsTotal");

  const deliveryTotalElement =
    document.getElementById("orderDeliveryTotal");

  const grandTotalElement =
    document.getElementById("orderGrandTotal");

  if (productsTotalElement) {
    productsTotalElement.textContent = productsTotal;
  }

  if (deliveryTotalElement) {
    deliveryTotalElement.textContent = deliveryCharge;
  }

  if (grandTotalElement) {
    grandTotalElement.textContent = grandTotal;
  }
}


// =========================================
// UPDATE CART
// =========================================

function updateCart() {

  const cartItems =
    document.getElementById("cartItems");

  const cartTotal =
    document.getElementById("cartTotal");

  const cartCount =
    document.getElementById("cartCount");

  if (!cartItems || !cartTotal) {
    return;
  }

  if (cart.length === 0) {

    cartItems.innerHTML =
      "<p>আপনার Cart এখনো খালি।</p>";

    cartTotal.textContent = "0";

    if (cartCount) {
      cartCount.textContent = "0 Items";
    }

    updateOrderProducts();
    updateOrderTotal();

    return;
  }

  let total = 0;
  let itemCount = 0;

  cartItems.innerHTML = "";

  cart.forEach(function(item, index) {

    const itemTotal =
      item.price * item.quantity;

    total += itemTotal;
    itemCount += item.quantity;

    const cartItem =
      document.createElement("div");

    cartItem.className = "cart-item";

    cartItem.innerHTML = `

      <div>

        <strong>${item.name}</strong>

        <br>

        ₹${item.price} × ${item.quantity}
        =
        <strong>₹${itemTotal}</strong>

      </div>

      <div class="cart-buttons">

        <button
          type="button"
          class="qty-btn"
          onclick="decreaseQuantity(${index})"
        >
          −
        </button>

        <strong>${item.quantity}</strong>

        <button
          type="button"
          class="qty-btn"
          onclick="increaseQuantity(${index})"
        >
          +
        </button>

        <button
          type="button"
          class="remove-btn"
          onclick="removeFromCart(${index})"
        >
          ✕
        </button>

      </div>

    `;

    cartItems.appendChild(cartItem);

  });

  cartTotal.textContent = total;

  if (cartCount) {

    cartCount.textContent =
      itemCount +
      (itemCount === 1 ? " Item" : " Items");

  }

  updateOrderProducts();
  updateOrderTotal();
}


// =========================================
// INCREASE QUANTITY
// =========================================

function increaseQuantity(index) {

  if (!cart[index]) {
    return;
  }

  cart[index].quantity++;

  updateCart();
}


// =========================================
// DECREASE QUANTITY
// =========================================

function decreaseQuantity(index) {

  if (!cart[index]) {
    return;
  }

  cart[index].quantity--;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  updateCart();
}


// =========================================
// REMOVE FROM CART
// =========================================

function removeFromCart(index) {

  if (!cart[index]) {
    return;
  }

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

  const noProducts =
    document.getElementById("noProducts");

  if (!searchInput || !categoryFilter) {
    return;
  }

  const searchText =
    searchInput.value
      .toLowerCase()
      .trim();

  const selectedCategory =
    categoryFilter.value;

  let visibleProducts = 0;

  products.forEach(function(product) {

    const searchableText =
      (
        product.textContent +
        " " +
        (product.dataset.search || "")
      )
        .toLowerCase();

    const category =
      product.dataset.category || "";

    const matchesSearch =
      searchText === "" ||
      searchableText.includes(searchText);

    const matchesCategory =
      selectedCategory === "all" ||
      category === selectedCategory;

    const show =
      matchesSearch && matchesCategory;

    product.style.display =
      show ? "" : "none";

    if (show) {
      visibleProducts++;
    }

  });

  if (noProducts) {

    noProducts.style.display =
      visibleProducts === 0
        ? "block"
        : "none";

  }
}


// =========================================
// GET DELIVERY CHARGE
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

  updateOrderTotal();
}


// =========================================
// UPDATE PRODUCTS IN ORDER
// =========================================

function updateOrderProducts() {

  const productsInput =
    document.getElementById("productsInput");

  if (!productsInput) {
    return;
  }

  if (cart.length === 0) {

    productsInput.value =
      "Cart এখনো খালি।";

    return;
  }

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

  updateOrderTotal();
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

  updateOrderProducts();
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

  const year =
    now.getFullYear();

  const month =
    String(now.getMonth() + 1)
      .padStart(2, "0");

  const day =
    String(now.getDate())
      .padStart(2, "0");

  const hours =
    String(now.getHours())
      .padStart(2, "0");

  const minutes =
    String(now.getMinutes())
      .padStart(2, "0");

  const random =
    Math.floor(
      100 + Math.random() * 900
    );

  return (
    "HB-" +
    year +
    month +
    day +
    "-" +
    hours +
    minutes +
    random
  );
}


// =========================================
// MOBILE VALIDATION
// =========================================

function validateMobile(phone) {

  return /^[6-9][0-9]{9}$/.test(phone);
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
    document.getElementById("name")
      ?.value.trim() || "";

  const phone =
    document.getElementById("phone")
      ?.value.trim() || "";

  const area =
    document.getElementById("area")
      ?.value.trim() || "";

  const address =
    document.getElementById("address")
      ?.value.trim() || "";

  const payment =
    document.getElementById("payment")
      ?.value || "Cash on Delivery";

  const note =
    document.getElementById("note")
      ?.value.trim() || "None";


  // =========================================
  // MOBILE CHECK
  // =========================================

  if (!validateMobile(phone)) {

    alert(
      "সঠিক 10 digit Indian mobile number দিন।"
    );

    document
      .getElementById("phone")
      ?.focus();

    return;
  }


  // =========================================
  // TOTAL
  // =========================================

  const deliveryCharge =
    getDeliveryCharge();

  const productsTotal =
    getProductsTotal();

  const grandTotal =
    productsTotal +
    deliveryCharge;


  // =========================================
  // PRODUCTS
  // =========================================

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


  // =========================================
  // ORDER ID
  // =========================================

  const orderID =
    createOrderID();


  // =========================================
  // WHATSAPP MESSAGE
  // =========================================

  const message =
`🛒 *New Haat2Bari Order*

🆔 *Order ID:* ${orderID}

👤 *Name:* ${name}

📞 *Mobile:* ${phone}

📍 *Area:* ${area}

🏠 *Address:*
${address}

🛍️ *Products:*
${products}

💰 *Products Total:* ₹${productsTotal}

🚚 *Delivery Charge:* ₹${deliveryCharge}

💵 *Grand Total:* ₹${grandTotal}

💳 *Payment:* ${payment}

📝 *Note:*
${note}

Please confirm my order.`;


  // =========================================
  // WHATSAPP URL
  // =========================================

  const whatsappURL =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(message);


  // =========================================
  // SHOW ORDER ID
  // =========================================

  const orderPreview =
    document.getElementById("orderIdPreview");

  if (orderPreview) {

    orderPreview.textContent =
      "🆔 Order ID: " + orderID;

  }


  // =========================================
  // OPEN WHATSAPP
  // =========================================

  window.open(
    whatsappURL,
    "_blank"
  );


  // =========================================
  // CONFIRMATION
  // =========================================

  setTimeout(function() {

    alert(
      "✅ Order Ready!\n\n" +
      "Order ID: " +
      orderID +
      "\n\n" +
      "WhatsApp-এ Order পাঠানোর জন্য প্রস্তুত হয়েছে।" +
      "\n\nProducts Total: ₹" +
      productsTotal +
      "\nDelivery: ₹" +
      deliveryCharge +
      "\nGrand Total: ₹" +
      grandTotal
    );

  }, 700);

}


// =========================================
// PAGE LOAD
// =========================================

document.addEventListener(
  "DOMContentLoaded",
  function() {

    updateCart();

    updateDeliveryCharge();

    filterProducts();


    const search =
      document.getElementById(
        "productSearch"
      );

    const category =
      document.getElementById(
        "categoryFilter"
      );

    const delivery =
      document.getElementById(
        "deliveryDistance"
      );

    const orderForm =
      document.getElementById(
        "orderForm"
      );


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


    if (delivery) {

      delivery.addEventListener(
        "change",
        updateDeliveryCharge
      );

    }


    if (orderForm) {

      orderForm.addEventListener(
        "submit",
        submitOrder
      );

    }

  }
);