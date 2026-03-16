import dailyIcon from "../../../assets/daily.svg";

export default function DailyQuests() {
  return (
    <div className="daily-quests">
      <div className="daily-quests-header">
        <h2 className="daily-quests-title">
           <img src={dailyIcon} alt="" />
          Daily Quests
        </h2>
        <span className="daily-quests-progress">4/6 Complete</span>
      </div>

      <div className="daily-quests-grid">
        {/* Quest 1 */}
        <div className="quest-card completed">
          <input defaultChecked className="quest-checkbox" type="checkbox" />
          <div>
            <p className="text-sm font-medium">Read 20 pages: Project Hail Mary</p>
            <p className="quest-xp">+50 XP</p>
          </div>
        </div>

        {/* Quest 2 */}
        <div className="quest-card completed">
          <input defaultChecked className="quest-checkbox" type="checkbox" />
          <div>
            <p className="text-sm font-medium">Play 1hr: Elden Ring</p>
            <p className="quest-xp">+100 XP</p>
          </div>
        </div>

        {/* Quest 3 */}
        <div className="quest-card inactive">
          <input className="quest-checkbox" type="checkbox" />
          <div>
            <p className="text-sm font-medium">Watch 1 Episode: Shogun</p>
            <p className="quest-xp inactive">+40 XP</p>
          </div>
        </div>

        {/* Quest 4 */}
        <div className="quest-card inactive">
          <input className="quest-checkbox" type="checkbox" />
          <div>
            <p className="text-sm font-medium">Daily Login Reward</p>
            <p className="quest-xp inactive">+10 XP</p>
          </div>
        </div>
      </div>
    </div>
  );
}
