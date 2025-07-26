export interface User {
  id: number; // Mudou de string para number (INTEGER no banco)
  name: string;
  email: string;
  avatar?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface Movie {
  id: number; // Mudou de string para number (INTEGER no banco)
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  popularity: number;
  user_id: number; // Novo campo para relacionar com o usuário
  created_at?: string; // Novos campos de timestamp
  updated_at?: string;
  genres?: string; // Campo concatenado retornado pela API
  genre_names?: string[]; // Array de nomes dos gêneros
  genre_list?: Genre[]; // Lista de objetos gênero (para detalhes)
}

export interface Genre {
  id: number;
  name: string;
}

export type ThemeMode = "light" | "dark";

export interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
}

// Novas interfaces para as respostas da API

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface ApiError {
  error: string;
}

export interface MovieFilters {
  page?: number;
  limit?: number;
  search?: string;
  genre?: string;
  releaseFrom?: string;
  releaseTo?: string;
  minRating?: string;
  maxRating?: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface MoviesResponse {
  movies: Movie[];
  pagination: Pagination;
}

export interface GenresResponse {
  genres: Genre[];
}

export interface MovieResponse {
  message: string;
  movie: Movie;
}
