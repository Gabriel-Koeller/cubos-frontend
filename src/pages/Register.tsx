import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setIsLoading(true);

    try {
      const success = await register(name, email, password);
      if (success) {
        navigate("/");
      } else {
        setError("Erro ao criar conta. Tente novamente.");
      }
    } catch (err: any) {
      setError(err.message || "Erro ao criar conta. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cubos-bg cubos-bg-pattern flex flex-col">
      <Header showUserActions={false} />

      <div className="flex-1 flex items-center justify-center px-4 py-8 relative z-10">
        <div className="w-full max-w-md space-y-6 bg-gray-900/60 bg-cubos-bg-pattern dark:bg-gray-900/20  backdrop-blur-md p-8 rounded-2xl border border-gray-800/30 shadow-2xl">
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2 text-cubos-white"
              >
                Nome completo
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field theme-transition"
                placeholder="Digite seu nome completo"
                required
              />
            </div>

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
                placeholder="Digite seu e-mail"
                required
              />
            </div>

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
                minLength={6}
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium mb-2 text-cubos-white"
              >
                Confirmar senha
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field theme-transition"
                placeholder="Confirme sua senha"
                required
                minLength={6}
              />
            </div>

            {error && (
              <div className="text-red-700 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-500/20 text-sm text-center p-3 rounded-lg border theme-transition">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary text-lg font-semibold theme-transition"
            >
              {isLoading ? "Criando conta..." : "Criar conta"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="dark:text-gray-400  dark:text-cubos-placeholder text-sm">
              Já tem uma conta?{" "}
              <Link
                to="/login"
                className="text-primary-600 hover:text-primary-700 dark:text-cubos-primary dark:hover:text-primary-400 font-medium transition-colors duration-200"
              >
                Fazer login
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
