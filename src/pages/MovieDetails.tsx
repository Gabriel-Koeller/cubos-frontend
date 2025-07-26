import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { AddMovieDrawer } from "../components/AddMovieDrawer";
import { ConfirmDeleteModal } from "../components/ConfirmDeleteModal";
import { ChevronLeftIcon } from "../components/icons";
import { EditIcon, TrashIcon } from "lucide-react";
import { moviesAPI } from "../services/api";
import type { Movie, Genre } from "../types";

export const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);

  const loadMovieDetails = async () => {
    if (!id) {
      setError("ID do filme não encontrado");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const movieId = parseInt(id, 10);
      if (isNaN(movieId)) {
        setError("ID do filme inválido");
        setLoading(false);
        return;
      }

      const [movieResponse, genresResponse] = await Promise.all([
        moviesAPI.getMovieById(movieId),
        moviesAPI.getGenres(),
      ]);

      setMovie(movieResponse);
      setGenres(genresResponse.genres);
    } catch (err: any) {
      console.error("Erro ao carregar detalhes do filme:", err);
      setError("Erro ao carregar detalhes do filme. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovieDetails();
  }, [id]);

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

  const handleDeleteMovie = async () => {
    if (!movie) return;

    try {
      setDeleting(true);
      await moviesAPI.deleteMovie(movie.id);
      setIsConfirmDeleteModalOpen(false);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Erro ao deletar filme:", error);
      alert("Erro ao deletar o filme. Tente novamente.");
    } finally {
      setDeleting(false);
    }
  };

  const handleEditMovie = () => {
    setIsEditDrawerOpen(true);
  };

  const handleMovieUpdated = () => {
    if (id) {
      loadMovieDetails();
    }
  };

  const genreNames =
    movie?.genre_list?.map((g) => g.name) ||
    movie?.genre_names ||
    movie?.genre_ids
      ?.map((id) => genres.find((genre) => genre.id === id)?.name)
      .filter((name): name is string => Boolean(name)) ||
    [];

  if (loading) {
    return (
      <div className="min-h-screen bg-cubos-bg cubos-bg-pattern flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-white">Carregando...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-cubos-bg cubos-bg-pattern flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-red-500">Erro: {error}</div>
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
          <div className="text-white">Filme não encontrado</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cubos-bg cubos-bg-pattern flex flex-col">
      <Header />

      <main className="flex-1 max-w-[1366px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-cubos-white hover:text-cubos-primary transition-colors duration-200 mb-8"
        >
          <ChevronLeftIcon size={20} />
          Voltar
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <img
                src={movie.poster_path}
                alt={movie.title}
                className="w-full max-w-sm mx-auto lg:max-w-none rounded-lg shadow-2xl"
              />
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-cubos-white mb-2">
                {movie.title}
              </h1>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
                  <svg
                    className="w-full h-full transform -rotate-90"
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

                  <svg
                    className="w-full h-full transform -rotate-90 absolute inset-0"
                    viewBox="0 0 36 36"
                  >
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#FFD700"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={`${(movie.vote_average || 0) * 10}, 100`}
                      style={{
                        filter: "drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))",
                      }}
                    />
                  </svg>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                      <span className="text-white text-xs sm:text-sm font-bold">
                        {Math.round((movie.vote_average || 0) * 10)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-cubos-white font-semibold text-sm sm:text-base">
                    Avaliação dos usuários
                  </p>
                  <p className="text-cubos-placeholder text-xs sm:text-sm">
                    {Math.round((movie.popularity || 0) * 10).toLocaleString()}{" "}
                    votos
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3">
                <button
                  onClick={handleEditMovie}
                  className="flex items-center justify-center gap-2 px-4 py-3 sm:py-2 bg-cubos-primary hover:bg-cubos-primary/80 text-cubos-white text-sm font-medium rounded-lg transition-colors w-full sm:w-auto"
                >
                  <EditIcon size={16} />
                  <span>Editar</span>
                </button>
                <button
                  onClick={() => setIsConfirmDeleteModalOpen(true)}
                  disabled={deleting}
                  className="flex items-center justify-center gap-2 px-4 py-3 sm:py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors w-full sm:w-auto"
                >
                  <TrashIcon size={16} />
                  <span>{deleting ? "Deletando..." : "Deletar"}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50">
                <h3 className="text-cubos-placeholder text-sm mb-1">
                  POPULARIDADE
                </h3>
                <p className="text-cubos-white font-semibold">
                  {Math.round((movie.popularity || 0) * 10).toLocaleString()}
                </p>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50">
                <h3 className="text-cubos-placeholder text-sm mb-1">VOTOS</h3>
                <p className="text-cubos-white font-semibold">
                  {Math.round((movie.popularity || 0) * 12).toLocaleString()}
                </p>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50">
                <h3 className="text-cubos-placeholder text-sm mb-1">DURAÇÃO</h3>
                <p className="text-cubos-white font-semibold">
                  {movie.runtime} min
                </p>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50">
                <h3 className="text-cubos-placeholder text-sm mb-1">
                  LANÇAMENTO
                </h3>
                <p className="text-cubos-white font-semibold">
                  {formatDate(movie.release_date || "")}
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
                  {formatCurrency(movie.revenue || 0)}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-cubos-white mb-4">
                SINOPSE
              </h2>
              <p className="text-cubos-white leading-relaxed text-justify">
                {movie.overview}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-cubos-white mb-4">
                Gêneros
              </h2>
              <div className="flex flex-wrap gap-2">
                {genreNames.map((genre: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-cubos-primary/20 text-cubos-primary border border-cubos-primary/30 rounded-full text-sm font-medium"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
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

      <AddMovieDrawer
        isOpen={isEditDrawerOpen}
        onClose={() => setIsEditDrawerOpen(false)}
        onMovieAdded={handleMovieUpdated}
        editMovie={movie}
      />

      <ConfirmDeleteModal
        isOpen={isConfirmDeleteModalOpen}
        onClose={() => setIsConfirmDeleteModalOpen(false)}
        onConfirm={handleDeleteMovie}
        movieTitle={movie?.title || ""}
        isDeleting={deleting}
      />
    </div>
  );
};
