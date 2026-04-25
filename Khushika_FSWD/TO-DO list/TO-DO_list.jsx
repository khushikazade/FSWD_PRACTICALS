import { useState, useMemo } from "react";

const LISTS = [
  { id: "study",     label: "Study",     emoji: "📚", color: "#7F77DD", light: "#EEEDFE" },
  { id: "sports",    label: "Sports",    emoji: "⚽", color: "#1D9E75", light: "#E1F5EE" },
  { id: "gym",       label: "Gym",       emoji: "🏋️", color: "#D85A30", light: "#FAECE7" },
  { id: "dinner",    label: "Dinner",    emoji: "🍽️", color: "#D4537E", light: "#FBEAF0" },
  { id: "breakfast", label: "Breakfast", emoji: "🥞", color: "#BA7517", light: "#FAEEDA" },
  { id: "lunch",     label: "Lunch",     emoji: "🥗", color: "#639922", light: "#EAF3DE" },
  { id: "work",      label: "Work",      emoji: "💼", color: "#378ADD", light: "#E6F1FB" },
  { id: "shopping",  label: "Shopping",  emoji: "🛍️", color: "#A32D2D", light: "#FCEBEB" },
  { id: "health",    label: "Health",    emoji: "💊", color: "#0F6E56", light: "#E1F5EE" },
  { id: "personal",  label: "Personal",  emoji: "✨", color: "#534AB7", light: "#EEEDFE" },
];

const SEED = {
  study:     ["Read Chapter 5 — Algorithms", "Complete math assignment", "Watch lecture on React hooks", "Revise for Friday's test"],
  sports:    ["Morning run — 5km", "Soccer practice at 6pm", "Watch match highlights", "Stretch & cool down"],
  gym:       ["Bench press 3×10", "Leg day: squats & lunges", "Core workout 20 mins", "Protein shake after session"],
  dinner:    ["Cook pasta carbonara", "Buy wine for tonight", "Set the table by 7pm", "Try new dessert recipe"],
  breakfast: ["Prep overnight oats", "Buy fresh fruit", "Make green smoothie", "Don't skip — eat by 8am"],
  lunch:     ["Pack salad for work", "Try new café nearby", "Meal prep for the week", "Eat away from the desk"],
  work:      ["Reply to client emails", "Finish Q2 report draft", "Team standup at 10am", "Review pull requests"],
  shopping:  ["Groceries: milk, eggs, bread", "New running shoes", "Birthday gift for mom", "Return Amazon package"],
  health:    ["Take vitamins", "Doctor appointment Fri", "Drink 8 glasses of water", "Sleep by 10:30pm"],
  personal:  ["Journaling — 10 mins", "Call an old friend", "Read for pleasure", "Plan weekend trip"],
};

let nid = 100;
const initTasks = () => {
  const t = {};
  LISTS.forEach(l => {
    t[l.id] = SEED[l.id].map((text, i) => ({ id: nid++, text, done: i === 0 }));
  });
  return t;
};

