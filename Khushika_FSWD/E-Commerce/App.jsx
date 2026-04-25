import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AuthPage from "./pages/AuthPage";
import Toast from "./components/Toast";
import ProductModal from "./components/ProductModal";
import Footer from "./components/Footer";
import { products, CATEGORIES } from "./data/products";

export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderDone, setOrderDone] = useState(false);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const addToCart = (p) => {
    setCart(c => {
      const ex = c.find(i => i.id === p.id);
      if (ex) return c.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...c, { ...p, qty: 1 }];
    });
    showToast(`${p.name} added to cart`);
  };

  const removeFromCart = (id) => setCart(c => c.filter(i => i.id !== id));
  const updateQty = (id, d) => setCart(c => c.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + d) } : i));
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const toggleWishlist = (id) => setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);

  const filtered = products.filter(p =>
    (category === "All" || p.category === category) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()))
  );

  if (page === "auth") return <AuthPage setPage={setPage} setUser={setUser} showToast={showToast} toast={toast} />;
  if (page === "cart") return <CartPage cart={cart} cartCount={cartCount} cartTotal={cartTotal} removeFromCart={removeFromCart} updateQty={updateQty} user={user} setPage={setPage} toast={toast} />;
  if (page === "checkout") return <CheckoutPage cart={cart} cartTotal={cartTotal} setCart={setCart} setPage={setPage} showToast={showToast} toast={toast} orderDone={orderDone} setOrderDone={setOrderDone} />;

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "#fff" }}>
      {toast && <Toast toast={toast} />}
      {selectedProduct && (
        <ProductModal product={selectedProduct} setSelectedProduct={setSelectedProduct} addToCart={addToCart} />
      )}
      <Navbar user={user} cartCount={cartCount} setPage={setPage} search={search} setSearch={setSearch} />
      <Hero />
      <div style={{ background: "#E24B4A", padding: "10px 0", textAlign: "center" }}>
        <span style={{ color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: 3 }}>
          🔥 FLASH SALE — UP TO 40% OFF · FREE SHIPPING OVER ₹2000 · CODE: SHOJAAL25
        </span>
      </div>
      <ProductGrid
        filtered={filtered}
        category={category}
        setCategory={setCategory}
        CATEGORIES={CATEGORIES}
        wishlist={wishlist}
        toggleWishlist={toggleWishlist}
        addToCart={addToCart}
        setSelectedProduct={setSelectedProduct}
      />
      <Footer />
    </div>
  );
}