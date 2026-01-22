// ===== PRODUCT DATA =====
const products = {
  1: {
    name: "Nike Air Max 90",
    category: "Thể Thao | Nam",
    price: "2,399,000 đ",
    oldPrice: "2,999,000 đ",
    rating: "★★★★★ (245)",
    image: "images/nike1.png",
    description: "Giày thể thao Nike Air Max 90 với công nghệ Air Max tiên tiến, mang lại sự thoải mái tối đa. Thiết kế hiện đại, phù hợp cho mọi hoạt động hàng ngày. Chất liệu cao cấp, bền bỉ."
  },
  2: {
    name: "Nike Cortez Classic",
    category: "Casual | Unisex",
    price: "1,899,000 đ",
    rating: "★★★★☆ (189)",
    image: "images/nike2.png",
    description: "Một trong những mẫu giày huyền thoại của Nike, Cortez Classic kết hợp phong cách cổ điển với sự thoải mái hiện đại. Phù hợp cho cả nam và nữ."
  },
  3: {
    name: "Nike Revolution 7",
    category: "Chạy Bộ | Nam/Nữ",
    price: "1,299,000 đ",
    rating: "★★★★★ (312)",
    image: "images/nike3.png",
    description: "Giày chạy bộ Nike Revolution 7 được thiết kế để cung cấp sự thoải mái và hỗ trợ tối đa. Nhẹ, linh hoạt, và giá cả phải chăng. Hoàn hảo cho người mới bắt đầu."
  },
  4: {
    name: "Nike Blazer Mid",
    category: "Lifestyle | Nam",
    price: "2,199,000 đ",
    rating: "★★★★★ (156)",
    image: "images/nike4.png",
    description: "Nike Blazer Mid mang đến sự kết hợp hoàn hảo giữa phong cách bóng rổ cổ điển và thẩm mỹ hiện đại. Giày lý tưởng cho những ai yêu thích thời trang urban."
  },
  5: {
    name: "Nike Dunk Low",
    category: "Bóng Rổ | Unisex",
    price: "2,299,000 đ",
    oldPrice: "2,699,000 đ",
    rating: "★★★★★ (428)",
    image: "images/nike5.png",
    description: "Giày bóng rổ huyền thoại Nike Dunk Low được tái hiện với các màu sắc mới. Thiết kế biểu tượng, chất lượng tuyệt vời, phù hợp cho chơi thể thao và thường ngày."
  },
  6: {
    name: "Nike Court Legacy",
    category: "Casual | Nữ",
    price: "1,699,000 đ",
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
    ? `<span style="text-decoration: line-through; color: #999; margin-right: 8px;">${product.oldPrice}</span>` 
    : "";
  priceHTML += `<span style="color: #e74c3c;">${product.price}</span>`;
  document.getElementById("modalPrice").innerHTML = priceHTML;
  
  document.getElementById("modalDesc").textContent = product.description;
  
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Modal event listeners
document.querySelectorAll(".btn--secondary[data-product-id]").forEach(button => {
  button.addEventListener("click", () => {
    openModal(parseInt(button.getAttribute("data-product-id")));
  });
});

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ===== ADD TO CART BUTTONS =====
document.querySelectorAll(".btn--add-cart").forEach(button => {
  button.addEventListener("click", () => {
    const id = parseInt(button.getAttribute("data-product-id"));
    const name = button.getAttribute("data-name");
    const price = button.getAttribute("data-price");
    
    cart.addItem(id, name, price);
    
    // Show feedback animation
    const originalText = button.textContent;
    button.textContent = "✓ Đã Thêm";
    button.style.backgroundColor = "#27ae60";
    setTimeout(() => {
      button.textContent = originalText;
      button.style.backgroundColor = "";
    }, 1500);
  });
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
