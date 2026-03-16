import searchIcon from "../../../assets/search.svg";
import notification from "../../../assets/notification.svg";
import settings from "../../../assets/settings.svg";
import rayo from "../../../assets/rayo.svg";

export default function Header() {
  return (
    <div className="flex items-center content-between">
      <div className="relative w-1/4 ml-36 mt-[5mm]">
        <img src={searchIcon} alt="" className="icon" />
        <input placeholder="Búsca en tú colección..." type="text" />
      </div>

      <div className="header-flex items-center gap-4">

        <button className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer transition duration-200 backdrop-blur-[6px]">
          <img src={settings} alt="" className="icon-img" />
        </button>
      </div>
    </div>
  );
}
