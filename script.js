let cart = {};
        let totalPrice = 0;

        function toggleProducts(category) {
            const productsDiv = document.getElementById(category);
            const otherDivs = ['mixers', 'players', 'controllers', 'turntables', 'effects', 'headphones', 'cases', 'stands', 'software', 'cables', 'monitors', 'production', 'usb', 'tables', 'accessories', 'hearing'];
            
            const categoryTitle = document.getElementById("category-title");
            
            
            const categoryNames = {
                mixers: "DJ Миксери",
                players: "DJ Плейъри",
                controllers: "DJ Контролери",
                turntables: "DJ Грамофони",
                effects: "DJ Ефектори",
                headphones: "DJ Слушалки",
                cases: "DJ Кейсове",
                stands: "DJ Стойки",
                software: "DJ Софтуер",
                cables: "DJ Кабели",
                monitors: "Мониторни Колони",
                production: "Музикално Продуциране",
                usb: "USB Flash / SD Card Памети",
                tables: "DJ Маси - Пултове",
                accessories: "Аксесоари / Резервни Части",
                hearing: "Защита на Слуха"
            };
        
            for (let div of otherDivs) {
                if (div !== category) {
                    document.getElementById(div).style.display = 'none'; 
                }
            }
        
            
            if (productsDiv.style.display === "none" || productsDiv.style.display === "") {
                productsDiv.style.display = "flex";  
                categoryTitle.innerText = categoryNames[category]; 
                categoryTitle.style.display = "block"; 
            } else {
                productsDiv.style.display = "none"; 
                categoryTitle.style.display = "none"; 
            }
        }
        
        

        function addToCart(productName, price) {
            if (!cart[productName]) {
                cart[productName] = { price: price, quantity: 1 };
            } else {
                cart[productName].quantity++;
            }

            updateCart();
        }

        function updateCart() {
            const cartItemsDiv = document.getElementById("cart-items");
            cartItemsDiv.innerHTML = ""; 
            totalPrice = 0;

            for (const product in cart) {
                const item = cart[product];
                const itemDiv = document.createElement("div");
                itemDiv.className = "cart-item";
                itemDiv.innerHTML = `
                
                    ${product} - ${item.price}лв x 
                    <button class="quantity-button" onclick="updateQuantity('${product}', -1)">-</button>
                    <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                    <button class="quantity-button" onclick="updateQuantity('${product}', 1)">+</button>
                    = ${item.price * item.quantity}лв
                `;
                cartItemsDiv.appendChild(itemDiv);
                totalPrice += item.price * item.quantity;
            }

            document.getElementById("total").innerText = `Общо: ${totalPrice}лв`;
        }

        function updateQuantity(productName, change) {
            if (cart[productName]) {
                cart[productName].quantity += change;

                if (cart[productName].quantity <= 0) {
                    delete cart[productName]; 
                }

                updateCart();
            }
        }

        function searchProducts() {
            const input = document.getElementById("searchInput").value.toLowerCase();
            const products = document.querySelectorAll('.product');

            products.forEach(product => {
                const productName = product.querySelector('h2').textContent.toLowerCase();
                if (productName.includes(input)) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        }
        
        const allProducts = [
            { name: "PLAYdifferently: MODEL 1", price: 200, image: "DJ миксери/preview6-f9cbf608-fotor-bg-remover-2025010723815.png" },
            { name: "PLAYdifferently: MODEL 1.4", price: 250, image: "DJ миксери/untitled-1-web-33d04152-fotor-bg-remover-2025010723830.png" },
            { name: "Allen & Heath Xone:23C", price: 250, image: "DJ миксери/main_0fd409a8-941047d8-fotor-bg-remover-2025010723749.png" },
            { name: "DJ Player 1", price: 300, image: "DJ плейъри/CDJ-3000-top-hero-4337b81b-fotor-bg-remover-20250107231022.png" },
            { name: "DJ Player 2", price: 350, image: "DJ плейъри/pioneer-cdj-700-6dd8cb0f-fotor-bg-remover-20250107231038.png" },
            { name: "DJ Player 3", price: 400, image: "DJ плейъри/XDJ-1000MK2-top-hero-2a1a6dd3-fotor-bg-remover-20250107231050.png" },
            { name: "Kontroler 1", price: 500, image: "DJ контролери/DDJ-GRV6_CGI_Top_3300x1886-e513cb10-fotor-bg-remover-20250107231226.png" },
            { name: "Kontroler 2", price: 600, image: "DJ контролери/OpusQuad-5e0fcd44-fotor-bg-remover-20250107231241.png" },
            { name: "Грамофон 1", price: 400, image: "DJ грамофони/djm-900nxs2-main5-d8724009.png" },
            { name: "Грамофон 2", price: 450, image: "DJ грамофони/Нов проект (5)2-abe31731-fotor-bg-remover-20250107231432.png" },
            { name: "Ефектор 1", price: 200, image: "DJ ефектори  семплери/toraiz-squid-top-502a5b56-fotor-bg-remover-20250107231624.png" },
            { name: "Ефектор 2", price: 250, image: "DJ ефектори  семплери/toriaz-sp-16-main-c80a78a7-fotor-bg-remover-20250107231942.png" },
            { name: "Слушалка 1", price: 150, image: "DJ слушалки/audio-technica-ath-m50xrd-headphones-product-front6-0da3e032-fotor-bg-remover-20250107232049.png" },
            { name: "Слушалка 2", price: 200, image: "DJ слушалки/HDJ-F10_CGI_Angle_2802x33002-f21d727c-fotor-bg-remover-20250107232041.png" },
            { name: "Кейс 1", price: 100, image: "DJ кейсове, чанти и раници/DJRC-MULTI1_CLOSED-f92ac22c-fotor-bg-remover-20250107232156.png" },
            { name: "Кейс 2", price: 150, image: "DJ кейсове, чанти и раници/REV-7_FLT0368-86d1f6c1-fotor-bg-remover-20250107232230.png" },
            { name: "Стойка 1", price: 90, image: "DJ стойки/ks22-supporto-tastiera-doppio-montante-tubi-acciaio-30-mm-5-600x814-4d992a06-fotor-bg-remover-20250107232329.png" },
            { name: "Стойка 2", price: 120, image: "DJ стойки/Нов проект (4)6-d99167f0-fotor-bg-remover-20250107232341.png" },
            { name: "Софтуер 1", price: 150, image: "DJ софтуер и интерфейси/rb-dmx1-main--9af5699d-fotor-bg-remover-20250107232526.png" },
            { name: "Софтуер 2", price: 180, image: "DJ софтуер и интерфейси/RB-LD4-75b1c894-fotor-bg-remover-20250107232539.png" },
            { name: "Кабел 1", price: 20, image: "DJ кабели/51NQlH-sHAS._AC_UF1000,1000_QL80_-652ed09e-fotor-bg-remover-202501084270.png" },
            { name: "Кабел 2", price: 30, image: "DJ кабели/RKJX500_confezione-600x600-6f4b918c-fotor-bg-remover-2025010723286.png" },
            { name: "Колона 1", price: 200, image: "Мониторни колони/dm-40bt-w-front-bt-23-9e68f9ed-fotor-bg-remover-20250107233137.png" },
            { name: "Колона 2", price: 250, image: "Мониторни колони/Нов проект (1)-cb5f1b62-fotor-bg-remover-20250107233227.png" },
            { name: "Продуциране 1", price: 400, image: "Музикално продуциране/toraiz-as-1-main-f230f5db-fotor-bg-remover-2025010723342.png" },
            { name: "Продуциране 2", price: 450, image: "Музикално продуциране/toriaz-sp-16-main-c80a78a7-fotor-bg-remover-20250107233554.png" },
            { name: "USB Flash 1", price: 15, image: "USB Flash  SD Card памети/karta-pamet-sandisk---extreme-pro--128gb--sdxc--class10-30-aae3c3ae-fotor-bg-remover-2025010723408.png" },
            { name: "USB Flash 2", price: 25, image: "USB Flash  SD Card памети/изтеглен файл-fotor-bg-remover-20250107234028.png" },
            { name: "Маса 1", price: 300, image: "DJ маси - пултове/u91072bl_feature02-4c969a8c-fotor-bg-remover-20250107234210.png" },
            { name: "Маса 2", price: 350, image: "DJ маси - пултове/u91072wh_main_08-5a8840cc-fotor-bg-remover-20250107234225.png" },
            { name: "Аксесоар 1", price: 25, image: "Аксесоари  резервни части/18351671_800-7d8ab4fd-fotor-bg-remover-20250107234353.png" },
            { name: "Аксесоар 2", price: 35, image: "Аксесоари  резервни части/819KSQEHJGL._AC_UF894,1000_QL80_-9b58bbc3-fotor-bg-remover-20250107234339.png" },
            { name: "Защита 1", price: 40, image: "Защита на слуха/Fender_ear_plugs_djshop-964d1afa-fotor-bg-remover-20250107234442.png" },
            { name: "Защита 2", price: 50, image: "Защита на слуха/Тапи-8e9f0575-fotor-bg-remover-20250107234511.png" },
        ];
        
        
    
    
;


const categoryMap = {
    mixers: ["PLAYdifferently: MODEL 1", "PLAYdifferently: MODEL 1.4", "Allen & Heath Xone:23C"],
    players: ["DJ Player 1", "DJ Player 2", "DJ Player 3"],
    controllers: ["Kontroler 1", "Kontroler 2"],
    turntables: ["Грамофон 1", "Грамофон 2"],
    effects: ["Ефектор 1", "Ефектор 2"],
    headphones: ["DJ Слушалки", "Слушалка 1", "Слушалка 2"],
    cases: ["Кейс 1", "Кейс 2"],
    stands: ["Стойка 1", "Стойка 2"],
    software: ["Софтуер 1", "Софтуер 2"],
    cables: ["Кабел 1", "Кабел 2"],
    monitors: ["Колона 1", "Колона 2"],
    production: ["Продуциране 1", "Продуциране 2"],
    usb: ["USB Flash 1", "USB Flash 2"],
    tables: ["Маса 1", "Маса 2"],
    accessories: ["Аксесоар 1", "Аксесоар 2"],
    hearing: ["Защита 1", "Защита 2"],
};



let allProductsCopy = [];
let currentStartIndex = 0; 
const itemsPerPage = 5; 


document.addEventListener("DOMContentLoaded", () => {
    copyAllProducts();
    showRandomProducts();
});


function copyAllProducts() {
    const categories = Object.keys(categoryMap); 
    categories.forEach(category => {
        const productsDiv = document.getElementById(category);
        if (productsDiv) {
            const products = Array.from(productsDiv.querySelectorAll('.product'));
            products.forEach(product => {
                allProductsCopy.push({
                    name: product.querySelector('h2').textContent,
                    price: product.getAttribute('data-price'),
                    image: product.querySelector('img').getAttribute('src'),
                    category: category 
                });
            });
        }

    });
}


function showRandomProducts() {
    const randomProducts = getRandomProducts(allProductsCopy, itemsPerPage);
    renderProducts(randomProducts);
}


function updateDisplayedProducts(direction) {
    if (direction === "next") {
        currentStartIndex = (currentStartIndex + itemsPerPage) % allProductsCopy.length;
    } else if (direction === "prev") {
        currentStartIndex = (currentStartIndex - itemsPerPage + allProductsCopy.length) % allProductsCopy.length;
    }
    const productsToShow = allProductsCopy.slice(currentStartIndex, currentStartIndex + itemsPerPage);
    renderProducts(productsToShow);
}


function getRandomProducts(products, count) {
    const shuffled = products.sort(() => 0.5 - Math.random()); 
    return shuffled.slice(0, count); 
}


function renderProducts(products) {
    const container = document.getElementById("random-products");
    container.innerHTML = ""; 

    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "product"; 

        
        productDiv.innerHTML = `
            <h2>${product.name}</h2>
            <img src="${product.image}" alt="${product.name}">
            <p>Категория: ${product.category}</p>
            <button class="go-button" onclick="goToCategory('${product.category}')">Виж</button>
        `;

        container.appendChild(productDiv); 
    });
}


