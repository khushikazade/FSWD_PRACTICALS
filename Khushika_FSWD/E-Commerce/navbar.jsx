// ─── src/components/Navbar.jsx ───────────────────────────────────────────────
export function Navbar({ user, cartCount, setPage, search, setSearch }) {
  return (
    <nav style={{ background: "#0a0a0a", padding: "0 2rem", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100, borderBottom: "1px solid #222" }}>
      <span onClick={() => setPage("home")} style={{ color: "#fff", fontWeight: 700, fontSize: 18, letterSpacing: 3, cursor: "pointer" }}>SHOJAAL'S MART</span>
      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <div style={{ position: "relative", width: 300 }}>
          <input
            style={{ width: "100%", padding: "10px 14px 10px 36px", borderRadius: 20, border: "1px solid #222", background: "#111", color: "#fff", fontSize: 13, boxSizing: "border-box" }}
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#555", fontSize: 14 }}>🔍</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {user
          ? <span style={{ color: "#888", fontSize: 12, letterSpacing: 1 }}>Hi, {user.name}</span>
          : <button onClick={() => setPage("auth")} style={{ background: "none", border: "none", color: "#aaa", cursor: "pointer", padding: "6px 12px", fontSize: 13, letterSpacing: 1 }}>SIGN IN</button>
        }
        <button onClick={() => setPage("cart")} style={{ background: "#fff", color: "#000", border: "none", padding: "8px 18px", borderRadius: 4, fontWeight: 600, fontSize: 12, letterSpacing: 2, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
          🛒 {cartCount > 0 && <span style={{ background: "#E24B4A", color: "#fff", borderRadius: 10, padding: "2px 7px", fontSize: 11, fontWeight: 700 }}>{cartCount}</span>} CART
        </button>
      </div>
    </nav>
  );
}

// ─── src/components/Hero.jsx ─────────────────────────────────────────────────
export function Hero() {
  return (
    <div style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 50%, #0a1628 100%)", minHeight: 480, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "4rem 2rem", flexDirection: "column" }}>
      <div style={{ color: "#534AB7", fontSize: 11, letterSpacing: 6, marginBottom: "1rem", fontWeight: 600 }}>SUMMER 2025 COLLECTION</div>
      <div style={{ color: "#fff", fontSize: 56, fontWeight: 800, letterSpacing: -1, margin: "0 0 1rem", lineHeight: 1.1 }}>
        Wear the<br /><span style={{ color: "#534AB7" }}>Extraordinary</span>
      </div>
      <div style={{ color: "#888", fontSize: 18, marginBottom: "2rem", maxWidth: 460 }}>Curated luxury goods for the discerning few. Authenticity guaranteed.</div>
      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })} style={{ background: "#fff", color: "#000", border: "none", padding: "14px 40px", borderRadius: 4, fontWeight: 700, fontSize: 13, letterSpacing: 3, cursor: "pointer" }}>SHOP NOW</button>
        <button style={{ background: "none", color: "#fff", border: "1px solid #333", padding: "14px 40px", borderRadius: 4, fontWeight: 700, fontSize: 13, letterSpacing: 3, cursor: "pointer" }}>LOOKBOOK</button>
      </div>
      <div style={{ display: "flex", gap: 32, marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid #222" }}>
        {[["50K+", "Customers"], ["200+", "Brands"], ["Free", "Shipping"], ["Easy", "Returns"]].map(([v, l]) => (
          <div key={l} style={{ textAlign: "center" }}>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 20 }}>{v}</div>
            <div style={{ color: "#555", fontSize: 11, letterSpacing: 1 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── src/components/Footer.jsx ───────────────────────────────────────────────
export function Footer() {
  return (
    <div style={{ background: "#0d0d0d", borderTop: "1px solid #1a1a1a", padding: "3rem 2rem", textAlign: "center" }}>
      <div style={{ color: "#fff", fontWeight: 800, fontSize: 18, letterSpacing: 3, marginBottom: 8 }}>SHOJAAL'S MART</div>
      <div style={{ color: "#444", fontSize: 12, letterSpacing: 1 }}>© 2025 SHOJAAL'S MART. All rights reserved.</div>
    </div>
  );
}

// ─── src/components/Toast.jsx ────────────────────────────────────────────────
export function Toast({ toast }) {
  return (
    <div style={{ position: "fixed", top: 80, right: 24, background: toast.type === "error" ? "#E24B4A" : "#1D9E75", color: "#fff", padding: "10px 20px", borderRadius: 8, fontWeight: 600, zIndex: 999 }}>
      {toast.msg}
    </div>
  );
}

// ─── src/components/ProductModal.jsx ─────────────────────────────────────────
const badgeColor = { HOT: "#E24B4A", SALE: "#1D9E75", NEW: "#534AB7" };

export function ProductModal({ product: p, setSelectedProduct, addToCart }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.85)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ background: "#111", border: "1px solid #222", borderRadius: 16, padding: "2rem", maxWidth: 520, width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1.5rem" }}>
          <div>
            {p.badge && <span style={{ background: badgeColor[p.badge], color: "#fff", fontSize: 9, fontWeight: 700, letterSpacing: 2, padding: "3px 8px", borderRadius: 3 }}>{p.badge}</span>}
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 24, marginTop: 8 }}>{p.name}</div>
            <div style={{ color: "#555", fontSize: 13, marginTop: 4 }}>{p.category}</div>
          </div>
          <button onClick={() => setSelectedProduct(null)} style={{ background: "none", border: "none", color: "#555", fontSize: 24, cursor: "pointer" }}>×</button>
        </div>
        <div style={{ fontSize: 80, textAlign: "center", background: "#0a0a0a", borderRadius: 12, padding: "2rem", marginBottom: "1.5rem" }}>{p.img}</div>
        <div style={{ color: "#888", fontSize: 14, marginBottom: "1.5rem", lineHeight: 1.6 }}>{p.desc}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <div>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 20 }}>₹{p.price.toLocaleString()}</span>
            {p.originalPrice && <span style={{ color: "#555", fontSize: 13, textDecoration: "line-through", marginLeft: 10 }}>₹{p.originalPrice.toLocaleString()}</span>}
            {p.originalPrice && <span style={{ color: "#1D9E75", fontSize: 12, fontWeight: 700, marginLeft: 8 }}>{Math.round((1 - p.price / p.originalPrice) * 100)}% OFF</span>}
          </div>
          <div style={{ color: "#888", fontSize: 12 }}>⭐ {p.rating} ({p.reviews})</div>
        </div>
        <button onClick={() => { addToCart(p); setSelectedProduct(null); }} style={{ background: "#fff", color: "#000", border: "none", padding: 14, width: "100%", borderRadius: 6, fontWeight: 700, fontSize: 12, letterSpacing: 3, cursor: "pointer" }}>ADD TO CART</button>
      </div>
    </div>
  );
}

