import { PricingTable } from "@clerk/clerk-react";
import Reveal from "./Reveal";

const clerkLight = {
  variables: {
    colorBackground: "#ffffff",
    colorText: "#0c1411",
    colorTextSecondary: "#4b5563",
    colorPrimary: "#16a34a",
    colorInputBackground: "#ffffff",
    colorInputText: "#0c1411",
    colorShimmer: "rgba(22,163,74,0.18)",
    borderRadius: "16px",
    fontFamily: "Outfit, sans-serif",
  },
  elements: {
    pricingTableCard: {
      background: "#ffffff",
      border: "1px solid rgba(12,20,17,0.1)",
      boxShadow: "0 8px 24px -18px rgba(12,20,17,0.25)",
    },
  },
};

const Plan = () => {
  return (
    <section
      id="pricing"
      className="py-16 px-4 sm:px-12 xl:px-24 max-w-6xl mx-auto scroll-mt-24"
    >
      <Reveal
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        selector=".rv"
      >
        <div className="rv">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary mb-4">
            <span className="font-display text-low">04</span>
            <span className="w-8 h-px bg-primary/50" /> Pricing
          </p>
          <h2 className="font-display text-4xl sm:text-6xl font-semibold text-hi leading-[0.95] max-w-xl">
            Simple, scalable pricing.
          </h2>
        </div>
        <p className="rv text-mid max-w-xs md:text-right">
          Start free and scale up as you grow. Find the perfect plan for your
          content-creation needs.
        </p>
      </Reveal>

      <Reveal className="max-w-3xl mx-auto" y={40}>
        <div className="ring-gradient rounded-3xl p-4 sm:p-8">
          <PricingTable appearance={clerkLight} />
        </div>
      </Reveal>
    </section>
  );
};

export default Plan;
