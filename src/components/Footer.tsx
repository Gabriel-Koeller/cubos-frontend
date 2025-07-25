import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-gray-800/50 bg-[#12111350] backdrop-blur-sm">
      <div className="max-w-[1366px]  mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-center text-sm text-cubos-placeholder">
          2025 © Todos os direitos reservados a{" "}
          <strong className="text-cubos-white">Cubos Movies</strong>
        </p>
      </div>
    </footer>
  );
};
