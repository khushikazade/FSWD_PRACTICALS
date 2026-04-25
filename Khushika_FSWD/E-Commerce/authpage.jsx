// ─── src/pages/AuthPage.jsx ───────────────────────────────────────────────────
import { useState } from "react";
import { Toast } from "../components/Toast";

export function AuthPage({ setPage, setUser, showToast, toast }) {
  const [authMode, setAuthMode] = useState("login");
  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "" });
  const [authError, setAuthError] = useState("");

  const handleAuth = () => {
    if (!authForm.email || !authForm.password) { setAuthError("Please fill all fields"); return; }
    if (authMode === "signup" && !authForm.name) { setAuthError("Name required"); return; }
    setUser({ name: authMode === "signup" ? authForm.name : authForm.email.split("@")[0], email: authForm.email });
    setPage("home");
    showToast(`Welcome${authMode === "signup" ? ", " + authForm.name : " back"}!`);
    setAuthError("");
  };

  const inp = { width: "100%", padding: "10px 14px", borderRadius: 6, border: "1px solid #333", background: "#111", color: "#fff", fontSize: 14, boxSizing: "border-box", marginBottom: 12 };

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {toast && <Toast toast={toast} />}
      <div style={{ background: "#111", border: "1px solid #222", borderRadius: 16, padding: "2.5rem", width: 360 }}>
        <div style={{ color: "#fff", fontWeight: 800, fontSize: 18, letterSpacing: 3, textAlign: "center", marginBottom: "2rem" }}>SHOJAAL'S MART</div>
        <div style={{ display: "flex", marginBottom: "1.5rem", background: "#0a0a0a", borderRadius: 8, padding: 4 }}>
          {["login", "signup"].map(m => (
            <button key={m} onClick={() => { setAuthMode(m); setAuthError(""); }}
              style={{ flex: 1, padding: 8, borderRadius: 6, border: "none", background: authMode === m ? "#fff" : "none", color: authMode === m ? "#000" : "#666", fontWeight: 600, fontSize: 12, cursor: "pointer", letterSpacing: 1, textTransform: "uppercase" }}>
              {m}
            </button>
          ))}
        </div>
        {authMode === "signup" && <input style={inp} placeholder="Full name" value={authForm.name} onChange={e => setAuthForm({ ...authForm, name: e.target.value })} />}
        <input style={inp} placeholder="Email address" value={authForm.email} onChange={e => setAuthForm({ ...authForm, email: e.target.value })} />
        <input style={inp} placeholder="Password" type="password" value={authForm.password} onChange={e => setAuthForm({ ...authForm, password: e.target.value })} />
        {authError && <div style={{ color: "#E24B4A", fontSize: 12, marginBottom: 12 }}>{authError}</div>}
        <button onClick={handleAuth} style={{ background: "#fff", color: "#000", border: "none", padding: 12, width: "100%", borderRadius: 6, fontWeight: 600, fontSize: 12, letterSpacing: 3, cursor: "pointer" }}>
          {authMode === "login" ? "SIGN IN" : "CREATE ACCOUNT"}
        </button>
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <span style={{ color: "#555", fontSize: 12, cursor: "pointer" }} onClick={() => setPage("home")}>← Back to store</span>
        </div>
      </div>
    </div>
  );
}

// ─── src/pages/CartPage.jsx ───────────────────────────────────────────────────
import { Navbar } from "../components/Navbar";
import { Toast } from "../components/Toast";

