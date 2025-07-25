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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="relative bg-gray-900/95 backdrop-blur-md rounded-2xl border border-gray-700/50 shadow-2xl max-w-md w-full mx-4 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cubos-primary/20 rounded-lg">
              <FilterIcon
                size={20}
                className="text-cubos-primary"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-cubos-white">
                Filtrar Filmes
              </h2>
              <p className="text-sm text-cubos-placeholder">
                Encontre o filme perfeito
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
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

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-cubos-white">
              Nome do Filme
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <SearchIcon
                  size={18}
                  color="#B5B2BC"
                  //   strokeWidth={1.5}
                />
              </div>
              <input
                type="text"
                placeholder="Digite o nome do filme..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="h-[44px] w-full pl-10 pr-4 py-3 border border-gray-700/70 rounded-lg bg-gray-800/30 backdrop-blur-sm text-cubos-white placeholder-cubos-placeholder transition-all duration-200 focus:outline-none focus:border-cubos-primary focus:ring-2 focus:ring-cubos-primary/20 focus:bg-gray-800/50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-cubos-white">
              Gênero
            </label>
            <select
              value={selectedGenre || ""}
              onChange={(e) =>
                onGenreChange(e.target.value ? Number(e.target.value) : null)
              }
              className="h-[44px] w-full px-4 py-3 border border-gray-700/70 rounded-lg bg-gray-800/30 backdrop-blur-sm text-cubos-white transition-all duration-200 focus:outline-none focus:border-cubos-primary focus:ring-2 focus:ring-cubos-primary/20 focus:bg-gray-800/50"
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

          {/* <div className="p-3 bg-gray-800/30 rounded-lg border border-gray-700/30">
            <div className="flex items-center justify-between text-sm">
              <span className="text-cubos-placeholder">Filtros ativos:</span>
              <span className="text-cubos-white font-medium">
                {searchTerm || selectedGenre ? (
                  <>
                    {searchTerm && (
                      <span className="inline-block bg-cubos-primary/20 text-cubos-primary px-2 py-1 rounded text-xs mr-2">
                        "{searchTerm}"
                      </span>
                    )}
                    {selectedGenre && (
                      <span className="inline-block bg-cubos-primary/20 text-cubos-primary px-2 py-1 rounded text-xs">
                        {genres.find((g) => g.id === selectedGenre)?.name}
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-cubos-placeholder">Nenhum</span>
                )}
              </span>
            </div>
          </div> */}
        </div>

        <div className="flex items-center gap-3 p-6 border-t border-gray-700/50">
          <button
            onClick={handleClearAndClose}
            className="flex-1 h-[44px] px-4 py-3 border border-gray-700/70 rounded-lg bg-gray-800/30 backdrop-blur-sm text-cubos-white hover:border-gray-600/70 hover:bg-gray-800/50 transition-all duration-200 font-medium"
          >
            Limpar Filtros
          </button>
          <button
            onClick={onClose}
            className="flex-1 btn-primary"
          >
            Aplicar Filtros
          </button>
        </div>
      </div>
    </div>
  );
};
