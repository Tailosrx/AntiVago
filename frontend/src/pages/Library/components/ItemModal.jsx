import { useState } from "react";
import api from "../../../services/api";

export default function ItemModal({ item, onClose, onUpdate }) {
  const [status, setStatus] = useState(item.status);
  const [progress, setProgress] = useState(
    item.currentPage || item.hoursPlayed || item.episodes || 0
  );
  const [review, setReview] = useState(item.review || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);
      const payload = { status, review };
      if (item.type === "libro")  payload.currentPage  = parseInt(progress);
      if (item.type === "juego")  payload.hoursPlayed  = parseInt(progress);
      if (item.type === "anime")  payload.episodes      = parseInt(progress);

      const res = await api.put(`/entries/${item.id}`, payload);
      onUpdate(res.data.entry);
      onClose();
    } catch (err) {
      console.error("Error guardando cambios:", err);
    } finally {
      setLoading(false);
    }
  };

  const progressPercentage = item.totalPages
    ? Math.round((progress / item.totalPages) * 100)
    : 0;

  const typeConfig = {
    libro: { color: "#f59e0b", label: "Libro" },
    juego: { color: "#5b9cf6", label: "Juego" },
    anime: { color: "#f472b6", label: "Anime" },
  };
  const config = typeConfig[item.type] || typeConfig.libro;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      style={{ fontFamily: "'Nunito', sans-serif" }}
    >
      <div className="bg-[#f5f5f8] rounded-[16px] lg:rounded-[24px] border-[3px] border-[#e0e0e8] shadow-[0_6px_0_#c8c8d4] w-full max-w-[900px] max-h-[90vh] overflow-y-auto">

        {/* HEADER */}
        <div className="flex justify-between items-start lg:items-center gap-3 px-4 lg:px-6 py-3 lg:py-4 bg-white border-b-[3px] border-[#e0e0e8]">
          <div className="flex items-center gap-2 lg:gap-3 min-w-0">
            <div
              className="w-1.5 lg:w-2 h-6 lg:h-8 rounded-full flex-shrink-0"
              style={{ background: config.color }}
            />
            <h2 className="text-base lg:text-xl font-black text-[#222] truncate">{item.title}</h2>
            <span
              className="px-2 py-0.5 rounded-lg text-[9px] lg:text-[11px] font-extrabold whitespace-nowrap flex-shrink-0"
              style={{ background: config.color + '22', color: config.color }}
            >
              {config.label}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 lg:w-9 h-8 lg:h-9 bg-[#f4f4f8] border-2 border-[#e0e0e8] shadow-[0_2px_0_#d0d0da] rounded-xl flex items-center justify-center text-[#888] hover:text-[#333] font-black text-lg flex-shrink-0"
          >
            ×
          </button>
        </div>

        {/* BODY */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 p-4 lg:p-6">

          {/* Cover */}
          <div
            className="w-full lg:w-44 h-48 lg:h-60 rounded-[12px] lg:rounded-[16px] border-[3px] border-[#e0e0e8] shadow-[0_3px_0_#d0d0da] flex-shrink-0 overflow-hidden flex items-center justify-center text-4xl lg:text-5xl"
            style={{
              background: item.photo ? `url(${item.photo}) center/cover` : '#f4f4f8',
            }}
          >
            {!item.photo && (item.type === "libro" ? "📚" : item.type === "juego" ? "🎮" : "🎬")}
          </div>

          {/* Controles */}
          <div className="flex-1 flex flex-col gap-3 lg:gap-4">

            {/* Status */}
            <div>
              <label className="text-[10px] lg:text-[11px] font-extrabold text-[#aaa] uppercase tracking-wider mb-1 lg:mb-1.5 block">Estado</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="w-full bg-white border-2 border-[#e0e0e8] shadow-[0_2px_0_#d0d0da] rounded-xl px-3 lg:px-4 py-2 lg:py-2.5 text-[13px] lg:text-[14px] font-black text-[#333] focus:outline-none focus:border-[#aaa]"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                {item.type === "libro" && <>
                  <option value="reading">📖 Leyendo</option>
                  <option value="completed">✅ Completado</option>
                  <option value="abandoned">❌ Abandonado</option>
                </>}
                {item.type === "juego" && <>
                  <option value="playing">🎮 Jugando</option>
                  <option value="completed">✅ Completado</option>
                  <option value="abandoned">❌ Abandonado</option>
                </>}
                {item.type === "anime" && <>
                  <option value="watching">📺 Viendo</option>
                  <option value="completed">✅ Completado</option>
                  <option value="abandoned">❌ Abandonado</option>
                </>}
              </select>
            </div>

            {/* Autor */}
            {item.author && (
              <div>
                <label className="text-[10px] lg:text-[11px] font-extrabold text-[#aaa] uppercase tracking-wider mb-1 block">Autor</label>
                <p className="text-[13px] lg:text-[14px] font-black text-[#333]">{item.author}</p>
              </div>
            )}

            {/* Progreso */}
            <div>
              <label className="text-[10px] lg:text-[11px] font-extrabold text-[#aaa] uppercase tracking-wider mb-1 lg:mb-1.5 block">
                {item.type === "libro" ? "Página actual" : item.type === "juego" ? "Horas jugadas" : "Episodios vistos"}
              </label>
              <div className="flex items-center gap-2 lg:gap-3">
                <input
                  type="number"
                  value={progress}
                  onChange={e => setProgress(Number(e.target.value))}
                  className="w-20 lg:w-24 bg-white border-2 border-[#e0e0e8] shadow-[0_2px_0_#d0d0da] rounded-xl px-2 lg:px-3 py-2 text-[13px] lg:text-[14px] font-black text-[#333] focus:outline-none focus:border-[#aaa]"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                />
                {item.totalPages && (
                  <span className="text-[12px] lg:text-[13px] font-extrabold text-[#aaa]">/ {item.totalPages}</span>
                )}
              </div>

              {item.totalPages && (
                <div className="mt-2">
                  <div className="flex justify-between text-[10px] lg:text-[11px] font-extrabold text-[#aaa] mb-1">
                    <span>Progreso</span>
                    <span>{progressPercentage}%</span>
                  </div>
                  <div className="h-2 lg:h-2.5 bg-[#e0e0e8] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${progressPercentage}%`, background: config.color }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Reseña */}
            <div>
              <label className="text-[10px] lg:text-[11px] font-extrabold text-[#aaa] uppercase tracking-wider mb-1 lg:mb-1.5 block">Reseña</label>
              <textarea
                value={review}
                onChange={e => setReview(e.target.value)}
                placeholder="¿Qué te pareció?"
                rows="2"
                className="w-full bg-white border-2 border-[#e0e0e8] shadow-[0_2px_0_#d0d0da] rounded-xl px-3 lg:px-4 py-2 lg:py-3 text-[12px] lg:text-[13px] font-bold text-[#333] focus:outline-none focus:border-[#aaa] resize-none"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              />
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 lg:gap-3 px-4 lg:px-6 py-3 lg:py-4 bg-white border-t-[3px] border-[#e0e0e8]">
          <button
            onClick={onClose}
            className="px-4 lg:px-5 py-2 lg:py-2.5 bg-[#f4f4f8] border-2 border-[#e0e0e8] shadow-[0_2px_0_#d0d0da] rounded-xl font-black text-[12px] lg:text-[13px] text-[#888] hover:text-[#333] hover:bg-white transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 lg:px-5 py-2 lg:py-2.5 bg-[#222] border-2 border-[#111] shadow-[0_2px_0_#000] rounded-xl font-black text-[12px] lg:text-[13px] text-white hover:-translate-y-0.5 hover:shadow-[0_4px_0_#000] disabled:opacity-50 transition-all"
          >
            {loading ? "⏳ Guardando..." : "✨ Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}