export function CartPage({ cart, cartCount, cartTotal, removeFromCart, updateQty, user, setPage, toast }) {
  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "#fff" }}>
      {toast && <Toast toast={toast} />}
      <Navbar user={user} cartCount={cartCount} setPage={setPage} search="" setSearch={() => {}} />
      <div style={{ padding: "3rem 2rem", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ color: "#fff", fontWeight: 700, fontSize: 22, letterSpacing: 3, marginBottom: "2rem" }}>
          YOUR CART <span style={{ color: "#555", fontSize: 14 }}>({cartCount} items)</span>
        </div>
        {cart.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "#444" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🛒</div>
            <div style={{ fontSize: 16, marginBottom: 24 }}>Your cart is empty</div>
            <button onClick={() => setPage("home")} style={{ background: "#fff", color: "#000", border: "none", padding: "10px 22px", borderRadius: 6, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>SHOP NOW</button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 32 }}>
            <div>
              {cart.map(i => (
                <div key={i.id} style={{ display: "flex", gap: 16, padding: "16px 0", borderBottom: "1px solid #1a1a1a", alignItems: "center" }}>
                  <div style={{ width: 80, height: 80, background: "#181818", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>{i.img}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: "#fff", fontWeight: 600, fontSize: 15 }}>{i.name}</div>
                    <div style={{ color: "#555", fontSize: 12, marginBottom: 8 }}>{i.desc}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <button onClick={() => updateQty(i.id, -1)} style={{ width: 28, height: 28, borderRadius: 4, border: "1px solid #333", background: "none", color: "#fff", cursor: "pointer", fontSize: 16 }}>−</button>
                      <span style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>{i.qty}</span>
                      <button onClick={() => updateQty(i.id, 1)} style={{ width: 28, height: 28, borderRadius: 4, border: "1px solid #333", background: "none", color: "#fff", cursor: "pointer", fontSize: 16 }}>+</button>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: "#fff", fontWeight: 700, fontSize: 18 }}>₹{(i.price * i.qty).toLocaleString()}</div>
                    <div style={{ color: "#555", fontSize: 11, marginTop: 2 }}>₹{i.price.toLocaleString()} each</div>
                    <button onClick={() => removeFromCart(i.id)} style={{ marginTop: 8, background: "none", border: "none", color: "#E24B4A", fontSize: 11, cursor: "pointer", letterSpacing: 1 }}>REMOVE</button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: "#111", border: "1px solid #222", borderRadius: 12, padding: "1.5rem", height: "fit-content" }}>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, letterSpacing: 2, marginBottom: "1.5rem" }}>ORDER TOTAL</div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#666", fontSize: 13, marginBottom: 8 }}><span>Subtotal ({cartCount})</span><span>₹{cartTotal.toLocaleString()}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#666", fontSize: 13, marginBottom: 8 }}><span>Shipping</span><span style={{ color: "#1D9E75" }}>FREE</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#666", fontSize: 13, marginBottom: 16 }}><span>GST (18%)</span><span>₹{Math.round(cartTotal * 0.18).toLocaleString()}</span></div>
              <div style={{ height: 1, background: "#222", marginBottom: 16 }} />
              <div style={{ display: "flex", justifyContent: "space-between", color: "#fff", fontWeight: 700, fontSize: 20, marginBottom: 20 }}><span>Total</span><span>₹{Math.round(cartTotal * 1.18).toLocaleString()}</span></div>
              <button onClick={() => { if (!user) { setPage("auth"); return; } setPage("checkout"); }} style={{ background: "#fff", color: "#000", border: "none", padding: 14, width: "100%", borderRadius: 6, fontWeight: 600, fontSize: 12, letterSpacing: 3, cursor: "pointer" }}>CHECKOUT →</button>
              <button onClick={() => setPage("home")} style={{ background: "#222", color: "#fff", border: "none", padding: 10, width: "100%", borderRadius: 6, fontWeight: 600, fontSize: 11, letterSpacing: 1, cursor: "pointer", marginTop: 10 }}>CONTINUE SHOPPING</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── src/pages/CheckoutPage.jsx ───────────────────────────────────────────────
import { useState } from "react";
import { Toast } from "../components/Toast";

