export interface User {
  id: number;
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
  id: number;
  title: string;
  overview?: string;
  poster_path?: string;
  backdrop_path?: string;
  release_date?: string;
  vote_average?: number;
  popularity?: number;
  runtime?: number;
  revenue?: number;
  user_id?: number;
  created_at?: string;
  updated_at?: string;
  genres?: string;
  genre_names?: string[];
  genre_list?: Genre[];
  genre_ids?: number[];
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
