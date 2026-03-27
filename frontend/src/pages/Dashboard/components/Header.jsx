import searchIcon from "../../../assets/search.svg";

export default function Header() {
  return (
    <header className="h-20 flex items-center justify-between px-8 border-b border-primary/10 flex-shrink-0">
      <div className="relative w-96">
      <span className="material-symbols-outlined absolute left-3 top-7 -translate-y-1/2 text-slate-500">search</span>
        <input
          className="w-full bg-slate-900/50 border border-slate-800 rounded-xl pl-11 pr-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm transition-all"
          placeholder="Buscar en la colección..."
          type="text"
        />
      </div>
      <div className="flex items-center gap-4">
        <button className="size-10 rounded-xl bg-slate-900/50 flex items-center justify-center hover:bg-primary/20 transition-all border border-slate-800">
          <span className="material-symbols-outlined text-slate-400">settings</span>
        </button>
      </div>
    </header>
  );
}
