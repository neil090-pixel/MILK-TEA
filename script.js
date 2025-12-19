const milkTeaVariants = [
    { id: 1, name: 'Classic Milk Tea', price: 59.00, description: 'Our signature blend of premium black tea with creamy milk and chewy tapioca pearls.', image: 'images/classic.jpg', category: 'classic', featured: true },
    { id: 2, name: 'Taro Milk Tea', price: 64.00, description: 'Creamy and nutty taro root blended with fresh milk and topped with boba pearls.', image: 'images/taro.jpg', category: 'specialty', featured: true },
    { id: 3, name: 'Matcha Milk Tea', price: 55.00, description: 'Premium Japanese matcha whisked with milk for an earthy, smooth flavor.', image: 'images/matcha.jpg', category: 'specialty', featured: true },
    { id: 4, name: 'Thai Milk Tea', price: 65.00, description: 'Bold and aromatic Thai tea with condensed milk, served over ice.', image: 'images/thai.jpg', category: 'classic', featured: true },
    { id: 5, name: 'Brown Sugar Milk Tea', price: 45.00, description: 'Caramelized brown sugar with fresh milk and tiger-striped boba pearls.', image: 'images/brownsugar.jpg', category: 'specialty', featured: true },
    { id: 6, name: 'Wintermelon Milk Tea', price: 50.00, description: 'Refreshing wintermelon syrup with smooth milk tea and tapioca.', image: 'images/wintermelon.jpg', category: 'classic', featured: true },
    { id: 7, name: 'Okinawa Milk Tea', price: 51.00, description: 'Rich roasted brown sugar from Okinawa with premium milk tea base.', image: 'images/okinawa.jpg', category: 'specialty', featured: false },
    { id: 8, name: 'Honeydew Milk Tea', price: 59.00, description: 'Sweet honeydew melon blended with creamy milk tea.', image: 'images/honeydew.jpg', category: 'fruit', featured: false },
    { id: 9, name: 'Strawberry Milk Tea', price: 64.00, description: 'Fresh strawberry puree swirled with creamy milk tea.', image: 'images/strawberry.jpg', category: 'fruit', featured: false },
    { id: 10, name: 'Mango Milk Tea', price: 45.00, description: 'Tropical mango blended with smooth milk tea for a refreshing treat.', image: 'images/mango.jpg', category: 'fruit', featured: false },
    { id: 11, name: 'Oolong Milk Tea', price: 55.00, description: 'Semi-oxidized oolong tea with a floral aroma and creamy finish.', image: 'images/oolong.jpg', category: 'classic', featured: false },
    { id: 12, name: 'Jasmine Milk Tea', price: 54.00, description: 'Fragrant jasmine green tea with silky milk and pearls.', image: 'images/jasmine.jpg', category: 'classic', featured: false },
    { id: 13, name: 'Cookies & Cream', price: 64.00, description: 'Crushed Oreo cookies blended with creamy milk tea base.', image: 'images/cookies.jpg', category: 'specialty', featured: false },
    { id: 14, name: 'Peach Oolong Tea', price: 45.00, description: 'Refreshing peach flavor with premium oolong tea, no milk.', image: 'images/peach.jpg', category: 'fruit', featured: false },
    { id: 15, name: 'Lychee Green Tea', price: 40.00, description: 'Sweet lychee fruit paired with refreshing green tea.', image: 'images/lychee.jpg', category: 'fruit', featured: false }
];

let currentSlide = 0;
let cart = [];
let autoSlideInterval;

function initCarousel() {
    const carousel = document.getElementById('carousel');
    const dotsContainer = document.getElementById('dots');

    const featuredItems = milkTeaVariants.filter(item => item.featured);

    featuredItems.forEach((item, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-item';
        slide.innerHTML = `
            <div class="carousel-image-wrapper">
                <img src="${item.image}" alt="${item.name}" class="carousel-img" onerror="this.src='https://via.placeholder.com/400x400?text=${encodeURIComponent(item.name)}'">
            </div>
            <div class="carousel-info">
                <span class="carousel-category">${item.category}</span>
                <h3>${item.name}</h3>
                <div class="price">₱${item.price.toFixed(2)}</div>
                <p>${item.description}</p>
                <button class="btn btn-primary" onclick="addToCart(${item.id})">Add to Cart</button>
            </div>
        `;
        carousel.appendChild(slide);

        const dot = document.createElement('div');
        dot.className = 'dot';
        if (index === 0) dot.classList.add('active');
        dot.onclick = () => goToSlide(index);
        dotsContainer.appendChild(dot);
    });

    startAutoSlide();
}

