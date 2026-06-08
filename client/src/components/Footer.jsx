import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import Logo from "./Logo";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pb-10">
      {/* Final CTA band */}
      <Reveal className="max-w-6xl mx-auto mb-12" y={40}>
        <div className="ring-gradient relative overflow-hidden rounded-3xl px-8 sm:px-14 py-14 text-center">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/25 blur-[100px] rounded-full pointer-events-none" />
          <h2 className="relative font-display text-3xl sm:text-5xl font-semibold text-hi">
            Ready to create something <span className="text-gradient">amazing?</span>
          </h2>
          <p className="relative text-mid mt-4 max-w-md mx-auto">
            Join thousands of creators building faster with AI Zone.
          </p>
          <button
            onClick={() => navigate("/ai")}
            className="relative btn-glow group mt-8 inline-flex items-center gap-2 text-white px-8 py-3.5 rounded-full text-sm font-medium cursor-pointer"
          >
            Get started for free
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </Reveal>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10 border-t border-line pt-12 text-mid">
        <div className="md:max-w-sm">
          <Logo />
          <p className="mt-5 text-sm leading-relaxed text-low">
            Experience the power of AI with AI Zone. Write articles, generate images,
            and supercharge your entire content workflow.
          </p>
        </div>
        <div className="flex-1 flex items-start md:justify-end gap-16 sm:gap-24">
          <div>
            <h2 className="font-medium mb-4 text-hi text-sm">Company</h2>
            <ul className="text-sm space-y-2.5 text-low">
              {["Home", "About us", "Contact us", "Privacy policy"].map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-hi transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-medium mb-4 text-hi text-sm">Newsletter</h2>
            <p className="text-sm text-low max-w-56">
              The latest news and resources, sent to your inbox weekly.
            </p>
            <div className="flex items-center gap-2 pt-4">
              <input
                className="glass placeholder-low text-hi focus:border-primary/50 outline-none w-full max-w-48 h-10 rounded-lg px-3 text-sm transition-colors"
                type="email"
                placeholder="Enter your email"
              />
              <button className="btn-glow text-white w-24 h-10 rounded-lg text-sm cursor-pointer">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      <p className="max-w-6xl mx-auto pt-8 text-center text-xs text-low">
        Copyright {new Date().getFullYear()} © AI Zone. All rights reserved.
      </p>
    </footer>
  );
}
