import React from "react";
import { X, AlertTriangle } from "lucide-react";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  movieTitle: string;
  isDeleting: boolean;
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  movieTitle,
  isDeleting,
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-gray-900/95 backdrop-blur-md rounded-2xl border border-gray-700/50 w-full max-w-md shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                <AlertTriangle
                  size={20}
                  className="text-red-500"
                />
              </div>
              <h2 className="text-xl font-bold text-cubos-white">
                Confirmar Exclusão
              </h2>
            </div>
            <button
              onClick={onClose}
              disabled={isDeleting}
              className="p-2 text-cubos-placeholder hover:text-cubos-white hover:bg-gray-800/50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6">
            <p className="text-cubos-white text-base leading-relaxed mb-2">
              Tem certeza que deseja excluir o filme:
            </p>
            <p className="text-cubos-primary font-semibold text-lg mb-4">
              "{movieTitle}"
            </p>
            <p className="text-cubos-placeholder text-sm">
              Esta ação não pode ser desfeita. O filme será removido
              permanentemente do catálogo.
            </p>
          </div>

          <div className="flex gap-3 p-6 pt-0">
            <button
              type="button"
              onClick={onClose}
              disabled={isDeleting}
              className="flex-1 h-12 px-6 bg-gray-800/50 hover:bg-gray-700/50 text-cubos-white rounded-lg transition-colors font-medium border border-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={isDeleting}
              className="flex-1 h-12 px-6 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
            >
              {isDeleting ? "Excluindo..." : "Sim, Excluir"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
