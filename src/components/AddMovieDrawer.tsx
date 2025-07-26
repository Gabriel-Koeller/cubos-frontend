import { useState, useEffect } from "react";
import { X, Upload, Calendar, Star, DollarSign, Clock } from "lucide-react";
import { moviesAPI } from "../services/api";
import type { Genre, Movie } from "../types";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

interface AddMovieDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onMovieAdded: () => void;
  editMovie?: Movie | null;
}

interface MovieFormData {
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  popularity: number;
  runtime: number;
  revenue: number;
  genre_ids: number[];
}

export const AddMovieDrawer: React.FC<AddMovieDrawerProps> = ({
  isOpen,
  onClose,
  onMovieAdded,
  editMovie = null,
}) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<MovieFormData>({
    title: "",
    overview: "",
    poster_path: "",
    backdrop_path: "",
    release_date: "",
    vote_average: 0,
    popularity: 0,
    runtime: 0,
    revenue: 0,
    genre_ids: [],
  });

  useEffect(() => {
    if (isOpen) {
      loadGenres();

      if (!editMovie) {
        setFormData({
          title: "",
          overview: "",
          poster_path: "",
          backdrop_path: "",
          release_date: "",
          vote_average: 0,
          popularity: 0,
          runtime: 0,
          revenue: 0,
          genre_ids: [],
        });
      }
    }
  }, [isOpen, editMovie]);

  useEffect(() => {
    if (isOpen && editMovie && genres.length > 0) {
      let genreIds: number[] = [];

      if (editMovie.genre_list && editMovie.genre_list.length > 0) {
        genreIds = editMovie.genre_list.map((g) => g.id);
      } else if (editMovie.genre_ids && editMovie.genre_ids.length > 0) {
        genreIds = editMovie.genre_ids;
      } else if (editMovie.genre_names && editMovie.genre_names.length > 0) {
        genreIds = editMovie.genre_names
          .map((name) => genres.find((g) => g.name === name)?.id)
          .filter((id): id is number => id !== undefined);
      }

      setFormData({
        title: editMovie.title || "",
        overview: editMovie.overview || "",
        poster_path: editMovie.poster_path || "",
        backdrop_path: editMovie.backdrop_path || "",
        release_date: editMovie.release_date || "",
        vote_average: editMovie.vote_average || 0,
        popularity: editMovie.popularity || 0,
        runtime: editMovie.runtime || 0,
        revenue: editMovie.revenue || 0,
        genre_ids: genreIds,
      });
    }
  }, [isOpen, editMovie, genres]);

  const loadGenres = async () => {
    try {
      const response = await moviesAPI.getGenres();
      setGenres(response.genres || []);
    } catch (error) {
      console.error("Erro ao carregar gêneros:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "vote_average" ||
        name === "popularity" ||
        name === "runtime" ||
        name === "revenue"
          ? parseFloat(value) || 0
          : value,
    }));
  };

  const handleGenreChange = (genreId: number) => {
    setFormData((prev) => ({
      ...prev,
      genre_ids: prev.genre_ids.includes(genreId)
        ? prev.genre_ids.filter((id) => id !== genreId)
        : [...prev.genre_ids, genreId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editMovie) {
        await moviesAPI.updateMovie(editMovie.id, formData);
      } else {
        await moviesAPI.createMovie(formData);
      }

      onMovieAdded();
      handleClose();
    } catch (error) {
      console.error("Erro ao salvar filme:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      overview: "",
      poster_path: "",
      backdrop_path: "",
      release_date: "",
      vote_average: 0,
      popularity: 0,
      runtime: 0,
      revenue: 0,
      genre_ids: [],
    });
    onClose();
  };

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => !open && handleClose()}
    >
      <DrawerContent className="w-full max-w-lg flex flex-col h-full">
        <DrawerHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <DrawerTitle>
              {editMovie ? "Editar Filme" : "Adicionar Filme"}
            </DrawerTitle>
            <DrawerClose asChild>
              <button className="p-2 text-cubos-placeholder hover:text-cubos-white hover:bg-gray-800/50 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6 bg-gray-900/20">
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-cubos-white mb-2">
                  Título *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                  placeholder="Digite o título do filme"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cubos-white mb-2">
                  Sinopse
                </label>
                <textarea
                  name="overview"
                  value={formData.overview}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-700/70 rounded-lg bg-gray-900/30 backdrop-blur-sm text-cubos-white placeholder-cubos-placeholder transition-all duration-200 focus:outline-none focus:border-cubos-primary focus:ring-2 focus:ring-cubos-primary/20 focus:bg-gray-900/50 resize-none"
                  placeholder="Descreva a história do filme..."
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-cubos-white mb-2">
                    <Upload
                      size={16}
                      className="inline mr-2 text-cubos-primary"
                    />
                    URL do Poster
                  </label>
                  <input
                    type="url"
                    name="poster_path"
                    value={formData.poster_path}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="https://exemplo.com/poster.jpg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-cubos-white mb-2">
                    <Upload
                      size={16}
                      className="inline mr-2 text-cubos-primary"
                    />
                    URL do Backdrop
                  </label>
                  <input
                    type="url"
                    name="backdrop_path"
                    value={formData.backdrop_path}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="https://exemplo.com/backdrop.jpg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-cubos-white mb-2">
                  <Calendar
                    size={16}
                    className="inline mr-2 text-cubos-primary"
                  />
                  Data de Lançamento
                </label>
                <input
                  type="date"
                  name="release_date"
                  value={formData.release_date}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-cubos-white mb-2">
                    <Star
                      size={16}
                      className="inline mr-2 text-yellow-400"
                    />
                    Avaliação (0-10)
                  </label>
                  <input
                    type="number"
                    name="vote_average"
                    value={formData.vote_average}
                    onChange={handleInputChange}
                    min="0"
                    max="10"
                    step="0.1"
                    className="input-field"
                    placeholder="8.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-cubos-white mb-2">
                    Popularidade
                  </label>
                  <input
                    type="number"
                    name="popularity"
                    value={formData.popularity}
                    onChange={handleInputChange}
                    min="0"
                    step="0.1"
                    className="input-field"
                    placeholder="1500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-cubos-white mb-2">
                    <Clock
                      size={16}
                      className="inline mr-2 text-cubos-primary"
                    />
                    Duração (min)
                  </label>
                  <input
                    type="number"
                    name="runtime"
                    value={formData.runtime}
                    onChange={handleInputChange}
                    min="1"
                    className="input-field"
                    placeholder="120"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-cubos-white mb-2">
                    <DollarSign
                      size={16}
                      className="inline mr-2 text-green-400"
                    />
                    Receita ($)
                  </label>
                  <input
                    type="number"
                    name="revenue"
                    value={formData.revenue}
                    onChange={handleInputChange}
                    min="0"
                    className="input-field"
                    placeholder="100000000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-cubos-white mb-3">
                  Gêneros
                  {formData.genre_ids.length > 0 && (
                    <span className="ml-2 text-xs text-cubos-primary">
                      ({formData.genre_ids.length} selecionado
                      {formData.genre_ids.length > 1 ? "s" : ""})
                    </span>
                  )}
                </label>
                <div className="bg-gray-900/30 backdrop-blur-sm rounded-lg p-3 border border-gray-700/50">
                  {genres.length === 0 ? (
                    <div className="text-center py-4">
                      <p className="text-cubos-placeholder text-sm">
                        Carregando gêneros...
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                      {genres.map((genre) => (
                        <label
                          key={genre.id}
                          className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition-colors ${
                            formData.genre_ids.includes(genre.id)
                              ? "bg-cubos-primary/20 border border-cubos-primary/30"
                              : "hover:bg-gray-800/50"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.genre_ids.includes(genre.id)}
                            onChange={() => handleGenreChange(genre.id)}
                            className="w-4 h-4 text-cubos-primary bg-gray-800 border-gray-600 rounded focus:ring-cubos-primary focus:ring-2"
                          />
                          <span
                            className={`text-sm ${
                              formData.genre_ids.includes(genre.id)
                                ? "text-cubos-primary font-medium"
                                : "text-cubos-white"
                            }`}
                          >
                            {genre.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t border-gray-700/50">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 h-12 px-6 bg-gray-800/50 hover:bg-gray-700/50 text-cubos-white rounded-lg transition-colors font-medium border border-gray-700/50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading || !formData.title.trim()}
                  className="flex-1 h-12 px-6 btn-primary"
                >
                  {loading
                    ? editMovie
                      ? "Salvando..."
                      : "Criando..."
                    : editMovie
                    ? "Salvar "
                    : "Criar Filme"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
