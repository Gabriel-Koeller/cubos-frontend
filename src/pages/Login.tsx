import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Logo } from "../components/Logo";
import { ThemeToggle } from "../components/ThemeToggle";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate("/");
      } else {
        setError("Email ou senha inválidos");
      }
    } catch (err) {
      setError("Erro ao fazer login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container theme-transition">
      <header className="login-header">
        <Logo />
        <ThemeToggle />
      </header>

      <div className="login-form-container">
        <div className="login-form theme-transition">
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-gray-800 dark:text-cubos-white"
              >
                Nome/E-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field theme-transition"
                placeholder="Digite seu nome/E-mail"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2 text-gray-800 dark:text-cubos-white"
              >
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field theme-transition"
                placeholder="Digite sua senha"
                required
              />
            </div>

            {error && (
              <div className="text-red-700 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-500/20 text-sm text-center p-3 rounded-lg border theme-transition">
                {error}
              </div>
            )}

            <div className="text-center">
              <Link
                to="/esqueci-senha"
                className="text-primary-600 hover:text-primary-700 dark:text-cubos-primary dark:hover:text-primary-400 text-sm font-medium transition-colors duration-200"
              >
                Esqueci minha senha
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary text-lg font-semibold theme-transition"
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <div className="mt-8 p-4 bg-gray-100/70 border-gray-300/50 dark:bg-gray-800/30 dark:border-gray-700/50 rounded-lg theme-transition backdrop-blur-sm border">
            <p className="text-xs text-center mb-2 text-gray-700 dark:text-cubos-primary">
              <strong>Dados para teste:</strong>
            </p>
            <p className="text-xs text-center text-gray-600 dark:text-cubos-white">
              <strong>E-mail:</strong> admin@exemplo.com
            </p>
            <p className="text-xs text-center text-gray-600 dark:text-cubos-white">
              <strong>Senha:</strong> senha123
            </p>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-cubos-placeholder text-sm">
              Não tem uma conta?{" "}
              <Link
                to="/cadastro"
                className="text-primary-600 hover:text-primary-700 dark:text-cubos-primary dark:hover:text-primary-400 font-medium transition-colors duration-200"
              >
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>

      <footer className="login-footer theme-transition border-t border-cubos-placeholder ">
        <p className="text-white dark:text-cubos-placeholder text-sm">
          2025 © Todos os direitos reservados a <strong>Cubos Movies</strong>
        </p>
      </footer>
    </div>
  );
};
