import React from "react";
import { createPortal } from "react-dom";
import { TriangleAlert, X } from "lucide-react";

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  // Render through a portal to <body> so the modal escapes any ancestor that
  // creates a containing block / stacking context (e.g. the .glass card's
  // backdrop-filter), which would otherwise trap this fixed overlay behind
  // sibling cards.
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="glass-strong rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6 animate-[scaleIn_0.2s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="w-11 h-11 rounded-full bg-fuchsia/15 grid place-items-center">
            <TriangleAlert className="w-5 h-5 text-fuchsia" />
          </div>
          <X
            onClick={onClose}
            className="w-5 h-5 text-low hover:text-hi cursor-pointer transition"
          />
        </div>

        <h3 className="text-lg font-semibold text-hi mb-1.5">
          {title || "Delete Creation"}
        </h3>
        <p className="text-sm text-mid mb-6">
          {message ||
            "This action cannot be undone. Are you sure you want to permanently delete this creation?"}
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 text-sm font-medium rounded-xl glass hover:glass-strong text-mid transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 px-4 py-2.5 text-sm font-medium rounded-xl bg-fuchsia text-white hover:brightness-110 transition cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmModal;
