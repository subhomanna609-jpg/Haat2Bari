// =========================================
// HAAT2BARI
// PROFESSIONAL CART + SEARCH + CATEGORY
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

    const cartItem = document.createElement("div");

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
      name.includes(searchText);

    const matchesCategory =
      selectedCategory === "all" ||
      category === selectedCategory;

    if (
      matchesSearch &&
      matchesCategory
    ) {

      product.style.display = "";

    } else {

      product.style.display = "none";

    }

  });
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

  const total =
    cart.reduce(function(sum, item) {

      return sum +
        (item.price * item.quantity);

    }, 0);

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
${note}

Please confirm my order.`;

  const whatsappURL =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(message);

  window.open(
    whatsappURL,
    "_blank"
  );
}


// =========================================
// PAGE LOAD
// =========================================

document.addEventListener(
  "DOMContentLoaded",
  function() {

    updateCart();

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