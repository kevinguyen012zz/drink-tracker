import { useState, useEffect, useRef } from "react";

const DRINK_CATEGORIES = [
  {
    name: "Shots", emoji: "🥃", color: "#FF6B6B",
    drinks: [
      { name: "Tequila Shot", emoji: "🥃", price: 7, oz: 1.5, abv: 40 },
      { name: "Vodka Shot", emoji: "🥃", price: 7, oz: 1.5, abv: 40 },
      { name: "Whiskey Shot", emoji: "🥃", price: 8, oz: 1.5, abv: 40 },
      { name: "Lemon Drop", emoji: "🍋", price: 9, oz: 1.5, abv: 30 },
      { name: "Fireball", emoji: "🔥", price: 6, oz: 1.5, abv: 33 },
      { name: "Jäger Bomb", emoji: "💣", price: 9, oz: 3, abv: 20 },
      { name: "Kamikaze", emoji: "💥", price: 8, oz: 1.5, abv: 30 },
      { name: "Body Shot", emoji: "😈", price: 10, oz: 1.5, abv: 40 },
      { name: "Rum Shot", emoji: "🏴‍☠️", price: 7, oz: 1.5, abv: 40 },
      { name: "Gin Shot", emoji: "🌿", price: 7, oz: 1.5, abv: 40 },
      { name: "Custom Shot", emoji: "🥃", price: 7, oz: 1.5, abv: 40 },
    ]
  },
  {
    name: "Beer", emoji: "🍺", color: "#FFE66D",
    drinks: [
      { name: "Domestic Beer", emoji: "🍺", price: 5, oz: 12, abv: 4.2 },
      { name: "Craft Beer", emoji: "🍺", price: 8, oz: 16, abv: 6.5 },
      { name: "IPA", emoji: "🍺", price: 8, oz: 16, abv: 7 },
      { name: "Lager", emoji: "🍺", price: 5, oz: 12, abv: 4.2 },
      { name: "Stout", emoji: "🖤", price: 7, oz: 16, abv: 5.5 },
      { name: "White Claw", emoji: "🫧", price: 5, oz: 12, abv: 5 },
      { name: "Truly", emoji: "🫧", price: 5, oz: 12, abv: 5 },
      { name: "Modelo", emoji: "🍺", price: 6, oz: 12, abv: 4.4 },
      { name: "Corona", emoji: "🌴", price: 6, oz: 12, abv: 4.6 },
      { name: "Heineken", emoji: "🍺", price: 6, oz: 12, abv: 5 },
      { name: "Bud Light", emoji: "🍺", price: 4, oz: 12, abv: 4.2 },
      { name: "Custom Beer", emoji: "🍺", price: 6, oz: 12, abv: 5 },
    ]
  },
  {
    name: "Cocktails", emoji: "🍹", color: "#4ECDC4",
    drinks: [
      { name: "Margarita", emoji: "🍹", price: 14, oz: 5, abv: 15 },
      { name: "Mojito", emoji: "🌿", price: 13, oz: 6, abv: 12 },
      { name: "Long Island", emoji: "🧊", price: 16, oz: 8, abv: 22 },
      { name: "Cosmopolitan", emoji: "🍸", price: 14, oz: 4, abv: 20 },
      { name: "Old Fashioned", emoji: "🥃", price: 15, oz: 4, abv: 32 },
      { name: "Espresso Martini", emoji: "☕", price: 16, oz: 4, abv: 18 },
      { name: "Aperol Spritz", emoji: "🍊", price: 13, oz: 6, abv: 8 },
      { name: "Paloma", emoji: "🌸", price: 13, oz: 5, abv: 12 },
      { name: "Rum & Coke", emoji: "🥤", price: 10, oz: 8, abv: 10 },
      { name: "Vodka Soda", emoji: "💧", price: 10, oz: 8, abv: 10 },
      { name: "G&T", emoji: "🌿", price: 11, oz: 8, abv: 10 },
      { name: "Piña Colada", emoji: "🍍", price: 14, oz: 6, abv: 13 },
      { name: "Whiskey Sour", emoji: "🍋", price: 13, oz: 5, abv: 15 },
      { name: "Custom Cocktail", emoji: "🍹", price: 14, oz: 5, abv: 15 },
    ]
  },
  {
    name: "Wine", emoji: "🍷", color: "#C77DFF",
    drinks: [
      { name: "Red Wine", emoji: "🍷", price: 10, oz: 5, abv: 13 },
      { name: "White Wine", emoji: "🥂", price: 10, oz: 5, abv: 12 },
      { name: "Rosé", emoji: "🌸", price: 11, oz: 5, abv: 12 },
      { name: "Prosecco", emoji: "🥂", price: 11, oz: 5, abv: 11 },
      { name: "Champagne", emoji: "🍾", price: 18, oz: 5, abv: 12 },
      { name: "Pinot Noir", emoji: "🍷", price: 12, oz: 5, abv: 13.5 },
      { name: "Cabernet", emoji: "🍷", price: 13, oz: 5, abv: 14.5 },
      { name: "Moscato", emoji: "🍬", price: 10, oz: 5, abv: 7 },
      { name: "Custom Wine", emoji: "🍷", price: 10, oz: 5, abv: 12 },
    ]
  },
  {
    name: "Spirits", emoji: "🫙", color: "#A8E6CF",
    drinks: [
      { name: "Bourbon Neat", emoji: "🥃", price: 14, oz: 2, abv: 45 },
      { name: "Scotch Neat", emoji: "🥃", price: 16, oz: 2, abv: 43 },
      { name: "Tequila Neat", emoji: "🌵", price: 12, oz: 2, abv: 40 },
      { name: "Vodka & Mixer", emoji: "🫙", price: 10, oz: 8, abv: 12 },
      { name: "Rum & Mixer", emoji: "🏴‍☠️", price: 10, oz: 8, abv: 12 },
      { name: "Gin & Mixer", emoji: "🌿", price: 11, oz: 8, abv: 12 },
      { name: "Custom Spirit", emoji: "🫙", price: 12, oz: 2, abv: 40 },
    ]
  },
  {
    name: "Other", emoji: "🫗", color: "#FF9A9E",
    drinks: [
      { name: "Hard Kombucha", emoji: "🍵", price: 7, oz: 12, abv: 4.5 },
      { name: "Hard Lemonade", emoji: "🍋", price: 6, oz: 12, abv: 5 },
      { name: "Cider", emoji: "🍎", price: 6, oz: 12, abv: 4.5 },
      { name: "Sake", emoji: "🍶", price: 8, oz: 6, abv: 15 },
      { name: "Mead", emoji: "🍯", price: 9, oz: 12, abv: 8 },
      { name: "Custom Drink", emoji: "🫗", price: 8, oz: 12, abv: 5 },
    ]
  },
];

