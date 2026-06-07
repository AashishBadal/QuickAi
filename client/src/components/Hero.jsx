import { useNavigate } from "react-router-dom";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMagnetic } from "../hooks/useTilt";
import img1 from "../assets/ai_gen_img_1.png";
import img2 from "../assets/ai_gen_img_2.png";
import img3 from "../assets/ai_gen_img_3.png";

// Floating collage of real generated images. depth = parallax strength.
const cards = [
  { img: img1, cls: "top-[12%] left-[4%] w-36 xl:w-44", rot: -8, depth: 26, cap: "Anime fox, boat at dusk", show: "hidden md:block" },
  { img: img2, cls: "top-[50%] left-[7%] w-28 xl:w-36", rot: 6, depth: 48, show: "hidden lg:block" },
  { img: img3, cls: "bottom-[8%] left-[19%] w-28 xl:w-32", rot: -5, depth: 66, show: "hidden xl:block" },
  { img: img3, cls: "top-[15%] right-[5%] w-32 xl:w-40", rot: 7, depth: 36, cap: "A car above the clouds", show: "hidden md:block" },
  { img: img1, cls: "top-[48%] right-[5%] w-36 xl:w-44", rot: -7, depth: 22, show: "hidden lg:block" },
  { img: img2, cls: "bottom-[9%] right-[17%] w-28 xl:w-32", rot: 5, depth: 58, show: "hidden xl:block" },
];

const FloatCard = ({ c, i, mx, my }) => {
  const x = useTransform(mx, (v) => -v * c.depth);
  const y = useTransform(my, (v) => -v * c.depth);
  return (
    <motion.div
      style={{ x, y }}
      initial={{ scale: 0.4, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.15 + i * 0.08, type: "spring", stiffness: 120, damping: 14 }}
      className={`absolute ${c.cls} ${c.show}`}
    >
      <div className="animate-[float_6s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.7}s` }}>
        <div
          className="relative rounded-2xl overflow-hidden border border-line shadow-xl shadow-black/10"
          style={{ transform: `rotate(${c.rot}deg)` }}
        >
          <img src={c.img} alt="" className="w-full h-full object-cover" />
          {c.cap && (
            <span className="absolute bottom-1.5 left-1.5 right-1.5 text-[9px] text-white glass-strong !bg-black/55 px-2 py-0.5 rounded-md truncate">
              {c.cap}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Hero = () => {
  const navigate = useNavigate();
  const magnet = useMagnetic(0.3);
  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });

  const onMouseMove = (e) => {
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  };

  const ease = [0.16, 1, 0.3, 1];

  return (
    <section
      onMouseMove={onMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-12 pt-36 sm:pt-40 pb-16 overflow-hidden"
    >
      {/* ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full bg-primary/10 blur-[140px] pointer-events-none" />

      {/* floating image collage */}
      <div className="absolute inset-0 pointer-events-none">
        {cards.map((c, i) => (
          <FloatCard key={i} c={c} i={i} mx={mx} my={my} />
        ))}
      </div>

      {/* foreground content */}
      <div className="relative z-10 max-w-3xl">
        <motion.div
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease, delay: 0.15 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass text-xs sm:text-sm text-mid mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          One workspace. Six AI tools.
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        </motion.div>

        <h1 className="font-display font-semibold tracking-tight leading-[1.02] text-5xl sm:text-7xl xl:text-[5.5rem]">
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.3 }}
            >
              Create amazing
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.42 }}
            >
              content with <span className="text-gradient">AI</span>
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease, delay: 0.6 }}
          className="mx-auto mt-7 max-w-md text-mid text-base sm:text-lg leading-relaxed"
        >
          Write articles, generate images, remove backgrounds and review resumes —
          every premium AI tool you need, in one fast workspace.
        </motion.p>

        <motion.div
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease, delay: 0.72 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-9"
        >
          <motion.button
            style={magnet.style}
            onMouseMove={magnet.onMouseMove}
            onMouseLeave={magnet.onMouseLeave}
            onClick={() => navigate("/ai")}
            className="btn-glow group flex items-center gap-2 text-white px-8 py-3.5 rounded-full text-sm font-medium cursor-pointer"
          >
            Start creating
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
          <button className="group flex items-center gap-2.5 px-6 py-3.5 rounded-full glass hover:glass-strong text-sm font-medium cursor-pointer transition-all text-hi">
            <span className="grid place-items-center w-7 h-7 rounded-full bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors">
              <Play className="w-3 h-3 fill-current" />
            </span>
            Watch demo
          </button>
        </motion.div>

        <motion.div
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease, delay: 0.9 }}
          className="flex items-center justify-center gap-3 mt-12 text-sm text-low"
        >
          <div className="flex -space-x-2">
            {["#16a34a", "#22c55e", "#15803d", "#4ade80"].map((c, i) => (
              <span
                key={i}
                className="w-7 h-7 rounded-full border-2 border-canvas"
                style={{ background: `linear-gradient(135deg, ${c}, #ffffff)` }}
              />
            ))}
          </div>
          <span>
            Trusted by <span className="text-hi font-medium">10,000+</span> creators
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
