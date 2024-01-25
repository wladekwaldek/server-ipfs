import { AuthContext } from "./context/AuthContext";
import { useAuth } from "./hooks/auth";
import Navigation from "./components/Navigation";
import "./App.css";

function App() {
  const { isAuthenticated, login } = useAuth();
  return (
    <div className="wraper">
      <AuthContext.Provider value={{ isAuthenticated, login }}>
        <Navigation />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
