import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { SunIcon, MoonIcon } from "./icons";

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
        w-12 h-12 
        bg-gray-800/80 backdrop-blur-sm
        border border-gray-700/50
        rounded-lg
        flex items-center justify-center
        transition-all duration-300 ease-in-out
        hover:bg-cubos-primary/20 
        hover:border-cubos-primary/50
        hover:scale-105
        active:scale-95
        group
        
        dark:bg-gray-800/80 dark:border-gray-700/50
        bg-white/80 border-gray-300/50
      "
      title={
        theme === "light"
          ? "Alternar para modo escuro"
          : "Alternar para modo claro"
      }
    >
      <div className="relative w-6 h-6">
        {theme === "light" ? (
          <MoonIcon
            size={24}
            color="currentColor"
            className="
              transition-all duration-300
              group-hover:drop-shadow-[0_0_8px_rgba(142,78,198,0.6)]
              filter group-hover:brightness-110
              text-gray-700 group-hover:text-cubos-primary
            "
          />
        ) : (
          <SunIcon
            size={24}
            color="currentColor"
            strokeWidth={2}
            className="
              transition-all duration-300
              group-hover:drop-shadow-[0_0_8px_rgba(142,78,198,0.6)]
              filter group-hover:brightness-110
              text-cubos-white group-hover:text-cubos-primary
            "
          />
        )}
      </div>
    </button>
  );
};
