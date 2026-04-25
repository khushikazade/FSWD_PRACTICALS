import { useState, useCallback } from "react";

const WINNING_LINES = [
  [0,1,2],[3,4,5],[6,7,8], // rows
  [0,3,6],[1,4,7],[2,5,8], // cols
  [0,4,8],[2,4,6],         // diags
];

function calcWinner(squares) {
  for (const [a,b,c] of WINNING_LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      return { winner: squares[a], line: [a,b,c] };
  }
  return null;
}

const COLORS = {
  X: { bg: "#6366f1", light: "#e0e7ff", text: "#4338ca" },
  O: { bg: "#f43f5e", light: "#ffe4e6", text: "#be123c" },
};

function Square({ value, onClick, highlight, idx }) {
  const color = value ? COLORS[value] : null;
  return (
    <button
      onClick={onClick}
      style={{
        width: 96, height: 96,
        fontSize: 40, fontWeight: 800,
        border: "none", borderRadius: 16,
        cursor: value ? "default" : "pointer",
        background: highlight
          ? (color?.bg || "#6366f1")
          : value ? color.light : "#f1f5f9",
        color: highlight ? "#fff" : color?.text || "#94a3b8",
        boxShadow: highlight
          ? `0 0 0 3px ${color?.bg}, 0 4px 16px ${color?.bg}66`
          : "0 2px 8px #0001",
        transform: highlight ? "scale(1.08)" : "scale(1)",
        transition: "all 0.2s ease",
      }}
    >
      {value}
    </button>
  );
}

function ScoreBoard({ scores, current }) {
  return (
    <div style={{ display:"flex", gap:16, justifyContent:"center", marginBottom:20 }}>
      {["X","O"].map(p => (
        <div key={p} style={{
          flex:1, maxWidth:140, padding:"12px 0",
          borderRadius:14, textAlign:"center",
          background: current===p ? COLORS[p].bg : "#f1f5f9",
          color: current===p ? "#fff" : "#64748b",
          boxShadow: current===p ? `0 4px 20px ${COLORS[p].bg}66` : "none",
          transition:"all 0.3s",
        }}>
          <div style={{ fontSize:13, fontWeight:600, letterSpacing:1, opacity:.8 }}>
            PLAYER {p}
          </div>
          <div style={{ fontSize:36, fontWeight:900, lineHeight:1.1 }}>{scores[p]}</div>
          {current===p && <div style={{ fontSize:11, opacity:.8, marginTop:2 }}>YOUR TURN</div>}
        </div>
      ))}
    </div>
  );
}

export default function TicTacToe() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ X:0, O:0 });
  const [history, setHistory] = useState([]);

  const result = calcWinner(squares);
  const isDraw = !result && squares.every(Boolean);
  const current = xIsNext ? "X" : "O";

  const handleClick = useCallback((i) => {
    if (squares[i] || result) return;
    const next = squares.slice();
    next[i] = current;
    setSquares(next);

    const newResult = calcWinner(next);
    if (newResult) {
      setScores(s => ({ ...s, [newResult.winner]: s[newResult.winner] + 1 }));
      setHistory(h => [...h, `Player ${newResult.winner} won`]);
    } else if (next.every(Boolean)) {
      setHistory(h => [...h, "Draw!"]);
    }
    setXIsNext(x => !x);
  }, [squares, result, current]);

  const reset = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const fullReset = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setScores({ X:0, O:0 });
    setHistory([]);
  };

  const winLine = result?.line || [];

  let statusText, statusBg, statusColor;
  if (result) {
    statusBg = COLORS[result.winner].bg;
    statusColor = "#fff";
    statusText = `🎉 Player ${result.winner} Wins!`;
  } else if (isDraw) {
    statusBg = "#64748b"; statusColor = "#fff"; statusText = "🤝 It's a Draw!";
  } else {
    statusBg = COLORS[current].light;
    statusColor = COLORS[current].text;
    statusText = `Player ${current}'s Turn`;
  }

  return (
    <div style={{
      minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
      background:"linear-gradient(135deg,#e0e7ff 0%,#fce7f3 100%)",
      fontFamily:"'Segoe UI',sans-serif",
    }}>
      <div style={{
        background:"#fff", borderRadius:28, padding:"32px 28px",
        boxShadow:"0 8px 48px #6366f122", width:"100%", maxWidth:380,
      }}>
        <h1 style={{ textAlign:"center", margin:"0 0 4px", fontSize:26, fontWeight:900, color:"#1e293b" }}>
          Tic Tac Toe
        </h1>
        <p style={{ textAlign:"center", margin:"0 0 20px", color:"#94a3b8", fontSize:13 }}>
          Two Player Mode
        </p>

        <ScoreBoard scores={scores} current={result || isDraw ? null : current} />

        {/* Status */}
        <div style={{
          textAlign:"center", padding:"10px 16px", borderRadius:12, marginBottom:20,
          background: statusBg, color: statusColor,
          fontWeight:700, fontSize:16, transition:"all 0.3s",
        }}>
          {statusText}
        </div>

        {/* Board */}
        <div style={{
          display:"grid", gridTemplateColumns:"repeat(3,1fr)",
          gap:10, marginBottom:20,
        }}>
          {squares.map((val, i) => (
            <Square
              key={i} idx={i} value={val}
              highlight={winLine.includes(i)}
              onClick={() => handleClick(i)}
            />
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display:"flex", gap:10 }}>
          <button onClick={reset} style={{
            flex:1, padding:"12px 0", borderRadius:12, border:"none",
            background:"#6366f1", color:"#fff", fontWeight:700, fontSize:15,
            cursor:"pointer", boxShadow:"0 4px 12px #6366f144",
          }}>
            Next Round
          </button>
          <button onClick={fullReset} style={{
            flex:1, padding:"12px 0", borderRadius:12, border:"2px solid #e2e8f0",
            background:"#fff", color:"#64748b", fontWeight:700, fontSize:15,
            cursor:"pointer",
          }}>
            Reset All
          </button>
        </div>

        {/* History */}
        {history.length > 0 && (
          <div style={{ marginTop:20 }}>
            <div style={{ fontSize:12, fontWeight:700, color:"#94a3b8", letterSpacing:1, marginBottom:6 }}>
              GAME HISTORY
            </div>
            <div style={{ maxHeight:88, overflowY:"auto", display:"flex", flexDirection:"column", gap:4 }}>
              {[...history].reverse().map((h, i) => (
                <div key={i} style={{
                  fontSize:13, padding:"5px 10px", borderRadius:8,
                  background:"#f8fafc", color:"#475569",
                }}>
                  {history.length - i}. {h}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}