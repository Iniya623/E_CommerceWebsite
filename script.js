const productContainer = document.getElementById("productContainer");
const cartCount = document.getElementById("cartCount");

let isAdmin = false;
const adminPassword = "1234"; // Set your password

let products = [
    { id: 1, name: "Sudithar", price: 599, img: "images/sudi.jpg" },
    { id: 2, name: "sudithar material", price: 499, img: "images/sudi2.jpg" },
    { id: 3, name: "Top and legin", price: 349, img: "images/dre1.jpg" },
    { id: 4, name: "Tops", price: 299, img: "images/top.jpg" },
    { id: 5, name: "Saree", price: 500, img: "images/saree.jpg" },
    { id: 6, name: "Midi", price: 500, img: "images/midi.jpg" },
    { id: 7, name: "Frock", price: 1099, img: "images/frock.jpg" },
    { id: 8, name: "Tshirt", price: 699, img: "images/tshirt2.jpg" },
    { id: 9, name: "Palaza phant", price: 699, img: "images/tshirt.jpg" },
];

let editId = null;
let cart = [];

function displayProducts() {
    productContainer.innerHTML = "";
    
    products.forEach(p => {
        productContainer.innerHTML += `
            <div class="product-card">
                <img src="${p.img || 'https://via.placeholder.com/200'}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p>₹ ${p.price}</p>

                ${isAdmin ? `
    <div class="btn-group">
        <button class="edit-btn" onclick="editProduct(${p.id})">Edit</button>
        <button class="delete-btn" onclick="deleteProduct(${p.id})">Delete</button>
    </div>
` : ``}


                <button class="cart-btn" onclick="addToCart(${p.id})">
                    Add to Cart
                </button>
            </div>
        `;
    });
}

displayProducts();
function openLogin() {
    document.getElementById("loginPopup").style.display = "flex";
}

function closeLogin() {
    document.getElementById("loginPopup").style.display = "none";
}

function checkLogin() {
    let pass = document.getElementById("adminPass").value;

    if (pass === adminPassword) {
        isAdmin = true;
        alert("Admin login successful!");
        document.querySelector(".admin-panel").style.display = "block";
        closeLogin();
    } else {
        alert("Wrong password!");
    }
}


// Add or Update Product
document.getElementById("addProductBtn").onclick = () => {
    const name = document.getElementById("pName").value;
    const price = document.getElementById("pPrice").value;
    const img = document.getElementById("pImg").value;

    if (name === "" || price === "") return alert("Enter all details!");

    if (editId) {
        let p = products.find(x => x.id === editId);
        p.name = name;
        p.price = price;
        p.img = img;
        editId = null;
        document.getElementById("addProductBtn").innerText = "Add Product";
    } else {
        products.push({
            id: Date.now(),
            name,
            price,
            img
        });
    }

    displayProducts();
};

// Edit Product
function editProduct(id) {
    let p = products.find(x => x.id === id);

    document.getElementById("pName").value = p.name;
    document.getElementById("pPrice").value = p.price;
    document.getElementById("pImg").value = p.img;

    editId = id;
    document.getElementById("addProductBtn").innerText = "Update Product";
}

// Delete Product
function deleteProduct(id) {
    products = products.filter(p => p.id !== id);
    displayProducts();
}

// Add to Cart
function addToCart(id) {
    cart.push(id);
    cartCount.innerText = cart.length;
}

// Search Items
document.getElementById("search").addEventListener("keyup", function() {
    let keyword = this.value.toLowerCase();
    let filtered = products.filter(item => item.name.toLowerCase().includes(keyword));
    
    productContainer.innerHTML = "";
    filtered.forEach(p => {
        productContainer.innerHTML += `
            <div class="product-card">
                <img src="${p.img || 'https://via.placeholder.com/200'}">
                <h3>${p.name}</h3>
                <p>₹ ${p.price}</p>

                <div class="btn-group">
                    <button class="edit-btn" onclick="editProduct(${p.id})">Edit</button>
                    <button class="delete-btn" onclick="deleteProduct(${p.id})">Delete</button>
                </div>

                <button class="cart-btn" onclick="addToCart(${p.id})">Add to Cart</button>
            </div>
        `;
    });
});
