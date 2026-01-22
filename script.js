// Product Data
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

// Modal Elements
const modal = document.getElementById("productModal");
const modalClose = document.querySelector(".modal__close");
const detailButtons = document.querySelectorAll("[data-product-id]");

// Open Modal
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
  document.getElementById("addToCart").setAttribute("data-product-id", productId);
  
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Close Modal
function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Event Listeners
detailButtons.forEach(button => {
  button.addEventListener("click", () => {
    openModal(button.getAttribute("data-product-id"));
  });
});

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// Close on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// Add to Cart
document.getElementById("addToCart").addEventListener("click", function() {
  const productId = this.getAttribute("data-product-id");
  const product = products[productId];
  alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
  closeModal();
});

// Close on Escape Key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
