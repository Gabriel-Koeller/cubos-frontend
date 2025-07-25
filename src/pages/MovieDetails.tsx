import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ChevronLeftIcon } from "../components/icons";
import moviesData from "../data/movies.json";
import type { Movie, Genre } from "../types";

export const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
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
      <div className="min-h-screen bg-cubos-bg cubos-bg-pattern flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-xl text-cubos-placeholder">Carregando...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-cubos-bg cubos-bg-pattern flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-cubos-white mb-4">
              Filme não encontrado
            </h1>
            <button
              onClick={() => navigate("/")}
              className="btn-primary"
            >
              Voltar à Home
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const getGenreNames = (genreIds: number[]) => {
    return genreIds
      .map((id) => genres.find((genre) => genre.id === id)?.name)
      .filter(Boolean);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const genreNames = getGenreNames(movie.genre_ids);

  return (
    <div className="min-h-screen bg-cubos-bg cubos-bg-pattern flex flex-col">
      <Header />

      <main className="flex-1 max-w-[1366px]  mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-cubos-white hover:text-cubos-primary transition-colors duration-200 mb-8"
        >
          <ChevronLeftIcon size={20} />
          Voltar
        </button>

        {/* Main Content - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Movie Poster */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <img
                src={movie.poster_path}
                alt={movie.title}
                className="w-full max-w-sm mx-auto lg:max-w-none rounded-lg shadow-2xl"
              />
            </div>
          </div>

          {/* Right Column - Movie Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title Section */}
            <div>
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-cubos-white mb-2">
                {movie.title}
              </h1>
              <p className="text-lg text-cubos-placeholder">
                Título original em inglês
              </p>
            </div>

            {/* Rating Circle */}
            <div className="flex items-center gap-6">
              <div className="relative w-20 h-20">
                {/* Círculo de fundo */}
                <svg
                  className="w-20 h-20 transform -rotate-90"
                  viewBox="0 0 36 36"
                >
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Círculo de progresso */}
                <svg
                  className="w-20 h-20 transform -rotate-90 absolute inset-0"
                  viewBox="0 0 36 36"
                >
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#FFD700"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${movie.vote_average * 10}, 100`}
                    style={{
                      filter: "drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))",
                    }}
                  />
                </svg>

                {/* Texto central */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                    <span className="text-white text-sm font-bold">
                      {Math.round(movie.vote_average * 10)}%
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-cubos-white font-semibold">
                  Avaliação dos usuários
                </p>
                <p className="text-cubos-placeholder text-sm">
                  {Math.round(movie.popularity * 10).toLocaleString()} votos
                </p>
              </div>
            </div>

            {/* Info Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50">
                <h3 className="text-cubos-placeholder text-sm mb-1">
                  POPULARIDADE
                </h3>
                <p className="text-cubos-white font-semibold">
                  {Math.round(movie.popularity).toLocaleString()}
                </p>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50">
                <h3 className="text-cubos-placeholder text-sm mb-1">VOTOS</h3>
                <p className="text-cubos-white font-semibold">
                  {Math.round(movie.popularity * 12).toLocaleString()}
                </p>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50">
                <h3 className="text-cubos-placeholder text-sm mb-1">DURAÇÃO</h3>
                <p className="text-cubos-white font-semibold">2h 06min</p>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50">
                <h3 className="text-cubos-placeholder text-sm mb-1">
                  LANÇAMENTO
                </h3>
                <p className="text-cubos-white font-semibold">
                  {formatDate(movie.release_date)}
                </p>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50">
                <h3 className="text-cubos-placeholder text-sm mb-1">
                  SITUAÇÃO
                </h3>
                <p className="text-cubos-white font-semibold">Lançado</p>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50">
                <h3 className="text-cubos-placeholder text-sm mb-1">RECEITA</h3>
                <p className="text-cubos-white font-semibold">
                  {formatCurrency(467220000)}
                </p>
              </div>
            </div>

            {/* Synopsis */}
            <div>
              <h2 className="text-xl font-bold text-cubos-white mb-4">
                SINOPSE
              </h2>
              <p className="text-cubos-white leading-relaxed text-justify">
                {movie.overview}
              </p>
            </div>

            {/* Genres */}
            <div>
              <h2 className="text-xl font-bold text-cubos-white mb-4">
                Gêneros
              </h2>
              <div className="flex flex-wrap gap-2">
                {genreNames.map((genre, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-cubos-primary/20 text-cubos-primary border border-cubos-primary/30 rounded-full text-sm font-medium"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            {/* Trailer Section */}
            <div>
              <h2 className="text-xl font-bold text-cubos-white mb-4">
                Trailer
              </h2>
              <div className="aspect-video bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-700/50 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-cubos-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-cubos-primary ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="text-cubos-placeholder">
                    Trailer do filme {movie.title}
                  </p>
                  <p className="text-cubos-placeholder text-sm mt-1">
                    Clique para assistir
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
