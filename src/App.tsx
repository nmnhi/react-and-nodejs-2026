import { useCallback, useEffect, useMemo, useState } from "react";
import UserCard from "./components/UserCard";
import type { User } from "./types/user";

// Exercise: User List with search
// Your job: read every line and understand what it does

const USERS: User[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Admin"
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    role: "User"
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "User"
  },
  {
    id: 4,
    name: "Diana Prince",
    email: "diana@example.com",
    role: "User"
  }
];

export default function App() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  // Runs once after first render. [] means no dependencies — never re-runs.
  useEffect(() => {
    setTimeout(() => {
      setUsers(USERS);
      setLoading(false);
    }, 1000);
  }, []);

  // useMemo: only recalculates when search or users changes.
  // Without this, the filter runs on EVERY render of App.
  const filtered = useMemo(() => {
    console.log("🔍 filtering...");
    return users.filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  // useCallback: returns the SAME function reference across renders.
  // This matters because UserCard is wrapped in memo().
  // If handleClear was recreated every render, memo() on UserCard would be useless —
  // the onClear prop would look "new" every time, forcing a re-render anyway.
  const handleClear = useCallback(() => {
    setSearch("");
  }, []); // setSearch never changes, so no dependencies needed

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: 32 }}>
      <h1>User List</h1>
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          marginBottom: 4
        }}
      >
        <input
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: 8,
            fontSize: 16,
            display: "block"
          }}
        />
        <button onClick={handleClear}>Clear Filter</button>
      </div>
      <span
        style={{
          marginBottom: 16,
          fontSize: 12,
          color: "#666",
          display: "block"
        }}
      >
        Showing {filtered.length} of {users.length} users
      </span>

      {filtered.length === 0 && <p>No users found</p>}
      {filtered.map((user) => (
        <UserCard key={user.id} user={user} onClear={handleClear} />
      ))}
    </div>
  );
}
