// =====================================
// HAAT2BARI
// CART + SEARCH + CATEGORY + WHATSAPP
// =====================================

const WHATSAPP_NUMBER = "919832495276";

let cart = [];


// =====================================
// ADD TO CART
// =====================================

function addToCart(name, price) {

  price = Number(price);

  const existingProduct =
    cart.find(function(item) {
      return item.name === name;
    });

  if (existingProduct) {

    existingProduct.quantity += 1;

  } else {

    cart.push({
      name: name,
      price: price,
      quantity: 1
    });

  }

  updateCart();

  const cartBox =
    document.getElementById("cart");

  if (cartBox) {

    cartBox.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }
}


// =====================================
// UPDATE CART
// =====================================

function updateCart() {

  const cartItems =
    document.getElementById("cartItems");

  const cartTotal =
    document.getElementById("cartTotal");

  if (!cartItems || !cartTotal) {
    return;
  }


  // Cart empty
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


    cartItems.innerHTML += `

      <div class="cart-item">

        <div>

          <strong>
            ${item.name}
          </strong>

          <br>

          ₹${item.price}
          ×
          ${item.quantity}
          =
          <strong>
            ₹${itemTotal}
          </strong>

        </div>


        <div class="cart-buttons">

          <button
            type="button"
            class="qty-btn"
            onclick="decreaseQuantity(${index})"
          >
            −
          </button>


          <strong>
            ${item.quantity}
          </strong>


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

      </div>

    `;

  });


  cartTotal.textContent = total;

}


// =====================================
// INCREASE QUANTITY
// =====================================

function increaseQuantity(index) {

  if (!cart[index]) {
    return;
  }

  cart[index].quantity += 1;

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
// REMOVE FROM CART
// =====================================

function removeFromCart(index) {

  if (!cart[index]) {
    return;
  }

  cart.splice(index, 1);

  updateCart();

}


// =====================================
// SEARCH + CATEGORY FILTER
// =====================================

function filterProducts() {

  const searchInput =
    document.getElementById("productSearch");

  const categorySelect =
    document.getElementById("categoryFilter");


  if (!searchInput || !categorySelect) {
    return;
  }


  const searchText =
    searchInput.value
      .toLowerCase()
      .trim();


  const selectedCategory =
    categorySelect.value;


  const products =
    document.querySelectorAll(".product-card");


  products.forEach(function(card) {


    // Product name
    const nameElement =
      card.querySelector("h3");


    const productName =
      nameElement
        ? nameElement.textContent
            .toLowerCase()
            .trim()
        : "";


    // Product category
    const productCategory =
      card.getAttribute("data-category") || "";


    // Search check
    const searchMatch =
      searchText === "" ||
      productName.includes(searchText);


    // Category check
    const categoryMatch =
      selectedCategory === "all" ||
      selectedCategory === productCategory;


    // Show / Hide
    if (
      searchMatch &&
      categoryMatch
    ) {

      card.style.display = "";

    } else {

      card.style.display = "none";

    }

  });

}


// =====================================
// GO TO ORDER
// =====================================

function goToOrder() {

  if (cart.length === 0) {

    alert(
      "প্রথমে Cart-এ Product যোগ করুন।"
    );

    return;
  }


  const productsText =
    cart.map(function(item) {

      return (
        item.name +
        " × " +
        item.quantity +
        " = ₹" +
        (item.price * item.quantity)
      );

    }).join("\n");


  const productsInput =
    document.getElementById("productsInput");


  if (productsInput) {

    productsInput.value =
      productsText;

  }


  const orderSection =
    document.getElementById("order");


  if (orderSection) {

    orderSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }

}


// =====================================
// SUBMIT ORDER
// =====================================

function submitOrder(event) {

  event.preventDefault();


  // Cart check
  if (cart.length === 0) {

    alert(
      "প্রথমে Cart-এ Product যোগ করুন।"
    );

    return;
  }


  // Customer information
  const nameElement =
    document.getElementById("name");

  const phoneElement =
    document.getElementById("phone");

  const areaElement =
    document.getElementById("area");

  const addressElement =
    document.getElementById("address");

  const paymentElement =
    document.getElementById("payment");

  const noteElement =
    document.getElementById("note");


  const name =
    nameElement
      ? nameElement.value.trim()
      : "";


  const phone =
    phoneElement
      ? phoneElement.value.trim()
      : "";


  const area =
    areaElement
      ? areaElement.value.trim()
      : "";


  const address =
    addressElement
      ? addressElement.value.trim()
      : "";


  const payment =
    paymentElement
      ? paymentElement.value
      : "Cash on Delivery";


  const note =
    noteElement
      ? noteElement.value.trim()
      : "";


  // Products
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


  // Total
  const total =
    cart.reduce(
      function(sum, item) {

        return (
          sum +
          (item.price * item.quantity)
        );

      },
      0
    );


  // WhatsApp message
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
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(message);


  // Open WhatsApp
  window.open(
    whatsappURL,
    "_blank"
  );

}


// =====================================
// PAGE START
// =====================================

document.addEventListener(
  "DOMContentLoaded",
  function() {

    updateCart();


    // Search automatically ready
    const searchInput =
      document.getElementById("productSearch");

    const categorySelect =
      document.getElementById("categoryFilter");


    if (searchInput) {

      searchInput.addEventListener(
        "input",
        filterProducts
      );

    }


    if (categorySelect) {

      categorySelect.addEventListener(
        "change",
        filterProducts
      );

    }

  }
);