import { useReducer } from "react";
import { authReducer, initialState } from "./authReducer";
import { AuthContext } from "./AuthContext";

const FAKE_USERS = [
  {
    id: 1,
    name: "Alice Admin",
    email: "admin@test.com",
    password: "password",
    role: "admin" as const
  },
  {
    id: 2,
    name: "Bob User",
    email: "user@test.com",
    password: "password",
    role: "user" as const
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (email: string, password: string) => {
    dispatch({ type: "LOGIN_START" });
    await new Promise((resolve) => setTimeout(resolve, 800));
2478
    const found = FAKE_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (!found) {
      dispatch({ type: "LOGIN_ERROR", payload: "Invalid email or password" });
      return;
    }

    const { password: _password, ...user } = found;
    dispatch({ type: "LOGIN_SUCCESS", payload: user });
  };

  const logout = () => dispatch({ type: "LOGOUT" });

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
