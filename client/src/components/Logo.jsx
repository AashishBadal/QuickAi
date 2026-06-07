import { useNavigate } from "react-router-dom";

const Logo = ({ className = "", onClick }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={onClick || (() => navigate("/"))}
      className={`group flex items-center gap-2.5 cursor-pointer ${className}`}
      aria-label="QuickAI home"
    >
      <span className="relative grid place-items-center w-9 h-9 rounded-xl btn-glow">
        <span className="absolute inset-0 rounded-xl blur-md bg-primary/50 group-hover:bg-primary/70 transition-colors" />
        <svg viewBox="0 0 24 24" className="relative w-5 h-5 text-white" fill="none">
          <path
            d="M12 2.5l2.2 5.9 5.9 2.2-5.9 2.2L12 18.7l-2.2-5.9L3.9 10.6l5.9-2.2L12 2.5z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className="font-display text-lg font-semibold tracking-tight text-hi">
        Quick<span className="text-gradient">AI</span>
      </span>
    </button>
  );
};

export default Logo;
