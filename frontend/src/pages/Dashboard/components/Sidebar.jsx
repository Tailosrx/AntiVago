import dashboardIcon from "../../../assets/dashboard.svg";
import libraryIcon from "../../../assets/library.svg";
import logrosIcon from "../../../assets/logros.svg";
import groupsIcon from "../../../assets/groups.svg";

export default function Sidebar() {
  return (
    <aside className="dashboard-sidebar">
      <div>
        <div className="w-[20px] h-[20px] flex items-center justify-center">
          <img
            src="/antivago2.png"
            className="w-[20px] h-[20px] object-contain"
          />
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        <a className="active" href="#">
          <img src={dashboardIcon} alt="Dashboard" />
          <span>Dashboard</span>
        </a>

        <a href="#">
          <img src={libraryIcon} alt="Library" />
          <span>Libreria</span>
        </a>

        <a href="#">
          <img src={logrosIcon} alt="" />
          <span>Logros</span>
        </a>

        <a href="#">
          <img src={groupsIcon} alt="" />
          <span>Comunidad</span>
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
