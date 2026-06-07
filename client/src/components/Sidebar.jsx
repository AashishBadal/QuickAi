import { useEffect, useRef, useState } from "react";
import { Protect, useClerk, useUser } from "@clerk/clerk-react";
import {
  ChevronLeft,
  Eraser,
  FileText,
  Hash,
  House,
  Image,
  LogOut,
  Scissors,
  SquarePen,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { animate, stagger } from "framer-motion";

const navItems = [
  { to: "/ai", label: "Dashboard", Icon: House },
  { to: "/ai/write-article", label: "Write Article", Icon: SquarePen },
  { to: "/ai/blog-titles", label: "Blog Titles", Icon: Hash },
  { to: "/ai/generate-images", label: "Generate Images", Icon: Image },
  { to: "/ai/remove-background", label: "Remove Background", Icon: Eraser },
  { to: "/ai/remove-object", label: "Remove Object", Icon: Scissors },
  { to: "/ai/review-resume", label: "Review Resume", Icon: FileText },
  { to: "/ai/community", label: "Community", Icon: Users },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const scope = useRef(null);
  const [collapsed, setCollapsed] = useState(false);

  // Transform-only entrance — never touches opacity, so tabs stay visible.
  useEffect(() => {
    if (!scope.current) return;
    const items = scope.current.querySelectorAll(".side-item");
    animate(
      items,
      { x: [-20, 0] },
      { duration: 0.5, delay: stagger(0.045, { startDelay: 0.05 }), ease: [0.16, 1, 0.3, 1] }
    );
  }, []);

  return (
    <div
      ref={scope}
      className={`relative ${
        collapsed ? "w-20" : "w-64"
      } h-full bg-ink/70 backdrop-blur-xl border-r border-line flex flex-col max-sm:absolute max-sm:z-20 max-sm:w-64 max-sm:top-16 max-sm:bottom-0 max-sm:h-auto ${
        sidebar ? "translate-x-0" : "max-sm:-translate-x-full"
      } transition-all duration-300 ease-in-out`}
    >
      {/* desktop collapse toggle */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="hidden sm:grid place-items-center absolute -right-3.5 top-6 z-30 w-7 h-7 rounded-full glass-strong text-mid hover:text-primary hover:border-primary/50 transition-colors"
      >
        <ChevronLeft
          className={`w-4 h-4 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
        />
      </button>

      {/* profile (fixed) */}
      <div className="side-item shrink-0 flex flex-col items-center pt-7 pb-6 border-b border-line mx-3">
        <div className="relative">
          <img
            src={user?.imageUrl}
            alt=""
            className={`rounded-full ring-2 ring-primary/40 transition-all ${
              collapsed ? "w-10 h-10" : "w-16 h-16"
            }`}
          />
          <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-primary rounded-full border-2 border-canvas" />
        </div>
        {!collapsed && (
          <>
            <h1 className="mt-3 text-sm font-medium text-hi truncate max-w-full px-2">
              {user?.fullName}
            </h1>
            <p className="text-xs text-low">
              <Protect plan="premium" fallback="Free plan">
                Premium plan
              </Protect>
            </p>
          </>
        )}
      </div>

      {/* nav (scrollable) */}
      <nav className="flex-1 min-h-0 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/ai"}
            onClick={() => setSidebar(false)}
            title={collapsed ? item.label : undefined}
            className={({ isActive }) =>
              `side-item group relative flex items-center gap-3 rounded-xl text-sm transition-colors px-3.5 py-2.5 ${
                collapsed ? "justify-center" : ""
              } ${
                isActive ? "text-white" : "text-mid hover:text-hi hover:bg-primary/10"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-accent shadow-[0_8px_24px_-10px_rgba(22,163,74,0.7)]" />
                )}
                <item.Icon className="relative w-[18px] h-[18px] shrink-0" />
                {!collapsed && <span className="relative truncate">{item.label}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* footer (fixed) */}
      <div
        className={`side-item shrink-0 border-t border-line p-4 flex items-center ${
          collapsed ? "flex-col gap-3" : "justify-between"
        }`}
      >
        <div
          onClick={openUserProfile}
          className="flex gap-2.5 items-center cursor-pointer group min-w-0"
        >
          <img
            src={user?.imageUrl}
            alt=""
            className="w-9 h-9 rounded-full shrink-0"
            title={collapsed ? user?.fullName : undefined}
          />
          {!collapsed && (
            <div className="min-w-0">
              <h1 className="text-sm font-medium text-hi group-hover:text-primary transition-colors truncate">
                {user?.fullName}
              </h1>
              <p className="text-xs text-low">
                <Protect plan="premium" fallback="Free">
                  Premium
                </Protect>{" "}
                plan
              </p>
            </div>
          )}
        </div>
        <LogOut
          onClick={signOut}
          className="w-4.5 h-4.5 text-low hover:text-fuchsia transition cursor-pointer shrink-0"
          title="Sign out"
        />
      </div>
    </div>
  );
};

export default Sidebar;
