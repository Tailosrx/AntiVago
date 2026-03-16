import dashboardIcon from "../../../assets/dashboard.svg";
import libraryIcon from "../../../assets/library.svg";
import logrosIcon from "../../../assets/logros.svg";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="h-screen text-white bg-[#161225] backdrop-blur-[18px]
    border-r border-[rgba(147,13,242,0.2)] flex flex-col p-4">
      <div>
        <div className="w-[20px] h-[20px] flex items-center justify-center">
          <img
            src="/antivago2.png"
            className="w-[20px] h-[20px] object-contain"
          />
        </div>
      </div>

      <nav className="nav-side">
        <a className="active" href="#">
          <img src={dashboardIcon} alt="Dashboard" />
          <span>Dashboard</span>
        </a>

        <Link to="/library" className="nav-item">
          <img src={libraryIcon} alt="Library" />
          <span>Librería</span>
        </Link>

        <a href="#">
          <img src={logrosIcon} alt="" />
          <span>Logros</span>
        </a>
      </nav>

      <div className="user-section">
        <div className="flex items-center gap-3 p-2">
          <div className="avatar">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAi7P0i-ve1JfNTxcIb8UMyw2NSPHK43UL04dxVnshxY_VhYiuaazzGQj2EqTAbqqIdYMhsqF0ZDH5kmw0Jk8rSFS_0pUoKXzgAkd6-737QzpV2xsyjZ1vnscX6y0gcHohNMsfLUCibYNLxzFTE4Sz0T3fIJ3m61tGFfDUJiS9j0Kdo0yBOcF0PVKElyJGZgqyfWZCW9Hxsb_dDD8MvUVpGI8LJZ2u3n18GLlb-698yTx9xvJan4weVh6E6RYX2f99_uQAxogNUkG0"
              alt="User avatar"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold">Pito de Hielo</span>
            <span className="text-xs text-primary font-medium">
              Lvl 14 Explorer
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
