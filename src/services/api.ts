import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("cubos-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("cubos-token");
      localStorage.removeItem("cubos-user");

      if (
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/cadastro"
      ) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  register: async (name: string, email: string, password: string) => {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
    });
    return response.data;
  },

  verifyToken: async () => {
    const response = await api.get("/auth/verify");
    return response.data;
  },

  logout: async () => {
    const response = await api.post("/auth/logout");
    localStorage.removeItem("cubos-token");
    localStorage.removeItem("cubos-user");
    return response.data;
  },
};

export const moviesAPI = {
  getMovies: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    genre?: string;
    releaseFrom?: string;
    releaseTo?: string;
    minRating?: number;
    maxRating?: number;
  }) => {
    const response = await api.get("/movies", { params });
    return response.data;
  },

  getMovieById: async (id: number) => {
    const response = await api.get(`/movies/${id}`);
    return response.data;
  },

  createMovie: async (movieData: {
    title: string;
    overview?: string;
    poster_path?: string;
    backdrop_path?: string;
    release_date?: string;
    vote_average?: number;
    popularity?: number;
    runtime?: number;
    revenue?: number;
    genre_ids?: number[];
  }) => {
    const response = await api.post("/movies", movieData);
    return response.data;
  },

  updateMovie: async (id: number, movieData: any) => {
    const response = await api.put(`/movies/${id}`, movieData);
    return response.data;
  },

  deleteMovie: async (id: number) => {
    const response = await api.delete(`/movies/${id}`);
    return response.data;
  },

  getGenres: async () => {
    const response = await api.get("/movies/utils/genres");
    return response.data;
  },
};

export default api;
