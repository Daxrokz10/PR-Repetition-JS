let prodSec = document.querySelector("#prodSec .row");
let products = JSON.parse(localStorage.getItem("products")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || {};

function updateCartStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function getProduct() {
    prodSec.innerHTML = ""; 
    products.forEach((prod, index) => {
        let quantity = cart[index] || 0;
        let card = document.createElement("div");
        card.className = "col-md-4 mb-3 mt-3";
        card.innerHTML = `
        <div class="card shadow-lg border-0 h-100">
            <img src="${prod.pimage}" class="card-img-top object-fit-cover" alt="${prod.pname}" style="height: 220px; object-fit: cover; border-top-left-radius: 0.5rem; border-top-right-radius: 0.5rem;">
            <div class="card-body d-flex flex-column justify-content-between">
                <h5 class="card-title fw-bold text-primary mb-2">${prod.pname}</h5>
                <p class="card-text mb-1"><span class="fw-semibold">Price:</span> <span class="text-success">₹${prod.price}</span></p>
                <p class="card-text mb-1"><span class="fw-semibold">Stock:</span> <span class="${prod.stock > 0 ? 'text-success' : 'text-danger'}">${prod.stock > 0 ? prod.stock : 'Out of Stock'}</span></p>
                <p class="card-text mb-3"><span class="fw-semibold">Type:</span> ${prod.type}</p>
                <div class="d-flex align-items-center gap-2 mt-auto">
                    <button class="btn btn-outline-secondary btn-sm minus-btn" data-index="${index}" ${quantity === 0 ? "disabled" : ""}>-</button>
                    <span class="cart-qty" id="cart-qty-${index}">${quantity}</span>
                    <button class="btn btn-outline-secondary btn-sm plus-btn" data-index="${index}" ${prod.stock > quantity ? "" : "disabled"}>+</button>
                    <button class="btn btn-gradient-primary ms-auto add-cart-btn" data-index="${index}" style="background: linear-gradient(90deg, #4e54c8 0%, #8f94fb 100%); color: #fff; border: none;">Add to Cart</button>
                </div>
            </div>
        </div>`
        prodSec.appendChild(card);
    });

    // Add event listeners for +, -, and Add to Cart buttons
    document.querySelectorAll(".plus-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            let idx = this.getAttribute("data-index");
            let stock = parseInt(products[idx].stock);
            cart[idx] = (cart[idx] || 0) + 1;
            if (cart[idx] > stock) cart[idx] = stock;
            updateCartStorage();
            getProduct();
        });
    });

    document.querySelectorAll(".minus-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            let idx = this.getAttribute("data-index");
            cart[idx] = (cart[idx] || 0) - 1;
            if (cart[idx] < 0) cart[idx] = 0;
            updateCartStorage();
            getProduct();
        });
    });

    document.querySelectorAll(".add-cart-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            let idx = this.getAttribute("data-index");
            if (!cart[idx]) cart[idx] = 1;
            updateCartStorage();
            getProduct();
            alert("Product added to cart!");
        });
    });
}

getProduct();

