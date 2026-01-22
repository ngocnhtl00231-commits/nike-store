// ===== PRODUCT DATA =====
const products = {
  1: {
    name: "Nike Air Max 90",
    category: "Thể Thao | Nam",
    gender: "Nam",
    price: 2399000,
    oldPrice: 2999000,
    rating: "★★★★★ (245)",
    image: "images/nike1.png",
    description: "Giày thể thao Nike Air Max 90 với công nghệ Air Max tiên tiến, mang lại sự thoải mái tối đa. Thiết kế hiện đại, phù hợp cho mọi hoạt động hàng ngày. Chất liệu cao cấp, bền bỉ."
  },
  2: {
    name: "Nike Cortez Classic",
    category: "Casual | Unisex",
    gender: "Unisex",
    price: 1899000,
    rating: "★★★★☆ (189)",
    image: "images/nike2.png",
    description: "Một trong những mẫu giày huyền thoại của Nike, Cortez Classic kết hợp phong cách cổ điển với sự thoải mái hiện đại. Phù hợp cho cả nam và nữ."
  },
  3: {
    name: "Nike Revolution 7",
    category: "Chạy Bộ | Nam/Nữ",
    gender: "Nam/Nữ",
    price: 1299000,
    rating: "★★★★★ (312)",
    image: "images/nike3.png",
    description: "Giày chạy bộ Nike Revolution 7 được thiết kế để cung cấp sự thoải mái và hỗ trợ tối đa. Nhẹ, linh hoạt, và giá cả phải chăng. Hoàn hảo cho người mới bắt đầu."
  },
  4: {
    name: "Nike Blazer Mid",
    category: "Lifestyle | Nam",
    gender: "Nam",
    price: 2199000,
    rating: "★★★★★ (156)",
    image: "images/nike4.png",
    description: "Nike Blazer Mid mang đến sự kết hợp hoàn hảo giữa phong cách bóng rổ cổ điển và thẩm mỹ hiện đại. Giày lý tưởng cho những ai yêu thích thời trang urban."
  },
  5: {
    name: "Nike Dunk Low",
    category: "Bóng Rổ | Unisex",
    gender: "Unisex",
    price: 2299000,
    oldPrice: 2699000,
    rating: "★★★★★ (428)",
    image: "images/nike5.png",
    description: "Giày bóng rổ huyền thoại Nike Dunk Low được tái hiện với các màu sắc mới. Thiết kế biểu tượng, chất lượng tuyệt vời, phù hợp cho chơi thể thao và thường ngày."
  },
  6: {
    name: "Nike Court Legacy",
    category: "Casual | Nữ",
    gender: "Nữ",
    price: 1699000,
    rating: "★★★★☆ (201)",
    image: "images/nike6.png",
    description: "Nike Court Legacy là lựa chọn hoàn hảo cho phụ nữ yêu thích phong cách tennis cổ điển. Thiết kế thanh lịch, thoải mái, và dễ kết hợp với nhiều outfit."
  }
};

// ===== CART MANAGEMENT CLASS =====
class Cart {
  constructor() {
    this.items = this.loadCart();
  }

  loadCart() {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  }

  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.items));
  }

  addItem(id, name, price) {
    const item = this.items.find(item => item.id === id);
    if (item) {
      item.quantity += 1;
    } else {
      this.items.push({ id, name, price: parseFloat(price), quantity: 1 });
    }
    this.saveCart();
    this.updateUI();
  }

  removeItem(id) {
    this.items = this.items.filter(item => item.id !== id);
    this.saveCart();
    this.updateUI();
  }

  updateUI() {
    this.updateBadge();
    this.renderItems();
  }

  updateBadge() {
    const badge = document.getElementById("cartBadge");
    const total = this.items.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = total;
  }

  renderItems() {
    const cartItems = document.getElementById("cartItems");
    if (this.items.length === 0) {
      cartItems.innerHTML = '<p class="cart__empty">Giỏ hàng trống</p>';
      return;
    }

    cartItems.innerHTML = this.items.map(item => `
      <div class="cart__item">
        <div class="cart__item-info">
          <div class="cart__item-name">${item.name}</div>
          <div class="cart__item-price">${item.quantity} x ${item.price.toLocaleString("vi-VN")} đ</div>
        </div>
        <button class="cart__item-remove" data-id="${item.id}">&times;</button>
      </div>
    `).join("");

    // Add remove listeners
    document.querySelectorAll(".cart__item-remove").forEach(btn => {
      btn.addEventListener("click", () => {
        cart.removeItem(parseInt(btn.dataset.id));
      });
    });
  }
}

const cart = new Cart();

// ===== MODAL FUNCTIONALITY =====
const modal = document.getElementById("productModal");
const modalClose = document.querySelector(".modal__close");

function openModal(productId) {
  const product = products[productId];
  if (!product) return;

  document.getElementById("modalImage").src = product.image;
  document.getElementById("modalTitle").textContent = product.name;
  document.getElementById("modalCategory").textContent = product.category;
  document.getElementById("modalRating").textContent = product.rating;
  
  let priceHTML = product.oldPrice 
    ? `<span style="text-decoration: line-through; color: #999; margin-right: 8px;">${product.oldPrice.toLocaleString("vi-VN")} đ</span>` 
    : "";
  priceHTML += `<span style="color: #e74c3c;">${product.price.toLocaleString("vi-VN")} đ</span>`;
  document.getElementById("modalPrice").innerHTML = priceHTML;
  
  document.getElementById("modalDesc").textContent = product.description;
  
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ===== CART DROPDOWN =====
const cartBtn = document.getElementById("cartBtn");
const cartDropdown = document.getElementById("cartDropdown");
const cartClose = document.getElementById("cartClose");
const checkoutBtn = document.getElementById("checkoutBtn");

cartBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  cartDropdown.classList.toggle("active");
});

