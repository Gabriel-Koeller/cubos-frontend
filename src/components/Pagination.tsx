import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const getVisiblePages = () => {
    const visiblePages = Math.min(maxVisiblePages, totalPages);
    const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex justify-center items-center mt-12 gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800/50 text-cubos-white hover:bg-cubos-primary transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ‹
      </button>

      {visiblePages.map((pageNum) => {
        const isActive = pageNum === currentPage;

        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`
              w-10 h-10 flex items-center justify-center rounded-lg font-semibold transition-all duration-200
              ${
                isActive
                  ? "bg-cubos-primary text-white"
                  : "bg-gray-800/50 text-cubos-white hover:bg-cubos-primary/20"
              }
            `}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800/50 text-cubos-white hover:bg-cubos-primary transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ›
      </button>
    </div>
  );
};
