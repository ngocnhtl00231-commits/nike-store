# 🎉 Tính Năng Tìm Kiếm & Lọc Sản Phẩm

## ✅ Các Tính Năng Đã Thêm

### 1. **Tìm Kiếm Theo Tên Sản Phẩm** 🔍
- Ô tìm kiếm real-time tại phía trên danh sách sản phẩm
- Tìm kiếm không phân biệt hoa/thường
- Kết quả cập nhật ngay khi bạn gõ
- Ví dụ: Gõ "Air" sẽ hiển thị "Nike Air Max 90"

### 2. **Lọc Theo Loại (Gender)** 👥
- Bộ lọc dropdown: Tất cả loại | Nam | Nữ | Unisex
- Bộ lọc thông minh:
  - **Nam**: Hiển thị sản phẩm cho Nam + sản phẩm Nam/Nữ + Unisex
  - **Nữ**: Hiển thị sản phẩm cho Nữ + sản phẩm Nam/Nữ + Unisex
  - **Unisex**: Hiển thị tất cả sản phẩm Unisex + Nam/Nữ

### 3. **Sắp Xếp Theo Giá** 💰
- Sắp xếp từ thấp → cao: Hiển thị giá rẻ nhất trước
- Sắp xếp từ cao → thấp: Hiển thị giá cao nhất trước
- Giá hiển thị dạng số để so sánh chính xác

### 4. **Nút Đặt Lại (Reset)** 🔄
- Xóa tất cả bộ lọc và tìm kiếm
- Quay lại xem toàn bộ sản phẩm
- Nút màu đỏ dễ nhận biết

### 5. **Không Reload Trang** ⚡
- **Tất cả thao tác không reload trang**:
  - Tìm kiếm → Cập nhật ngay lập tức
  - Lọc theo loại → Cập nhật ngay lập tức
  - Sắp xếp giá → Cập nhật ngay lập tức
  - Kết hợp nhiều bộ lọc → Vẫn không reload
- Sử dụng JavaScript để render động

## 🎨 Giao Diện & Trải Nghiệm

### Responsive Design
- **Desktop**: 3 cột, filter ngang
- **Tablet (1024px)**: 2 cột, filter ngang
- **Mobile (768px)**: 2 cột, filter ngang với spacing nhỏ hơn
- **Small Mobile (480px)**: 1 cột, filter dọc (full width)

### UI Components
- Input tìm kiếm với placeholder
- Select dropdown cho loại & giá
- Nút reset màu đỏ (#e74c3c)
- Hiệu ứng focus với border + box-shadow

### Messages
- Không tìm thấy sản phẩm → "Không tìm thấy sản phẩm phù hợp"
- Các thông báo hiển thị ở giữa grid

## 📊 Dữ Liệu Sản Phẩm

Tất cả sản phẩm có thêm trường `gender`:

1. **Nike Air Max 90** - Nam - 2,399,000 đ
2. **Nike Cortez Classic** - Unisex - 1,899,000 đ
3. **Nike Revolution 7** - Nam/Nữ - 1,299,000 đ
4. **Nike Blazer Mid** - Nam - 2,199,000 đ
5. **Nike Dunk Low** - Unisex - 2,299,000 đ
6. **Nike Court Legacy** - Nữ - 1,699,000 đ

## 🔧 Kỹ Thuật

### JavaScript Functions
- `getFilteredProducts()` - Lọc sản phẩm dựa trên bộ lọc hiện tại
- `renderProducts()` - Render sản phẩm vào DOM mà không reload
- `attachProductListeners()` - Gán event listeners cho sản phẩm mới
- `currentFilters` - Object lưu trạng thái bộ lọc

### Event Listeners
- Search input → `input` event
- Gender select → `change` event
- Price sort → `change` event
- Reset button → `click` event

### CSS
- `.products__filters` - Container cho filter
- `.filter-group` - Group mỗi filter
- `.filter-input` - Style input
- `.filter-select` - Style select
- `.filter-reset` - Style nút reset

## 🚀 Cách Sử Dụng

1. **Tìm kiếm**: Gõ tên sản phẩm vào ô tìm kiếm
2. **Lọc loại**: Chọn Nam, Nữ, hoặc Unisex từ dropdown
3. **Sắp xếp giá**: Chọn "Giá: Thấp → Cao" hoặc "Giá: Cao → Thấp"
4. **Kết hợp**: Dùng multiple filters cùng lúc (VD: Tìm "Nike" + Lọc "Nam" + Sắp xếp "Thấp → Cao")
5. **Reset**: Nhấn nút "Đặt lại" để quay lại trạng thái ban đầu

## ✨ Đặc Điểm

- ✅ **Dynamic Rendering**: Sản phẩm được tạo bằng JavaScript
- ✅ **No Page Reload**: Tất cả thao tác không reload trang
- ✅ **Real-time**: Kết quả cập nhật ngay khi bạn thay đổi bộ lọc
- ✅ **Smart Filtering**: Tìm kiếm không phân biệt hoa/thường
- ✅ **Responsive**: Thích ứng tốt với mọi kích thước màn hình
- ✅ **User Friendly**: Giao diện sạch sẽ, dễ sử dụng