function goToCategory(category) {
    const categoryDiv = document.getElementById(category);
    if (categoryDiv) {
        
        const otherDivs = Object.keys(categoryMap);
        otherDivs.forEach(div => {
            document.getElementById(div).style.display = 'none';
        });

        
        categoryDiv.style.display = "flex";

        
        const categoryTitle = document.getElementById("category-title");
        categoryTitle.innerText = category;
        categoryTitle.style.display = "block";
    }
}


document.getElementById("next-btn").addEventListener("click", () => updateDisplayedProducts("next"));
document.getElementById("prev-btn").addEventListener("click", () => updateDisplayedProducts("prev"));

function openModal(name, price, image, description) {
    
    document.getElementById("modalTitle").innerText = name;
    document.getElementById("modalImage").src = image;
    document.getElementById("modalDescription").innerText = description;
    document.getElementById("modalPrice").innerText = `Цена: ${price}лв`;
    
    
    window.selectedProduct = { name, price };

    
    document.getElementById("productModal").style.display = "block";

    
    showModalRandomProducts();
}
function addToCartFromModal() {
    const quantity = parseInt(document.getElementById("quantity").value); 
    const productName = window.selectedProduct.name; 
    const productPrice = window.selectedProduct.price; 

    addToCart(productName, productPrice, quantity); 
    closeModal(); 
}


