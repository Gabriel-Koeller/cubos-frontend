import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { MovieCard } from "../components/MovieCard";
import { Pagination } from "../components/Pagination";
import { FilterModal } from "../components/FilterModal";
import { AddMovieDrawer } from "../components/AddMovieDrawer";
import { FilterIcon, PlusIcon } from "lucide-react";
import { moviesAPI } from "../services/api";
import type { Genre } from "../types";
import { useNavigate } from "react-router-dom";

interface APIMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  popularity: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  genres: string;
  genre_names: string[];
  genre_ids: number[];
}

interface APIResponse {
  movies: APIMovie[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export const Home: React.FC = () => {
  const [movies, setMovies] = useState<APIMovie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const moviesPerPage = 10;
  const navigate = useNavigate();
  const [isAddMovieDrawerOpen, setIsAddMovieDrawerOpen] = useState(false);
  const loadMovies = async (
    page: number = 1,
    search?: string,
    genre?: number
  ) => {
    try {
      setLoading(true);

      const params = {
        page,
        limit: moviesPerPage,
        search: search || undefined,
        genre: genre ? genre.toString() : undefined,
      };

      const response: APIResponse = await moviesAPI.getMovies(params);

      setMovies(response.movies);
      setCurrentPage(response.pagination.currentPage);
      setTotalPages(response.pagination.totalPages);
    } catch (err: any) {
      console.error("Erro ao carregar filmes:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadGenres = async () => {
    try {
      const response = await moviesAPI.getGenres();
      setGenres(response.genres);
    } catch (err: any) {
      console.error("Erro ao carregar gêneros:", err);
    }
  };

  useEffect(() => {
    loadGenres();
    loadMovies();
  }, []);

  const [tempSearchTerm, setTempSearchTerm] = useState("");
  const [tempSelectedGenre, setTempSelectedGenre] = useState<number | null>(
    null
  );

  const handleMovieClick = (movieId: number) => {
    navigate(`/filme/${movieId}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    loadMovies(page, searchTerm, selectedGenre || undefined);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleApplyFilters = () => {
    setSearchTerm(tempSearchTerm);
    setSelectedGenre(tempSelectedGenre);
    setCurrentPage(1);
    loadMovies(1, tempSearchTerm, tempSelectedGenre || undefined);
  };

  const handleClearSearchFilter = () => {
    setSearchTerm("");
    setTempSearchTerm("");
    setCurrentPage(1);
    loadMovies(1, "", selectedGenre || undefined);
  };

  const handleClearGenreFilter = () => {
    setSelectedGenre(null);
    setTempSelectedGenre(null);
    setCurrentPage(1);
    loadMovies(1, searchTerm, undefined);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedGenre(null);
    setTempSearchTerm("");
    setTempSelectedGenre(null);
    setCurrentPage(1);
    loadMovies(1, "", undefined);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchTerm) count++;
    if (selectedGenre) count++;
    return count;
  };

  return (
    <div className="min-h-screen bg-cubos-bg cubos-bg-pattern flex flex-col">
      <Header />

      <div className="max-w-[1366px] mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        <div className="block sm:hidden">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-cubos-white mb-3">
              Filmes Populares
            </h1>

            {getActiveFiltersCount() > 0 && (
              <div className="inline-flex items-center px-4 py-2 bg-cubos-primary/15 border border-cubos-primary/40 rounded-full">
                <div className="w-2 h-2 bg-cubos-primary rounded-full mr-2 animate-pulse"></div>
                <span className="text-cubos-primary text-sm font-medium">
                  {getActiveFiltersCount()} filtro
                  {getActiveFiltersCount() > 1 ? "s" : ""} aplicado
                  {getActiveFiltersCount() > 1 ? "s" : ""}
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                setTempSearchTerm(searchTerm);
                setTempSelectedGenre(selectedGenre);
                setIsFilterModalOpen(true);
              }}
              className="relative h-12 flex items-center justify-center gap-2 px-4 py-3 border border-gray-700/70 rounded-xl bg-gray-900/40 backdrop-blur-sm text-cubos-white hover:border-cubos-primary/50 active:scale-95 transition-all duration-200"
            >
              <FilterIcon size={18} />
              <span className="font-medium">Filtros</span>
              {getActiveFiltersCount() > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-cubos-primary text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
                  {getActiveFiltersCount()}
                </span>
              )}
            </button>

            <button
              className="h-12 btn-primary text-sm font-medium rounded-xl active:scale-95 transition-all duration-200"
              onClick={() => {
                setIsAddMovieDrawerOpen(true);
              }}
            >
              Adicionar Filme
            </button>
          </div>
        </div>

        <div className="hidden sm:flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-cubos-white">
              Filmes Populares
            </h1>

            {getActiveFiltersCount() > 0 && (
              <span className="px-3 py-1 bg-cubos-primary/20 text-cubos-primary text-sm font-medium rounded-full border border-cubos-primary/30">
                {getActiveFiltersCount()} filtro
                {getActiveFiltersCount() > 1 ? "s" : ""} ativo
                {getActiveFiltersCount() > 1 ? "s" : ""}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setTempSearchTerm(searchTerm);
                setTempSelectedGenre(selectedGenre);
                setIsFilterModalOpen(true);
              }}
              className="h-[44px] flex items-center gap-2 px-4 py-3 border border-gray-700/70 rounded-lg bg-gray-900/30 backdrop-blur-sm text-cubos-white hover:border-cubos-primary/50 transition-all duration-200 whitespace-nowrap relative"
            >
              <FilterIcon size={20} />
              Filtros
              {getActiveFiltersCount() > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-cubos-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {getActiveFiltersCount()}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setIsAddMovieDrawerOpen(true);
              }}
              className="h-[44px] text-sm btn-primary whitespace-nowrap"
            >
              Adicionar Filme
            </button>
          </div>
        </div>

        {(searchTerm || selectedGenre) && (
          <div className="mt-4 p-4 bg-gray-900/30 backdrop-blur-sm rounded-lg border border-gray-700/50">
            <div className="block sm:hidden">
              <div className="text-center mb-4">
                <span className="text-cubos-white font-medium text-sm">
                  Filtros aplicados:
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <div
                  className={`grid ${
                    searchTerm && selectedGenre ? "grid-cols-2" : "grid-cols-1"
                  } gap-2`}
                >
                  {searchTerm && (
                    <span className="inline-flex items-center justify-center gap-1 bg-cubos-primary/20 text-cubos-primary px-3 py-2 rounded-full text-sm border border-cubos-primary/30">
                      <span>Nome: "{searchTerm}"</span>
                      <button
                        onClick={handleClearSearchFilter}
                        className="hover:bg-cubos-primary/20 rounded-full p-0.5 transition-colors"
                      >
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </span>
                  )}
                  {selectedGenre && (
                    <span className="inline-flex items-center justify-center gap-1 bg-cubos-primary/20 text-cubos-primary px-3 py-2 rounded-full text-sm border border-cubos-primary/30">
                      <span>
                        Gênero:{" "}
                        {genres.find((g) => g.id === selectedGenre)?.name}
                      </span>
                      <button
                        onClick={handleClearGenreFilter}
                        className="hover:bg-cubos-primary/20 rounded-full p-0.5 transition-colors"
                      >
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </span>
                  )}
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={handleClearFilters}
                    className="text-cubos-placeholder hover:text-cubos-white text-sm font-medium transition-colors px-4 py-2 hover:bg-gray-800/30 rounded-lg"
                  >
                    Limpar todos
                  </button>
                </div>
              </div>
            </div>

            <div className="hidden sm:flex items-center justify-between">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-cubos-white font-medium text-sm">
                  Filtros aplicados:
                </span>
                {searchTerm && (
                  <span className="inline-flex items-center gap-1 bg-cubos-primary/20 text-cubos-primary px-3 py-1 rounded-full text-sm border border-cubos-primary/30">
                    <span>Nome: "{searchTerm}"</span>
                    <button
                      onClick={handleClearSearchFilter}
                      className="hover:bg-cubos-primary/20 rounded-full p-0.5 transition-colors"
                    >
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </span>
                )}
                {selectedGenre && (
                  <span className="inline-flex items-center gap-1 bg-cubos-primary/20 text-cubos-primary px-3 py-1 rounded-full text-sm border border-cubos-primary/30">
                    <span>
                      Gênero: {genres.find((g) => g.id === selectedGenre)?.name}
                    </span>
                    <button
                      onClick={handleClearGenreFilter}
                      className="hover:bg-cubos-primary/20 rounded-full p-0.5 transition-colors"
                    >
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </span>
                )}
              </div>
              <button
                onClick={handleClearFilters}
                className="text-cubos-placeholder hover:text-cubos-white text-sm font-medium transition-colors"
              >
                Limpar todos
              </button>
            </div>
          </div>
        )}
      </div>

      <main className="max-w-[1366px] mx-auto px-4 sm:px-6 lg:px-8 pb-8 flex-1 w-full">
        {loading ? (
          <div className="text-center py-16">
            <div className="text-xl text-cubos-placeholder">
              Carregando filmes...
            </div>
          </div>
        ) : movies.length === 0 ? (
          <div className="text-center py-16 bg-gray-900/30 backdrop-blur-sm rounded-lg border border-gray-700/50">
            <div className="mb-4">
              <FilterIcon
                size={48}
                className="text-cubos-white mx-auto mb-4"
              />
            </div>
            <p className="text-cubos-white text-lg mb-2">
              Nenhum filme encontrado
            </p>
            <p className="text-cubos-white/70 text-sm mb-6">
              Tente ajustar seus filtros para encontrar mais resultados
            </p>
            <button
              onClick={handleClearFilters}
              className="btn-primary"
            >
              Limpar Filtros
            </button>
          </div>
        ) : (
          <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-6 lg:p-8 mx-auto max-w-screen-2xl">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 2xl:gap-9 justify-items-center">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={handleMovieClick}
                />
              ))}
            </div>
          </div>
        )}

        {!loading && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </main>

      <Footer />

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => {
          setTempSearchTerm(searchTerm);
          setTempSelectedGenre(selectedGenre);
          setIsFilterModalOpen(false);
        }}
        searchTerm={tempSearchTerm}
        onSearchChange={setTempSearchTerm}
        selectedGenre={tempSelectedGenre}
        onGenreChange={setTempSelectedGenre}
        genres={genres}
        onClearFilters={handleClearFilters}
        onApplyFilters={handleApplyFilters}
      />

      <AddMovieDrawer
        isOpen={isAddMovieDrawerOpen}
        onClose={() => setIsAddMovieDrawerOpen(false)}
        onMovieAdded={() => {
          loadMovies();
          setCurrentPage(1);
        }}
      />
    </div>
  );
};
