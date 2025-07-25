import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSuccess(true);
    } catch (err) {
      setError("Erro ao enviar email de recuperação. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cubos-bg cubos-bg-pattern flex flex-col">
      <Header showUserActions={false} />

      <div className="flex-1 flex items-center justify-center px-4 py-8 relative z-10">
        <div className="w-full max-w-md space-y-6 bg-gray-900/60 bg-cubos-bg-pattern dark:bg-gray-900/20 backdrop-blur-md p-8 rounded-2xl border border-gray-800/30 shadow-2xl">
          {!isSuccess ? (
            <>
              <div className="text-center">
                <h2 className="text-3xl font-bold text-cubos-white mb-2">
                  Esqueceu sua senha?
                </h2>
                <p className="dark:text-gray-400 dark:text-cubos-placeholder">
                  Digite seu email para receber as instruções de recuperação
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
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
                    placeholder="seu@email.com"
                    required
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
                  className="btn-primary w-full theme-transition"
                >
                  {isLoading ? "Enviando..." : "Enviar instruções"}
                </button>
              </form>

              <div className="text-center space-y-2">
                <p className="text-sm dark:text-gray-400 dark:text-cubos-placeholder">
                  Lembrou sua senha?{" "}
                  <Link
                    to="/login"
                    className="text-primary-600 hover:text-primary-700 dark:text-cubos-primary dark:hover:text-primary-400 font-medium transition-colors duration-200"
                  >
                    Fazer login
                  </Link>
                </p>

                <p className="text-sm dark:text-gray-400 dark:text-cubos-placeholder">
                  Não tem uma conta?{" "}
                  <Link
                    to="/cadastro"
                    className="text-primary-600 hover:text-primary-700 dark:text-cubos-primary dark:hover:text-primary-400 font-medium transition-colors duration-200"
                  >
                    Cadastre-se aqui
                  </Link>
                </p>
              </div>
            </>
          ) : (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-cubos-white mb-2">
                  Email enviado!
                </h2>
                <p className="dark:text-gray-400 dark:text-cubos-placeholder mb-6">
                  Enviamos as instruções para recuperar sua senha para{" "}
                  <strong>{email}</strong>. Verifique sua caixa de entrada e
                  spam.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setIsSuccess(false);
                    setEmail("");
                  }}
                  className="btn-secondary w-full theme-transition"
                >
                  Enviar para outro email
                </button>

                <Link
                  to="/login"
                  className="block w-full text-center btn-primary theme-transition"
                >
                  Voltar ao login
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};
