# Project Knowledge — `convert`

## 1. Tổng quan

`convert` là một website **static HTML/CSS/JS** cho Elite Stone Suppliers.

Đặc điểm chính:
- Không có `package.json`, không có build tool, không có framework frontend.
- Toàn bộ site được dựng bằng **nhiều file `index.html` theo từng thư mục route**.
- Dùng chung:
  - `css/main.css`
  - `js/main.js`
- Nội dung, SEO meta, ảnh, CTA và nhiều hành vi nhỏ được **hardcode trực tiếp trong từng trang HTML**.

## 2. Cấu trúc thư mục hiện tại

```text
convert/
├─ index.html                    # Trang chủ
├─ css/
│  └─ main.css                   # CSS dùng chung toàn site
├─ js/
│  └─ main.js                    # JS dùng chung toàn site
├─ images/                       # Kho ảnh tĩnh, rất nhiều biến thể kích thước/crop
├─ products/
│  ├─ index.html                 # Landing page cho nhóm sản phẩm
│  ├─ marble-slabs/index.html
│  ├─ quartz-slabs/index.html
│  ├─ countertops/index.html
│  ├─ tiles-pavers/index.html
│  └─ vanity-tops/index.html
├─ applications/index.html       # Gallery ứng dụng thực tế
├─ catalogs/index.html           # Tải catalog PDF
├─ contact/index.html            # Trang liên hệ + form + captcha JS
├─ mining/index.html             # Trang mỏ đá, map, stats, gallery + lightbox
├─ legal-notice/index.html       # Trang pháp lý
├─ privacy/index.html            # Privacy policy
├─ dark-star/index.html
├─ dark-star-12/index.html
├─ dark-star-polished/index.html
├─ dark-star-veined/index.html
├─ river/index.html
├─ river-bold/index.html
├─ saga-black/index.html
├─ ocean-grey/index.html
├─ creama-dora/index.html
├─ creama-karaman/index.html
├─ sebaste-dark/index.html
├─ sebaste-dark-honed/index.html
├─ sebaste-flower/index.html
└─ sebaste-moire/index.html      # Các product detail page kiểu PDP
```

Hiện có **27 trang HTML** trong cây `convert`.

## 3. Kiến trúc route

Site đang dùng kiểu route thư mục:
- `/` → `convert/index.html`
- `/contact` → `convert/contact/index.html`
- `/products/marble-slabs` → `convert/products/marble-slabs/index.html`
- `/dark-star-polished` → `convert/dark-star-polished/index.html`

Điều này cho thấy site nhiều khả năng được deploy trên web server/CDN với rule map thư mục sang `index.html`.

## 4. Các nhóm trang chính

### 4.1. Trang chủ
File: `index.html`

Chứa các khối chính:
- Hero fullscreen có slider ảnh nền
- Icon bars
- Product showcase
- Lookbook slider
- About section
- CTA footer + footer dùng chung

Trang chủ có thêm nhiều CSS/JS inline riêng, ngoài `main.css` và `main.js`.

### 4.2. Trang landing danh mục
Ví dụ:
- `products/index.html`
- `products/marble-slabs/index.html`
- `products/quartz-slabs/index.html`
- `products/countertops/index.html`
- `products/tiles-pavers/index.html`
- `products/vanity-tops/index.html`

Đây là các trang liệt kê theo nhóm, thường dùng card/grid để dẫn sang sản phẩm hoặc bộ sưu tập.

### 4.3. Trang chi tiết sản phẩm kiểu PDP
Ví dụ:
- `dark-star/index.html`
- `dark-star-polished/index.html`
- `sebaste-dark/index.html`
- `river/index.html`

Mẫu layout gần như thống nhất:
- Gallery trái + thumbnails
- Nội dung mô tả bên phải
- CTA: quote / availability / sample / spec sheet
- Specifications table
- Best uses
- Real projects
- Info strip 4 cột
- Có JS inline riêng cho swap ảnh / lightbox

### 4.4. Trang Applications
File: `applications/index.html`

Bản chất là gallery ảnh ứng dụng thực tế, dùng layout grid đơn giản.

### 4.5. Trang Mining
File: `mining/index.html`

Là trang nội dung giàu hình ảnh hơn:
- Hero riêng
- Intro text + Google Maps embed
- Stats
- Large quarry gallery
- Lightbox riêng viết inline trong trang

### 4.6. Trang Catalogs
File: `catalogs/index.html`

Hiển thị catalog card và link tải PDF ra ngoài (Google Drive).

### 4.7. Trang Contact
File: `contact/index.html`

Bao gồm:
- Thông tin người liên hệ
- Form HTML
- Checkbox privacy policy
- Captcha vẽ bằng `canvas`
- Validation captcha bằng JS phía client

Quan trọng: form hiện tại dùng `action="#"`, tức là **chưa nối backend submit thực tế**.

### 4.8. Trang pháp lý
- `legal-notice/index.html`
- `privacy/index.html`

Dùng layout legal content khá đơn giản, không có logic JS đặc biệt ngoài file shared.

## 5. Shared assets

### 5.1. `css/main.css`
Đây là stylesheet nền cho toàn site, chứa:
- Design tokens bằng CSS variables
- Reset cơ bản
- Typography và button
- Header / nav / dropdown / mobile menu
- Page hero dùng lại cho subpages
- Product card / gallery / contact / catalog / applications / mining / footer
- Animation `.fade-up`
- Hệ style cho legal pages
- Hệ style mới cho PDP (`.pdp-*`)

