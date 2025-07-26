import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

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
    } catch (err: any) {
      // O AuthContext já trata os erros e lança mensagens específicas
      setError(err.message || "Erro ao fazer login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cubos-bg cubos-bg-pattern flex flex-col">
      {/* Header sem botão logout */}
      <Header showUserActions={false} />

      {/* Form Container */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 relative z-10">
        <div className="w-full max-w-md space-y-6 bg-gray-900/60 bg-cubos-bg-pattern dark:bg-gray-900/20 backdrop-blur-md p-8 rounded-2xl border border-gray-800/30 shadow-2xl">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Nome/E-mail Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-cubos-white"
              >
                E-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field theme-transition"
                placeholder="Digite seu E-mail"
                required
              />
            </div>

            {/* Senha Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2 text-cubos-white"
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

            {/* Error Message */}
            {error && (
              <div className="text-red-700 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-500/20 text-sm text-center p-3 rounded-lg border theme-transition">
                {error}
              </div>
            )}

            {/* Esqueci minha senha Link */}
            <div className="text-center">
              <Link
                to="/esqueceu-senha"
                className="text-primary-600 hover:text-primary-700 dark:text-cubos-primary dark:hover:text-primary-400 text-sm font-medium transition-colors duration-200"
              >
                Esqueci minha senha
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary text-lg font-semibold theme-transition"
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          {/* Demo Credentials Info */}
          <div className="mt-8 p-4 bg-gray-100/70 border-gray-300/50 dark:bg-gray-800/30 dark:border-gray-700/50 rounded-lg theme-transition backdrop-blur-sm border">
            <p className="text-xs text-center mb-2 text-gray-700 dark:text-cubos-white">
              <strong>Dados para teste:</strong>
            </p>
            <p className="text-xs text-center text-gray-600 dark:text-cubos-placeholder">
              <strong>E-mail:</strong> admin@exemplo.com
            </p>
            <p className="text-xs text-center text-gray-600 dark:text-cubos-placeholder">
              <strong>Senha:</strong> 123456
            </p>
          </div>

          {/* Forgot Password & Register Links */}
          <div className="mt-6 text-center space-y-3">
            <p className="dark:text-gray-400 dark:text-cubos-placeholder text-sm">
              <Link
                to="/esqueceu-senha"
                className="text-primary-600 hover:text-primary-700 dark:text-cubos-primary dark:hover:text-primary-400 font-medium transition-colors duration-200"
              >
                Esqueceu sua senha?
              </Link>
            </p>

            <p className="dark:text-gray-400 dark:text-cubos-placeholder text-sm">
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

      {/* Footer */}
      <Footer />
    </div>
  );
};
