import { useEffect, useState } from "react";

// Exercise: User List with search
// Your job: read every line and understand what it does

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

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

  // TODO 1: Why does this run? When does it run again?
  useEffect(() => {
    setTimeout(() => {
      setUsers(USERS);
      setLoading(false);
    }, 1000);
  }, []);

  // TODO 2: What does this do? When does it recalculate?
  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

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
        <button onClick={() => setSearch("")}>Clear Filter</button>
      </div>
      <span style={{ marginBottom: 16, fontSize: 12 }}>
        Showing {filtered.length} of {users.length} users
      </span>

      {filtered.length === 0 && <p>No users found</p>}
      {filtered.map((user) => (
        <div
          key={user.id}
          style={{ padding: 12, border: "1px solid #ccc", marginBottom: 8 }}
        >
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <strong>{user.name}</strong>
            <span
              style={{
                backgroundColor: user.role === "Admin" ? "#dcfce7" : "#dbeafe",
                color: user.role === "Admin" ? "#166534" : "#1e40af",
                padding: "2px 8px",
                borderRadius: 99,
                fontSize: 12,
                fontWeight: "bold"
              }}
            >
              {user.role}
            </span>
          </div>

          <p style={{ margin: 0, color: "#666" }}>{user.email}</p>
        </div>
      ))}
    </div>
  );
}
