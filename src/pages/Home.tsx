import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { MovieCard } from "../components/MovieCard";
import { Pagination } from "../components/Pagination";
import { FilterModal } from "../components/FilterModal";
import { FilterIcon } from "../components/icons";
import moviesData from "../data/movies.json";
import type { Movie, Genre } from "../types";
import { useNavigate } from "react-router-dom";

export const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const moviesPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    setMovies(moviesData.movies);
    setGenres(moviesData.genres);
  }, []);

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre
      ? movie.genre_ids.includes(selectedGenre)
      : true;
    return matchesSearch && matchesGenre;
  });

  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
  const startIndex = (currentPage - 1) * moviesPerPage;
  const currentMovies = filteredMovies.slice(
    startIndex,
    startIndex + moviesPerPage
  );

  const getGenreNames = (genreIds: number[]) => {
    return genreIds
      .map((id) => genres.find((genre) => genre.id === id)?.name)
      .filter(Boolean)
      .join(", ");
  };

  const handleMovieClick = (movieId: string) => {
    navigate(`/filme/${movieId}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedGenre(null);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchTerm) count++;
    if (selectedGenre) count++;
    return count;
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedGenre]);

  return (
    <div className="min-h-screen bg-cubos-bg cubos-bg-pattern flex flex-col">
      <Header />

      <div className="max-w-[1366px] mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-cubos-white">
              Filmes Populares
            </h1>

            {/* Indicador de filtros ativos */}
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
              onClick={() => setIsFilterModalOpen(true)}
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

            <button className="h-[44px] btn-primary whitespace-nowrap">
              Adicionar Filme
            </button>
          </div>
        </div>

        {(searchTerm || selectedGenre) && (
          <div className="mt-4 p-4 bg-gray-900/30 backdrop-blur-sm rounded-lg border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-cubos-white font-medium text-sm">
                  Filtros aplicados:
                </span>
                {searchTerm && (
                  <span className="inline-flex items-center gap-1 bg-cubos-primary/20 text-cubos-primary px-3 py-1 rounded-full text-sm border border-cubos-primary/30">
                    <span>Nome: "{searchTerm}"</span>
                    <button
                      onClick={() => setSearchTerm("")}
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
                      onClick={() => setSelectedGenre(null)}
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
        {currentMovies.length === 0 ? (
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
          <div className="grid grid-cols-2 grid-rows-5 md:grid-cols-3 md:grid-rows-4 lg:grid-cols-4 lg:grid-rows-3 2xl:grid-cols-5 2xl:grid-rows-2 w-full 2xl:w-figma-container h-auto 2xl:h-figma-container gap-3 sm:gap-4 lg:gap-6 2xl:gap-9 p-2 sm:p-3 lg:p-4 2xl:p-[28px] rounded justify-items-center items-center mx-auto figma-grid-container max-w-screen-2xl">
            {currentMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                genreNames={getGenreNames(movie.genre_ids)}
                onClick={handleMovieClick}
              />
            ))}
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>

      <Footer />

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
        genres={genres}
        onClearFilters={handleClearFilters}
      />
    </div>
  );
};
