import dailyIcon from "../../../assets/daily.svg";

export default function DailyQuests() {
  return (
    <div className="lg:col-span-2 bg-slate-900/40 rounded-xl border border-primary/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">
            event_available
          </span>
          Misiones
        </h2>
        <span className="text-xs font-bold text-primary uppercase tracking-wider">
          4/6 Complete
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/10 rounded-xl">
          <input
            checked=""
            className="rounded border-primary/30 text-primary focus:ring-primary bg-transparent size-5"
            type="checkbox"
          />
          <div>
            <p className="text-sm font-medium line-through opacity-50">
              Subir al 15 con Aladv: World of Warcraft
            </p>
            <p className="text-[10px] text-primary font-bold">+50 XP</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/10 rounded-xl">
          <input
            checked=""
            className="rounded border-primary/30 text-primary focus:ring-primary bg-transparent size-5"
            type="checkbox"
          />
          <div>
            <p className="text-sm font-medium line-through opacity-50">
              Leer 2 caps: Alas de Hierro
            </p>
            <p className="text-[10px] text-primary font-bold">+100 XP</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-slate-800/50 border border-slate-700 rounded-xl">
          <input
            className="rounded border-primary/30 text-primary focus:ring-primary bg-transparent size-5"
            type="checkbox"
          />
          <div>
            <p className="text-sm font-medium">Terminar el Live Action: One Piece LA</p>
            <p className="text-[10px] text-slate-400 font-bold">+40 XP</p>
          </div>
        </div>
      </div>
    </div>
  );
}