export function CheckoutPage({ cart, cartTotal, setCart, setPage, showToast, toast, orderDone, setOrderDone }) {
  const [payForm, setPayForm] = useState({ card: "", expiry: "", cvv: "", name: "" });
  const [payStep, setPayStep] = useState(1);

  const handlePay = () => {
    if (payStep === 1 && (!payForm.card || !payForm.expiry || !payForm.cvv || !payForm.name)) {
      showToast("Fill all payment fields", "error"); return;
    }
    setOrderDone(true);
    setCart([]);
    setPayStep(1);
  };

  const inp = { width: "100%", padding: "10px 14px", borderRadius: 6, border: "1px solid #333", background: "#111", color: "#fff", fontSize: 14, boxSizing: "border-box", marginBottom: 12 };

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "#fff" }}>
      {toast && <Toast toast={toast} />}
      <nav style={{ background: "#0a0a0a", padding: "0 2rem", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #222" }}>
        <span style={{ color: "#fff", fontWeight: 700, fontSize: 18, letterSpacing: 3 }}>SHOJAAL'S MART</span>
        <span style={{ color: "#555", fontSize: 13, letterSpacing: 2 }}>SECURE CHECKOUT</span>
      </nav>
      <div style={{ padding: "3rem 2rem", maxWidth: 760, margin: "0 auto" }}>
        {orderDone ? (
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <div style={{ fontSize: 64, marginBottom: 24 }}>✅</div>
            <div style={{ color: "#fff", fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Order Confirmed!</div>
            <div style={{ color: "#666", marginBottom: 32 }}>Your order will arrive in 3–5 business days.</div>
            <button onClick={() => { setOrderDone(false); setPage("home"); }} style={{ background: "#fff", color: "#000", border: "none", padding: "10px 22px", borderRadius: 6, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>CONTINUE SHOPPING</button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 16, letterSpacing: 2, marginBottom: "1.5rem" }}>ORDER SUMMARY</div>
              {cart.map(i => (
                <div key={i.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #1a1a1a" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span style={{ fontSize: 24 }}>{i.img}</span>
                    <div>
                      <div style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>{i.name}</div>
                      <div style={{ color: "#555", fontSize: 11 }}>Qty: {i.qty}</div>
                    </div>
                  </div>
                  <div style={{ color: "#fff", fontWeight: 600 }}>₹{(i.price * i.qty).toLocaleString()}</div>
                </div>
              ))}
              <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #333" }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#666", fontSize: 13, marginBottom: 6 }}><span>Subtotal</span><span>₹{cartTotal.toLocaleString()}</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#666", fontSize: 13, marginBottom: 6 }}><span>Shipping</span><span style={{ color: "#1D9E75" }}>FREE</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#fff", fontWeight: 700, fontSize: 18, marginTop: 12 }}><span>Total</span><span>₹{cartTotal.toLocaleString()}</span></div>
              </div>
            </div>
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 16, letterSpacing: 2, marginBottom: "1.5rem" }}>PAYMENT</div>
              <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                {["💳 Card", "📱 UPI", "🏦 Net Banking"].map((m, i) => (
                  <button key={i} onClick={() => setPayStep(i + 1)} style={{ flex: 1, padding: "8px 4px", fontSize: 11, border: `1px solid ${payStep === i + 1 ? "#fff" : "#333"}`, background: payStep === i + 1 ? "#fff" : "none", color: payStep === i + 1 ? "#000" : "#888", borderRadius: 6, cursor: "pointer", fontWeight: 600 }}>{m}</button>
                ))}
              </div>
              {payStep === 1 && <>
                <input style={inp} placeholder="Cardholder name" value={payForm.name} onChange={e => setPayForm({ ...payForm, name: e.target.value })} />
                <input style={inp} placeholder="1234 5678 9012 3456" value={payForm.card} onChange={e => setPayForm({ ...payForm, card: e.target.value })} maxLength={19} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <input style={{ ...inp, marginBottom: 0 }} placeholder="MM/YY" value={payForm.expiry} onChange={e => setPayForm({ ...payForm, expiry: e.target.value })} maxLength={5} />
                  <input style={{ ...inp, marginBottom: 0 }} placeholder="CVV" type="password" value={payForm.cvv} onChange={e => setPayForm({ ...payForm, cvv: e.target.value })} maxLength={3} />
                </div>
              </>}
              {payStep === 2 && <input style={inp} placeholder="Enter UPI ID (e.g. name@upi)" />}
              {payStep === 3 && <select style={inp}><option style={{ background: "#111" }}>Select your bank</option><option style={{ background: "#111" }}>HDFC Bank</option><option style={{ background: "#111" }}>ICICI Bank</option><option style={{ background: "#111" }}>SBI</option></select>}
              <button onClick={handlePay} style={{ background: "#fff", color: "#000", border: "none", padding: 14, width: "100%", borderRadius: 6, fontWeight: 600, fontSize: 12, letterSpacing: 3, cursor: "pointer", marginTop: 16 }}>PAY ₹{cartTotal.toLocaleString()}</button>
              <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 12, color: "#444", fontSize: 11 }}>🔒 256-bit SSL encrypted · PCI DSS compliant</div>
              <button onClick={() => setPage("cart")} style={{ background: "#222", color: "#fff", border: "none", padding: 10, width: "100%", borderRadius: 6, fontWeight: 600, fontSize: 11, letterSpacing: 1, cursor: "pointer", marginTop: 8 }}>← BACK TO CART</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}