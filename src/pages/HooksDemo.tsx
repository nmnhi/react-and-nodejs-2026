import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useFetch } from "../hooks/useFetch";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useToggle } from "../hooks/useToggle";

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function HooksDemo() {
  const [search, setSearch] = useState("");

  // useDebounce: search only updates after 400ms of no typing
  // Without this: useFetch would re-run on every single keystroke
  const debouncedSearch = useDebounce(search, 400);

  // useFetch: fetches posts, typed as Post[]
  // data is Post[] | null — TypeScript knows this from the generic
  const {
    data: posts,
    loading,
    error,
    refetch
  } = useFetch<Post[]>("https://jsonplaceholder.typicode.com/posts?_limit=20");

  // useLocalStorage: theme persists across page refreshes
  // Try: select dark, refresh the page — it remembers
  const [theme, setTheme] = useLocalStorage<"light" | "dark">(
    "demo-theme",
    "light"
  );

  // useToggle: controls the info panel — no useState needed
  const [showInfo, toggleInfo, , hideInfo] = useToggle(false);
  //                            ^ setTrue skipped with empty comma — we don't need it here

  // Filter posts client-side using the DEBOUNCED value
  // This only recalculates when debouncedSearch changes — not on every keystroke
  const filtered =
    posts?.filter((p) =>
      p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    ) ?? [];

  const isDark = theme === "dark";

  return (
    <div
      style={{
        padding: 32,
        minHeight: "100vh",
        backgroundColor: isDark ? "#1a1a1a" : "#ffffff",
        color: isDark ? "#ffffff" : "#111111",
        transition: "all 0.2s"
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24
        }}
      >
        <h1 style={{ margin: 0 }}>Custom Hooks Demo</h1>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={toggleInfo}>
            {showInfo ? "Hide Info" : "Show Info"}
          </button>
          <button onClick={() => setTheme(isDark ? "light" : "dark")}>
            {isDark ? "☀️ Light" : "🌙 Dark"}
          </button>
          <button onClick={refetch}>↺ Refetch</button>
        </div>
      </div>

      {/* Info panel — controlled by useToggle */}
      {showInfo && (
        <div
          style={{
            padding: 16,
            marginBottom: 24,
            borderRadius: 8,
            backgroundColor: isDark ? "#2a2a2a" : "#f0f9ff",
            border: "1px solid #0ea5e9",
            fontSize: 13
          }}
        >
          <strong>What each hook is doing right now:</strong>
          <ul style={{ margin: "8px 0 0", paddingLeft: 20 }}>
            <li>
              <strong>useFetch</strong> — fetched 20 posts from JSONPlaceholder
              API
            </li>
            <li>
              <strong>useDebounce</strong> — search input waits 400ms before
              filtering
            </li>
            <li>
              <strong>useLocalStorage</strong> — theme saved to localStorage
              (refresh to test)
            </li>
            <li>
              <strong>useToggle</strong> — this panel open/closed state
            </li>
          </ul>
          <button onClick={hideInfo} style={{ marginTop: 8, fontSize: 12 }}>
            Close
          </button>
        </div>
      )}

      {/* Search */}
      <input
        placeholder="Search posts... (debounced 400ms)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: 8,
          width: "100%",
          marginBottom: 8,
          boxSizing: "border-box",
          backgroundColor: isDark ? "#2a2a2a" : "#fff",
          color: isDark ? "#fff" : "#111",
          border: "1px solid #ccc",
          borderRadius: 4
        }}
      />
      <p style={{ fontSize: 12, color: "#888", marginBottom: 16 }}>
        Showing {filtered.length} of {posts?.length ?? 0} posts
        {debouncedSearch && ` matching "${debouncedSearch}"`}
      </p>

      {/* States */}
      {loading && <p>Loading posts...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {/* Post list */}
      {filtered.map((post) => (
        <div
          key={post.id}
          style={{
            padding: 12,
            marginBottom: 8,
            border: `1px solid ${isDark ? "#333" : "#ccc"}`,
            borderRadius: 4,
            backgroundColor: isDark ? "#2a2a2a" : "#fafafa"
          }}
        >
          <strong style={{ fontSize: 14 }}>{post.title}</strong>
          <p style={{ margin: "4px 0 0", fontSize: 12, opacity: 0.7 }}>
            {post.body}
          </p>
        </div>
      ))}
    </div>
  );
}
