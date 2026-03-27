import dashboardIcon from "../../../assets/dashboard.svg";
import libraryIcon from "../../../assets/library.svg";
import logrosIcon from "../../../assets/logros.svg";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="relative w-64 flex-shrink-0 bg-slate-900/40 border-r border-primary/20 backdrop-blur-xl flex flex-col p-6">
      {/* LOGO + TITLE */}
      <div className="flex items-center gap-3 mb-10">
        <div className=" ml-6 flex items-center justify-center">
          <img src="/antivago2.png" className="w-26 h-26 " />
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 flex flex-col gap-2">
        {/* DASHBOARD */}

        <Link to="/dashboard">
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all
            ${
              pathname === "/dashboard"
                ? "bg-primary text-white"
                : "hover:bg-primary/10 text-slate-400 hover:text-white"
            }`}
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-medium">Dashboard</span>
          </div>
        </Link>

        <Link to="/library">
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all
    ${
      pathname === "/library"
        ? "bg-primary text-white"
        : "hover:bg-primary/10 text-slate-400 hover:text-white"
    }
  `}
          >
            <span className="material-symbols-outlined">book</span>
            <span className="font-medium">Librería</span>
          </div>
        </Link>

        <Link to="/logros">
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all
    ${
      pathname === "/logros"
        ? "bg-primary text-white"
        : "hover:bg-primary/10 text-slate-400 hover:text-white"
    }
  `}
          >
            <span className="material-symbols-outlined">license</span>
            <span className="font-medium">Logros</span>
          </div>
        </Link>
      </nav>

      {/* USER */}
      <div className="mt-auto pt-6 border-t border-slate-800">
        <div className="flex items-center gap-3 p-2">
           <div className="size-10 rounded-full bg-slate-800 border-2 border-primary overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAi7P0i-ve1JfNTxcIb8UMyw2NSPHK43UL04dxVnshxY_VhYiuaazzGQj2EqTAbqqIdYMhsqF0ZDH5kmw0Jk8rSFS_0pUoKXzgAkd6-737QzpV2xsyjZ1vnscX6y0gcHohNMsfLUCibYNLxzFTE4Sz0T3fIJ3m61tGFfDUJiS9j0Kdo0yBOcF0PVKElyJGZgqyfWZCW9Hxsb_dDD8MvUVpGI8LJZ2u3n18GLlb-698yTx9xvJan4weVh6E6RYX2f99_uQAxogNUkG0"
              alt="User avatar"
            />
          </div> 

          <div className="flex flex-col">
            <span className="text-sm font-bold">Tai</span>
            <span className="text-xs text-primary font-medium">Lvl 1 Vago</span> 
          </div>
        </div>    
      </div>
    </aside>
  );
}
