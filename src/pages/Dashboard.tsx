import { useAuth } from "../context/useAuth";

export default function Dashboard() {
  const { state, logout } = useAuth();
  const { user } = state;

  return (
    <div style={{ padding: 32 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 32
        }}
      >
        <h1>Dashboard</h1>
        <button onClick={logout}>Logout</button>
      </div>

      <div
        style={{
          padding: 16,
          border: "1px solid #ccc",
          borderRadius: 8,
          marginBottom: 24
        }}
      >
        <h2 style={{ marginTop: 0 }}>Welcome, {user?.name}</h2>
        <p style={{ margin: 0, color: "#666" }}>{user?.email}</p>
        <span
          style={{
            display: "inline-block",
            marginTop: 8,
            backgroundColor: user?.role === "admin" ? "#dcfce7" : "#dbeafe",
            color: user?.role === "admin" ? "#166534" : "#1e40af",
            padding: "2px 10px",
            borderRadius: 99,
            fontSize: 13,
            fontWeight: "bold"
          }}
        >
          {user?.role}
        </span>
      </div>

      {/* TODO Exercise 2: only render this when user.role === "admin" */}
      {user?.role === "admin" && (
        <div
          style={{
            padding: 16,
            border: "2px solid #f59e0b",
            borderRadius: 8,
            backgroundColor: "#fffbeb"
          }}
        >
          <h3 style={{ marginTop: 0, color: "#92400e" }}>⚠️ Admin Panel</h3>
          <p style={{ color: "#78350f" }}>
            This section should only be visible to admins.
          </p>
        </div>
      )}
    </div>
  );
}
