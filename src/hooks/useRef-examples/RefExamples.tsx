import { useEffect, useRef, useState } from "react";

// ============================================================
// USE CASE 1: DOM Access
// useRef gives you a direct reference to a DOM element.
// After the component mounts, inputRef.current IS the <input> element.
// You can call any DOM method on it — .focus(), .blur(), .scrollIntoView() etc.
// ============================================================
function AutoFocusInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // This runs AFTER the component mounts — the DOM exists now
    // Without useRef you'd have no way to reach this input
    inputRef.current?.focus();
  }, []);

  return (
    <div>
      <h3>1. DOM Access — auto-focuses on mount</h3>
      <input
        ref={inputRef}
        placeholder="I auto-focus when the page loads"
        style={{ padding: 8, width: 300 }}
      />
    </div>
  );
}

// ============================================================
// USE CASE 2: Value without re-render
// useState triggers a re-render every time it changes.
// useRef does NOT trigger a re-render — it's just a plain mutable object.
// Use this when you need to track something but don't want the UI to update.
// ============================================================
function RenderCounter() {
  const [count, setCount] = useState(0);

  // renderCount.current is a plain number — changing it causes NO re-render
  const renderCount = useRef(0);

  // This runs on every render — but doesn't CAUSE a render
  renderCount.current += 1;

  return (
    <div>
      <h3>2. Value without re-render</h3>
      <p>Count (state): {count}</p>
      {/* renderCount.current shows the value AT TIME OF RENDER */}
      <p>Total renders so far: {renderCount.current}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment Count</button>
      <p style={{ fontSize: 12, color: "#666" }}>
        Every click = 1 re-render. Counter tracks them all without causing
        extras.
      </p>
    </div>
  );
}

// ============================================================
// USE CASE 3: Previous value
// On each render, useEffect runs AFTER the render completes.
// So we can save the current value into a ref AFTER render —
// which means on the NEXT render, the ref holds the PREVIOUS value.
// ============================================================
function PreviousValue() {
  const [name, setName] = useState("");
  const previousName = useRef("");

  useEffect(() => {
    // After render: current value becomes "previous" for next render
    previousName.current = name;
  }); // no dependency array — runs after EVERY render

  return (
    <div>
      <h3>3. Previous value tracker</h3>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type your name..."
        style={{ padding: 8, width: 300 }}
      />
      <p>Current: "{name}"</p>
      <p>Previous: "{previousName.current}"</p>
      <p style={{ fontSize: 12, color: "#666" }}>
        Notice: previous updates one step behind current.
      </p>
    </div>
  );
}

export default function RefExamples() {
  return (
    <div
      style={{ padding: 32, display: "flex", flexDirection: "column", gap: 48 }}
    >
      <h1>useRef — 3 Use Cases</h1>
      <AutoFocusInput />
      <hr />
      <RenderCounter />
      <hr />
      <PreviousValue />
    </div>
  );
}