// ─── src/components/ProductGrid.jsx ──────────────────────────────────────────
export function ProductGrid({ filtered, category, setCategory, CATEGORIES, wishlist, toggleWishlist, addToCart, setSelectedProduct }) {
  const badgeColor = { HOT: "#E24B4A", SALE: "#1D9E75", NEW: "#534AB7" };
  return (
    <div id="products" style={{ padding: "3rem 2rem", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: 12 }}>
        <div style={{ color: "#fff", fontWeight: 700, fontSize: 20, letterSpacing: 2 }}>SHOP ALL</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)} style={{ padding: "6px 16px", borderRadius: 20, border: `1px solid ${category === c ? "#fff" : "#333"}`, background: category === c ? "#fff" : "none", color: category === c ? "#000" : "#888", fontSize: 12, fontWeight: 600, cursor: "pointer", letterSpacing: 1 }}>{c}</button>
          ))}
        </div>
      </div>
      {filtered.length === 0
        ? <div style={{ textAlign: "center", padding: "3rem", color: "#444" }}>No products found</div>
        : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 }}>
            {filtered.map(p => (
              <div key={p.id}
                style={{ background: "#111", border: "1px solid #222", borderRadius: 12, overflow: "hidden", cursor: "pointer", transition: "transform .2s, border-color .2s" }}
                onClick={() => setSelectedProduct(p)}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "#444"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "#222"; }}
              >
                <div style={{ height: 160, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64, background: "#181818" }}>{p.img}</div>
                <div style={{ padding: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 6 }}>
                    <div>
                      <div style={{ color: "#555", fontSize: 10, letterSpacing: 2, marginBottom: 3 }}>{p.category.toUpperCase()}</div>
                      <div style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>{p.name}</div>
                    </div>
                    {p.badge && <span style={{ background: badgeColor[p.badge], color: "#fff", fontSize: 9, fontWeight: 700, letterSpacing: 2, padding: "3px 8px", borderRadius: 3 }}>{p.badge}</span>}
                  </div>
                  <div style={{ color: "#666", fontSize: 11, marginBottom: 10 }}>{p.desc}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <div>
                      <span style={{ color: "#fff", fontWeight: 700, fontSize: 20 }}>₹{p.price.toLocaleString()}</span>
                      {p.originalPrice && <span style={{ color: "#555", fontSize: 13, textDecoration: "line-through", marginLeft: 8 }}>₹{p.originalPrice.toLocaleString()}</span>}
                    </div>
                    <span style={{ color: "#888", fontSize: 11 }}>⭐ {p.rating}</span>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={e => { e.stopPropagation(); addToCart(p); }} style={{ flex: 1, padding: "8px", background: "#fff", border: "none", borderRadius: 6, fontWeight: 700, fontSize: 11, letterSpacing: 2, cursor: "pointer" }}>ADD TO CART</button>
                    <button onClick={e => { e.stopPropagation(); toggleWishlist(p.id); }} style={{ width: 36, background: wishlist.includes(p.id) ? "#E24B4A" : "#1a1a1a", border: "1px solid #333", borderRadius: 6, cursor: "pointer", fontSize: 16 }}>♡</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}