cartClose.addEventListener("click", () => {
  cartDropdown.classList.remove("active");
});

checkoutBtn.addEventListener("click", () => {
  if (cart.items.length === 0) {
    alert("Giỏ hàng trống!");
    return;
  }
  alert(`Cảm ơn bạn! Đơn hàng có ${cart.items.length} sản phẩm. Đây là demo frontend, không có backend.`);
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (!cartBtn.contains(e.target) && !cartDropdown.contains(e.target)) {
    cartDropdown.classList.remove("active");
  }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close menu when clicking a link
navMenu.querySelectorAll(".nav__link").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// ===== INITIALIZATION =====
document.addEventListener("DOMContentLoaded", () => {
  cart.updateUI();
});

// Close on Escape Key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ===== FILTER & SEARCH FUNCTIONALITY =====
let currentFilters = {
  search: "",
  gender: "",
  sortPrice: "" // "asc" or "desc"
};

function getFilteredProducts() {
  let filtered = Object.entries(products).map(([id, product]) => ({
    id: parseInt(id),
    ...product
  }));

  // Filter by search
  if (currentFilters.search) {
    const searchLower = currentFilters.search.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchLower)
    );
  }

  // Filter by gender
  if (currentFilters.gender) {
    filtered = filtered.filter(p => {
      if (p.gender === "Nam/Nữ" || p.gender === "Unisex") return true;
      return p.gender === currentFilters.gender;
    });
  }

  // Sort by price
  if (currentFilters.sortPrice === "asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentFilters.sortPrice === "desc") {
    filtered.sort((a, b) => b.price - a.price);
  }

  return filtered;
}

function renderProducts(productsToRender = null) {
  const grid = document.querySelector(".products__grid");
  const productsArray = productsToRender || getFilteredProducts();

  if (productsArray.length === 0) {
    grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999;"><p>Không tìm thấy sản phẩm phù hợp</p></div>';
    return;
  }

  grid.innerHTML = productsArray.map(product => {
    const priceOldHTML = product.oldPrice ? `<span class="product__price-old">${product.oldPrice.toLocaleString("vi-VN")} đ</span>` : '';
    const badgeHTML = product.oldPrice ? '<span class="product__badge product__badge--discount">-20%</span>' : (product.id === 3 ? '<span class="product__badge product__badge--new">MỚI</span>' : '');
    const priceDisplay = product.price.toLocaleString("vi-VN");

    return `
      <article class="product" data-product-id="${product.id}">
        <div class="product__image">
          <img src="${product.image}" alt="${product.name}" class="product__img" loading="lazy" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22280%22 height=%22280%22%3E%3Crect fill=%22%23f5f5f5%22 width=%22280%22 height=%22280%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%23999%22 font-size=%2218%22%3EImage Not Found%3C/text%3E%3C/svg%3E'">
          ${badgeHTML}
        </div>
        <div class="product__content">
          <h3 class="product__name">${product.name}</h3>
          <p class="product__category">${product.category}</p>
          <div class="product__rating">
            <span class="product__stars">★★★★★</span>
            <span class="product__reviews">${product.rating.match(/\\(\\d+\\)/)[0]}</span>
          </div>
          <div class="product__prices">
            ${priceOldHTML}
            <span class="product__price">${priceDisplay} đ</span>
          </div>
          <div class="product__actions">
            <button class="btn btn--card btn--secondary" data-product-id="${product.id}">Xem Chi Tiết</button>
            <button class="btn btn--card btn--add-cart" data-product-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Thêm Giỏ</button>
          </div>
        </div>
      </article>
    `;
  }).join("");

  // Re-attach event listeners
  attachProductListeners();
}

function attachProductListeners() {
  document.querySelectorAll(".btn--secondary[data-product-id]").forEach(button => {
    button.addEventListener("click", () => {
      openModal(parseInt(button.getAttribute("data-product-id")));
    });
  });

  document.querySelectorAll(".btn--add-cart").forEach(button => {
    button.addEventListener("click", () => {
      const id = parseInt(button.getAttribute("data-product-id"));
      const name = button.getAttribute("data-name");
      const price = button.getAttribute("data-price");
      
      cart.addItem(id, name, price);
      
      const originalText = button.textContent;
      button.textContent = "✓ Đã Thêm";
      button.style.backgroundColor = "#27ae60";
      setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = "";
      }, 1500);
    });
  });
}

// Setup filters on page load
window.addEventListener("DOMContentLoaded", () => {
  // Search functionality
  const searchInput = document.getElementById("filterSearch");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentFilters.search = e.target.value;
      renderProducts();
    });
  }

  // Gender filter
  const genderSelect = document.getElementById("filterGender");
  if (genderSelect) {
    genderSelect.addEventListener("change", (e) => {
      currentFilters.gender = e.target.value;
      renderProducts();
    });
  }

  // Price sort
  const priceSort = document.getElementById("filterPrice");
  if (priceSort) {
    priceSort.addEventListener("change", (e) => {
      currentFilters.sortPrice = e.target.value;
      renderProducts();
    });
  }

  // Reset filters button
  const resetBtn = document.getElementById("filterReset");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      currentFilters = { search: "", gender: "", sortPrice: "" };
      if (searchInput) searchInput.value = "";
      if (genderSelect) genderSelect.value = "";
      if (priceSort) priceSort.value = "";
      renderProducts();
    });
  }

  // Initial render of all products
  renderProducts();
});
