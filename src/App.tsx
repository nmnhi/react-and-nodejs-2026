import { AuthProvider } from "./context/AuthProvider";
import { useAuth } from "./context/useAuth";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";

// Protected routing lives here — reads auth state, shows the right page
function AppContent() {
  const { state } = useAuth();

  if (state.isLoading) {
    return <p style={{ padding: 32 }}>Loading...</p>;
  }

  // This is the protected route — if not authenticated, show login
  return state.isAuthenticated ? <Dashboard /> : <LoginPage />;
}

// AuthProvider must wrap AppContent — that's why they're separate
// If AppContent was the root, it couldn't call useAuth() (no Provider above it yet)
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
