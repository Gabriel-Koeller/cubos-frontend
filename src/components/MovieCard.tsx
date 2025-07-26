import React from "react";
import type { Movie } from "../types";

interface MovieCardProps {
  movie: Movie;
  onClick: (movieId: number) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const genreNames =
    movie.genre_names?.join(", ") ||
    (movie.genres ? movie.genres : "Sem gênero");

  return (
    <div
      className="group cursor-pointer animate-fade-in"
      onClick={() => onClick(movie.id)}
    >
      <div className="relative overflow-hidden rounded shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] w-36 h-54 sm:w-40 sm:h-60 lg:w-44 lg:h-66 2xl:w-card 2xl:h-card">
        <div className="relative w-full h-full overflow-hidden">
          <img
            src={movie.poster_path}
            alt={movie.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute inset-x-0 bottom-0 h-16 sm:h-20 2xl:h-24 bg-gradient-to-t from-gray-900/95 via-gray-900/70 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3 2xl:p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent group-hover:opacity-0 transition-opacity duration-300">
            <h3 className="text-white font-semibold text-xs sm:text-sm leading-tight">
              {movie.title.toUpperCase()}
            </h3>
          </div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 2xl:w-28 2xl:h-28">
              <svg
                className="w-20 h-20 sm:w-24 sm:h-24 2xl:w-28 2xl:h-28 transform -rotate-90 absolute inset-0"
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
                className="w-20 h-20 sm:w-24 sm:h-24 2xl:w-28 2xl:h-28 transform -rotate-90 absolute inset-0"
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

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 2xl:w-20 2xl:h-20 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                  <span className="text-white text-sm sm:text-lg 2xl:text-xl font-bold drop-shadow-2xl">
                    {Math.round(movie.vote_average * 10)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3 2xl:p-4 bg-gradient-to-t from-black/95 via-black/80 to-transparent transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
            <h3 className="text-white font-semibold text-xs sm:text-sm mb-1 sm:mb-2 line-clamp-2 leading-tight">
              {movie.title.toUpperCase()}
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm line-clamp-1">
              {genreNames}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
