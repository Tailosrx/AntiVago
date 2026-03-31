export default function CollectionCard({ title, icon, unlocked, total, onClick }) {
  return (
    <div
      onClick={onClick}
      className="
        w-[90%] h-48 rounded-3xl p-6 cursor-pointer
        bg-white/5 backdrop-blur-xl border border-white/10
        shadow-xl hover:scale-[1.02] transition-all duration-300
        flex items-center gap-6
      "
    >
      <img
        src={icon}
        className="w-28 h-28 object-contain drop-shadow-lg"
      />

      <div className="flex flex-col flex-1">
        <h3 className="text-3xl font-semibold">{title}</h3>

        <div className="mt-3">
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              style={{ width: `${(unlocked / total) * 100}%` }}
            />
          </div>
          <p className="text-sm mt-2 text-white/60">
            {unlocked}/{total} completados
          </p>
        </div>
      </div>
    </div>
  );
}
