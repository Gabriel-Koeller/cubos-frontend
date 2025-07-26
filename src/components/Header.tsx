import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./Logo";
import { useNavigate } from "react-router-dom";
import { LogoutIcon } from "./icons";

interface HeaderProps {
  showUserActions?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ showUserActions = true }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-[#12111350] backdrop-blur-sm border-b border-gray-800/50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <Logo />

          <div className="flex items-center gap-3">
            <ThemeToggle />
            {showUserActions && (
              <button
                onClick={async () => {
                  await logout();
                  navigate("/login");
                }}
                className="h-[44px] w-[100px] flex items-center justify-center gap-2 bg-cubos-primary hover:bg-primary-600 text-cubos-white text-sm font-semibold px-4 py-2 rounded-md transition-all duration-200 hover:shadow-lg hover:shadow-cubos-primary/25"
              >
                <LogoutIcon className="w-4 h-4" />
                Sair
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
