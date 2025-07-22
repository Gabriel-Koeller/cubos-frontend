import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { User, AuthContextType } from "../types";

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
    const savedUser = localStorage.getItem("cubos-user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem("cubos-user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const mockUsers = [
      {
        id: "1",
        name: "Admin",
        email: "admin@exemplo.com",
        password: "senha123",
      },
      {
        id: "2",
        name: "Usuário Demo",
        email: "demo@cubos.com",
        password: "123456",
      },
    ];

    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const userData: User = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
      };

      setUser(userData);
      localStorage.setItem("cubos-user", JSON.stringify(userData));
      return true;
    }

    return false;
  };

  const register = async (
    name: string,
    email: string,
    _password: string
  ): Promise<boolean> => {
    // Cria novo usuário
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
    };

    setUser(newUser);
    localStorage.setItem("cubos-user", JSON.stringify(newUser));
    return true;
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem("cubos-user");
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
