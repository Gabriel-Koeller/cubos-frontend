import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ThemeToggle } from "../components/ThemeToggle";
import moviesData from "../data/movies.json";
import type { Movie, Genre } from "../types";

export const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundMovie = moviesData.movies.find((m) => m.id === id);
    setMovie(foundMovie || null);
    setGenres(moviesData.genres);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-xl text-gray-600 dark:text-gray-400">
          Carregando...
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Filme não encontrado</h1>
          <button
            onClick={() => navigate("/")}
            className="btn-primary"
          >
            Voltar para Home
          </button>
        </div>
      </div>
    );
  }

  const getGenreNames = (genreIds: number[]) => {
    return genreIds
      .map((id) => genres.find((genre) => genre.id === id)?.name)
      .filter(Boolean)
      .join(", ");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
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
      "
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/")}
                className="
                  text-primary-500 hover:text-primary-600
                  font-medium transition-colors duration-200
                  flex items-center gap-2
                "
              >
                ← Voltar
              </button>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {movie.title}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
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
        </div>
      </header>

      {/* Movie Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Movie Poster */}
          <div className="lg:col-span-1">
            <div
              className="
              relative w-full max-w-md mx-auto lg:max-w-none
              rounded-2xl overflow-hidden
              shadow-2xl
            "
            >
              <img
                src={movie.poster_path}
                alt={movie.title}
                className="w-full h-auto object-cover"
              />

              {/* Rating Badge */}
              <div
                className="
                absolute top-4 right-4
                bg-black/80 text-white text-lg font-bold
                px-3 py-2 rounded-full
                backdrop-blur-sm
              "
              >
                <span>⭐ {movie.vote_average.toFixed(1)}</span>
              </div>
            </div>
          </div>

          {/* Movie Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Basic Info */}
            <div>
              <h1
                className="
                text-3xl sm:text-4xl lg:text-5xl font-bold 
                text-gray-900 dark:text-white mb-4
              "
              >
                {movie.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-2">
                  📅 {formatDate(movie.release_date)}
                </span>
                <span className="flex items-center gap-2">
                  📊 {movie.vote_average.toFixed(1)}/10
                </span>
                <span className="flex items-center gap-2">
                  🔥 {movie.popularity.toLocaleString()} visualizações
                </span>
              </div>
            </div>

            {/* Genres */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Gêneros
              </h3>
              <div className="flex flex-wrap gap-2">
                {movie.genre_ids.map((genreId) => {
                  const genre = genres.find((g) => g.id === genreId);
                  return genre ? (
                    <span
                      key={genreId}
                      className="
                        bg-primary-100 dark:bg-primary-900 
                        text-primary-800 dark:text-primary-200
                        px-3 py-1 rounded-full text-sm font-medium
                      "
                    >
                      {genre.name}
                    </span>
                  ) : null;
                })}
              </div>
            </div>

            {/* Overview */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Sinopse
              </h3>
              <p
                className="
                text-gray-700 dark:text-gray-300 
                leading-relaxed text-base sm:text-lg
              "
              >
                {movie.overview}
              </p>
            </div>

            {/* Additional Info */}
            <div
              className="
              grid grid-cols-1 sm:grid-cols-2 gap-6
              p-6 
              bg-gray-50 dark:bg-gray-800 
              rounded-xl
            "
            >
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Data de Lançamento
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {formatDate(movie.release_date)}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Avaliação
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {movie.vote_average.toFixed(1)}/10 ⭐
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Popularidade
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {movie.popularity.toLocaleString()} visualizações
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Gêneros
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {getGenreNames(movie.genre_ids)}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                onClick={() => navigate("/")}
                className="btn-primary flex-1 sm:flex-none"
              >
                ← Voltar para Home
              </button>

              <button
                className="
                  border-2 border-primary-500 text-primary-500 
                  hover:bg-primary-500 hover:text-white
                  font-semibold py-3 px-6 rounded-lg
                  transition-all duration-200
                  flex-1 sm:flex-none
                "
              >
                ❤️ Favoritar
              </button>
            </div>
          </div>
        </div>

        {/* Backdrop Image (se disponível) */}
        {movie.backdrop_path && (
          <div className="mt-12">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Imagem de Fundo
            </h3>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={movie.backdrop_path}
                alt={`${movie.title} backdrop`}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
