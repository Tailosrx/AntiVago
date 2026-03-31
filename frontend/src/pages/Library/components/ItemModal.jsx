import { useState } from "react";
import api from "../../../services/api"

export default function ItemModal({ item, onClose, onUpdate, setReadings, readings }) {
    const [status, setStatus] = useState(item.status);
    const [progress, setProgress] = useState(item.currentPage || item.hoursPlayed || item.episodes || 0);
    const [review, setReview] = useState(item.review || "");
    const [isFavorite, setIsFavorite] = useState(item.isFavorite);
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
      try {
        setLoading(true);
        let payload = {
          status,
          review,
          isFavorite,
        };
    
        if (item.type === "libro") {
          payload.currentPage = parseInt(progress);
        } else if (item.type === "juego") {
          payload.hoursPlayed = parseInt(progress);
        } else if (item.type === "anime") {
          payload.episodes = parseInt(progress);
        }
    
        const res = await api.put(`/entries/${item.id}`, payload);
        
        // ✅ Actualizar en el array local
        if (setReadings && readings) {
          setReadings(readings.map(r => r.id === item.id ? res.data.entry : r));
        }
        
        onUpdate(res.data.entry);
        onClose();
      } catch (err) {
        console.error("Error guardando cambios:", err);
      } finally {
        setLoading(false);
      }
    };
    
    // Calcular progreso para libros
    const progressPercentage = item.totalPages 
      ? Math.round((progress / item.totalPages) * 100) 
      : 0;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-[#1a1d23] text-white w-[850px] rounded-xl shadow-2xl overflow-hidden">
  
          {/* HEADER */}
          <div className="flex justify-between items-center p-5 border-b border-white/10">
            <h2 className="text-2xl font-bold tracking-wide">{item.title}</h2>
            <button onClick={onClose} className="text-white/60 hover:text-white text-3xl">
              ×
            </button>
          </div>
  
          {/* BODY */}
          <div className="flex p-6 gap-6">
  
            {/* COVER */}
            <div className="w-60 h-80 rounded-lg bg-cover bg-center shadow-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center"
              style={{ backgroundImage: item.photo ? `url(${item.photo})` : 'none' }}
            >
              {!item.photo && <span className="text-6xl">📖</span>}
            </div>
  
            {/* INFO */}
            <div className="flex-1 flex flex-col gap-6">
  
              {/* TYPE + STATUS */}
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300 uppercase font-bold">
                  {item.type}
                </span>
  
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="px-3 py-1 text-xs rounded-full bg-slate-700 text-white uppercase font-bold border border-purple-500/30 focus:outline-none focus:border-purple-500"
                >
                  <option value="reading">📖 En progreso</option>
                  <option value="completed">✅ Completado</option>
                  <option value="abandoned">❌ Abandonado</option>
                </select>
              </div>

              {/* Autor */}
              {item.author && (
                <div>
                  <p className="text-sm text-white/60">Autor</p>
                  <p className="text-white font-semibold">{item.author}</p>
                </div>
              )}
  
              {/* PROGRESS */}
              <div>
                <label className="text-sm text-white/60 mb-2 block">
                  {item.type === "libro" ? "Página Actual" : item.type === "juego" ? "Horas Jugadas" : "Episodios Vistos"}
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={progress}
                    onChange={(e) => setProgress(Number(e.target.value))}
                    className="w-24 bg-slate-800 p-2 rounded-lg border border-purple-500/30 focus:outline-none focus:border-purple-500 text-white"
                  />
                  {item.totalPages && (
                    <span className="text-sm text-purple-300">/ {item.totalPages}</span>
                  )}
                </div>

                {/* Progress Bar para libros */}
                {item.totalPages && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-purple-300 mb-1">
                      <span>Progreso</span>
                      <span>{progressPercentage}%</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
  
              {/* FAVORITE */}
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`px-4 py-2 rounded-lg font-bold w-fit transition-all ${
                  isFavorite 
                    ? 'bg-pink-500/30 text-pink-300 border border-pink-500/50' 
                    : 'bg-slate-700 text-white hover:bg-slate-600'
                }`}
              >
                {isFavorite ? "❤️ Favorito" : "🤍 Marcar como favorito"}
              </button>
  
              {/* REVIEW */}
              <div>
                <label className="text-sm text-white/60 mb-2 block">Reseña</label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="w-full bg-slate-800 p-3 rounded-lg h-20 resize-none border border-purple-500/30 focus:outline-none focus:border-purple-500 text-white"
                />
              </div>
  
            </div>
          </div>
  
          {/* FOOTER */}
          <div className="flex justify-end gap-3 p-5 border-t border-white/10">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 font-bold transition-all"
            >
              Cancelar
            </button>
  
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:shadow-lg hover:shadow-purple-600/50 font-bold disabled:opacity-50 transition-all"
            >
              {loading ? '⏳ Guardando...' : '✨ Guardar cambios'}
            </button>
          </div>
  
        </div>
      </div>
    );
  }