import { useRef } from "react";
import { Wand2, Type, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "./Reveal";

const steps = [
  {
    no: "01",
    Icon: Type,
    title: "Pick a tool",
    body: "Choose from six purpose-built AI tools — writing, images, editing and more.",
  },
  {
    no: "02",
    Icon: Wand2,
    title: "Describe your intent",
    body: "Type a prompt or drop in a file. Tune the style, length and options.",
  },
  {
    no: "03",
    Icon: Sparkles,
    title: "Generate & share",
    body: "Get polished results in seconds, save them, or publish to the community.",
  },
];

const HowItWorks = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "center 55%"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={ref}
      className="px-4 sm:px-12 xl:px-24 py-16 relative max-w-6xl mx-auto"
    >
      <Reveal className="mb-16" selector=".rv">
        <p className="rv inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary mb-4">
          <span className="font-display text-low">02</span>
          <span className="w-8 h-px bg-primary/50" /> How it works
        </p>
        <h2 className="rv font-display text-4xl sm:text-6xl font-semibold text-hi leading-[0.95] max-w-2xl">
          From idea to output in three steps.
        </h2>
      </Reveal>

      <div className="relative">
        {/* connecting line */}
        <div className="hidden md:block absolute top-7 left-0 right-0 h-px bg-line">
          <motion.div
            style={{ scaleX, transformOrigin: "left center" }}
            className="h-full w-full bg-gradient-to-r from-primary via-primary-soft to-accent"
          />
        </div>

        <Reveal className="grid md:grid-cols-3 gap-10 md:gap-6" stagger={0.12} y={40}>
          {steps.map((s) => (
            <div key={s.no} className="relative">
              <div className="flex items-center gap-4 mb-5">
                <span className="relative z-10 grid place-items-center w-14 h-14 rounded-2xl glass-strong">
                  <s.Icon className="w-6 h-6 text-primary" />
                </span>
                <span className="font-display text-5xl font-bold text-primary/10">
                  {s.no}
                </span>
              </div>
              <h3 className="font-display text-xl font-semibold text-hi">{s.title}</h3>
              <p className="text-mid text-sm mt-2 leading-relaxed max-w-xs">{s.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
};

export default HowItWorks;
