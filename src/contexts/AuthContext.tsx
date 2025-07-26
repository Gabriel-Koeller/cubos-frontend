import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { User, AuthContextType } from "../types";
import { authAPI } from "../services/api";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const savedUser = localStorage.getItem("cubos-user");
      const savedToken = localStorage.getItem("cubos-token");

      if (savedUser && savedToken) {
        try {
          const response = await authAPI.verifyToken();
          setUser(response.user);
        } catch (error) {
          localStorage.removeItem("cubos-user");
          localStorage.removeItem("cubos-token");
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await authAPI.login(email, password);

      if (response.token && response.user) {
        localStorage.setItem("cubos-token", response.token);
        localStorage.setItem("cubos-user", JSON.stringify(response.user));
        setUser(response.user);
        return true;
      }

      return false;
    } catch (error: any) {
      console.error("Erro no login:", error);

      if (error.response?.status === 401) {
        throw new Error("Email ou senha incorretos");
      } else if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      } else {
        throw new Error("Erro ao fazer login. Tente novamente.");
      }
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await authAPI.register(name, email, password);

      if (response.token && response.user) {
        localStorage.setItem("cubos-token", response.token);
        localStorage.setItem("cubos-user", JSON.stringify(response.user));
        setUser(response.user);
        return true;
      }

      return false;
    } catch (error: any) {
      console.error("Erro no cadastro:", error);
      if (error.response?.status === 400) {
        throw new Error(error.response.data.error || "Dados inválidos");
      } else if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      } else {
        throw new Error("Erro ao criar conta. Tente novamente.");
      }
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error("Erro no logout:", error);
    } finally {
      setUser(null);
      localStorage.removeItem("cubos-token");
      localStorage.removeItem("cubos-user");
    }
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