function addToCart(productName, price, quantity = 1) {
    fetch('add_to_cart.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            product_name: productName,
            quantity: quantity,
            price: price
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log(data.message); 
                fetchCart(); 
            } else {
                console.error(data.message);
            }
        })
        .catch(error => {
            console.error('Hata:', error);
        });
}




function fetchCart() {
    fetch('get_cart.php', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                updateCartDisplay(result.cart_items);
            } else {
                console.error(`Hata: ${result.message}`);
            }
        })
        .catch(error => console.error('Hata:', error));
}

function updateCartDisplay(cartItems) {
    const cartItemsDiv = document.getElementById("cart-items");
    cartItemsDiv.innerHTML = ""; 
    let totalPrice = 0;

    cartItems.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";
        itemDiv.innerHTML = `
            <span class="item-name">${item.product_name}</span>
            <div class="quantity-controls">
                <input 
                    type="number" 
                    class="quantity-input" 
                    value="${item.quantity}" 
                    min="1" 
                    onchange="changeItemQuantity('${item.product_name}', this.value)">
            </div>
            <span class="item-price">${item.price * item.quantity}лв</span>
            <button class="remove-button" onclick="removeFromCart('${item.product_name}')">Изтрий</button>
        `;
        cartItemsDiv.appendChild(itemDiv);
        totalPrice += item.price * item.quantity;
    });

    document.getElementById("total").innerText = `Общо: ${totalPrice}лв`;
}



