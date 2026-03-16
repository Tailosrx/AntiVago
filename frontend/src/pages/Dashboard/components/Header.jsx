import searchIcon from "../../../assets/search.svg";
import notification from "../../../assets/notification.svg";
import settings from "../../../assets/settings.svg";
import rayo from "../../../assets/rayo.svg";

export default function Header() {
  return (
    <div className="header">
      <div className="header-search">
        <img src={searchIcon} alt="" className="icon" />
        <input placeholder="Búsca en tú colección..." type="text" />
      </div>

      <div className="header-flex items-center gap-4">
        <button className="header-btn">
         <img src={notification} alt="" className="icon-img" />
        </button>

        <button className="header-btn">
          <img src={settings} alt="" className="icon-img" />
        </button>

        <div className="header-streak">
          <img src={rayo} alt="" className="icon-img" />
          <span>5 DAY STREAK</span>
        </div>
      </div>
    </div>
  );
}
