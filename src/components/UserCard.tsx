import { memo } from "react";
import type { User } from "../types/user";

const UserCard = memo(function UserCard({
  user,
  onClear
}: {
  user: User;
  onClear: () => void;
}) {
  console.log(`🃏 UserCard rendered: ${user.name}`);
  return (
    <div style={{ padding: 12, border: "1px solid #ccc", marginBottom: 8 }}>
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
  );
});

export default UserCard;
