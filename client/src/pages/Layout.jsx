import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Logo from "../components/Logo";
import { SignIn, useUser } from "@clerk/clerk-react";

const Layout = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const { user } = useUser();

  return user ? (
    <div className="flex flex-col items-start justify-start h-screen">
      <nav className="w-full px-6 sm:px-8 min-h-16 flex items-center justify-between border-b border-line backdrop-blur-xl bg-canvas/40 z-30">
        <Logo onClick={() => navigate("/")} />
        <button
          className="sm:hidden glass w-9 h-9 grid place-items-center rounded-lg text-mid"
          onClick={() => setSidebar(!sidebar)}
        >
          {sidebar ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>
      <div className="flex-1 w-full flex h-[calc(100vh-64px)]">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <div className="flex-1 bg-ink/40 overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen px-4">
      <SignIn
        appearance={{
          variables: {
            colorBackground: "#ffffff",
            colorText: "#0c1411",
            colorTextSecondary: "#4b5563",
            colorPrimary: "#16a34a",
            colorInputBackground: "#ffffff",
            colorInputText: "#0c1411",
            borderRadius: "14px",
          },
        }}
      />
    </div>
  );
};

export default Layout;
