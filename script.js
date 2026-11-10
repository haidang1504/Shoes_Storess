const products = [
  {
    id: 1,
    name: "Air Runner Red",
    category: "Sneaker",
    price: 1250000,
    size: [39, 40, 41, 42, 43],
    label: "BÁN CHẠY",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&q=85",
    description:
      "Thiết kế sneaker năng động với phối màu đỏ nổi bật, phù hợp cho phong cách thường ngày.",
  },
  {
    id: 2,
    name: "Classic Street White",
    category: "Sneaker",
    price: 990000,
    size: [38, 39, 40, 41, 42],
    label: "MỚI",
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=700&q=85",
    description:
      "Kiểu dáng tối giản, dễ phối cùng trang phục đi học, đi chơi hoặc dạo phố.",
  },
  {
    id: 3,
    name: "Urban Sport Black",
    category: "Thể thao",
    price: 1450000,
    size: [39, 40, 41, 42, 43, 44],
    label: "NỔI BẬT",
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=700&q=85",
    description:
      "Phong cách thể thao khỏe khoắn, phù hợp cho các hoạt động thường ngày.",
  },
  {
    id: 4,
    name: "Daily Comfort",
    category: "Thể thao",
    price: 890000,
    size: [38, 39, 40, 41, 42],
    label: "",
    image:
      "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?w=700&q=85",
    description:
      "Thiết kế gọn nhẹ, hướng đến sự thoải mái trong các hoạt động hằng ngày.",
  },
  {
    id: 5,
    name: "Retro Court",
    category: "Thời trang",
    price: 1150000,
    size: [39, 40, 41, 42, 43],
    label: "",
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=700&q=85",
    description: "Cảm hứng cổ điển kết hợp đường nét hiện đại, dễ phối đồ.",
  },
  {
    id: 6,
    name: "Street Flex",
    category: "Sneaker",
    price: 1390000,
    size: [39, 40, 41, 42, 43, 44],
    label: "MỚI",
    image:
      "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?w=700&q=85",
    description:
      "Mẫu giày phong cách đường phố dành cho những người yêu thích sự năng động.",
  },
  {
    id: 7,
    name: "Active Move",
    category: "Thể thao",
    price: 1050000,
    size: [38, 39, 40, 41, 42, 43],
    label: "",
    image:
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=700&q=85",
    description:
      "Thiết kế thể thao linh hoạt, phù hợp cho lịch trình di chuyển mỗi ngày.",
  },
  {
    id: 8,
    name: "Minimal Beige",
    category: "Thời trang",
    price: 950000,
    size: [38, 39, 40, 41, 42],
    label: "",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=700&q=85",
    description:
      "Tông màu trung tính, kiểu dáng đơn giản và dễ kết hợp trang phục.",
  },
];

let cart = JSON.parse(localStorage.getItem("shoesToresCart") || "[]");
let selectedProduct = null;
let selectedSize = null;

const money = (n) => new Intl.NumberFormat("vi-VN").format(n) + "đ";
const $ = (id) => document.getElementById(id);

