// CHANGE THIS to your own WhatsApp number with country code.
// Example for India: 919876543210 (do not use + or spaces)
const WHATSAPP_NUMBER = "919832495276";

document.getElementById("orderForm").addEventListener("submit", function(e){
  e.preventDefault();

  if (WHATSAPP_NUMBER.includes("X")) {
    alert("প্রথমে script.js ফাইলে আপনার WhatsApp number বসান।");
    return;
  }

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const area = document.getElementById("area").value.trim();
  const address = document.getElementById("address").value.trim();
  const products = document.getElementById("productsInput").value.trim();
  const payment = document.getElementById("payment").value;
  const note = document.getElementById("note").value.trim();

  const message =
`🛒 *New Haat2Bari Order*

👤 Name: ${name}
📞 Mobile: ${phone}
📍 Area: ${area}
🏠 Address: ${address}

🛍️ Products:
${products}

💳 Payment: ${payment}
📝 Note: ${note || "None"}

Please confirm my order.`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
});
