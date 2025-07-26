import React, { useEffect } from "react";
import { SearchIcon, FilterIcon } from "./icons";
import type { Genre } from "../types";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedGenre: number | null;
  onGenreChange: (genreId: number | null) => void;
  genres: Genre[];
  onClearFilters: () => void;
  onApplyFilters: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  searchTerm,
  onSearchChange,
  selectedGenre,
  onGenreChange,
  genres,
  onClearFilters,
  onApplyFilters,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleClearAndClose = () => {
    onClearFilters();
    onClose();
  };

  const handleApplyAndClose = () => {
    onApplyFilters();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="relative bg-gray-900/95 backdrop-blur-md rounded-2xl border border-gray-700/50 shadow-2xl w-full max-w-lg sm:max-w-md animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-700/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cubos-primary/20 rounded-lg">
              <FilterIcon
                size={20}
                className="text-cubos-primary"
              />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-cubos-white">
                Filtrar Filmes
              </h2>
              <p className="text-xs sm:text-sm text-cubos-placeholder">
                Encontre o filme perfeito
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 sm:p-2 hover:bg-gray-800/50 rounded-lg transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
          >
            <svg
              className="w-5 h-5 text-cubos-placeholder hover:text-cubos-white transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-cubos-white block">
              Nome do Filme
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <SearchIcon
                  size={18}
                  color="#B5B2BC"
                />
              </div>
              <input
                type="text"
                placeholder="Digite o nome do filme..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="h-12 sm:h-[44px] w-full pl-10 pr-4 py-3 border border-gray-700/70 rounded-xl sm:rounded-lg bg-gray-800/30 backdrop-blur-sm text-cubos-white placeholder-cubos-placeholder transition-all duration-200 focus:outline-none focus:border-cubos-primary focus:ring-2 focus:ring-cubos-primary/20 focus:bg-gray-800/50 text-base sm:text-sm"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-cubos-white block">
              Gênero
            </label>
            <select
              value={selectedGenre || ""}
              onChange={(e) =>
                onGenreChange(e.target.value ? Number(e.target.value) : null)
              }
              className="h-12 sm:h-[44px] w-full px-4 py-3 border border-gray-700/70 rounded-xl sm:rounded-lg bg-gray-800/30 backdrop-blur-sm text-cubos-white transition-all duration-200 focus:outline-none focus:border-cubos-primary focus:ring-2 focus:ring-cubos-primary/20 focus:bg-gray-800/50 text-base sm:text-sm appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23B5B2BC' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: "right 12px center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "16px",
              }}
            >
              <option value="">Todos os gêneros</option>
              {genres.map((genre) => (
                <option
                  key={genre.id}
                  value={genre.id}
                >
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 p-4 sm:p-6 border-t border-gray-700/50">
          <button
            onClick={handleClearAndClose}
            className="w-full sm:flex-1 h-12 sm:h-[44px] px-4 py-3 border border-gray-700/70 rounded-xl sm:rounded-lg bg-gray-800/30 backdrop-blur-sm text-cubos-white hover:border-gray-600/70 hover:bg-gray-800/50 active:scale-95 transition-all duration-200 font-medium text-base sm:text-sm"
          >
            Limpar Filtros
          </button>
          <button
            onClick={handleApplyAndClose}
            className="w-full sm:flex-1 h-12 sm:h-[44px] btn-primary rounded-xl sm:rounded-lg font-medium text-base sm:text-sm active:scale-95 transition-all duration-200"
          >
            Aplicar Filtros
          </button>
        </div>
      </div>
    </div>
  );
};