function saveCart() {
  localStorage.setItem("shoesToresCart", JSON.stringify(cart));
  updateCartCount();
}
function toast(message) {
  const el = $("toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove("show"), 2200);
}
function renderProducts() {
  const keyword = $("searchInput").value.trim().toLowerCase();
  const category = $("categoryFilter").value;
  const sort = $("sortSelect").value;
  let list = products.filter(
    (p) =>
      (p.name.toLowerCase().includes(keyword) ||
        p.category.toLowerCase().includes(keyword)) &&
      (category === "all" || p.category === category)
  );
  if (sort === "low") list.sort((a, b) => a.price - b.price);
  if (sort === "high") list.sort((a, b) => b.price - a.price);
  if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name, "vi"));
  $("productGrid").innerHTML = list
    .map(
      (p) => `
      <article class="product-card">
        <div class="product-image" data-detail="${p.id}">
          ${p.label ? `<span class="product-label">${p.label}</span>` : ""}
          <img src="${p.image}" alt="${p.name}" loading="lazy">
        </div>
        <div class="product-info">
          <div class="product-meta"><span class="product-category">${
            p.category === "Thể thao"
              ? "SPORT"
              : p.category === "Thời trang"
              ? "CASUAL"
              : "SNEAKER"
          }</span><span class="product-code">${String(19700 + p.id * 137).slice(
        0,
        5
      )}</span></div>
          <h3>${p.name}</h3>
          <div class="product-bottom"><span class="product-rating">★★★★★ <span>(${
            [153, 91, 76, 91, 94, 68, 112, 57][p.id - 1]
          })</span></span><span class="price">${money(
        p.price
      )}</span><button class="quick-add" data-detail="${
        p.id
      }">XEM GIÀY</button></div>
        </div>
      </article>`
    )
    .join("");
  $("emptyMessage").hidden = list.length !== 0;
}
function openModal(id) {
  $(id).classList.add("show");
  $(id).setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeModal(id) {
  $(id).classList.remove("show");
  $(id).setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
function showProduct(id) {
  selectedProduct = products.find((p) => p.id === Number(id));
  selectedSize = null;
  $("productDetail").innerHTML = `
      <div class="detail-layout">
        <img src="${selectedProduct.image}" alt="${selectedProduct.name}">
        <div><span class="product-category">${selectedProduct.category}</span>
        <h2>${selectedProduct.name}</h2><div class="detail-price">${money(
    selectedProduct.price
  )}</div>
        <p>${
          selectedProduct.description
        }</p><b style="font-size:12px">Chọn kích cỡ:</b>
        <div class="size-options">${selectedProduct.size
          .map((s) => `<button type="button" data-size="${s}">${s}</button>`)
          .join("")}</div>
        <button class="primary-btn full-btn" id="addDetail">THÊM VÀO GIỎ HÀNG</button></div>
      </div>`;
  openModal("productModal");
}
function addToCart(product, size) {
  const found = cart.find((i) => i.id === product.id && i.size === size);
  if (found) found.qty++;
  else cart.push({ id: product.id, size, qty: 1 });
  saveCart();
  toast("Đã thêm sản phẩm vào giỏ hàng!");
}
function updateCartCount() {
  $("cartCount").textContent = cart.reduce((sum, i) => sum + i.qty, 0);
}
function renderCart() {
  const container = $("cartItems");
  if (!cart.length) {
    container.innerHTML =
      '<p class="empty-message">Giỏ hàng đang trống. Hãy chọn một đôi giày nhé!</p>';
  } else {
    container.innerHTML = cart
      .map((item) => {
        const p = products.find((x) => x.id === item.id);
        return `<div class="cart-row">
          <img src="${p.image}" alt="${p.name}">
          <div><h3>${p.name}</h3><p>Size: ${item.size} · ${money(p.price)}</p>
            <div class="quantity"><button data-qty="-1" data-id="${
              p.id
            }" data-size="${item.size}">−</button><span>${
          item.qty
        }</span><button data-qty="1" data-id="${p.id}" data-size="${
          item.size
        }">+</button></div>
          </div>
          <div style="text-align:right"><b style="font-size:12px">${money(
            p.price * item.qty
          )}</b><br><button class="remove-btn" data-remove="${
          p.id
        }" data-size="${item.size}">Xóa</button></div>
        </div>`;
      })
      .join("");
  }
  const total = cart.reduce(
    (sum, item) =>
      sum + products.find((p) => p.id === item.id).price * item.qty,
    0
  );
  $("cartTotal").textContent = money(total);
  $("checkoutBtn").disabled = !cart.length;
  $("checkoutBtn").style.opacity = cart.length ? 1 : 0.5;
}
$("productGrid").addEventListener("click", (e) => {
  const target = e.target.closest("[data-detail]");
  if (target) showProduct(target.dataset.detail);
});
$("productDetail").addEventListener("click", (e) => {
  if (e.target.matches("[data-size]")) {
    selectedSize = Number(e.target.dataset.size);
    document
      .querySelectorAll(".size-options button")
      .forEach((b) =>
        b.classList.toggle("selected", Number(b.dataset.size) === selectedSize)
      );
  }
  if (e.target.id === "addDetail") {
    if (!selectedSize) {
      toast("Vui lòng chọn kích cỡ giày.");
      return;
    }
    addToCart(selectedProduct, selectedSize);
    closeModal("productModal");
  }
});
$("cartItems").addEventListener("click", (e) => {
  const qty = e.target.closest("[data-qty]");
  const remove = e.target.closest("[data-remove]");
  if (qty) {
    const item = cart.find(
      (i) =>
        i.id === Number(qty.dataset.id) && i.size === Number(qty.dataset.size)
    );
    item.qty += Number(qty.dataset.qty);
    if (item.qty <= 0) cart = cart.filter((i) => i !== item);
    saveCart();
    renderCart();
  }
  if (remove) {
    cart = cart.filter(
      (i) =>
        !(
          i.id === Number(remove.dataset.remove) &&
          i.size === Number(remove.dataset.size)
        )
    );
    saveCart();
    renderCart();
  }
});
$("searchInput").addEventListener("input", renderProducts);
$("categoryFilter").addEventListener("change", renderProducts);
$("sortSelect").addEventListener("change", renderProducts);
$("categoryTabs").addEventListener("click", (e) => {
  const tab = e.target.closest("[data-category]");
  if (!tab) return;
  $("categoryFilter").value = tab.dataset.category;
  $("categoryTabs")
    .querySelectorAll(".category-tab")
    .forEach((btn) => {
      const active = btn === tab;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-selected", String(active));
    });
  renderProducts();
});
$("openCart").addEventListener("click", () => {
  renderCart();
  openModal("cartModal");
});
$("checkoutBtn").addEventListener("click", () => {
  closeModal("cartModal");
  openModal("checkoutModal");
});
$("checkoutForm").addEventListener("submit", (e) => {
  e.preventDefault();
  if (!cart.length) {
    toast("Giỏ hàng đang trống.");
    return;
  }
  const form = new FormData(e.target);
  const orderId = "ST" + Date.now().toString().slice(-7);
  alert(
    `Cảm ơn ${form.get(
      "name"
    )}!\\nMã đơn hàng mô phỏng: ${orderId}\\nShoes Tores sẽ liên hệ theo thông tin bạn cung cấp.`
  );
  cart = [];
  saveCart();
  e.target.reset();
  closeModal("checkoutModal");
  renderCart();
});
document
  .querySelectorAll("[data-close]")
  .forEach((btn) =>
    btn.addEventListener("click", () => closeModal(btn.dataset.close))
  );
document.querySelectorAll(".modal-backdrop").forEach((backdrop) =>
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeModal(backdrop.id);
  })
);
$("searchFocus").addEventListener("click", () => {
  $("searchInput").focus();
  $("products").scrollIntoView({ behavior: "smooth" });
});
$("menuToggle").addEventListener("click", () =>
  $("navMenu").classList.toggle("open")
);
$("navMenu")
  .querySelectorAll("a")
  .forEach((a) =>
    a.addEventListener("click", () => $("navMenu").classList.remove("open"))
  );
renderProducts();
updateCartCount();
