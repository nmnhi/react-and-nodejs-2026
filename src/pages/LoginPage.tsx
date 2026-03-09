import { useState } from "react";
import { useAuth } from "../context/useAuth";

export default function LoginPage() {
  const { state, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "80px auto",
        padding: 32,
        border: "1px solid #ccc",
        borderRadius: 8
      }}
    >
      <h1 style={{ marginBottom: 24 }}>Login</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 4 }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 4 }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
          />
        </div>

        {/* TODO Exercise 1: show state.error as red text here when it exists */}
        <div style={{ minHeight: 24, marginBottom: 12 }}>
          {/* YOUR CODE HERE */}
          {state.error && (
            <p style={{ color: "red", fontSize: 13 }}>{state.error}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={state.isLoading}
          style={{
            width: "100%",
            padding: 10,
            cursor: state.isLoading ? "not-allowed" : "pointer"
          }}
        >
          {state.isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p style={{ marginTop: 16, fontSize: 13, color: "#888" }}>
        Try: admin@test.com / password | user@test.com / password
      </p>
    </div>
  );
}
