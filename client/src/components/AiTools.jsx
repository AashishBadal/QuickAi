import { AiToolsData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { useTilt } from "../hooks/useTilt";

// Bento placement — varied tile sizes break the uniform grid.
const layout = [
  "sm:col-span-2 lg:col-span-2 lg:row-span-2", // featured
  "sm:col-span-2 lg:col-span-2",
  "lg:col-span-1",
  "lg:col-span-1",
  "sm:col-span-2 lg:col-span-2",
  "sm:col-span-2 lg:col-span-2",
];

const ToolCard = ({ tool, index, featured, onClick }) => {
  const tilt = useTilt(featured ? 5 : 9);
  return (
    <div
      className={`${layout[index]} min-h-[200px]`}
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={tilt.style}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        onClick={onClick}
        className="spotlight group relative glass hover:glass-strong rounded-3xl cursor-pointer transition-colors duration-300 h-full w-full overflow-hidden flex flex-col"
      >
        <span className="absolute top-5 right-6 font-display text-xs text-low">
          0{index + 1}
        </span>

        {featured ? (
          <div className="p-8 flex flex-col h-full">
            <div
              className="w-16 h-16 grid place-items-center rounded-2xl text-white shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${tool.bg.from}, ${tool.bg.to})`,
                boxShadow: `0 16px 40px -12px ${tool.bg.from}`,
              }}
            >
              <tool.Icon className="w-8 h-8" />
            </div>
            <div className="mt-auto pt-10">
              <span className="text-[11px] uppercase tracking-[0.2em] text-primary">
                Featured
              </span>
              <h3 className="mt-2 font-display text-3xl font-semibold text-hi flex items-center gap-2">
                {tool.title}
                <ArrowUpRight className="w-6 h-6 text-low transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </h3>
              <p className="text-mid mt-3 max-w-sm leading-relaxed">
                {tool.description}
              </p>
            </div>
            {/* decorative preview lines */}
            <div className="absolute -right-10 -bottom-10 w-56 h-56 rounded-full opacity-20 blur-2xl"
              style={{ background: `linear-gradient(135deg, ${tool.bg.from}, ${tool.bg.to})` }}
            />
          </div>
        ) : (
          <div className="p-6 flex flex-col h-full">
            <div
              className="w-11 h-11 grid place-items-center rounded-xl text-white shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${tool.bg.from}, ${tool.bg.to})`,
                boxShadow: `0 10px 28px -12px ${tool.bg.from}`,
              }}
            >
              <tool.Icon className="w-5 h-5" />
            </div>
            <h3 className="mt-5 mb-1.5 font-semibold text-hi flex items-center gap-1">
              {tool.title}
              <ArrowUpRight className="w-4 h-4 text-low opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </h3>
            <p className="text-mid text-sm leading-relaxed line-clamp-3">
              {tool.description}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

const AiTools = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <section className="px-4 sm:px-12 xl:px-24 py-16 relative">
      {/* editorial two-column header */}
      <Reveal
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 max-w-6xl mx-auto"
        selector=".rv"
      >
        <div className="rv">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary mb-4">
            <span className="font-display text-low">01</span>
            <span className="w-8 h-px bg-primary/50" /> The toolkit
          </p>
          <h2 className="font-display text-4xl sm:text-6xl font-semibold text-hi leading-[0.95] max-w-xl">
            Six tools.<br />One canvas.
          </h2>
        </div>
        <p className="rv text-mid max-w-xs md:text-right">
          Everything you need to create, enhance and optimize content — powered by
          cutting-edge AI.
        </p>
      </Reveal>

      <Reveal
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(200px,auto)] gap-4 max-w-6xl mx-auto"
        stagger={0.07}
        y={50}
      >
        {AiToolsData.map((tool, index) => (
          <ToolCard
            key={index}
            tool={tool}
            index={index}
            featured={index === 0}
            onClick={() => user && navigate(tool.path)}
          />
        ))}
      </Reveal>
    </section>
  );
};

export default AiTools;
