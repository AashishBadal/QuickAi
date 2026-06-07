import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Heart, Users, Trash2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import ConfirmModal from "../components/ConfirmModal";
import Reveal from "../components/Reveal";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setCreations] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const { getToken } = useAuth();

  const fetchCreations = async () => {
    try {
      const { data } = await axios.get("/api/user/get-published-creations", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const imageLikeToggle = async (id) => {
    try {
      const { data } = await axios.post(
        "/api/user/toggle-like-creation",
        { id },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );
      if (data.success) {
        toast.success(data.message);
        await fetchCreations();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.post(
        "/api/user/delete-creation",
        { id },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );
      if (data.success) {
        toast.success(data.message);
        await fetchCreations();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) fetchCreations();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <span className="w-10 h-10 rounded-full border-[3px] border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-5 p-6 overflow-hidden">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display text-2xl font-semibold text-hi">
            Community Creations
          </h1>
          <p className="text-sm text-low mt-1">
            Discover public generations by the community.
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-scroll">
        {creations.length === 0 ? (
          <div className="glass rounded-2xl flex flex-col justify-center items-center py-24 text-low">
            <Users className="w-12 h-12 mb-3 text-mid" />
            <p>No public creations found. Be the first to share one!</p>
          </div>
        ) : (
          <Reveal
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            stagger={0.06}
            y={30}
          >
            {creations.map((creation, index) => {
              const isLiked = creation.likes?.includes(user?.id);
              const likeCount = creation.likes?.length || 0;
              const isOwner = creation.user_id === user?.id;

              return creation.type === "image" ? (
                <div
                  key={index}
                  className="relative group overflow-hidden rounded-2xl border border-line h-72"
                >
                  <img
                    src={creation.content}
                    alt={creation.prompt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                    <span className="self-start text-[10px] font-semibold uppercase tracking-wider bg-white/15 backdrop-blur-md px-2.5 py-0.5 rounded-full">
                      {creation.type}
                    </span>
                    <div className="flex justify-between items-end gap-2">
                      <p className="text-xs line-clamp-2 max-w-[80%]">
                        {creation.prompt}
                      </p>
                      <div className="flex gap-1.5 items-center">
                        {isOwner && (
                          <Trash2
                            onClick={() => setDeleteId(creation.id)}
                            className="w-4 h-4 text-white/70 hover:text-fuchsia cursor-pointer transition"
                          />
                        )}
                        <div className="flex gap-1.5 items-center bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm">
                          <p className="text-xs">{likeCount}</p>
                          <Heart
                            onClick={() => imageLikeToggle(creation.id)}
                            className={`w-4 h-4 hover:scale-110 cursor-pointer transition ${
                              isLiked ? "fill-fuchsia text-fuchsia" : "text-white"
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  key={index}
                  className="glass hover:glass-strong transition-colors rounded-2xl p-4 h-72 flex flex-col justify-between"
                >
                  <div className="overflow-hidden flex-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-accent bg-accent/10 border border-accent/30 px-2.5 py-0.5 rounded-full">
                      {creation.type}
                    </span>
                    <h3 className="font-medium text-hi text-xs line-clamp-2 my-2.5 leading-relaxed">
                      {creation.prompt}
                    </h3>
                    <div className="text-[11px] line-clamp-6 md-body">
                      <Markdown>{creation.content}</Markdown>
                    </div>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-line flex justify-between items-center">
                    <span className="text-[10px] text-low capitalize">
                      {creation.type.replace("-", " ")}
                    </span>
                    <div className="flex gap-1.5 items-center text-mid">
                      {isOwner && (
                        <Trash2
                          onClick={() => setDeleteId(creation.id)}
                          className="w-4 h-4 text-low hover:text-fuchsia cursor-pointer transition"
                        />
                      )}
                      <p className="text-xs">{likeCount}</p>
                      <Heart
                        onClick={() => imageLikeToggle(creation.id)}
                        className={`w-4 h-4 hover:scale-110 cursor-pointer transition ${
                          isLiked ? "fill-fuchsia text-fuchsia" : "text-low"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </Reveal>
        )}
      </div>

      <ConfirmModal
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => handleDelete(deleteId)}
      />
    </div>
  );
};

export default Community;