const ALL_DRINKS = DRINK_CATEGORIES.flatMap(c => c.drinks.map(d => ({ ...d, catColor: c.color })));

export default function App() {
  const [activeTab, setActiveTab] = useState("Log");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [logs, setLogs] = useState(() => {
    try { return JSON.parse(localStorage.getItem("drinkLogs3") || "[]"); } catch { return []; }
  });
  const [form, setForm] = useState(null);
  const [toast, setToast] = useState(null);
  const [filterPeriod, setFilterPeriod] = useState("week");
  const [loading, setLoading] = useState(null);
  const [voiceText, setVoiceText] = useState("");
  const fileRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    try { localStorage.setItem("drinkLogs3", JSON.stringify(logs)); } catch {}
  }, [logs]);

  const showToast = (msg, color = "#4ECDC4") => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 2200);
  };

  const pickDrink = (drink, catColor) => {
    setForm({ name: drink.name, emoji: drink.emoji, price: String(drink.price), oz: String(drink.oz), abv: String(drink.abv), notes: "", catColor: catColor || drink.catColor });
  };

  const logDrink = () => {
    if (!form || !form.price) return;
    const entry = {
      id: Date.now(), name: form.name, emoji: form.emoji,
      price: parseFloat(form.price) || 0, oz: parseFloat(form.oz) || 0,
      abv: parseFloat(form.abv) || 0, notes: form.notes,
      catColor: form.catColor, photo: form.photo || null,
      timestamp: new Date().toISOString(),
    };
    setLogs(prev => [entry, ...prev]);
    showToast("✓ Drink logged!");
    setSelectedCategory(null); setForm(null);
  };

  const deleteDrink = (id) => setLogs(prev => prev.filter(l => l.id !== id));

  const handlePhoto = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const base64 = await new Promise((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(r.result);
        r.onerror = rej;
        r.readAsDataURL(file);
      });
      setForm({
        name: "Custom Drink", emoji: "📸",
        price: "10", oz: "12", abv: "5",
        notes: "", catColor: "#FF6B6B", photo: base64,
      });
      showToast("📷 Photo attached — fill in details", "#4ECDC4");
    } catch (err) {
      showToast("Photo error", "#FF6B6B");
    }
    if (fileRef.current) fileRef.current.value = "";
  };

  const startVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { showToast("Voice not supported on this browser", "#FF6B6B"); return; }
    const rec = new SR();
    rec.lang = "en-US";
    rec.interimResults = true;
    rec.continuous = false;
    setLoading("voice");
    setVoiceText("listening...");
    rec.onresult = (e) => {
      const text = Array.from(e.results).map(r => r[0].transcript).join("");
      setVoiceText(text);
      if (e.results[e.results.length - 1].isFinal) {
        matchVoice(text);
      }
    };
    rec.onerror = () => { setLoading(null); setVoiceText(""); showToast("Voice error", "#FF6B6B"); };
    rec.onend = () => { setLoading(null); };
    rec.start();
    recognitionRef.current = rec;
  };

  const matchVoice = (text) => {
    const lower = text.toLowerCase().trim();
    let best = null, bestScore = 0;
    for (const d of ALL_DRINKS) {
      const drinkLower = d.name.toLowerCase();
      let score = 0;
      if (drinkLower === lower) score = 100;
      else if (lower.includes(drinkLower) || drinkLower.includes(lower)) score = 80;
      else {
        const words = drinkLower.split(/\s+/);
        score = words.filter(w => lower.includes(w)).length * 20;
      }
      if (score > bestScore) { bestScore = score; best = d; }
    }
    if (best && bestScore >= 20) {
      pickDrink(best, best.catColor);
      showToast(`🎤 Got it: ${best.name}`, best.catColor);
    } else {
      pickDrink({ name: text || "Custom Drink", emoji: "🫗", price: 10, oz: 8, abv: 10 }, "#FF9A9E");
      showToast(`🎤 Custom: ${text}`, "#FF9A9E");
    }
    setVoiceText("");
  };

  const getFiltered = () => {
    const now = new Date();
    const cutoffs = {
      today: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
      week: new Date(now - 7 * 86400000),
      month: new Date(now.getFullYear(), now.getMonth(), 1),
      all: new Date(0),
    };
    return logs.filter(l => new Date(l.timestamp) >= cutoffs[filterPeriod]);
  };

  const filtered = getFiltered();
  const totalSpent = filtered.reduce((s, l) => s + l.price, 0);
  const totalDrinks = filtered.length;
  const totalOz = filtered.reduce((s, l) => s + l.oz, 0);
  const totalUnits = filtered.reduce((s, l) => s + (l.oz * l.abv / 100 * 0.789 / 14), 0);

  const weekdayStats = { weekday: { count: 0, spent: 0 }, weekend: { count: 0, spent: 0 } };
  logs.forEach(l => {
    const d = new Date(l.timestamp).getDay();
    const bucket = (d === 0 || d === 6) ? "weekend" : "weekday";
    weekdayStats[bucket].count++;
    weekdayStats[bucket].spent += l.price;
  });

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayBreakdown = [0, 0, 0, 0, 0, 0, 0];
  logs.forEach(l => {
    const d = new Date(l.timestamp).getDay();
    dayBreakdown[d]++;
  });
  const maxDay = Math.max(1, ...dayBreakdown);

  const oldestLog = logs.length ? new Date(logs[logs.length - 1].timestamp) : new Date();
  const weeksOfData = Math.max(1, (new Date() - oldestLog) / (7 * 86400000));
  const drinksPerWeek = logs.length / weeksOfData;
  const spendPerWeek = logs.reduce((s, l) => s + l.price, 0) / weeksOfData;
  const drinksPerMonth = drinksPerWeek * 4.33;
  const spendPerMonth = spendPerWeek * 4.33;

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const monthName = today.toLocaleString("en-US", { month: "long" });
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const calendarData = {};
  logs.forEach(l => {
    const d = new Date(l.timestamp);
    if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
      const day = d.getDate();
      calendarData[day] = calendarData[day] || [];
      calendarData[day].push(l.emoji);
    }
  });

  const byName = filtered.reduce((acc, l) => {
    acc[l.name] = acc[l.name] || { count: 0, spent: 0, emoji: l.emoji, color: l.catColor };
    acc[l.name].count++;
    acc[l.name].spent += l.price;
    return acc;
  }, {});

  const fmt = (d) => {
    const date = new Date(d);
    const diff = new Date() - date;
    if (diff < 60000) return "just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
  };

  const quickBtn = (color) => ({
    background: `linear-gradient(135deg, ${color}22, ${color}11)`,
    border: `1.5px solid ${color}44`,
    borderRadius: 18, padding: "16px 8px", cursor: "pointer",
    display: "flex", flexDirection: "column", alignItems: "center", gap: 4, color: "#fff",
  });

  const backBtn = {
    background: "rgba(255,255,255,0.1)", border: "none", color: "rgba(255,255,255,0.7)",
    padding: "8px 16px", borderRadius: 100, cursor: "pointer", fontSize: 13, fontWeight: 600, marginBottom: 16,
  };

  const fieldInput = (size, weight) => ({
    background: "none", border: "none", color: "#fff", fontSize: size, fontWeight: weight,
    width: "100%", outline: "none", fontFamily: "inherit",
  });

  const statBox = {
    background: "rgba(255,255,255,0.08)", borderRadius: 16, padding: "14px",
    border: "1px solid rgba(255,255,255,0.1)",
  };

  const statLabel = { fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 600, marginTop: 4, textTransform: "uppercase", letterSpacing: 1 };

  const FilterPills = () => (
    <div style={{ display: "flex", gap: 8, marginBottom: 20, overflowX: "auto", paddingBottom: 4 }}>
      {["today", "week", "month", "all"].map(p => (
        <button key={p} onClick={() => setFilterPeriod(p)} style={{
          padding: "8px 16px", borderRadius: 100, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700,
          background: filterPeriod === p ? "#FF6B6B" : "rgba(255,255,255,0.1)",
          color: "#fff", textTransform: "capitalize", transition: "all 0.2s", flexShrink: 0,
        }}>{p}</button>
      ))}
    </div>
  );

  const headerTitle = () => {
    if (activeTab !== "Log") return activeTab === "History" ? "Your History 📋" : "Your Stats 📊";
    if (form) return `${form.emoji} ${form.name}`;
    if (selectedCategory) return `${selectedCategory.emoji} ${selectedCategory.name}`;
    return "Log a Drink 🍻";
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0f0c29, #302b63, #24243e)",
      fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
      color: "#fff", maxWidth: 430, margin: "0 auto",
      position: "relative", paddingBottom: 100,
    }}>
      <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={handlePhoto} style={{ display: "none" }} />

      <div style={{ padding: "52px 24px 16px", background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 100%)" }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 3, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: 4 }}>Drink Tracker</div>
        <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.5 }}>{headerTitle()}</div>
      </div>

      <div style={{
        position: "fixed", top: 20, left: "50%", transform: `translateX(-50%) translateY(${toast ? 0 : -80}px)`,
        background: toast?.color || "#4ECDC4", color: "#fff", padding: "12px 22px", borderRadius: 100,
        fontWeight: 700, fontSize: 14, zIndex: 999, transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        boxShadow: `0 8px 32px ${(toast?.color || "#4ECDC4")}66`, whiteSpace: "nowrap", maxWidth: "90vw", overflow: "hidden", textOverflow: "ellipsis",
      }}>{toast?.msg}</div>

      {loading && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 998,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16,
        }}>
          <div style={{ fontSize: 64 }}>🎤</div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{voiceText || "Listening..."}</div>
        </div>
      )}

      {activeTab === "Log" && (
        <div style={{ padding: "0 20px" }}>
          {!selectedCategory && !form && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
                <button onClick={() => fileRef.current?.click()} style={quickBtn("#FF6B6B")}>
                  <span style={{ fontSize: 30 }}>📷</span>
                  <span style={{ fontSize: 12, fontWeight: 700 }}>Photo</span>
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>Attach pic</span>
                </button>
                <button onClick={startVoice} style={quickBtn("#4ECDC4")}>
                  <span style={{ fontSize: 30 }}>🎤</span>
                  <span style={{ fontSize: 12, fontWeight: 700 }}>Voice</span>
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>Speak it</span>
                </button>
                <button onClick={() => {}} style={quickBtn("#FFE66D")}>
                  <span style={{ fontSize: 30 }}>📋</span>
                  <span style={{ fontSize: 12, fontWeight: 700 }}>Browse</span>
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>Below ↓</span>
                </button>
              </div>

              {logs.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: 10 }}>Repeat Recent</div>
                  <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
                    {[...new Map(logs.slice(0, 10).map(l => [l.name, l])).values()].slice(0, 6).map(l => (
                      <button key={l.id} onClick={() => pickDrink(l, l.catColor)} style={{
                        background: `${l.catColor || "#FF6B6B"}22`, border: `1px solid ${l.catColor || "#FF6B6B"}44`,
                        borderRadius: 14, padding: "10px 14px", cursor: "pointer", flexShrink: 0,
                        display: "flex", alignItems: "center", gap: 8, color: "#fff",
                      }}>
                        <span style={{ fontSize: 20 }}>{l.emoji}</span>
                        <span style={{ fontSize: 13, fontWeight: 700 }}>{l.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: 10 }}>Categories</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {DRINK_CATEGORIES.map(cat => (
                  <button key={cat.name} onClick={() => setSelectedCategory(cat)} style={{
                    background: `linear-gradient(135deg, ${cat.color}22, ${cat.color}11)`,
                    border: `1.5px solid ${cat.color}44`,
                    borderRadius: 18, padding: "16px", cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 12, textAlign: "left", color: "#fff",
                  }}>
                    <span style={{ fontSize: 30 }}>{cat.emoji}</span>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 800 }}>{cat.name}</div>
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>{cat.drinks.length - 1} options</div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {selectedCategory && !form && (
            <>
              <button onClick={() => setSelectedCategory(null)} style={backBtn}>← Back</button>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {selectedCategory.drinks.map(drink => (
                  <button key={drink.name} onClick={() => pickDrink(drink, selectedCategory.color)} style={{
                    background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 16, padding: "14px 18px", cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 14, color: "#fff",
                  }}>
                    <span style={{ fontSize: 28 }}>{drink.emoji}</span>
                    <div style={{ flex: 1, textAlign: "left" }}>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{drink.name}</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{drink.oz}oz · {drink.abv}% ABV</div>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: 16, color: selectedCategory.color }}>${drink.price}</div>
                  </button>
                ))}
              </div>
            </>
          )}

          {form && (
            <>
              <button onClick={() => setForm(null)} style={backBtn}>← Back</button>

              <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 16, padding: "12px 18px", marginBottom: 14, border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Drink Name</div>
                <input type="text" value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  style={fieldInput(18, 700)} />
              </div>

              <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 20, overflow: "hidden", marginBottom: 14, border: "1px solid rgba(255,255,255,0.1)" }}>
                {[
                  { label: "💵 Price ($)", key: "price" },
                  { label: "🥃 Fluid oz", key: "oz" },
                  { label: "🍾 ABV %", key: "abv" },
                ].map((f, i) => (
                  <div key={f.key} style={{ padding: "12px 18px", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>{f.label}</div>
                    <input type="number" inputMode="decimal" value={form[f.key]}
                      onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                      style={fieldInput(22, 800)} />
                  </div>
                ))}
              </div>

              <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 16, padding: "14px 18px", marginBottom: 20, border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>📝 Notes (optional)</div>
                <input type="text" value={form.notes} placeholder="Where, with who..."
                  onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
                  style={fieldInput(15, 500)} />
              </div>

              <button onClick={logDrink} style={{
                width: "100%", padding: "18px", borderRadius: 20,
                background: `linear-gradient(135deg, ${form.catColor}, ${form.catColor}88)`,
                border: "none", color: "#fff", fontSize: 18, fontWeight: 800, cursor: "pointer",
                boxShadow: `0 8px 32px ${form.catColor}44`, letterSpacing: 0.5,
              }}>{form.emoji} Log {form.name}</button>
            </>
          )}
        </div>
      )}

      {activeTab === "History" && (
        <div style={{ padding: "0 20px" }}>
          <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 20, padding: "16px", marginBottom: 20, border: "1px solid rgba(255,255,255,0.1)" }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", marginBottom: 12 }}>📅 {monthName} {currentYear}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, maxHeight: 280, overflowY: "auto" }}>
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                const isToday = day === today.getDate();
                const drinks = calendarData[day] || [];
                return (
                  <div key={day} style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "4px 6px",
                    background: isToday ? "rgba(255,107,107,0.15)" : "transparent",
                    borderRadius: 8,
                  }}>
                    <div style={{ width: 24, fontSize: 13, fontWeight: 700, color: isToday ? "#FF6B6B" : "rgba(255,255,255,0.6)" }}>{day}</div>
                    <div style={{ fontSize: 16, flex: 1 }}>{drinks.join(" ")}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <FilterPills />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
            <div style={statBox}><div style={{ fontSize: 24, fontWeight: 800, color: "#FF6B6B" }}>${totalSpent.toFixed(2)}</div><div style={statLabel}>Total Spent</div></div>
            <div style={statBox}><div style={{ fontSize: 24, fontWeight: 800, color: "#4ECDC4" }}>{totalDrinks}</div><div style={statLabel}>Drinks</div></div>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 20px", color: "rgba(255,255,255,0.3)" }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>🫙</div>
              <div style={{ fontWeight: 600 }}>Nothing logged in this range</div>
            </div>
          ) : filtered.map(l => (
            <div key={l.id} style={{
              background: "rgba(255,255,255,0.07)", borderRadius: 16, padding: "14px",
              marginBottom: 8, border: `1px solid ${l.catColor || "rgba(255,255,255,0.1)"}33`,
              display: "flex", alignItems: "center", gap: 12,
            }}>
              {l.photo ? (
                <img src={l.photo} alt={l.name} style={{
                  width: 46, height: 46, borderRadius: 12, objectFit: "cover", flexShrink: 0,
                  border: `2px solid ${l.catColor || "#fff"}44`,
                }} />
              ) : (
                <div style={{
                  fontSize: 24, width: 46, height: 46, borderRadius: 12,
                  background: `${l.catColor || "#fff"}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>{l.emoji}</div>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{l.name}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>{l.oz}oz · {l.abv}%{l.notes ? ` · ${l.notes}` : ""}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>{fmt(l.timestamp)}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 800, fontSize: 16, color: l.catColor || "#FF6B6B" }}>${l.price.toFixed(2)}</div>
                <button onClick={() => deleteDrink(l.id)} style={{
                  background: "rgba(255,100,100,0.15)", border: "none", color: "rgba(255,100,100,0.7)",
                  fontSize: 10, padding: "2px 8px", borderRadius: 6, cursor: "pointer", marginTop: 2, fontWeight: 600,
                }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Stats" && (
        <div style={{ padding: "0 20px" }}>
          <FilterPills />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
            {[
              { label: "Spent", value: `$${totalSpent.toFixed(0)}`, color: "#FF6B6B", icon: "💸" },
              { label: "Drinks", value: totalDrinks, color: "#4ECDC4", icon: "🍺" },
              { label: "Fluid oz", value: totalOz.toFixed(0), color: "#FFE66D", icon: "💧" },
              { label: "Std Units", value: totalUnits.toFixed(1), color: "#A8E6CF", icon: "📊" },
            ].map(c => (
              <div key={c.label} style={{ background: "rgba(255,255,255,0.07)", borderRadius: 18, padding: "16px 14px", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>{c.icon}</div>
                <div style={{ fontSize: 24, fontWeight: 900, color: c.color, lineHeight: 1 }}>{c.value}</div>
                <div style={statLabel}>{c.label}</div>
              </div>
            ))}
          </div>

          {logs.length > 0 && (
            <div style={{ background: "linear-gradient(135deg, rgba(255,107,107,0.15), rgba(255,142,83,0.15))", borderRadius: 20, padding: "20px", marginBottom: 20, border: "1px solid rgba(255,107,107,0.3)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", marginBottom: 14 }}>📈 Your Averages</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>WEEKLY</div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: "#FFE66D" }}>{drinksPerWeek.toFixed(1)}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>drinks · ${spendPerWeek.toFixed(2)}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>MONTHLY</div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: "#FF8E53" }}>{drinksPerMonth.toFixed(1)}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>drinks · ${spendPerMonth.toFixed(2)}</div>
                </div>
              </div>
            </div>
          )}

          {logs.length > 0 && (
            <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 20, padding: "20px", marginBottom: 20, border: "1px solid rgba(255,255,255,0.1)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", marginBottom: 14 }}>🗓️ Weekday vs Weekend</div>
              {[
                { label: "Weekdays (Mon–Fri)", data: weekdayStats.weekday, color: "#4ECDC4" },
                { label: "Weekends (Sat–Sun)", data: weekdayStats.weekend, color: "#FF6B6B" },
              ].map(row => {
                const total = weekdayStats.weekday.count + weekdayStats.weekend.count;
                const pct = total > 0 ? (row.data.count / total) * 100 : 0;
                return (
                  <div key={row.label} style={{ marginBottom: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{row.label}</span>
                      <span style={{ fontSize: 13, fontWeight: 800, color: row.color }}>{row.data.count} · ${row.data.spent.toFixed(0)}</span>
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 100, height: 8 }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: row.color, borderRadius: 100, transition: "width 0.8s" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {logs.length > 0 && (
            <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 20, padding: "20px", marginBottom: 20, border: "1px solid rgba(255,255,255,0.1)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", marginBottom: 14 }}>By Day of Week</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 6, height: 120 }}>
                {dayNames.map((name, i) => {
                  const isWeekend = i === 0 || i === 6;
                  const height = (dayBreakdown[i] / maxDay) * 100;
                  return (
                    <div key={name} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, height: "100%" }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.5)" }}>{dayBreakdown[i] || ""}</div>
                      <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
                        <div style={{
                          width: "100%", height: `${height}%`, minHeight: dayBreakdown[i] ? 4 : 0,
                          background: isWeekend ? "linear-gradient(180deg, #FF6B6B, #FF8E53)" : "linear-gradient(180deg, #4ECDC4, #44A08D)",
                          borderRadius: 6, transition: "height 0.8s",
                        }} />
                      </div>
                      <div style={{ fontSize: 10, fontWeight: 600, color: isWeekend ? "#FF6B6B" : "rgba(255,255,255,0.6)" }}>{name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {Object.keys(byName).length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", marginBottom: 12 }}>Top Drinks ({filterPeriod})</div>
              {Object.entries(byName).sort((a, b) => b[1].count - a[1].count).slice(0, 6).map(([name, data]) => {
                const pct = totalDrinks > 0 ? (data.count / totalDrinks) * 100 : 0;
                return (
                  <div key={name} style={{ background: "rgba(255,255,255,0.07)", borderRadius: 14, padding: "12px 14px", marginBottom: 8, border: `1px solid ${data.color || "rgba(255,255,255,0.1)"}33` }}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
                      <span style={{ fontSize: 22, marginRight: 10 }}>{data.emoji}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>{name}</div>
                        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{data.count}x · ${data.spent.toFixed(2)}</div>
                      </div>
                      <div style={{ fontWeight: 800, fontSize: 14, color: data.color || "#FFE66D" }}>{pct.toFixed(0)}%</div>
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 100, height: 4 }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: data.color || "#FFE66D", borderRadius: 100 }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430,
        background: "rgba(15,12,41,0.95)", backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(255,255,255,0.1)", padding: "12px 0 28px",
        display: "flex", justifyContent: "space-around",
      }}>
        {[{ tab: "Log", icon: "➕" }, { tab: "History", icon: "📋" }, { tab: "Stats", icon: "📊" }].map(t => (
          <button key={t.tab} onClick={() => { setActiveTab(t.tab); setSelectedCategory(null); setForm(null); }} style={{
            background: "none", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "4px 28px",
          }}>
            <span style={{ fontSize: 24 }}>{t.icon}</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: activeTab === t.tab ? "#FF6B6B" : "rgba(255,255,255,0.35)", letterSpacing: 0.5 }}>{t.tab}</span>
            {activeTab === t.tab && <div style={{ width: 4, height: 4, borderRadius: 100, background: "#FF6B6B" }} />}
          </button>
        ))}
      </div>

      <style>{`
        input::placeholder { color: rgba(255,255,255,0.25); }
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}