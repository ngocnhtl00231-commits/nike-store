# 📋 Hướng Dẫn Sử Dụng Tìm Kiếm & Lọc

## Ví Dụ Sử Dụng Thực Tế

### Scenario 1: Tìm giày Nike Air Max
1. Vào ô tìm kiếm
2. Gõ "Air"
3. **Kết quả**: Chỉ hiển thị "Nike Air Max 90"
4. ⚡ **Không reload trang** - Kết quả cập nhật ngay lập tức

### Scenario 2: Xem giày dành cho nam
1. Mở dropdown "Tất cả loại"
2. Chọn "Nam"
3. **Kết quả**: Hiển thị
   - Nike Air Max 90 (Nam)
   - Nike Blazer Mid (Nam)
   - Nike Revolution 7 (Nam/Nữ - được bao gồm)
   - Nike Cortez Classic (Unisex - được bao gồm)
   - Nike Dunk Low (Unisex - được bao gồm)
4. ⚡ **Không reload trang** - Kết quả cập nhật ngay lập tức

### Scenario 3: Tìm giày rẻ nhất cho nữ
1. Chọn "Nữ" từ dropdown loại
2. Chọn "Giá: Thấp → Cao" từ dropdown giá
3. **Kết quả**: Sắp xếp các giày nữ từ rẻ nhất đến đắt nhất
4. ⚡ **Không reload trang** - Kết quả cập nhật ngay lập tức

### Scenario 4: Tìm "Nike Revolution" và sắp xếp giá
1. Gõ "Revolution" vào ô tìm kiếm
2. Chọn "Giá: Thấp → Cao"
3. **Kết quả**: Hiển thị "Nike Revolution 7" (1,299,000 đ)
4. ⚡ **Không reload trang**

### Scenario 5: Quay lại xem tất cả
1. Nhấn nút "Đặt lại" (màu đỏ)
2. **Kết quả**: 
   - Ô tìm kiếm trống
   - Dropdown loại chọn "Tất cả loại"
   - Dropdown giá chọn "Sắp xếp theo giá"
   - Hiển thị tất cả 6 sản phẩm theo thứ tự gốc
3. ⚡ **Không reload trang**

## Bộ Lọc Kỹ Thuật

### Tìm Kiếm (Search)
```javascript
Filter by product name (case-insensitive)
"Nike Air" → Match "Nike Air Max 90"
"cortez" → Match "Nike Cortez Classic"
"court" → Match "Nike Court Legacy"
```

### Lọc Loại (Gender)
```javascript
Nam:       [Nam, Nam/Nữ, Unisex] → 4 sản phẩm
Nữ:        [Nữ, Nam/Nữ, Unisex]  → 4 sản phẩm
Unisex:    [Unisex, Nam/Nữ]       → 3 sản phẩm
```

### Sắp Xếp Giá
```javascript
Thấp → Cao:
1. Nike Revolution 7     - 1,299,000 đ
2. Nike Cortez Classic   - 1,899,000 đ
3. Nike Court Legacy     - 1,699,000 đ
4. Nike Blazer Mid       - 2,199,000 đ
5. Nike Dunk Low         - 2,299,000 đ
6. Nike Air Max 90       - 2,399,000 đ

Cao → Thấp:
(Đảo ngược thứ tự trên)
```

## Kết Hợp Bộ Lọc

### Ví Dụ Kết Hợp 1: Nam + Giá cao → thấp
1. Chọn "Nam"
2. Chọn "Giá: Cao → Thấp"
**Kết quả**:
- Nike Air Max 90 (2,399,000 đ) - Nam
- Nike Blazer Mid (2,199,000 đ) - Nam
- Nike Revolution 7 (1,299,000 đ) - Nam/Nữ (bao gồm)

### Ví Dụ Kết Hợp 2: Tìm "Nike" + Nữ + Giá thấp → cao
1. Gõ "Nike" vào tìm kiếm (match tất cả)
2. Chọn "Nữ"
3. Chọn "Giá: Thấp → Cao"
**Kết quả**:
- Nike Revolution 7 (1,299,000 đ) - Nam/Nữ
- Nike Court Legacy (1,699,000 đ) - Nữ
- Nike Cortez Classic (1,899,000 đ) - Unisex
- Nike Dunk Low (2,299,000 đ) - Unisex

## Responsive Behavior

### Desktop (1200px+)
```
┌─────────────────────────────────────┐
│ [Search Input] [Gender Select] [Price Select] [Reset]
├─────────────────────────────────────┤
│ Product 1  │  Product 2  │  Product 3
│ Product 4  │  Product 5  │  Product 6
└─────────────────────────────────────┘
```

### Tablet (1024px)
```
┌─────────────────────────────────────┐
│ [Search] [Gender] [Price] [Reset]
├─────────────────────────────────────┤
│ Product 1  │  Product 2
│ Product 3  │  Product 4
│ Product 5  │  Product 6
└─────────────────────────────────────┘
```

### Mobile (480px)
```
┌──────────────────────┐
│ [Search Input]
│ [Gender Select]
│ [Price Select]
│ [Reset Button]
├──────────────────────┤
│ Product 1
│ Product 2
│ Product 3
│ Product 4
│ Product 5
│ Product 6
└──────────────────────┘
```

## Thông Báo Khi Không Có Kết Quả

Nếu bạn:
- Tìm kiếm: "Samsung"
- Và chọn lọc: "Nữ"
- Chọn sắp xếp: "Giá thấp → cao"

**Thông báo sẽ hiển thị**:
```
Không tìm thấy sản phẩm phù hợp
```

Nhấn "Đặt lại" để xem lại toàn bộ sản phẩm.

## Lưu Ý Quan Trọng

✅ **Tất cả thao tác không reload trang** - Cùng một URL, cùng một page
✅ **Kết quả cập nhật ngay lập tức** - Không delay
✅ **Bộ lọc hoạt động độc lập** - Có thể dùng 1 hoặc nhiều bộ lọc
✅ **Smart Filtering** - Nam/Nữ + Unisex được nhóm hợp lý
✅ **Responsive** - Thích ứng với mọi kích thước màn hình
