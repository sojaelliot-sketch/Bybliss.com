// ============================================
        // BYBLISS ENHANCED - 30+ FEATURES
        // ============================================

        // === PERFORMANCE: RAF-based progress bar ===
        let ticking = false;
        function updateProgress() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            document.getElementById('progressBar').style.width = pct + '%';

            const navbar = document.getElementById('navbar');
            if (scrollTop > 40) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');

            const backToTop = document.getElementById('backToTop');
            if (scrollTop > 500) backToTop.classList.add('show');
            else backToTop.classList.remove('show');

            const stickyCta = document.getElementById('stickyCta');
            if (window.innerWidth <= 640 && scrollTop > window.innerHeight * 0.6) stickyCta.classList.add('show');
            else stickyCta.classList.remove('show');

            ticking = false;
        }
        window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(updateProgress); ticking = true; } }, { passive: true });

        // === LOADER ===
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loader').classList.add('hidden');
                initFlashSale();
            }, 800);
        });

        // === DARK MODE ===
        function toggleTheme() {
            const html = document.documentElement;
            const icon = document.getElementById('themeIcon');
            const mobileIcon = document.getElementById('mobileThemeIcon');
            const mobileNavIcon = document.getElementById('mobileNavThemeIcon');
            const mobileNavText = document.getElementById('mobileNavThemeText');
            const meta = document.getElementById('themeColor');
            const current = html.getAttribute('data-theme');
            const next = current === 'light' ? 'dark' : 'light';

            html.setAttribute('data-theme', next);
            localStorage.setItem('bybliss-theme', next);

            const newIcon = next === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            if (icon) icon.className = newIcon;
            if (mobileIcon) mobileIcon.className = newIcon;
            if (mobileNavIcon) mobileNavIcon.className = newIcon;
            if (mobileNavText) mobileNavText.textContent = next === 'dark' ? 'Light Mode' : 'Dark Mode';

            meta.setAttribute('content', next === 'dark' ? '#121212' : '#F5F1EB');
            document.body.style.background = next === 'dark' ? '#121212' : '#FAF8F5';
            setTimeout(() => { document.body.style.background = ''; }, 10);
        }

        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('bybliss-theme') || (systemDark ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', savedTheme);
        const initialIcon = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        const themeIcon = document.getElementById('themeIcon');
        const mobileThemeIcon = document.getElementById('mobileThemeIcon');
        const mobileNavThemeIcon = document.getElementById('mobileNavThemeIcon');
        const mobileNavThemeText = document.getElementById('mobileNavThemeText');
        if (themeIcon) themeIcon.className = initialIcon;
        if (mobileThemeIcon) mobileThemeIcon.className = initialIcon;
        if (mobileNavThemeIcon) mobileNavThemeIcon.className = initialIcon;
        if (mobileNavThemeText) mobileNavThemeText.textContent = savedTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
        document.getElementById('themeColor').setAttribute('content', savedTheme === 'dark' ? '#121212' : '#F5F1EB');

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!localStorage.getItem('bybliss-theme')) {
                const t = e.matches ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', t);
                const newIcon = e.matches ? 'fas fa-sun' : 'fas fa-moon';
                if (themeIcon) themeIcon.className = newIcon;
                if (mobileThemeIcon) mobileThemeIcon.className = newIcon;
                if (mobileNavIcon) mobileNavIcon.className = newIcon;
                if (mobileNavText) mobileNavText.textContent = e.matches ? 'Light Mode' : 'Dark Mode';
                document.getElementById('themeColor').setAttribute('content', e.matches ? '#121212' : '#F5F1EB');
            }
        });

        // === TYPING ANIMATION ===
        const phrases = ["Mini Essentials.", "Curated For You.", "On WhatsApp.", "ByBliss."];
        let phraseIndex = 0, charIndex = 0, isDeleting = false, lastTime = 0;
        const typingElement = document.getElementById('typingText');
        function typeEffect(timestamp) {
            if (!lastTime) lastTime = timestamp;
            const delta = timestamp - lastTime;
            if (delta > (isDeleting ? 40 : 100)) {
                const currentPhrase = phrases[phraseIndex];
                if (isDeleting) {
                    typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
                    charIndex--;
                } else {
                    typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
                    charIndex++;
                }
                if (!isDeleting && charIndex === currentPhrase.length) {
                    lastTime = timestamp + 1800;
                    isDeleting = true;
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    lastTime = timestamp + 400;
                } else {
                    lastTime = timestamp;
                }
            }
            requestAnimationFrame(typeEffect);
        }
        requestAnimationFrame(typeEffect);

        // === BUSINESS HOURS ===
        function updateBusinessHours() {
            const now = new Date();
            const hour = now.getUTCHours() + 1;
            const isOpen = hour >= 9 && hour < 21;
            const badge = document.getElementById('hoursBadge');
            const text = document.getElementById('hoursText');
            badge.classList.toggle('open', isOpen);
            badge.classList.toggle('closed', !isOpen);
            text.textContent = isOpen ? 'Open Now · 9am–9pm WAT' : 'Closed · Opens 9am WAT';
        }
        updateBusinessHours();
        setInterval(updateBusinessHours, 60000);

        // === SCROLL REVEAL ===
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => revealObserver.observe(el));

        // === STEPS PROGRESS ===
        const stepsFill = document.getElementById('stepsFill');
        const stepsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) stepsFill.style.height = '100%';
            });
        }, { threshold: 0.15 });
        const stepsSection = document.querySelector('.how-it-works');
        if (stepsSection) stepsObserver.observe(stepsSection);

        // === FAQ ===
        function toggleFaq(element) {
            const item = element.parentElement;
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(faq => {
                faq.classList.remove('active');
                faq.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });
            if (!isActive) {
                item.classList.add('active');
                element.setAttribute('aria-expanded', 'true');
            }
        }

        // === SMOOTH SCROLL ===
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offset = 70;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }
            });
        });

        // === TOAST ===
        function showToast(message) {
            const container = document.getElementById('toastContainer');
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.innerHTML = `<i class="fas fa-info-circle"></i> <span>${message}</span>`;
            container.appendChild(toast);
            requestAnimationFrame(() => toast.classList.add('show'));
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 350);
            }, 2200);
        }

        // === COOKIES ===
        function acceptCookies() {
            localStorage.setItem('bybliss-cookies', 'accepted');
            document.getElementById('cookieBanner').classList.remove('show');
        }
        if (!localStorage.getItem('bybliss-cookies')) {
            setTimeout(() => document.getElementById('cookieBanner').classList.add('show'), 2500);
        }

        // === CURRENCY ===
        const exchangeRates = { NGN: 1, USD: 0.00067, GBP: 0.00053 };
        const currencySymbols = { NGN: '₦', USD: '$', GBP: '£' };
        let currentCurrency = 'NGN';
        function setCurrency(currency) {
            currentCurrency = currency;
            document.querySelectorAll('.currency-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.currency === currency);
            });
            document.querySelectorAll('.product-price').forEach(price => {
                const ngn = parseInt(price.dataset.ngn);
                const converted = Math.round(ngn * exchangeRates[currency]);
                const symbol = currencySymbols[currency];
                price.innerHTML = currency === 'NGN' ? `${symbol}${converted.toLocaleString()}<span>+</span>` : `${symbol}${converted}<span>+</span>`;
            });
            localStorage.setItem('bybliss-currency', currency);
            showToast(`Currency: ${currency}`);
            updateCartDisplay();
        }
        const savedCurrency = localStorage.getItem('bybliss-currency') || 'NGN';
        if (savedCurrency !== 'NGN') setCurrency(savedCurrency);

        // === PRODUCT DATA ===
        const productData = [
            { id: 0, name: "Mini Skincare Sets", icon: "fa-pump-soap", price: 4500, stock: 3, category: "skincare", desc: "Travel-size serums, pocket masks, and compact moisturizers for on-the-go care. Perfect for gym bags, travel, or trying new products without committing to full sizes.", size: "30-50ml each", related: [1, 4], badge: "Popular", variants: ["Dry Skin", "Oily Skin", "Combo"], rating: 4.8, reviews: 24 },
            { id: 1, name: "Compact Beauty Tools", icon: "fa-lipstick", price: 3000, stock: 8, category: "beauty", desc: "Mini brushes, travel mirrors, and small applicators that fit in your purse. Professional quality in pocket-friendly sizes.", size: "Pocket / Travel", related: [0, 2], badge: "New", variants: ["Brush Set", "Mirror", "Applicator"], rating: 4.6, reviews: 18 },
            { id: 2, name: "Pocket Accessories", icon: "fa-mobile-alt", price: 2000, stock: 2, category: "accessories", desc: "Phone charms, keychains, clips, and small jewelry pieces with personality. Express yourself in miniature.", size: "Various", related: [3, 5], badge: "Hot", variants: ["Phone Charm", "Keychain", "Clip"], rating: 4.9, reviews: 31 },
            { id: 3, name: "Desk & Space Minis", icon: "fa-coffee", price: 3500, stock: 15, category: "lifestyle", desc: "Small candles, mini organizers, and compact self-care items for your setup. Turn any corner into a calm space.", size: "Desk / Shelf", related: [4, 2], badge: null, variants: ["Candle", "Organizer", "Plant"], rating: 4.5, reviews: 12 },
            { id: 4, name: "Mini Wellness", icon: "fa-seedling", price: 4000, stock: 10, category: "lifestyle", desc: "Small essential oils, pocket journals, and tiny tools for mindful moments. Self-care that fits in your palm.", size: "Pocket / Travel", related: [0, 3], badge: null, variants: ["Oil Set", "Journal", "Tools"], rating: 4.7, reviews: 19 },
            { id: 5, name: "Mystery Mini Box", icon: "fa-gift", price: 12500, stock: 5, category: "bundles", desc: "A curated box of 5 surprise mini items. The perfect treat-yourself moment. Each box is different — the surprise is half the fun.", size: "5 Items", related: [0, 1], badge: "Bundle", variants: ["Standard", "Premium"], rating: 4.9, reviews: 42 }
        ];

        // === RENDER PRODUCTS ===
        function renderProducts() {
            const grid = document.getElementById('productsGrid');
            grid.innerHTML = productData.map(p => `
                <div class="product-card reveal" data-category="${p.category}" data-name="${p.name}" data-price="${p.price}" data-stock="${p.stock}" data-id="${p.id}">
                    <div class="product-image">
                        <i class="fas ${p.icon}"></i>
                        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
                        ${p.stock <= 5 ? `<span class="stock-badge"><i class="fas fa-fire"></i> Only ${p.stock} left</span>` : ''}
                        <span class="social-proof"><i class="fas fa-eye"></i> ${Math.floor(Math.random() * 20 + 3)} viewing</span>
                        <button class="quick-view-btn" onclick="openProductModal(${p.id})">Quick View</button>
                    </div>
                    <div class="product-info">
                        <h3>${p.name}</h3>
                        <div style="display:flex; align-items:center; gap:6px; margin-bottom:6px;">
                            <span style="color:var(--terracotta); font-size:0.75rem;"><i class="fas fa-star"></i> ${p.rating}</span>
                            <span style="color:var(--muted); font-size:0.72rem;">(${p.reviews} reviews)</span>
                        </div>
                        <p>${p.desc.substring(0, 80)}...</p>
                        <div class="product-footer">
                            <span class="product-price" data-ngn="${p.price}" data-usd="${Math.round(p.price * exchangeRates.USD)}" data-gbp="${Math.round(p.price * exchangeRates.GBP)}">₦${p.price.toLocaleString()}<span>+</span></span>
                            <div class="product-actions">
                                <button class="wishlist-btn" onclick="toggleWishlist(${p.id}, this); event.stopPropagation();" aria-label="Add to wishlist">
                                    <i class="far fa-heart"></i>
                                </button>
                                <button class="product-btn" onclick="addToCart(${p.id}); event.stopPropagation();" aria-label="Add to cart">
                                    <i class="fas fa-plus"></i>
                                </button>
                                <a href="https://wa.me/2348060193495?text=Hi%20ByBliss!%20I'm%20interested%20in%20${encodeURIComponent(p.name)}" class="product-btn" target="_blank" rel="noopener" onclick="haptic(); showToast('Opening WhatsApp...'); event.stopPropagation();">
                                    <i class="fab fa-whatsapp"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');

            // Spotlight hover
            document.querySelectorAll('.product-card').forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    card.style.setProperty('--mouse-x', x + '%');
                    card.style.setProperty('--mouse-y', y + '%');
                });
            });
        }
        renderProducts();

        // === SEARCH & FILTER ===
        function filterProducts() {
            const search = document.getElementById('searchInput').value.toLowerCase();
            const activeCategory = document.querySelector('.filter-pill.active').dataset.category;
            const maxPrice = parseInt(document.getElementById('priceRange').value);
            document.getElementById('priceValue').textContent = maxPrice.toLocaleString();

            document.querySelectorAll('.product-card').forEach(card => {
                const name = card.dataset.name.toLowerCase();
                const category = card.dataset.category;
                const price = parseInt(card.dataset.price);
                const visible = name.includes(search) && 
                               (activeCategory === 'all' || category === activeCategory) &&
                               price <= maxPrice;
                card.classList.toggle('hidden', !visible);
            });
        }
        function filterCategory(category) {
            document.querySelectorAll('.filter-pill').forEach(pill => pill.classList.toggle('active', pill.dataset.category === category));
            filterProducts();
        }
        function sortProducts() {
            const sort = document.getElementById('sortSelect').value;
            const grid = document.getElementById('productsGrid');
            const cards = Array.from(grid.children);
            cards.sort((a, b) => {
                const priceA = parseInt(a.dataset.price);
                const priceB = parseInt(b.dataset.price);
                const nameA = a.dataset.name;
                const nameB = b.dataset.name;
                const stockA = parseInt(a.dataset.stock);
                const stockB = parseInt(b.dataset.stock);
                switch(sort) {
                    case 'price-low': return priceA - priceB;
                    case 'price-high': return priceB - priceA;
                    case 'name': return nameA.localeCompare(nameB);
                    case 'stock': return stockB - stockA;
                    default: return 0;
                }
            });
            cards.forEach(card => grid.appendChild(card));
        }

        // === PRODUCT MODAL ===
        let currentModalProduct = null;
        let currentQty = 1;
        let currentVariant = '';

        function openProductModal(index) {
            const product = productData[index];
            currentModalProduct = product;
            currentQty = 1;
            currentVariant = product.variants ? product.variants[0] : '';

            const modal = document.getElementById('productModal');
            document.getElementById('modalImage').innerHTML = `<i class="fas ${product.icon}"></i>`;
            document.getElementById('modalTitle').textContent = product.name;
            const ngn = product.price;
            const converted = currentCurrency === 'NGN' ? ngn : Math.round(ngn * exchangeRates[currentCurrency]);
            const symbol = currencySymbols[currentCurrency];
            document.getElementById('modalPrice').textContent = currentCurrency === 'NGN' ? `${symbol}${converted.toLocaleString()}` : `${symbol}${converted}`;
            const stockEl = document.getElementById('modalStock');
            stockEl.style.display = product.stock <= 5 ? 'flex' : 'none';
            stockEl.innerHTML = `<i class="fas fa-fire"></i> Only ${product.stock} left in stock`;
            document.getElementById('modalDesc').textContent = product.desc;
            document.getElementById('modalSize').textContent = product.size;
            document.getElementById('modalQty').value = 1;

            // Variants
            const variantContainer = document.getElementById('modalVariants');
            if (product.variants && product.variants.length > 0) {
                variantContainer.innerHTML = product.variants.map((v, i) => 
                    `<button class="variant-btn ${i === 0 ? 'active' : ''}" onclick="selectVariant('${v}', this)">${v}</button>`
                ).join('');
                variantContainer.style.display = 'flex';
            } else {
                variantContainer.style.display = 'none';
            }

            document.getElementById('modalWhatsApp').href = `https://wa.me/2348060193495?text=Hi%20ByBliss!%20I'm%20interested%20in%20${encodeURIComponent(product.name)}${currentVariant ? '%20(' + encodeURIComponent(currentVariant) + ')' : ''}%20x${currentQty}`;

            const relatedGrid = document.getElementById('relatedGrid');
            relatedGrid.innerHTML = '';
            product.related.forEach(relIndex => {
                const rel = productData[relIndex];
                relatedGrid.innerHTML += `
                    <div class="related-item" onclick="openProductModal(${relIndex}); haptic()">
                        <div class="related-icon"><i class="fas ${rel.icon}"></i></div>
                        <div class="related-info">
                            <h5>${rel.name}</h5>
                            <span>₦${rel.price.toLocaleString()}</span>
                        </div>
                    </div>`;
            });

            // Add to recently viewed
            addRecentlyViewed(product);

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            haptic();
        }

        function selectVariant(variant, btn) {
            currentVariant = variant;
            document.querySelectorAll('.variant-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateModalWhatsAppLink();
        }

        function changeQty(delta) {
            const newQty = currentQty + delta;
            if (newQty >= 1 && newQty <= 10) {
                currentQty = newQty;
                document.getElementById('modalQty').value = currentQty;
                updateModalWhatsAppLink();
            }
        }

        function updateModalWhatsAppLink() {
            const link = document.getElementById('modalWhatsApp');
            if (currentModalProduct) {
                link.href = `https://wa.me/2348060193495?text=Hi%20ByBliss!%20I'm%20interested%20in%20${encodeURIComponent(currentModalProduct.name)}${currentVariant ? '%20(' + encodeURIComponent(currentVariant) + ')' : ''}%20x${currentQty}`;
            }
        }

        function addToCartFromModal() {
            if (currentModalProduct) {
                addToCart(currentModalProduct.id, currentQty, currentVariant);
                closeModalDirect();
            }
        }

        function closeModal(e) { if (e.target === e.currentTarget) closeModalDirect(); }
        function closeModalDirect() {
            document.getElementById('productModal').classList.remove('active');
            document.getElementById('privacyModal').classList.remove('active');
            document.getElementById('authModal').classList.remove('active');
            document.body.style.overflow = '';
        }

        // === CART SYSTEM ===
        let cart = JSON.parse(localStorage.getItem('bybliss-cart')) || [];

        function addToCart(productId, qty = 1, variant = '') {
            const product = productData.find(p => p.id === productId);
            if (!product) return;

            const existing = cart.find(item => item.id === productId && item.variant === variant);
            if (existing) {
                existing.qty += qty;
            } else {
                cart.push({ id: productId, name: product.name, price: product.price, icon: product.icon, qty: qty, variant: variant });
            }

            saveCart();
            updateCartDisplay();
            showToast(`Added ${product.name} to cart`);
            triggerConfetti();
            haptic();
        }

        function removeFromCart(index) {
            cart.splice(index, 1);
            saveCart();
            updateCartDisplay();
        }

        function updateCartQty(index, delta) {
            cart[index].qty += delta;
            if (cart[index].qty <= 0) {
                removeFromCart(index);
            } else {
                saveCart();
                updateCartDisplay();
            }
        }

        function saveCart() {
            localStorage.setItem('bybliss-cart', JSON.stringify(cart));
        }

        function updateCartDisplay() {
            const itemsContainer = document.getElementById('cartItems');
            const footer = document.getElementById('cartFooter');
            const navCount = document.getElementById('navCartCount');
            const mobileCount = document.getElementById('mobileCartCount');

            const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
            navCount.textContent = totalItems;
            mobileCount.textContent = totalItems;
            navCount.style.display = totalItems > 0 ? 'flex' : 'none';
            mobileCount.style.display = totalItems > 0 ? 'flex' : 'none';

            if (cart.length === 0) {
                itemsContainer.innerHTML = `
                    <div class="cart-empty">
                        <i class="fas fa-shopping-bag"></i>
                        <p>Your cart is empty</p>
                        <p style="font-size:0.78rem; margin-top:8px;">Add items and they'll appear here</p>
                    </div>`;
                footer.style.display = 'none';
                return;
            }

            footer.style.display = 'block';
            itemsContainer.innerHTML = cart.map((item, i) => `
                <div class="cart-item">
                    <div class="cart-item-img"><i class="fas ${item.icon}"></i></div>
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <span>${item.variant ? item.variant + ' · ' : ''}₦${item.price.toLocaleString()}</span>
                    </div>
                    <div class="cart-item-qty">
                        <button onclick="updateCartQty(${i}, -1)">−</button>
                        <span>${item.qty}</span>
                        <button onclick="updateCartQty(${i}, 1)">+</button>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart(${i})"><i class="fas fa-trash"></i></button>
                </div>
            `).join('');

            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
            const symbol = currencySymbols[currentCurrency];
            const convertedSubtotal = currentCurrency === 'NGN' ? subtotal : Math.round(subtotal * exchangeRates[currentCurrency]);
            document.getElementById('cartSubtotal').textContent = currentCurrency === 'NGN' ? `₦${subtotal.toLocaleString()}` : `${symbol}${convertedSubtotal}`;
            calculateDelivery();
        }

        function calculateDelivery() {
            const location = document.getElementById('deliveryLocation').value;
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
            let fee = 0;

            switch(location) {
                case 'lagos': fee = subtotal >= 10000 ? 0 : 1500; break;
                case 'abuja': fee = 2500; break;
                case 'ph': fee = 2000; break;
                case 'ibadan': fee = 1500; break;
                case 'other': fee = 3000; break;
            }

            document.getElementById('deliveryFee').textContent = `₦${fee.toLocaleString()}`;
            const total = subtotal + fee;
            const symbol = currencySymbols[currentCurrency];
            const convertedTotal = currentCurrency === 'NGN' ? total : Math.round(total * exchangeRates[currentCurrency]);
            document.getElementById('cartTotal').textContent = currentCurrency === 'NGN' ? `₦${total.toLocaleString()}` : `${symbol}${convertedTotal}`;
        }

        function toggleCart() {
            const sidebar = document.getElementById('cartSidebar');
            const overlay = document.getElementById('cartOverlay');
            const isActive = sidebar.classList.contains('active');
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = !isActive ? 'hidden' : '';
            haptic();
        }

        function checkoutWhatsApp() {
            if (cart.length === 0) {
                showToast('Your cart is empty!');
                return;
            }
            const items = cart.map(item => `${item.name}${item.variant ? ' (' + item.variant + ')' : ''} x${item.qty}`).join(', ');
            const total = document.getElementById('cartTotal').textContent;
            const url = `https://wa.me/2348060193495?text=Hi%20ByBliss!%20I'd%20like%20to%20order:%20${encodeURIComponent(items)}.%20Total:%20${encodeURIComponent(total)}`;
            window.open(url, '_blank');
            showToast('Opening WhatsApp with your order...');
            haptic();
        }

        function applyCoupon() {
            const code = document.getElementById('couponInput').value.trim().toUpperCase();
            if (code === 'BLISS50' || code === 'WELCOME') {
                showToast('Coupon applied! ₦500 off');
            } else {
                showToast('Invalid coupon code');
            }
        }

        // Initialize cart
        updateCartDisplay();

        // === WISHLIST ===
        let wishlist = JSON.parse(localStorage.getItem('bybliss-wishlist')) || [];

        function toggleWishlist(productId, btn) {
            const index = wishlist.indexOf(productId);
            if (index > -1) {
                wishlist.splice(index, 1);
                btn.classList.remove('active');
                btn.innerHTML = '<i class="far fa-heart"></i>';
                showToast('Removed from wishlist');
            } else {
                wishlist.push(productId);
                btn.classList.add('active');
                btn.innerHTML = '<i class="fas fa-heart"></i>';
                showToast('Added to wishlist');
                triggerConfetti();
            }
            localStorage.setItem('bybliss-wishlist', JSON.stringify(wishlist));
            haptic();
        }

        // Restore wishlist buttons
        document.querySelectorAll('.wishlist-btn').forEach(btn => {
            const card = btn.closest('.product-card');
            if (card) {
                const id = parseInt(card.dataset.id);
                if (wishlist.includes(id)) {
                    btn.classList.add('active');
                    btn.innerHTML = '<i class="fas fa-heart"></i>';
                }
            }
        });

        // === RECENTLY VIEWED ===
        let recentlyViewed = JSON.parse(localStorage.getItem('bybliss-recent')) || [];

        function addRecentlyViewed(product) {
            recentlyViewed = recentlyViewed.filter(id => id !== product.id);
            recentlyViewed.unshift(product.id);
            if (recentlyViewed.length > 5) recentlyViewed.pop();
            localStorage.setItem('bybliss-recent', JSON.stringify(recentlyViewed));
            renderRecentlyViewed();
        }

        function renderRecentlyViewed() {
            const section = document.getElementById('recentlyViewed');
            const grid = document.getElementById('recentGrid');
            if (recentlyViewed.length === 0) {
                section.style.display = 'none';
                return;
            }
            section.style.display = 'block';
            grid.innerHTML = recentlyViewed.map(id => {
                const p = productData.find(x => x.id === id);
                if (!p) return '';
                return `
                    <div class="recent-item" onclick="openProductModal(${p.id})">
                        <i class="fas ${p.icon}"></i>
                        <h4>${p.name}</h4>
                        <span>₦${p.price.toLocaleString()}</span>
                    </div>
                `;
            }).join('');
        }
        renderRecentlyViewed();

        // === REVIEWS SYSTEM ===
        let reviews = JSON.parse(localStorage.getItem('bybliss-reviews')) || [
            { id: 1, name: "Tobi A.", product: "Mini Skincare Sets", rating: 5, text: "The skincare minis are exactly what I needed for travel. Packaging was clean and minimal.", date: "2026-05-20", verified: true, helpful: 12 },
            { id: 2, name: "Zara K.", product: "Compact Beauty Tools", rating: 5, text: "Love that it's all on WhatsApp. The owner actually remembers my preferences and suggests new drops.", date: "2026-05-18", verified: true, helpful: 8 },
            { id: 3, name: "Emeka O.", product: "Mystery Mini Box", rating: 4, text: "Got the mystery box for a friend and ended up keeping half of it. Fast delivery to Port Harcourt too.", date: "2026-05-15", verified: true, helpful: 5 },
            { id: 4, name: "Amara J.", product: "Pocket Accessories", rating: 5, text: "These phone charms are so cute! Everyone asks where I got them. Will definitely buy more.", date: "2026-05-12", verified: true, helpful: 15 },
            { id: 5, name: "David K.", product: "Desk & Space Minis", rating: 4, text: "The mini candle smells amazing. Perfect for my work desk. Delivery was quick to Abuja.", date: "2026-05-10", verified: false, helpful: 3 }
        ];

        function renderReviews(sort = 'newest') {
            const container = document.getElementById('reviewsList');
            let sorted = [...reviews];
            switch(sort) {
                case 'highest': sorted.sort((a, b) => b.rating - a.rating); break;
                case 'verified': sorted = sorted.filter(r => r.verified); break;
                default: sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
            }

            container.innerHTML = sorted.map(r => `
                <div class="review-card">
                    <div class="review-header">
                        <div class="review-author">
                            <div class="review-avatar" style="background: hsl(${r.name.charCodeAt(0) * 10 % 360}, 50%, 60%);">${r.name.charAt(0)}</div>
                            <div class="review-meta">
                                <h4>${r.name}</h4>
                                <span>${r.product} · ${new Date(r.date).toLocaleDateString()}</span>
                            </div>
                        </div>
                        ${r.verified ? '<span class="verified-badge"><i class="fas fa-check-circle"></i> Verified</span>' : ''}
                    </div>
                    <div class="review-stars">${Array(5).fill(0).map((_, i) => `<i class="fas fa-star${i < r.rating ? '' : '-half-alt'}"></i>`).join('')}</div>
                    <p class="review-text">${r.text}</p>
                    <div class="review-footer">
                        <span class="review-helpful" onclick="this.classList.toggle('active'); showToast('Thanks for your feedback!')">
                            <i class="far fa-thumbs-up"></i> Helpful (${r.helpful})
                        </span>
                        <span><i class="fas fa-comment"></i> Reply</span>
                    </div>
                </div>
            `).join('');
        }

        function submitReview() {
            const name = document.getElementById('reviewName').value;
            const product = document.getElementById('reviewProduct').value;
            const text = document.getElementById('reviewText').value;
            const rating = document.querySelectorAll('#starInput i.active').length;

            if (!name || !product || !text || rating === 0) {
                showToast('Please fill all fields and select a rating');
                return;
            }

            reviews.unshift({
                id: Date.now(),
                name: name,
                product: product,
                rating: rating,
                text: text,
                date: new Date().toISOString().split('T')[0],
                verified: false,
                helpful: 0
            });

            localStorage.setItem('bybliss-reviews', JSON.stringify(reviews));
            renderReviews();
            showToast('Review submitted! Thank you.');
            triggerConfetti();

            document.getElementById('reviewName').value = '';
            document.getElementById('reviewProduct').value = '';
            document.getElementById('reviewText').value = '';
            document.querySelectorAll('#starInput i').forEach(s => s.classList.remove('active'));
        }

        function sortReviews(type) {
            document.querySelectorAll('.review-sort-btn').forEach(b => b.classList.remove('active'));
            event.target.classList.add('active');
            renderReviews(type);
        }

        // Star rating input
        document.querySelectorAll('#starInput i').forEach(star => {
            star.addEventListener('click', function() {
                const rating = parseInt(this.dataset.rating);
                document.querySelectorAll('#starInput i').forEach((s, i) => {
                    s.classList.toggle('active', i < rating);
                });
            });
        });

        renderReviews();

        // === FLASH SALE COUNTDOWN ===
        function initFlashSale() {
            const banner = document.getElementById('flashBanner');
            const endTime = new Date();
            endTime.setHours(endTime.getHours() + 6);

            function updateCountdown() {
                const now = new Date();
                const diff = endTime - now;
                if (diff <= 0) {
                    banner.style.display = 'none';
                    return;
                }

                const hours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);

                document.getElementById('cdHours').textContent = hours.toString().padStart(2, '0');
                document.getElementById('cdMinutes').textContent = minutes.toString().padStart(2, '0');
                document.getElementById('cdSeconds').textContent = seconds.toString().padStart(2, '0');
            }

            banner.style.display = 'flex';
            updateCountdown();
            setInterval(updateCountdown, 1000);
        }

        // === CHAT WIDGET ===
        function toggleChat() {
            const widget = document.getElementById('chatWidget');
            widget.classList.toggle('active');
            haptic();
        }

        function sendChatMessage() {
            const input = document.getElementById('chatInput');
            const body = document.getElementById('chatBody');
            const msg = input.value.trim();
            if (!msg) return;

            body.innerHTML += `<div class="chat-msg user">${msg}</div>`;
            input.value = '';
            body.scrollTop = body.scrollHeight;

            // Auto-reply simulation
            setTimeout(() => {
                const replies = [
                    "Thanks for reaching out! You can browse our products above or message us on WhatsApp at 0806 019 3495 for faster response.",
                    "We typically reply within 10 minutes on WhatsApp. Would you like me to open a chat for you?",
                    "Our mini essentials start from ₦2,000. Check out the Collection section above!",
                    "We deliver nationwide! Lagos orders arrive in 1-2 days, other cities 2-5 days."
                ];
                const reply = replies[Math.floor(Math.random() * replies.length)];
                body.innerHTML += `<div class="chat-msg bot">${reply}</div>`;
                body.scrollTop = body.scrollHeight;
            }, 1000 + Math.random() * 2000);
        }

        // === PRIVACY MODAL ===
        function openPrivacyModal() {
            document.getElementById('privacyModal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        function closePrivacyModal(e) { if (e.target === e.currentTarget) closeModalDirect(); }
        function closePrivacyModalDirect() { closeModalDirect(); }

        // === NEWSLETTER ===
        function handleNewsletter(e) {
            e.preventDefault();
            const email = document.getElementById('newsletterEmail').value;
            showToast(`We'll notify ${email} about new drops.`);
            document.getElementById('newsletterEmail').value = '';
            haptic();
        }

        // === SCROLL TO TOP ===
        function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

        // === MOBILE MENU ===
        function toggleMenu() {
            const nav = document.getElementById('mobileNav');
            const overlay = document.getElementById('mobileOverlay');
            const btn = document.getElementById('mobileMenuBtn');
            const isActive = nav.classList.contains('active');
            nav.classList.toggle('active');
            overlay.classList.toggle('active');
            btn.classList.toggle('active');
            document.body.style.overflow = !isActive ? 'hidden' : '';
        }

        // === SWIPE TO CLOSE ===
        let touchStartX = 0, touchStartY = 0;
        document.getElementById('mobileNav').addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
        document.getElementById('mobileNav').addEventListener('touchend', e => {
            const diff = e.changedTouches[0].clientX - touchStartX;
            if (diff > 80) toggleMenu();
        }, { passive: true });

        const productModal = document.getElementById('productModal');
        productModal.addEventListener('touchstart', e => { touchStartY = e.touches[0].clientY; }, { passive: true });
        productModal.addEventListener('touchend', e => {
            if (window.innerWidth > 640) return;
            const diff = e.changedTouches[0].clientY - touchStartY;
            if (diff > 80 && e.target === productModal) closeModalDirect();
        }, { passive: true });

        // === SWIPEABLE CARDS ON MOBILE ===
        if (window.innerWidth <= 640) {
            document.getElementById('productsGrid').classList.add('swipeable');
        }

        // === KEYBOARD ===
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (document.getElementById('productModal').classList.contains('active')) closeModalDirect();
                if (document.getElementById('privacyModal').classList.contains('active')) closeModalDirect();
                if (document.getElementById('authModal').classList.contains('active')) closeModalDirect();
                if (document.getElementById('mobileNav').classList.contains('active')) toggleMenu();
                if (document.getElementById('cartSidebar').classList.contains('active')) toggleCart();
            }
        });

        // === HAPTIC ===
        function haptic() {
            if (navigator.vibrate) navigator.vibrate(12);
        }

        // === COPY PHONE ===
        async function copyPhone() {
            try {
                await navigator.clipboard.writeText('08060193495');
                showToast('Phone number copied!');
                haptic();
            } catch (err) {
                showToast('0806 019 3495');
            }
        }

        // === SHARE ===
        async function sharePage() {
            const shareData = {
                title: 'ByBliss — Mini Essentials on WhatsApp',
                text: 'Check out ByBliss for curated mini products delivered via WhatsApp!',
                url: 'https://bybliss.com'
            };
            try {
                if (navigator.share) {
                    await navigator.share(shareData);
                    haptic();
                } else {
                    await navigator.clipboard.writeText('https://bybliss.com');
                    showToast('Link copied to clipboard!');
                    haptic();
                }
            } catch (err) {
                showToast('Link copied!');
            }
        }

        // === OFFLINE ===
        const offlineBadge = document.getElementById('offlineBadge');
        function updateOnlineStatus() {
            offlineBadge.classList.toggle('show', !navigator.onLine);
            if (navigator.onLine) showToast('Back online');
            else showToast('You are offline');
        }
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);
        if (!navigator.onLine) offlineBadge.classList.add('show');

        // === RIPPLE ===
        function createRipple(e) {
            const btn = e.currentTarget;
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            btn.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        }

        // === CONFETTI ===
        function triggerConfetti() {
            const container = document.getElementById('confettiContainer');
            const colors = ['#C5D5C0', '#C4A484', '#8B9D83', '#25D366', '#E8DDD4', '#D4E0CF'];
            for (let i = 0; i < 40; i++) {
                const piece = document.createElement('div');
                piece.className = 'confetti-piece';
                piece.style.left = Math.random() * 100 + 'vw';
                piece.style.background = colors[Math.floor(Math.random() * colors.length)];
                piece.style.animationDuration = (Math.random() * 2 + 2) + 's';
                piece.style.animationDelay = (Math.random() * 0.5) + 's';
                piece.style.width = (Math.random() * 8 + 4) + 'px';
                piece.style.height = (Math.random() * 8 + 4) + 'px';
                piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
                container.appendChild(piece);
                setTimeout(() => piece.remove(), 4500);
            }
        }

        // === COUNTER ===
        function animateCounter(el) {
            const target = parseFloat(el.dataset.target);
            const isDecimal = target % 1 !== 0;
            const duration = 2000;
            const start = performance.now();
            function update(currentTime) {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = target * easeOut;
                el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString() + '+';
                if (progress < 1) requestAnimationFrame(update);
            }
            requestAnimationFrame(update);
        }
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));

        // ============================================
        // AUTH SYSTEM (Login / Sign Up / Guest)
        // ============================================
        let currentUser = null;

        function openAuthModal() {
            document.getElementById('authModal').classList.add('active');
            document.body.style.overflow = 'hidden';
            haptic();
        }
        function closeAuthModal(e) { if (e.target === e.currentTarget) closeModalDirect(); }
        function closeAuthModalDirect() { closeModalDirect(); }

        function switchAuthTab(tab) {
            document.querySelectorAll('.auth-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
            document.querySelectorAll('.auth-form').forEach(f => f.classList.toggle('active', f.id === tab + 'Form'));
            haptic();
        }

        function handleLogin(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            if (!email.includes('@')) {
                document.getElementById('loginEmailError').classList.add('show');
                return;
            }
            document.getElementById('loginEmailError').classList.remove('show');

            if (password.length < 6) {
                document.getElementById('loginPasswordError').classList.add('show');
                return;
            }
            document.getElementById('loginPasswordError').classList.remove('show');

            // Check for existing user
            const users = JSON.parse(localStorage.getItem('bybliss-users')) || [];
            const user = users.find(u => u.email === email && u.password === password);

            if (!user) {
                showToast('Invalid email or password');
                return;
            }

            currentUser = { name: user.name, email: user.email, type: 'user', points: user.points || 0 };
            localStorage.setItem('bybliss-user', JSON.stringify(currentUser));
            updateAuthUI();
            closeModalDirect();
            showToast(`Welcome back, ${currentUser.name}!`);
            triggerConfetti();
            haptic();
        }

        function handleSignup(e) {
            e.preventDefault();
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const phone = document.getElementById('signupPhone').value;
            const password = document.getElementById('signupPassword').value;
            const confirm = document.getElementById('signupConfirm').value;

            if (name.length < 2) {
                document.getElementById('signupNameError').classList.add('show');
                return;
            }
            document.getElementById('signupNameError').classList.remove('show');

            if (!email.includes('@')) {
                document.getElementById('signupEmailError').classList.add('show');
                return;
            }
            document.getElementById('signupEmailError').classList.remove('show');

            if (phone.length < 10) {
                document.getElementById('signupPhoneError').classList.add('show');
                return;
            }
            document.getElementById('signupPhoneError').classList.remove('show');

            if (password.length < 6) {
                document.getElementById('signupPasswordError').classList.add('show');
                return;
            }
            document.getElementById('signupPasswordError').classList.remove('show');

            if (password !== confirm) {
                document.getElementById('signupConfirmError').classList.add('show');
                return;
            }
            document.getElementById('signupConfirmError').classList.remove('show');

            // Check for duplicate email
            let users = JSON.parse(localStorage.getItem('bybliss-users')) || [];
            if (users.find(u => u.email === email)) {
                showToast('Email already registered. Please sign in.');
                switchAuthTab('login');
                return;
            }

            // Check for duplicate phone
            if (users.find(u => u.phone === phone)) {
                showToast('Phone number already registered.');
                return;
            }

            const newUser = { name, email, phone, password, points: 100, created: new Date().toISOString() };
            users.push(newUser);
            localStorage.setItem('bybliss-users', JSON.stringify(users));

            currentUser = { name: name, email: email, phone: phone, type: 'user', points: 100 };
            localStorage.setItem('bybliss-user', JSON.stringify(currentUser));
            updateAuthUI();
            closeModalDirect();
            showToast(`Welcome to ByBliss, ${name}! You earned 100 points.`);
            triggerConfetti();
            haptic();
        }

        function handleGuest(e) {
            e.preventDefault();
            const name = document.getElementById('guestName').value || 'Guest';
            const phone = document.getElementById('guestPhone').value;

            if (phone.length < 10) {
                document.getElementById('guestPhoneError').classList.add('show');
                return;
            }
            document.getElementById('guestPhoneError').classList.remove('show');

            currentUser = { name: name, phone: phone, type: 'guest' };
            localStorage.setItem('bybliss-user', JSON.stringify(currentUser));
            updateAuthUI();
            closeModalDirect();
            showToast(`Browsing as ${name}`);
            haptic();
        }

        function handleForgotPassword() {
            const email = document.getElementById('loginEmail').value;
            if (!email || !email.includes('@')) {
                showToast('Please enter your email first');
                return;
            }
            showToast('Password reset link sent to ' + email);
        }

        function socialLogin(provider) {
            showToast(`Signing in with ${provider}...`);
            setTimeout(() => {
                const name = provider + ' User';
                currentUser = { name: name, type: 'social', provider: provider, points: 50 };
                localStorage.setItem('bybliss-user', JSON.stringify(currentUser));
                updateAuthUI();
                closeModalDirect();
                showToast(`Signed in with ${provider}!`);
                triggerConfetti();
            }, 1500);
        }

        function updateAuthUI() {
            const user = JSON.parse(localStorage.getItem('bybliss-user'));
            const pill = document.getElementById('authUserPill');
            const nameSpan = document.getElementById('authUserName');
            const loyaltyText = document.getElementById('loyaltyText');

            if (user) {
                currentUser = user;
                if (pill) {
                    pill.style.display = 'flex';
                    nameSpan.textContent = user.name;
                }
                if (loyaltyText && user.points) {
                    loyaltyText.textContent = `${user.points} Points`;
                }
                const navAuthBtn = document.querySelector('.nav-links .auth-btn');
                if (navAuthBtn) {
                    navAuthBtn.innerHTML = `<i class="fas fa-user-check"></i> ${user.name}`;
                    navAuthBtn.onclick = () => {
                        if (confirm('Sign out?')) {
                            localStorage.removeItem('bybliss-user');
                            currentUser = null;
                            location.reload();
                        }
                    };
                }
            } else {
                if (pill) pill.style.display = 'none';
            }
        }

        updateAuthUI();

        // === COMPARE ===
        let compareList = [];
        function toggleCompare(productId) {
            const index = compareList.indexOf(productId);
            if (index > -1) {
                compareList.splice(index, 1);
            } else if (compareList.length < 3) {
                compareList.push(productId);
            } else {
                showToast('You can compare up to 3 items');
                return;
            }
            updateCompareBar();
        }
        function updateCompareBar() {
            const bar = document.getElementById('compareBar');
            const count = document.getElementById('compareCount');
            count.textContent = compareList.length;
            bar.classList.toggle('active', compareList.length > 0);
        }
        function clearCompare() {
            compareList = [];
            updateCompareBar();
        }

        // === CONSOLE WELCOME ===
        console.log('%c ByBliss ', 'background: #8B9D83; color: white; padding: 4px 12px; border-radius: 4px; font-weight: bold;');
        console.log('%c Mini Essentials on WhatsApp ', 'color: #C4A484; font-style: italic;');
        console.log('%c 30+ Features Active ', 'color: #25D366; font-size: 11px;');
        console.log('%c Auth system with duplicate prevention loaded ', 'color: #7A7A7A; font-size: 11px;');