function updateQuantity(productName, change) {
    fetch('update_cart.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            product_name: productName,
            change: change,
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                fetchCart(); 
            } else {
                console.error(data.message);
            }
        })
        .catch(error => console.error('Грешка:', error));
}

function changeItemQuantity(productName, quantity) {
    if (quantity < 1) {
        alert("Количестжото на продукт трябва да бъде най-малко 1.");
        return;
    }

    fetch('update_cart.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            product_name: productName,
            new_quantity: parseInt(quantity), 
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                fetchCart(); 
                console.log(data.message);
            } else {
                console.error(data.message);
            }
        })
        .catch(error => {
            console.error('Грешка:', error);
        });
}




document.addEventListener("DOMContentLoaded", () => {
    fetchCart(); 
});
function removeFromCart(productName) {
    fetch('update_cart.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            product_name: productName,
            remove: true, 
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP код на грешка: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                fetchCart(); 
                console.log(data.message);
            } else {
                console.error(data.message);
            }
        })
        .catch(error => {
            console.error('Грешка:', error);
        });
}









function updateCart() {
    const cartItemsDiv = document.getElementById("cart-items");
    cartItemsDiv.innerHTML = ""; 
    totalPrice = 0;

    for (const product in cart) {
        const item = cart[product];
        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";
        itemDiv.innerHTML = `
            ${product} - ${item.price}лв x 
            <button class="quantity-button" onclick="updateQuantity('${product}', -1)">-</button>
            <input type="text" class="quantity-input" value="${item.quantity}" readonly>
            <button class="quantity-button" onclick="updateQuantity('${product}', 1)">+</button>
            = ${item.price * item.quantity}лв
        `;
        cartItemsDiv.appendChild(itemDiv);
        totalPrice += item.price * item.quantity;
    }

    document.getElementById("total").innerText = `Общо: ${totalPrice}лв`;
}


