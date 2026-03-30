const inventory = [
    { id: 1, name: "Cactus", price: 300, img: "Images/cactus.jpg", cat: "Indoor" },
    { id: 2, name: "Spider Plant", price: 250, img: "Images/spider.jpg", cat: "Indoor" },
    { id: 3, name: "Money Plant", price: 200, img: "Images/moneyplant.jpg", cat: "Indoor" },
    { id: 4, name: "Peace Lily", price: 350, img: "Images/peacelily.jpg", cat: "Indoor" },
    { id: 5, name: "Hibiscus", price: 180, img: "Images/hibiscus.jpg", cat: "Flower" },
    { id: 6, name: "Marigold", price: 80, img: "Images/marigold.jpg", cat: "Flower" },
    { id: 7, name: "Desi Rose", price: 150, img: "Images/rose.jpg", cat: "Flower" },
    { id: 8, name: "Vinca Rosea", price: 120, img: "Images/vincarosea.jpg", cat: "Flower" },
    { id: 9, name: "Holy Tulsi", price: 100, img: "Images/tulsi.jpg", cat: "Medicinal" },
    { id: 10, name: "Aloe Vera", price: 220, img: "Images/aloe.jpg", cat: "Medicinal" },
    { id: 11, name: "Mint", price: 60, img: "Images/mint.jpg", cat: "Medicinal" },
    { id: 12, name: "Indian Borage", price: 130, img: "Images/indianborage.jpg", cat: "Medicinal" }
];

let cart = [];

function draw(category = "All") {
    const grid = document.getElementById("product-grid");
    const filtered = category === "All" ? inventory : inventory.filter(p => p.cat === category);

    grid.innerHTML = filtered.map(p => `
        <div class="card">
            <div class="img-box">
                <img src="${p.img}" onerror="this.src='https://via.placeholder.com/200?text=${p.name}'">
            </div>
            <h4>${p.name}</h4>
            <p style="color:var(--brand-green); font-weight:700;">₹ ${p.price}</p>
            <button class="btn-primary" style="padding:8px" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
    `).join("");

    // Sync active state for pills
    document.querySelectorAll('.pill').forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.includes(category) || (category === 'All' && btn.innerText === 'All')) {
            btn.classList.add('active');
        }
    });
}

function filter(cat, event) {
    draw(cat);
}

// Search Logic
document.getElementById("search").addEventListener("input", (e) => {
    const val = e.target.value.toLowerCase();
    const filtered = inventory.filter(p => p.name.toLowerCase().includes(val));
    const grid = document.getElementById("product-grid");
    grid.innerHTML = filtered.map(p => `
        <div class="card">
            <div class="img-box"><img src="${p.img}"></div>
            <h4>${p.name}</h4>
            <p>₹ ${p.price}</p>
            <button class="btn-primary" style="padding:8px" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
    `).join("");
});

function addToCart(id) {
    const item = inventory.find(p => p.id === id);
    const inCart = cart.find(p => p.id === id);
    if (inCart) inCart.qty++; else cart.push({ ...item, qty: 1 });
    document.getElementById("count").innerText = cart.reduce((a, b) => a + b.qty, 0);
}

function openCart() {
    if (cart.length === 0) return alert("Your cart is empty! 🌿");
    let total = 0;
    document.getElementById("items-list").innerHTML = cart.map(item => {
        total += item.price * item.qty;
        return `<div style="display:flex; justify-content:space-between; margin-bottom:10px; border-bottom:1px solid #eee;">
            <span>${item.name} (x${item.qty})</span>
            <span>₹${item.price * item.qty}</span>
        </div>`;
    }).join("");
    document.getElementById("m-total").innerText = total;
    document.getElementById("m-qty").innerText = cart.length;
    document.getElementById("cart-modal").classList.remove("hidden");
}

function closeCart() { document.getElementById("cart-modal").classList.add("hidden"); }

function checkout() {
    closeCart();
    document.getElementById("payment-modal").classList.remove("hidden");
}

function showPaymentFields() {
    const method = document.getElementById("paymentMethod").value;
    document.getElementById("card-fields").classList.toggle("hidden", method !== "Card");
}

function finish() {
    const loc = document.getElementById("locationInput").value;
    const method = document.getElementById("paymentMethod").value;

    if (!loc) return alert("Please enter a delivery address.");

    // Validation for Card Payment
    // Inside your finish() function, update these lines:
    if (method === "Card") {
        const num = document.getElementById("cardNumber").value;
        const exp = document.getElementById("cardExpiry").value;
        const cvv = document.getElementById("cardCVV").value;

        // We check for 19 because 16 digits + 3 hyphens = 19 characters
        if (num.length !== 19) return alert("Please enter a valid 16-digit card number.");
        if (exp.length !== 5) return alert("Please enter expiry in MM/YY format.");
        if (cvv.length !== 3) return alert("CVV must be 3 digits.");
    }

    alert("🌿 Order successful! Your plants will reach " + loc + " soon.");

    // Reset Cart
    cart = [];
    document.getElementById("count").innerText = 0;
    document.getElementById("payment-modal").classList.add("hidden");
}

// Initial Run
draw();


// 1. Format Card Number: 0000-0000-0000-0000
document.getElementById("cardNumber").addEventListener("input", function (e) {
    // Remove all non-digits
    let value = e.target.value.replace(/\D/g, '');
    // Add hyphen every 4 digits
    let formatted = value.match(/.{1,4}/g)?.join('-') || '';
    e.target.value = formatted;
});

// 2. Format Expiry: MM/YY
document.getElementById("cardExpiry").addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        // Adds the slash after the first two digits (Month)
        e.target.value = value.slice(0, 2) + '/' + value.slice(2, 4);
    } else {
        e.target.value = value;
    }
});











const scrollBtn = document.getElementById("scrollToTop");

// Show/Hide button based on scroll position
window.onscroll = function () {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
};

// Scroll to top when clicked
scrollBtn.onclick = function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};



/* --- PASTE THIS AT THE VERY END OF YOUR script.js FILE --- */

// Automatic Hyphens for Card Number
document.getElementById("cardNumber").addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove all letters
    let formatted = value.match(/.{1,4}/g)?.join('-') || ''; // Add hyphen every 4 digits
    e.target.value = formatted;
});

// Automatic Slash for Expiry Date
document.getElementById("cardExpiry").addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove all letters
    if (value.length >= 2) {
        e.target.value = value.slice(0, 2) + '/' + value.slice(2, 4);
    } else {
        e.target.value = value;
    }
});

// Allow ONLY numbers for CVV
document.getElementById("cardCVV").addEventListener("input", function (e) {
    e.target.value = e.target.value.replace(/\D/g, '');
});