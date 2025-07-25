import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { PrivateRoute } from "./components/PrivateRoute";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { MovieDetails } from "./pages/MovieDetails";
import { ForgotPassword } from "./pages/ForgotPassword";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-cubos-bg text-cubos-white transition-colors duration-200">
            <Routes>
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/cadastro"
                element={<Register />}
              />
              <Route
                path="/esqueceu-senha"
                element={<ForgotPassword />}
              />

              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />

              <Route
                path="/filme/:id"
                element={
                  <PrivateRoute>
                    <MovieDetails />
                  </PrivateRoute>
                }
              />

              <Route
                path="*"
                element={
                  <Navigate
                    to="/"
                    replace
                  />
                }
              />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