Nhận xét:
- File này là **trung tâm layout/style dùng chung**.
- Một số trang vẫn chèn thêm `<style>` inline để override hoặc bổ sung layout riêng.

### 5.2. `js/main.js`
JS dùng chung hiện xử lý:
- Dropdown menu trên mobile
- Mở/đóng mobile menu
- Sticky header theo scroll
- Scrollspy cho anchor section ở homepage
- Fade-up animation với `IntersectionObserver`
- Lightbox cho `.gallery-grid a`

Nhận xét:
- Logic JS global khá nhẹ.
- Một số hành vi chuyên biệt không nằm ở đây mà viết inline trong từng trang, ví dụ:
  - hero/lookbook slider ở homepage
  - captcha ở contact
  - product image swap/lightbox ở PDP
  - mining gallery lightbox

## 6. Mô hình dữ liệu thực tế

Project **không có data layer tách riêng**.

Dữ liệu hiện sống trực tiếp trong HTML:
- Tên sản phẩm
- SEO title/description/canonical/OG
- Thông số kỹ thuật
- CTA text
- Danh sách ảnh
- Link catalog
- Thông tin liên hệ

Điều này có nghĩa là khi sửa nội dung cần cập nhật thủ công ở từng trang liên quan.

## 7. Điều hướng và thành phần lặp lại

Nhiều thành phần đang bị lặp nguyên khối giữa các file HTML:
- Top bar
- Header + nav + mobile nav
- CTA footer
- Footer
- Google Fonts
- Google Tag script
- Meta/OpenGraph/canonical

Hệ quả:
- Chỉnh menu/footer/contact info cần sửa ở nhiều file.
- Rất dễ phát sinh lệch nội dung giữa các trang nếu sửa không đồng bộ.

## 8. Tài nguyên ngoài project

Site hiện phụ thuộc vào vài dịch vụ/tài nguyên bên ngoài:
- Google Fonts
- Google Tag / gtag (`AW-17635959985`)
- Google Maps embed trên trang Mining
- Google Drive link cho catalog PDF

Nếu các dịch vụ này đổi URL hoặc quyền truy cập, site có thể bị ảnh hưởng mà không cần đổi code local.

## 9. Các điểm cần lưu ý khi bảo trì

### 9.1. Nội dung placeholder / dummy
Một số PDP đang có nội dung placeholder như:
- `Download Spec Sheet (dummy)`
- Thông số `Thickness`, `Slab Size`, `Maintenance`, `Stock Availability` có gắn `(dummy)`

Điều này cho thấy dữ liệu sản phẩm chưa hoàn thiện 100%.

### 9.2. Contact form chưa có backend
Form ở `contact/index.html` chỉ chặn captcha phía client và chưa submit đi đâu.

### 9.3. Nội dung lặp và dễ lệch
Thông tin footer/header xuất hiện lặp ở nhiều trang, ví dụ email/địa chỉ/số điện thoại.

### 9.4. Có dấu hiệu lỗi nội dung/encoding/typo
Trong các file đang có một số điểm nên rà lại:
- Ký tự hiển thị lỗi như `�` ở vài đoạn text
- Email `sales@elitestonesupplers.com` có khả năng là typo của `elitestonesuppliers`
- Một số logo width không đồng nhất giữa các trang

### 9.5. Hệ ảnh lớn và nhiều biến thể crop
Thư mục `images/` chứa rất nhiều ảnh với tên thư mục thể hiện kích thước/crop. Khi thay ảnh cần kiểm tra:
- đúng biến thể đang được trang gọi
- không làm gãy tỉ lệ hiển thị
- không phá layout mobile/desktop

## 10. Cách chỉnh sửa an toàn

### Khi sửa style toàn site
Ưu tiên sửa trong:
- `css/main.css`

Nhưng cần kiểm tra thêm các trang có CSS inline vì có thể chúng override style chung.

### Khi sửa hành vi dùng chung
Ưu tiên sửa trong:
- `js/main.js`

Nhưng nếu bug chỉ xảy ra ở một trang cụ thể thì kiểm tra JS inline của trang đó trước.

### Khi sửa nội dung sản phẩm
Thường phải sửa trực tiếp trong file HTML sản phẩm tương ứng:
- meta title/description
- H1/subtitle/description
- bảng specs
- ảnh gallery
- CTA/link

### Khi sửa menu/footer/contact info
Cần search toàn bộ `convert/**/*.html` vì block này đang được copy-paste nhiều nơi.

## 11. Định hướng cải thiện nếu tiếp tục phát triển

Nếu dự án tiếp tục mở rộng, các điểm đáng cân nhắc:
- Tách partial cho header/footer/nav thay vì copy-paste
- Tách dữ liệu sản phẩm ra JSON/CMS/static generator
- Chuẩn hóa template cho PDP và category pages
- Gắn backend thật cho contact form
- Rà lại toàn bộ typo, encoding và placeholder content
- Tạo quy ước quản lý ảnh để dễ bảo trì hơn

## 12. Tóm tắt kỹ thuật

- Kiểu dự án: static marketing/product website
- Stack: HTML + CSS + vanilla JavaScript
- Build step: không có
- Data source: hardcoded trong HTML
- Shared assets: `css/main.css`, `js/main.js`
- External integrations: Google Tag, Google Fonts, Google Maps, Google Drive
- Điểm rủi ro lớn nhất khi sửa: nội dung lặp nhiều file và dữ liệu hardcode phân tán
