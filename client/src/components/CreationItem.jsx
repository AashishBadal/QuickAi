import React, { useState } from "react";
import Markdown from "react-markdown";
import { Check, ChevronDown, Trash2 } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import ConfirmModal from "./ConfirmModal";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const typeColor = {
  article: "text-accent border-accent/30 bg-accent/10",
  "blog-title": "text-amber-300 border-amber-400/30 bg-amber-400/10",
  image: "text-primary border-primary/30 bg-primary/10",
  "resume-review": "text-emerald-300 border-emerald-400/30 bg-emerald-400/10",
};

const CreationItem = ({ item, onDelete, selected = false, onToggleSelect }) => {
  const [expanded, setExpanded] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { getToken } = useAuth();

  const handleDelete = async () => {
    try {
      const { data } = await axios.post(
        "/api/user/delete-creation",
        { id: item.id },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );
      if (data.success) {
        toast.success(data.message);
        if (onDelete) onDelete();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className={`group glass hover:glass-strong transition-all p-4 sm:p-5 rounded-2xl cursor-pointer ${
        selected ? "ring-2 ring-primary/60" : ""
      }`}
    >
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-3 min-w-0">
          {onToggleSelect && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSelect(item.id);
              }}
              aria-label={selected ? "Deselect creation" : "Select creation"}
              className={`shrink-0 w-5 h-5 rounded-md border grid place-items-center transition-colors ${
                selected
                  ? "bg-primary border-primary text-white"
                  : "border-line text-transparent hover:border-primary/60"
              }`}
            >
              <Check className="w-3.5 h-3.5" strokeWidth={3} />
            </button>
          )}
          <div className="min-w-0">
            <h2 className="text-sm text-hi truncate">{item.prompt}</h2>
            <p className="text-xs text-low mt-0.5">
              {new Date(item.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span
            className={`text-[11px] px-3 py-1 rounded-full border capitalize ${
              typeColor[item.type] || "text-mid border-line bg-black/5"
            }`}
          >
            {item.type.replace("-", " ")}
          </span>
          <Trash2
            onClick={(e) => {
              e.stopPropagation();
              setConfirmOpen(true);
            }}
            className="w-4 h-4 text-low hover:text-fuchsia transition cursor-pointer"
          />
          <ChevronDown
            className={`w-4 h-4 text-low transition-transform ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-line">
          {item.type === "image" ? (
            <img src={item.content} alt="" className="w-full max-w-md rounded-xl" />
          ) : (
            <div className="max-h-72 overflow-y-scroll md-body">
              <Markdown>{item.content}</Markdown>
            </div>
          )}
        </div>
      )}

      <div onClick={(e) => e.stopPropagation()}>
        <ConfirmModal
          isOpen={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleDelete}
        />
      </div>
    </div>
  );
};

export default CreationItem;
