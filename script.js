const WHATSAPP_NUMBER = "919832495276";

let cart = [];


// ADD TO CART
function addToCart(name, price) {

  const item = cart.find(p => p.name === name);

  if (item) {
    item.quantity++;
  } else {
    cart.push({
      name: name,
      price: Number(price),
      quantity: 1
    });
  }

  updateCart();

  const cartBox = document.getElementById("cart");

  if (cartBox) {
    cartBox.scrollIntoView({
      behavior: "smooth"
    });
  }
}


// UPDATE CART
function updateCart() {

  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  if (!cartItems || !cartTotal) return;

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
      <div style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:10px;
        padding:12px 0;
        border-bottom:1px solid #ddd;
      ">

        <div>
          <strong>${item.name}</strong><br>
          ₹${item.price} × ${item.quantity}
          = ₹${itemTotal}
        </div>

        <div style="display:flex;gap:5px;align-items:center;">

          <button onclick="decreaseQuantity(${index})">
            −
          </button>

          <strong>${item.quantity}</strong>

          <button onclick="increaseQuantity(${index})">
            +
          </button>

          <button onclick="removeFromCart(${index})">
            ✕
          </button>

        </div>

      </div>
    `;
  });

  cartTotal.textContent = total;
}


// PLUS
function increaseQuantity(index) {

  if (cart[index]) {
    cart[index].quantity++;
  }

  updateCart();
}


// MINUS
function decreaseQuantity(index) {

  if (!cart[index]) return;

  cart[index].quantity--;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  updateCart();
}


// REMOVE
function removeFromCart(index) {

  cart.splice(index, 1);

  updateCart();
}


// SEARCH + CATEGORY
function filterProducts() {

  const search =
    document.getElementById("productSearch");

  const category =
    document.getElementById("categoryFilter");

  if (!search || !category) return;

  const text =
    search.value.toLowerCase().trim();

  const selected =
    category.value;

  document
    .querySelectorAll(".product-card")
    .forEach(card => {

      const name =
        card.innerText.toLowerCase();

      const cardCategory =
        card.getAttribute("data-category");

      const searchOK =
        name.includes(text);

      const categoryOK =
        selected === "all" ||
        selected === cardCategory;

      card.style.display =
        searchOK && categoryOK
          ? ""
          : "none";

    });
}


// GO TO ORDER
function goToOrder() {

  if (cart.length === 0) {

    alert("প্রথমে Cart-এ Product যোগ করুন।");

    return;
  }

  const products =
    cart.map(item =>
      `${item.name} × ${item.quantity} = ₹${item.price * item.quantity}`
    ).join("\n");

  const input =
    document.getElementById("productsInput");

  if (input) {
    input.value = products;
  }

  const order =
    document.getElementById("order");

  if (order) {
    order.scrollIntoView({
      behavior: "smooth"
    });
  }
}


// WHATSAPP ORDER
document.addEventListener("DOMContentLoaded", function() {

  updateCart();

  const form =
    document.getElementById("orderForm");

  if (!form) return;

  form.addEventListener("submit", function(e) {

    e.preventDefault();

    if (cart.length === 0) {

      alert("প্রথমে Cart-এ Product যোগ করুন।");

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
      cart.map(item =>
        `${item.name} × ${item.quantity} = ₹${item.price * item.quantity}`
      ).join("\n");

    const total =
      cart.reduce(
        (sum, item) =>
          sum + item.price * item.quantity,
        0
      );

    const message =
`🛒 New Haat2Bari Order

Name: ${name}

Mobile: ${phone}

Area: ${area}

Address:
${address}

Products:
${products}

Total: ₹${total}

Payment: ${payment}

Note:
${note || "None"}

Please confirm my order.`;

    const url =
      "https://wa.me/" +
      WHATSAPP_NUMBER +
      "?text=" +
      encodeURIComponent(message);

    window.open(url, "_blank");

  });

});