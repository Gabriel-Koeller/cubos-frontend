import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { ThemeToggle } from "../components/ThemeToggle";
import moviesData from "../data/movies.json";
import type { Movie, Genre } from "../types";
import { useNavigate } from "react-router-dom";

export const Home: React.FC = () => {
  const { user, logout } = useAuth();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
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

  const getGenreNames = (genreIds: number[]) => {
    return genreIds
      .map((id) => genres.find((genre) => genre.id === id)?.name)
      .filter(Boolean)
      .join(", ");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const handleMovieClick = (movieId: string) => {
    navigate(`/filme/${movieId}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header
        className="
        sticky top-0 z-50 
        bg-white/90 dark:bg-gray-900/90 
        border-b border-gray-200 dark:border-gray-700
        backdrop-blur-md
        transition-colors duration-200
      "
      >
        {/* Header Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Row - Title and User Actions */}
          <div
            className="
            flex items-center justify-between
            py-4
          "
          >
            <h1
              className="
              text-primary-500 text-xl sm:text-2xl lg:text-3xl font-bold
            "
            >
              Cubos Movies
            </h1>

            {/* User Actions */}
            <div className="flex items-center gap-3">
              <div
                className="
                hidden sm:flex items-center gap-2
                text-gray-700 dark:text-gray-300 font-medium
              "
              >
                {user?.avatar && (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full border-2 border-primary-500"
                  />
                )}
                <span className="hidden md:inline">Olá, {user?.name}</span>
              </div>
              <ThemeToggle />
              <button
                onClick={logout}
                className="
                  bg-red-500 hover:bg-red-600 
                  text-white text-sm font-medium 
                  px-3 py-2 rounded-md
                  transition-all duration-200 
                  hover:-translate-y-0.5
                "
              >
                Sair
              </button>
            </div>
          </div>

          {/* Search and Filters Row */}
          <div
            className="
            flex flex-col sm:flex-row gap-3
            pb-4
          "
          >
            <div className="flex-1">
              <input
                type="text"
                placeholder="Buscar filmes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="
                  w-full px-4 py-3 
                  border border-gray-300 dark:border-gray-600 
                  rounded-lg 
                  bg-white dark:bg-gray-800 
                  text-gray-900 dark:text-white 
                  placeholder-gray-500
                  transition-all duration-200
                  focus:outline-none focus:border-primary-500 
                  focus:ring-2 focus:ring-primary-500/20
                "
              />
            </div>

            <select
              value={selectedGenre || ""}
              onChange={(e) =>
                setSelectedGenre(e.target.value ? Number(e.target.value) : null)
              }
              className="
                px-4 py-3 min-w-[180px]
                border border-gray-300 dark:border-gray-600 
                rounded-lg 
                bg-white dark:bg-gray-800 
                text-gray-900 dark:text-white 
                cursor-pointer
                transition-all duration-200
                focus:outline-none focus:border-primary-500
              "
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
      </header>

      {/* Movies Grid */}
      <main
        className="
        max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8
      "
      >
        {filteredMovies.length === 0 ? (
          <div
            className="
            text-center py-16
            text-gray-500 dark:text-gray-400 text-lg
          "
          >
            <p>Nenhum filme encontrado</p>
          </div>
        ) : (
          <div
            className="
            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
            gap-6 sm:gap-8
          "
          >
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className="
                  group card card-hover cursor-pointer
                  overflow-hidden
                  animate-fade-in
                "
                onClick={() => handleMovieClick(movie.id)}
              >
                {/* Movie Poster */}
                <div
                  className="
                  relative w-full h-96 sm:h-80 lg:h-96
                  overflow-hidden
                "
                >
                  <img
                    src={movie.poster_path}
                    alt={movie.title}
                    loading="lazy"
                    className="
                      w-full h-full object-cover
                      transition-transform duration-300
                      group-hover:scale-105
                    "
                  />

                  {/* Rating Badge */}
                  <div
                    className="
                    absolute top-3 right-3
                    bg-black/80 text-white text-sm font-semibold
                    px-2 py-1 rounded-full
                    backdrop-blur-sm
                  "
                  >
                    <span>⭐ {movie.vote_average.toFixed(1)}</span>
                  </div>
                </div>

                {/* Movie Info */}
                <div className="p-4 sm:p-6">
                  <h3
                    className="
                    text-lg font-semibold 
                    text-gray-900 dark:text-white
                    mb-2 line-clamp-2 leading-tight
                  "
                  >
                    {movie.title}
                  </h3>

                  <p
                    className="
                    text-sm text-gray-600 dark:text-gray-400 mb-2
                  "
                  >
                    {formatDate(movie.release_date)}
                  </p>

                  <p
                    className="
                    text-sm text-primary-500 font-medium mb-3
                  "
                  >
                    {getGenreNames(movie.genre_ids)}
                  </p>

                  <p
                    className="
                    text-sm text-gray-700 dark:text-gray-300 
                    leading-relaxed opacity-80
                    line-clamp-3
                  "
                  >
                    {movie.overview.length > 120
                      ? `${movie.overview.substring(0, 120)}...`
                      : movie.overview}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
