# 🔧 Hướng Dẫn Debug Website

## ✅ Các Lỗi Đã Fix

### 1. **File CSS/JS Cũ Bị Xung Đột** ✅
- ❌ Trước: Có `style.css` ở root + `css/style.css` ở folder
- ✅ Sau: Xóa file cũ, chỉ giữ `css/style.css` trong folder css

### 2. **Cart Dropdown Bị Dồn/Tràn** ✅
- ❌ Trước: `position: absolute; top: 100%; right: 20px;` không hoạt động
- ✅ Sau: Sửa thành `top: calc(100% + 8px); right: 0;` và thêm `position: relative` vào header__wrapper

### 3. **CSS Cache Browser** ✅
- ✅ Thêm version query string: `href="css/style.css?v=2.0"`
- ✅ Thêm Cache-Control headers
- ✅ Thêm fallback inline CSS

### 4. **Script Loading** ✅
- ✅ Thêm console.log debug để kiểm tra initialization
- ✅ Verify cart.js load trước main.js

---

## 🔍 Cách Kiểm Tra Nếu Còn Lỗi

### 1. **Mở DevTools**
```
Windows: F12 hoặc Ctrl+Shift+I
Mac: Cmd+Option+I
```

### 2. **Kiểm Tra Console Tab**
Bạn sẽ thấy các message:
```
🔧 Website Loading...
📦 Total Products: 6
🛒 Cart Initialized
⚙️ All Features Setup
✅ Website Ready!
```

### 3. **Nếu Không Thấy Message**
- ✅ Bấm F5 (Refresh)
- ✅ Bấm Ctrl+Shift+R (Hard Refresh - Clear Cache)
- ✅ Đóng DevTools (F12) rồi mở lại

### 4. **Kiểm Tra Network Tab**
- Click tab "Network"
- Refresh page
- Kiểm tra xem các file đã load:
  - `css/style.css` - Status 200 ✅
  - `js/cart.js` - Status 200 ✅
  - `js/main.js` - Status 200 ✅
  - `images/nike*.png` - Status 200 ✅

---

## ⚡ Các Lỗi Có Thể Xảy Ra & Cách Fix

### Lỗi 1: Sản Phẩm Không Hiển Thị
**Nguyên nhân**: CSS grid không render, hoặc JS không chạy
**Fix**:
1. Mở DevTools (F12) → Console
2. Nếu có lỗi JavaScript, sẽ có error message
3. Thử command này trong console:
```javascript
renderProducts();
```
- Nếu sản phẩm xuất hiện → lỗi là initialization
- Nếu vẫn không có → lỗi là data

### Lỗi 2: CSS Không Load
**Nguyên nhân**: Path sai, file không tồn tại, cache
**Fix**:
1. Kiểm tra DevTools → Network → tìm `style.css`
2. Nếu có dòng màu đỏ → file không tìm thấy
3. Kiểm tra path: `css/style.css` (không phải `css\style.css`)

### Lỗi 3: Cart Dropdown Bị Dồn Sang Trái
**Nguyên nhân**: Positioning sai
**Fix**:
- Đã sửa thành `right: 0` thay vì `right: 20px`
- Đã thêm `position: relative` vào `.header__wrapper`

### Lỗi 4: Ảnh Không Hiển Thị
**Nguyên nhân**: Ảnh không tồn tại hoặc path sai
**Fix**:
1. Kiểm tra folder `images/` có file `nike1.png` → `nike6.png`
2. Path phải là `images/nike1.png` (không phải `../images/`)
3. Browser sẽ tự load SVG fallback nếu ảnh không tìm thấy

---

## 📊 Checklist Kiểm Tra

- [ ] Xóa cache browser: Ctrl+Shift+Delete
- [ ] Hard refresh: Ctrl+F5
- [ ] Mở DevTools: F12
- [ ] Xem Console có message "✅ Website Ready!"
- [ ] Xem Network tab - tất cả file status 200
- [ ] Sản phẩm hiển thị ở grid (4 cột desktop)
- [ ] Cart button hoạt động khi click
- [ ] Filter search hoạt động
- [ ] Hover card có animation
- [ ] Mobile responsive (1 cột trên điện thoại)

---

## 🆘 Nếu Vẫn Gặp Vấn Đề

1. **Copy đoạn error message từ Console**
2. **Check Network tab - xem file nào return status khác 200**
3. **Kiểm tra file tồn tại**: 
   - `css/style.css` ✅
   - `js/cart.js` ✅
   - `js/main.js` ✅
   - `images/nike*.png` ✅

---

## 💡 Mẹo

- **Xem page offline**: Chuột phải → View Page Source
- **Test responsive**: DevTools → Device Toolbar (Ctrl+Shift+M)
- **Simulate 3G**: DevTools → Network → Throttling → Slow 3G
- **Clear LocalStorage**: DevTools → Application → LocalStorage → Delete

---

**Status**: ✅ Sửa hoàn tất - Website sẵn sàng hoạt động!

Bấm **Ctrl+F5** ngay bây giờ để thấy kết quả! 🚀
