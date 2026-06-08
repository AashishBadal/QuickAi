import React, { useEffect, useRef, useState } from "react";
import { Gem, Sparkles, TrendingUp, Trash2, X } from "lucide-react";
import { Protect, useAuth } from "@clerk/clerk-react";
import { motion, AnimatePresence, animate } from "framer-motion";
import CreationItem from "../components/CreationItem";
import ConfirmModal from "../components/ConfirmModal";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const cardMotion = (i) => ({
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.09 },
});

const Dashboard = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(new Set());
  const [bulkConfirm, setBulkConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { getToken } = useAuth();
  const countRef = useRef(null);

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/user/get-user-creations", {
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

  useEffect(() => {
    getDashboardData();
  }, []);

  // count-up animation for the total once data arrives
  useEffect(() => {
    if (!countRef.current) return;
    const node = countRef.current;
    const controls = animate(0, creations.length, {
      duration: 1.1,
      ease: "easeOut",
      onUpdate: (v) => {
        node.textContent = Math.round(v);
      },
    });
    return () => controls.stop();
  }, [creations.length]);

  // keep selection pruned to the creations that still exist
  useEffect(() => {
    setSelected((prev) => {
      const ids = new Set(creations.map((c) => c.id));
      const next = new Set([...prev].filter((id) => ids.has(id)));
      return next.size === prev.size ? prev : next;
    });
  }, [creations]);

  const toggleSelect = (id) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const allSelected = creations.length > 0 && selected.size === creations.length;
  const toggleSelectAll = () =>
    setSelected(allSelected ? new Set() : new Set(creations.map((c) => c.id)));

  const handleBulkDelete = async () => {
    setDeleting(true);
    try {
      const { data } = await axios.post(
        "/api/user/delete-creations",
        { ids: [...selected] },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );
      if (data.success) {
        toast.success(data.message);
        setSelected(new Set());
        await getDashboardData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setDeleting(false);
  };

  return (
    <div className="h-full overflow-y-scroll p-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-hi">Dashboard</h1>
        <p className="text-sm text-low mt-1">Welcome back — here's your activity.</p>
      </div>

      <div className="flex gap-4 flex-wrap mt-6">
        {/* Total Creations */}
        <motion.div
          {...cardMotion(0)}
          className="spotlight glass hover:glass-strong transition-colors flex justify-between items-center w-full sm:w-72 p-5 rounded-2xl"
        >
          <div>
            <p className="text-sm text-mid">Total Creations</p>
            <h2 ref={countRef} className="text-3xl font-display font-semibold text-hi mt-1">
              0
            </h2>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent grid place-items-center shadow-[0_10px_30px_-10px_rgba(22,163,74,0.6)]">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
        </motion.div>

        {/* Active Plan */}
        <motion.div
          {...cardMotion(1)}
          className="spotlight glass hover:glass-strong transition-colors flex justify-between items-center w-full sm:w-72 p-5 rounded-2xl"
        >
          <div>
            <p className="text-sm text-mid">Active Plan</p>
            <h2 className="text-3xl font-display font-semibold text-hi mt-1">
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect>
            </h2>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 grid place-items-center shadow-[0_10px_30px_-10px_rgba(16,185,129,0.6)]">
            <Gem className="w-5 h-5 text-white" />
          </div>
        </motion.div>

        {/* Activity */}
        <motion.div
          {...cardMotion(2)}
          className="spotlight glass hover:glass-strong transition-colors flex justify-between items-center w-full sm:w-72 p-5 rounded-2xl"
        >
          <div>
            <p className="text-sm text-mid">This Workspace</p>
            <h2 className="text-3xl font-display font-semibold text-hi mt-1">Active</h2>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 grid place-items-center shadow-[0_10px_30px_-10px_rgba(20,184,166,0.6)]">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
        </motion.div>
      </div>

      {loading ? (
        <div className="flex flex-col justify-center items-center h-3/4">
          <span className="w-10 h-10 rounded-full border-[3px] border-primary border-t-transparent animate-spin" />
          <p className="text-sm text-mid mt-3 text-center px-4 max-w-md">The backend is deployed on Render which shutsdown after 15 mins of inactivity so please wait for 2 mins for the first request</p>
        </div>
      ) : (
        <div className="mt-10">
          <div className="flex items-center justify-between gap-4 mb-4 min-h-9">
            <div className="flex items-center gap-4">
              <p className="text-sm font-medium text-mid">Recent Creations</p>
              {creations.length > 0 && (
                <button
                  onClick={toggleSelectAll}
                  className="text-xs text-primary hover:underline cursor-pointer"
                >
                  {allSelected ? "Deselect all" : "Select all"}
                </button>
              )}
            </div>

            <AnimatePresence>
              {selected.size > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 glass rounded-full pl-4 pr-1.5 py-1.5"
                >
                  <span className="text-xs text-mid">{selected.size} selected</span>
                  <button
                    onClick={() => setSelected(new Set())}
                    aria-label="Clear selection"
                    className="grid place-items-center w-6 h-6 rounded-full text-low hover:text-hi hover:bg-black/5 transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setBulkConfirm(true)}
                    disabled={deleting}
                    className="flex items-center gap-1.5 text-xs font-medium text-white bg-fuchsia hover:brightness-110 transition rounded-full px-3 py-1.5 cursor-pointer disabled:opacity-60"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    {deleting ? "Deleting…" : "Delete"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {creations.length === 0 ? (
            <div className="glass rounded-2xl py-16 text-center text-low">
              No creations yet. Pick a tool from the sidebar to begin.
            </div>
          ) : (
            <div className="space-y-3">
              {creations.map((item) => (
                <CreationItem
                  key={item.id}
                  item={item}
                  onDelete={getDashboardData}
                  selected={selected.has(item.id)}
                  onToggleSelect={toggleSelect}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <ConfirmModal
        isOpen={bulkConfirm}
        onClose={() => setBulkConfirm(false)}
        onConfirm={handleBulkDelete}
        title={`Delete ${selected.size} creation${selected.size === 1 ? "" : "s"}?`}
        message={`This action cannot be undone. Are you sure you want to permanently delete ${
          selected.size === 1 ? "this creation" : "these creations"
        }?`}
      />
    </div>
  );
};

export default Dashboard;
