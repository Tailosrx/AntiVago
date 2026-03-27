import { useState } from "react";
import api from "../../../services/api"


export default function ItemModal({ item, onClose, onUpdate }) {
    const [status, setStatus] = useState(item.status);
    const [progress, setProgress] = useState(item.progress || 0);
    const [review, setReview] = useState(item.review || "");
    const [isFavorite, setIsFavorite] = useState(item.isFavorite);

    const handleSave = async () => {
      try {
        let payload = {
          status,
          review,
          isFavorite,
        };
    
        if (item.type === "libro") {
          payload.currentPage = progress;
        } else if (item.type === "juego") {
          payload.hoursPlayed = progress;
        } else if (item.type === "anime") {
          payload.episodes = progress;
        }
    
        const res = await api.put(`/entries/${item.id}`, payload);
    
        onUpdate(res.data.entry);
        onClose();
      } catch (err) {
        console.error("Error guardando cambios:", err);
      }
    };
    
    

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-[#1a1d23] text-white w-[850px] rounded-xl shadow-2xl overflow-hidden animate-steamModal">
  
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
            <div className="w-60 h-80 rounded-lg bg-cover bg-center shadow-lg"
              style={{ backgroundImage: `url(${item.photo})` }}
            />
  
            {/* INFO */}
            <div className="flex-1 flex flex-col gap-6">
  
              {/* TYPE + STATUS */}
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-xs rounded-full bg-primary/20 text-primary uppercase font-bold">
                  {item.type}
                </span>
  
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="px-3 py-1 text-xs rounded-full bg-slate-700 text-white uppercase font-bold"
                >
                  <option value="reading">En progreso</option>
                  <option value="completed">Completado</option>
                  <option value="wishlist">Próximamente</option>
                </select>
              </div>
  
              {/* PROGRESS */}
              <div>
                <label className="text-sm text-white/60">Progreso</label>
                <input
                  type="number"
                  value={progress}
                  onChange={(e) => setProgress(Number(e.target.value))}
                  className="w-24 bg-slate-800 p-2 rounded-lg mt-1"
                />
              </div>
  
              {/* FAVORITE */}
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="px-4 py-2 bg-primary rounded-lg font-bold hover:bg-primary/80 w-fit"
              >
                {isFavorite ? "★ Favorito" : "☆ Marcar como favorito"}
              </button>
  
              {/* REVIEW */}
              <div>
                <label className="text-sm text-white/60">Reseña</label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="w-full mt-1 bg-slate-800 p-3 rounded-lg h-28 resize-none"
                />
              </div>
  
            </div>
          </div>
  
          {/* FOOTER */}
          <div className="flex justify-end gap-3 p-5 border-t border-white/10">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600"
            >
              Cancelar
            </button>
  
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-primary rounded-lg hover:bg-primary/80 font-bold"
            >
              Guardar cambios
            </button>
          </div>
  
        </div>
      </div>
    );
  }
  