export default function App() {
  const [tasks, setTasks] = useState(initTasks);
  const [active, setActive] = useState("study");
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const list = LISTS.find(l => l.id === active);
  const cur = tasks[active] || [];
  const done = cur.filter(t => t.done).length;
  const pct = cur.length ? Math.round((done / cur.length) * 100) : 0;

  const add = () => {
    const v = input.trim();
    if (!v) return;
    setTasks(t => ({ ...t, [active]: [...t[active], { id: nid++, text: v, done: false }] }));
    setInput("");
  };
  const toggle = id => setTasks(t => ({ ...t, [active]: t[active].map(x => x.id === id ? { ...x, done: !x.done } : x) }));
  const del = id => setTasks(t => ({ ...t, [active]: t[active].filter(x => x.id !== id) }));
  const saveEdit = id => {
    const v = editText.trim();
    if (v) setTasks(t => ({ ...t, [active]: t[active].map(x => x.id === id ? { ...x, text: v } : x) }));
    setEditId(null);
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#0f0f13", color: "#f0f0f0", overflow: "hidden" }}>
      {/* Sidebar */}
      <div style={{ width: 210, background: "#17171f", borderRight: "1px solid #ffffff12", display: "flex", flexDirection: "column", padding: "20px 0", overflowY: "auto", flexShrink: 0 }}>
        <div style={{ padding: "0 18px 20px", borderBottom: "1px solid #ffffff10" }}>
          <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.3px", color: "#f0f0f0" }}>My Lists</div>
          <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{LISTS.length} categories</div>
        </div>
        <div style={{ padding: "12px 10px", flex: 1 }}>
          {LISTS.map(l => {
            const lt = tasks[l.id] || [];
            const ldone = lt.filter(x => x.done).length;
            const isActive = active === l.id;
            return (
              <div key={l.id} onClick={() => setActive(l.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "9px 10px",
                  borderRadius: 10, cursor: "pointer", marginBottom: 2,
                  background: isActive ? l.color + "22" : "transparent",
                  border: isActive ? `1px solid ${l.color}44` : "1px solid transparent",
                  transition: "all 0.15s"
                }}>
                <span style={{ fontSize: 16, width: 22, textAlign: "center" }}>{l.emoji}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: isActive ? 600 : 400, color: isActive ? "#f0f0f0" : "#bbb", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{l.label}</div>
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, color: isActive ? l.color : "#555", background: isActive ? l.color + "22" : "#ffffff0a", borderRadius: 6, padding: "1px 6px", minWidth: 22, textAlign: "center" }}>
                  {lt.length - ldone}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Header */}
        <div style={{ padding: "24px 28px 20px", borderBottom: "1px solid #ffffff10", background: "#17171f" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
            <div style={{ width: 46, height: 46, borderRadius: 14, background: list.color + "25", border: `1.5px solid ${list.color}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{list.emoji}</div>
            <div>
              <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: "-0.5px", color: "#f0f0f0" }}>{list.label}</h1>
              <div style={{ fontSize: 12, color: "#777", marginTop: 1 }}>{done} of {cur.length} completed</div>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ flex: 1, height: 5, background: "#ffffff0f", borderRadius: 99, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: list.color, borderRadius: 99, transition: "width 0.4s ease" }} />
            </div>
            <span style={{ fontSize: 12, fontWeight: 600, color: list.color, minWidth: 36, textAlign: "right" }}>{pct}%</span>
          </div>
        </div>

        {/* Input */}
        <div style={{ padding: "16px 28px", borderBottom: "1px solid #ffffff0a", background: "#13131a" }}>
          <div style={{ display: "flex", gap: 10 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && add()}
              placeholder={`Add to ${list.label}...`}
              style={{
                flex: 1, background: "#ffffff0a", border: "1px solid #ffffff14",
                borderRadius: 10, padding: "10px 14px", color: "#f0f0f0",
                fontSize: 14, outline: "none", fontFamily: "inherit",
                transition: "border 0.2s"
              }}
              onFocus={e => e.target.style.borderColor = list.color + "88"}
              onBlur={e => e.target.style.borderColor = "#ffffff14"}
            />
            <button onClick={add} style={{
              background: list.color, border: "none", borderRadius: 10,
              padding: "10px 20px", color: "#fff", fontWeight: 700, fontSize: 18,
              cursor: "pointer", opacity: 1, transition: "opacity 0.15s, transform 0.1s"
            }}
              onMouseEnter={e => e.target.style.opacity = 0.85}
              onMouseLeave={e => e.target.style.opacity = 1}
              onMouseDown={e => e.target.style.transform = "scale(0.95)"}
              onMouseUp={e => e.target.style.transform = "scale(1)"}
            >+</button>
          </div>
        </div>

        {/* Task list */}
        <div style={{ flex: 1, overflowY: "auto", padding: "12px 28px" }}>
          {cur.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#555" }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{list.emoji}</div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>No tasks yet — add one above!</div>
            </div>
          )}

          {/* Active tasks */}
          {cur.filter(t => !t.done).map(task => (
            <TaskRow key={task.id} task={task} color={list.color} editId={editId} editText={editText}
              setEditId={setEditId} setEditText={setEditText}
              onToggle={() => toggle(task.id)} onDelete={() => del(task.id)} onSave={() => saveEdit(task.id)} onEditChange={setEditText} />
          ))}

          {/* Completed */}
          {cur.filter(t => t.done).length > 0 && (
            <>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#555", letterSpacing: "0.08em", textTransform: "uppercase", margin: "20px 0 8px", display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ flex: 1, height: 1, background: "#ffffff0a" }} />
                Completed ({cur.filter(t => t.done).length})
                <div style={{ flex: 1, height: 1, background: "#ffffff0a" }} />
              </div>
              {cur.filter(t => t.done).map(task => (
                <TaskRow key={task.id} task={task} color={list.color} editId={editId} editText={editText}
                  setEditId={setEditId} setEditText={setEditText}
                  onToggle={() => toggle(task.id)} onDelete={() => del(task.id)} onSave={() => saveEdit(task.id)} onEditChange={setEditText} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function TaskRow({ task, color, editId, editText, setEditId, setEditText, onToggle, onDelete, onSave, onEditChange }) {
  const isEditing = editId === task.id;
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "12px 14px", borderRadius: 12, marginBottom: 6,
      background: task.done ? "#ffffff03" : "#ffffff07",
      border: `1px solid ${task.done ? "#ffffff08" : "#ffffff0f"}`,
      transition: "all 0.15s"
    }}
      onMouseEnter={e => !task.done && (e.currentTarget.style.borderColor = color + "44")}
      onMouseLeave={e => e.currentTarget.style.borderColor = task.done ? "#ffffff08" : "#ffffff0f"}
    >
      {/* Checkbox */}
      <div onClick={onToggle} style={{
        width: 20, height: 20, borderRadius: 6, flexShrink: 0,
        background: task.done ? color : "transparent",
        border: task.done ? "none" : `2px solid #ffffff22`,
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", transition: "all 0.2s"
      }}>
        {task.done && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {isEditing ? (
          <input autoFocus value={editText} onChange={e => onEditChange(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") onSave(); if (e.key === "Escape") setEditId(null); }}
            onBlur={onSave}
            style={{
              width: "100%", background: "#ffffff0f", border: `1px solid ${color}66`,
              borderRadius: 6, padding: "3px 8px", color: "#f0f0f0",
              fontSize: 14, outline: "none", fontFamily: "inherit", boxSizing: "border-box"
            }} />
        ) : (
          <span style={{ fontSize: 14, color: task.done ? "#555" : "#ddd", textDecoration: task.done ? "line-through" : "none", transition: "all 0.2s" }}>
            {task.text}
          </span>
        )}
      </div>

      {/* Actions */}
      {!isEditing && (
        <div style={{ display: "flex", gap: 2, opacity: 0.4, transition: "opacity 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.opacity = 1}
          onMouseLeave={e => e.currentTarget.style.opacity = 0.4}
        >
          <ActionBtn onClick={() => { setEditId(task.id); setEditText(task.text); }} title="Edit">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </ActionBtn>
          <ActionBtn onClick={onDelete} title="Delete" danger>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
          </ActionBtn>
        </div>
      )}
    </div>
  );
}

function ActionBtn({ onClick, children, danger }) {
  return (
    <button onClick={onClick} style={{
      background: "none", border: "none", cursor: "pointer",
      color: danger ? "#e24b4a" : "#aaa", padding: "5px 6px",
      borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
      transition: "background 0.15s, color 0.15s"
    }}
      onMouseEnter={e => { e.currentTarget.style.background = danger ? "#e24b4a22" : "#ffffff14"; e.currentTarget.style.color = danger ? "#e24b4a" : "#f0f0f0"; }}
      onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = danger ? "#e24b4a" : "#aaa"; }}
    >{children}</button>
  );
}