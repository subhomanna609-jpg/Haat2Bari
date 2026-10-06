// =====================================
// HAAT2BARI CART + SEARCH + WHATSAPP
// =====================================

const WHATSAPP_NUMBER = "919832495276";

let cart = [];


// =====================================
// ADD TO CART
// =====================================

function addToCart(name, price) {

  price = Number(price);

  const existing =
    cart.find(item => item.name === name);

  if (existing) {
    existing.quantity += 1;
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
      behavior: "smooth"
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


  if (cart.length === 0) {

    cartItems.innerHTML =
      "<p>আপনার Cart এখনো খালি।</p>";

    cartTotal.textContent = "0";

    return;
  }


  let total = 0;

  cartItems.innerHTML = "";


  cart.forEach((item, index) => {

    const itemTotal =
      item.price * item.quantity;

    total += itemTotal;


    cartItems.innerHTML += `

      <div class="cart-item">

        <div>
          <strong>${item.name}</strong>
          <br>
          ₹${item.price} × ${item.quantity}
          = ₹${itemTotal}
        </div>

        <div class="cart-buttons">

          <button
            class="qty-btn"
            onclick="decreaseQuantity(${index})"
          >
            −
          </button>

          <strong>${item.quantity}</strong>

          <button
            class="qty-btn"
            onclick="increaseQuantity(${index})"
          >
            +
          </button>

          <button
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
// PLUS
// =====================================

function increaseQuantity(index) {

  if (!cart[index]) {
    return;
  }

  cart[index].quantity += 1;

  updateCart();
}


// =====================================
// MINUS
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
// REMOVE
// =====================================

function removeFromCart(index) {

  if (!cart[index]) {
    return;
  }

  cart.splice(index, 1);

  updateCart();
}


// =====================================
// SEARCH + CATEGORY
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


  products.forEach(card => {

    const productText =
      card.textContent.toLowerCase();

    const productCategory =
      card.dataset.category || "grocery";


    const searchMatch =
      productText.includes(searchText);


    const categoryMatch =
      selectedCategory === "all" ||
      selectedCategory === productCategory;


    if (searchMatch && categoryMatch) {
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


  const products =
    cart.map(item => {

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
    productsInput.value = products;
  }


  const order =
    document.getElementById("order");


  if (order) {

    order.scrollIntoView({
      behavior: "smooth"
    });

  }
}


// =====================================
// SUBMIT ORDER
// =====================================

function submitOrder(event) {

  event.preventDefault();


  if (cart.length === 0) {

    alert(
      "প্রথমে Cart-এ Product যোগ করুন।"
    );

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


  const payment =
    document.getElementById("payment").value;


  const note =
    document.getElementById("note").value.trim();


  const products =
    cart.map(item => {

      return (
        item.name +
        " × " +
        item.quantity +
        " = ₹" +
        (item.price * item.quantity)
      );

    }).join("\n");


  const total =
    cart.reduce(
      (sum, item) =>
        sum + (item.price * item.quantity),
      0
    );


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


// =====================================
// START
// =====================================

document.addEventListener(
  "DOMContentLoaded",
  function() {

    updateCart();

  }
);