function updateCarousel() {
    const carousel = document.getElementById('carousel');
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;

    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    const featuredItems = milkTeaVariants.filter(item => item.featured);
    currentSlide = (currentSlide + 1) % featuredItems.length;
    updateCarousel();
}

function prevSlide() {
    const featuredItems = milkTeaVariants.filter(item => item.featured);
    currentSlide = (currentSlide - 1 + featuredItems.length) % featuredItems.length;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
    resetAutoSlide();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

function initMenu() {
    const menuGrid = document.getElementById('menuGrid');
    menuGrid.innerHTML = '';

    milkTeaVariants.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = `menu-item ${item.category}`;
        menuItem.innerHTML = `
            <div class="menu-item-image">
                <img src="${item.image}" alt="${item.name}" class="menu-img" onerror="this.src='https://via.placeholder.com/300x250?text=${encodeURIComponent(item.name)}'">
                ${item.featured ? '<span class="featured-badge">Popular</span>' : ''}
            </div>
            <div class="menu-item-content">
                <span class="menu-category">${item.category}</span>
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="menu-item-footer">
                    <div class="price">₱${item.price.toFixed(2)}</div>
                    <button class="btn btn-primary btn-sm" onclick="addToCart(${item.id})">Add to Cart</button>
                </div>
            </div>
        `;
        menuGrid.appendChild(menuItem);
    });
}

function filterMenu(category, btn) {
    const menuItems = document.querySelectorAll('.menu-item');
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(b => b.classList.remove('active'));

    if (btn) {
        btn.classList.add('active');
    } else {
        filterBtns.forEach(b => {
            if (b.textContent.toLowerCase().includes(category === 'all' ? 'all' : category)) {
                b.classList.add('active');
            }
        });
    }

    menuItems.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'block';
            item.style.animation = 'fadeIn 0.5s ease';
        } else {
            item.style.display = 'none';
        }
    });
}

function showPage(pageName) {
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');

    pages.forEach(page => {
        page.classList.remove('active');
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === pageName) {
            link.classList.add('active');
        }
    });

    document.getElementById(pageName).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function addToCart(itemId) {
    const item = milkTeaVariants.find(i => i.id === itemId);
    const existingItem = cart.find(i => i.id === itemId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    updateCart();
    showNotification(`${item.name} added to cart!`);
}

function removeFromCart(itemId) {
    const itemIndex = cart.findIndex(i => i.id === itemId);
    if (itemIndex > -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        } else {
            cart.splice(itemIndex, 1);
        }
    }
    updateCart();
}

function updateCart() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <div class="cart-empty-icon">🧋</div>
                <p>Your cart is empty</p>
                <span>Add some delicious drinks!</span>
            </div>
        `;
        cartTotal.textContent = 'Total: ₱0.00';
        return;
    }

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item) => {
        total += item.price * item.quantity;
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='https://via.placeholder.com/60x60?text=Tea'">
            <div class="cart-item-info">
                <strong>${item.name}</strong>
                <span class="cart-item-price">₱${item.price.toFixed(2)}</span>
            </div>
            <div class="cart-item-controls">
                <button class="qty-btn" onclick="removeFromCart(${item.id})">-</button>
                <span class="qty-display">${item.quantity}</span>
                <button class="qty-btn" onclick="addToCart(${item.id})">+</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = `Total: ₱${total.toFixed(2)}`;
}

function toggleCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.toggle('active');
    document.body.style.overflow = cartModal.classList.contains('active') ? 'hidden' : '';
}

function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.toggle('active');
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    showNotification(`Order placed! Total: ₱${total.toFixed(2)}`);
    cart = [];
    updateCart();
    toggleCart();
}

window.onclick = function (event) {
    const mobileNav = document.getElementById('mobileNav');
    if (!event.target.closest('.mobile-menu-btn') && !event.target.closest('.mobile-nav')) {
        mobileNav.classList.remove('active');
    }
}

initCarousel();
initMenu();