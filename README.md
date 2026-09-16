# 💍 Wedding Invitation — Đình Tiến & Thu Hằng

Web thiệp cưới xây dựng bằng **React + TypeScript + Vite**, deploy trên **GitHub Pages**.

---

## 🗂️ Cấu trúc ảnh

```
public/
└── image/
    ├── 1.jpg          ← ảnh gốc (KHÔNG chỉnh sửa)
    ├── 1.webp         ← full WebP tự động tạo (lightbox)
    ├── 2.jpg
    ├── 2.webp
    ├── ...
    ├── bg.jpg         ← ảnh nền hero
    ├── bg.webp
    └── thumbnails/
        ├── 1.jpg      ← thumbnail JPG tự động tạo (grid gallery)
        ├── 1.webp     ← thumbnail WebP tự động tạo (grid gallery)
        └── ...
```

> **Quy tắc:** Chỉ đặt ảnh gốc vào `public/image/`. Các file `.webp` và `thumbnails/` được tạo tự động bằng script.

---

## 📸 Trường hợp 1: Thay đổi ảnh

### Bước 1 — Đặt ảnh mới vào thư mục
Thay file ảnh gốc cần đổi (ví dụ muốn đổi ảnh số 3):
```
public/image/3.jpg   ← thay bằng ảnh mới (giữ nguyên tên)
```

### Bước 2 — Xóa output cũ của ảnh đó (tùy chọn)
Script tự bỏ qua file đã tồn tại, nên cần xóa output cũ trước:
```bash
# Xóa thủ công
del public\image\3.webp
del public\image\thumbnails\3.jpg
del public\image\thumbnails\3.webp
```
Hoặc dùng `--force` ở bước sau để tạo lại tất cả.

### Bước 3 — Tạo lại WebP + Thumbnails
```bash
# Chỉ tạo file chưa có output (nhanh)
npm run optimize-images

# Tạo lại TẤT CẢ từ đầu (chậm hơn)
npm run optimize-images -- --force
```

### Bước 4 — Deploy
```bash
git add -A
git commit -m "chore: update photo N"
git push origin main
```

---

## 🔢 Trường hợp 2: Tăng / Giảm số lượng ảnh

### Thêm ảnh mới (ví dụ thêm ảnh 26, 27)

**Bước 1** — Đặt ảnh gốc vào thư mục:
```
public/image/26.jpg
public/image/27.jpg
```

**Bước 2** — Tạo WebP + Thumbnails:
```bash
npm run optimize-images
```

**Bước 3** — Cập nhật số lượng ảnh trong code:

Mở file [`src/constants/wedding.ts`](./src/constants/wedding.ts), tìm dòng:
```ts
export const WEDDING_PHOTO_ITEMS = Array.from({ length: 25 }, ...
```
Đổi `25` thành số ảnh mới:
```ts
export const WEDDING_PHOTO_ITEMS = Array.from({ length: 27 }, ...
//                                                        ↑ đổi thành số mới
```

**Bước 4** — Deploy:
```bash
git add -A
git commit -m "chore: add photos 26-27"
git push origin main
```

---

### Bớt ảnh (ví dụ xóa ảnh 24, 25)

**Bước 1** — Xóa file ảnh gốc và output:
```bash
# Xóa ảnh gốc
del public\image\24.jpg
del public\image\25.jpg

# Xóa WebP full
del public\image\24.webp
del public\image\25.webp

# Xóa thumbnails
del public\image\thumbnails\24.jpg
del public\image\thumbnails\24.webp
del public\image\thumbnails\25.jpg
del public\image\thumbnails\25.webp
```

**Bước 2** — Cập nhật số lượng trong [`src/constants/wedding.ts`](./src/constants/wedding.ts):
```ts
Array.from({ length: 23 }, ...   // đổi về số ảnh còn lại
```

**Bước 3** — Deploy:
```bash
git add -A
git commit -m "chore: remove photos 24-25"
git push origin main
```

---

## ⚙️ Trường hợp 3: Điều chỉnh thông số nén

Mở file [`scripts/optimize-images.cjs`](./scripts/optimize-images.cjs) và tìm các dòng sau:

```js
// Full size WebP — hiển thị trong lightbox khi phóng to
.webp({ quality: 85, effort: 5 })   // quality: 0–100, effort: 1–6

// Thumbnail JPG — fallback cho browser cũ (không hỗ trợ WebP)
.jpeg({ quality: 78, progressive: true, mozjpeg: true })

// Thumbnail WebP — hiển thị trong grid gallery
.webp({ quality: 75, effort: 4 })
```

### Bảng tham khảo quality

| Mức | Chất lượng | Ghi chú |
|-----|-----------|---------|
| `90+` | Gần như lossless | File rất nặng, không cần thiết |
| `85` | ✅ **Khuyến nghị lightbox** | Không phân biệt được bằng mắt khi zoom |
| `78` | ✅ **Khuyến nghị thumbnail JPG** | Tốt ở kích thước nhỏ |
| `75` | ✅ **Khuyến nghị thumbnail WebP** | WebP nén tốt hơn JPG cùng quality |
| `65–70` | Chấp nhận được | Bắt đầu thấy giảm chất lượng |
| `<60` | Thấp | Rõ vệt nén (artifacts) |

### Kích thước resize

```js
.resize(1600, null, ...)   // Full WebP — max 1600px chiều ngang
.resize(500, null, ...)    // Thumbnail — max 500px chiều ngang
```

> `withoutEnlargement: true` đảm bảo ảnh nhỏ hơn ngưỡng sẽ không bị phóng to.

### Sau khi đổi thông số — tạo lại toàn bộ:
```bash
npm run optimize-images -- --force
git add -A
git commit -m "chore: update image compression settings"
git push origin main
```

---

## 🚀 Deploy lên GitHub Pages

Push lên branch `main` sẽ tự động trigger GitHub Actions build và deploy:

```bash
git add -A
git commit -m "message"
git push origin main
```

Xem trạng thái deploy tại tab **Actions** trên GitHub repository.

---

## 🛠️ Development

```bash
npm install       # cài dependencies
npm run dev       # chạy dev server (http://localhost:5173)
npm run build     # build production
npm run preview   # xem trước bản build
```
