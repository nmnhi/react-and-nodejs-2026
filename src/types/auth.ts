export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: AuthUser }
  | { type: "LOGIN_ERROR"; payload: string }
  | { type: "LOGOUT" };

export interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
