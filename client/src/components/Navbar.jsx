import { useEffect, useState } from "react";
import { ArrowRight, LayoutDashboard } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useMagnetic } from "../hooks/useTilt";
import Logo from "./Logo";

const Navbar = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const magnet = useMagnetic(0.4);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className={`fixed z-40 w-full flex justify-between items-center px-4 sm:px-20 xl:px-32 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-canvas/80 backdrop-blur-xl border-b border-line"
          : "py-5 bg-transparent border-b border-transparent"
      }`}
    >
      <Logo />

      {user ? (
        <div className="flex items-center gap-3 sm:gap-4">
          <motion.button
            style={magnet.style}
            onMouseMove={magnet.onMouseMove}
            onMouseLeave={magnet.onMouseLeave}
            onClick={() => navigate("/ai")}
            className="btn-glow group flex items-center gap-2 rounded-full text-sm font-medium cursor-pointer text-white px-5 sm:px-6 py-2.5"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </motion.button>
          <div className="scale-110">
            <UserButton />
          </div>
        </div>
      ) : (
        <motion.button
          style={magnet.style}
          onMouseMove={magnet.onMouseMove}
          onMouseLeave={magnet.onMouseLeave}
          onClick={openSignIn}
          className="btn-glow group flex items-center gap-2 rounded-full text-sm font-medium cursor-pointer text-white px-6 sm:px-7 py-2.5"
        >
          Get Started
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </motion.button>
      )}
    </motion.div>
  );
};

export default Navbar;
