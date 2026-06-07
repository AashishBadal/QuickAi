import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

/** Shared input styles for all tool pages. */
export const inputClass =
  "w-full glass rounded-xl px-3.5 py-2.5 mt-2 text-sm text-hi placeholder-low outline-none focus:border-primary/50 border-line transition-colors";

/**
 * Asymmetric tool workspace: a narrow, sticky config rail on the left and a
 * large output canvas on the right (not two equal cards).
 */
export const ToolLayout = ({ children }) => (
  <div className="h-full overflow-y-auto p-5 sm:p-6">
    <div className="flex flex-col lg:flex-row gap-5 items-start min-h-full">
      {children}
    </div>
  </div>
);

export const Panel = ({ side = "left", className = "", children }) => {
  const sideClass =
    side === "left"
      ? "w-full lg:w-[360px] lg:shrink-0 lg:sticky lg:top-0"
      : "w-full lg:flex-1 lg:min-h-[calc(100vh-9rem)]";
  const initial =
    side === "left" ? { x: -28, opacity: 0 } : { y: 24, opacity: 0, scale: 0.98 };
  const animate =
    side === "left" ? { x: 0, opacity: 1 } : { y: 0, opacity: 1, scale: 1 };
  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={{ duration: 0.7, ease, delay: side === "left" ? 0 : 0.08 }}
      className={`${sideClass} glass rounded-2xl p-5 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const PanelHeader = ({ Icon, title, accent = "var(--color-primary)" }) => (
  <div className="flex items-center gap-3">
    <span
      className="w-9 h-9 grid place-items-center rounded-xl"
      style={{ background: `${accent}1f`, color: accent }}
    >
      <Icon className="w-5 h-5" />
    </span>
    <h1 className="text-lg font-semibold text-hi">{title}</h1>
  </div>
);

export const FieldLabel = ({ children }) => (
  <p className="mt-6 mb-1 text-sm font-medium text-mid">{children}</p>
);

export const Chip = ({ active, onClick, children }) => (
  <span
    onClick={onClick}
    className={`text-xs px-4 py-1.5 rounded-full cursor-pointer transition-all border ${
      active
        ? "bg-primary/10 text-primary border-primary/40"
        : "text-low border-line hover:border-primary/30 hover:text-mid"
    }`}
  >
    {children}
  </span>
);

export const SubmitButton = ({ loading, gradient, Icon, children }) => (
  <button
    disabled={loading}
    className="w-full flex justify-center items-center gap-2 text-white px-4 py-2.5 mt-6 text-sm font-medium rounded-xl cursor-pointer transition-all hover:brightness-105 disabled:opacity-70"
    style={{
      background: gradient,
      boxShadow: "0 10px 26px -14px rgba(22,163,74,0.6)",
    }}
  >
    {loading ? (
      <span className="w-4 h-4 rounded-full border-2 border-white/50 border-t-white animate-spin" />
    ) : (
      <Icon className="w-5 h-5" />
    )}
    {children}
  </button>
);

export const EmptyState = ({ Icon, children }) => (
  <div className="flex-1 flex justify-center items-center py-16">
    <div className="text-sm flex flex-col items-center gap-4 text-low text-center max-w-xs">
      <span className="w-14 h-14 grid place-items-center rounded-2xl glass">
        <Icon className="w-7 h-7 text-mid" />
      </span>
      <p>{children}</p>
    </div>
  </div>
);