function closeModal() {
    document.getElementById("productModal").style.display = "none";
}

function goToCategory(category) {
    const categoryDiv = document.getElementById(category);
    if (categoryDiv) {
        const otherDivs = Object.keys(categoryMap);
        otherDivs.forEach(div => {
            document.getElementById(div).style.display = 'none';
        });

        categoryDiv.style.display = "flex";

        const categoryTitle = document.getElementById("category-title");
        categoryTitle.innerText = category;
        categoryTitle.style.display = "block";
        
        
        closeModal();
    }
}
function changeQuantity(change) {
    const quantityInput = document.getElementById("quantity");
    let currentQuantity = parseInt(quantityInput.value);
    currentQuantity += change;

    
    if (currentQuantity < 1) {
        currentQuantity = 1;
    }

    quantityInput.value = currentQuantity; 
}

let modalRandomProducts = []; 
let modalCurrentStartIndex = 0; 
const modalItemsPerPage = 3; 
let shownModalProducts = []; 

function showModalRandomProducts() {
    copyModalRandomProducts(); 
    shuffleArray(modalRandomProducts); 
    updateModalDisplayedProducts("next"); 
}

function copyModalRandomProducts() {
    
    modalRandomProducts = allProducts.filter(product => !shownModalProducts.includes(product.name)); 
    if (modalRandomProducts.length === 0) {
        
        modalRandomProducts = [...allProducts];
        shownModalProducts = []; 
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
}

function updateModalDisplayedProducts(direction) {
    if (direction === "next") {
        modalCurrentStartIndex = (modalCurrentStartIndex + modalItemsPerPage) % modalRandomProducts.length;
    } else if (direction === "prev") {
        modalCurrentStartIndex = (modalCurrentStartIndex - modalItemsPerPage + modalRandomProducts.length) % modalRandomProducts.length;
    }
    const productsToShow = modalRandomProducts.slice(modalCurrentStartIndex, modalCurrentStartIndex + modalItemsPerPage);
    renderModalRandomProducts(productsToShow);
}

function renderModalRandomProducts(products) {
    const container = document.getElementById("modal-random-products");
    container.innerHTML = ""; 
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "product"; 
        productDiv.innerHTML = `
            <h2>${product.name}</h2>
            <img src="${product.image}" alt="${product.name}" style="max-width: 100%; height: auto;">
            <p>Цена: ${product.price}лв</p>
            <button class="go-button" onclick="goToCategory('${product.category}')">Виж</button>
        `;
        container.appendChild(productDiv); 
    });
}

document.addEventListener("DOMContentLoaded", function () {
    let isCartOpen = false;

    
    function toggleCart() {
        const cart = document.getElementById("cart");
        if (cart.style.display === "none" || cart.style.display === "") {
            cart.style.display = "block"; 
            isCartOpen = true;
        } else {
            cart.style.display = "none"; 
            isCartOpen = false;
        }
    }

    
    document.addEventListener("click", function (event) {
        const cart = document.getElementById("cart");
        const cartIcon = document.querySelector(".cart-icon");

        
        if (cart && cartIcon && !cart.contains(event.target) && !cartIcon.contains(event.target) && isCartOpen) {
            cart.style.display = "none"; 
            isCartOpen = false;
        }
    });

    
    const cartIcon = document.querySelector(".cart-icon");
    if (cartIcon) {
        cartIcon.addEventListener("click", toggleCart);
    }
});

let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');

let lengthItems = items.length - 1;
let active = 0;

next.onclick = function (event) {
    event.stopPropagation(); 
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
}

prev.onclick = function (event) {
    event.stopPropagation(); 
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
}

let refreshInterval = setInterval(() => { next.click() }, 3000);

function reloadSlider() {
    slider.style.left = -items[active].offsetLeft + 'px';

    let last_active_dot = document.querySelector('.slider .dots li.active');
    last_active_dot.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => { next.click() }, 3000);
}

dots.forEach((li, key) => {
    li.addEventListener('click', (event) => {
        event.stopPropagation(); 
        active = key;
        reloadSlider();
    });
});

window.onresize = function (event) {
    reloadSlider();
};
function placeOrder() {
    window.location.href = "order.html";
}




