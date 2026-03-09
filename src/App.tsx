// import { AuthProvider } from "./context/AuthProvider";
// import { useAuth } from "./context/useAuth";
// import Dashboard from "./pages/Dashboard";
// import LoginPage from "./pages/LoginPage";
import RefExamples from "./hooks/useRef-examples/RefExamples";
import HooksDemo from "./pages/HooksDemo";

// function AppContent() {
//   const { state } = useAuth();
//   if (state.isLoading) return <p style={{ padding: 32 }}>Loading...</p>;
//   return state.isAuthenticated ? <Dashboard /> : <LoginPage />;
// }

export default function App() {
  return (
    <>
      {/* Day 3 demos — comment these out when done */}
      <RefExamples />
      <hr />
      <HooksDemo />

      {/* Day 2 auth app — uncomment when you want to test it */}
      {/* <AuthProvider><AppContent /></AuthProvider> */}
    </>
  );
}
