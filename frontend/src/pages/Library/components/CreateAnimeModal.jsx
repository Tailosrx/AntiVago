import { useState } from 'react';

export default function CreateAnimeModal({ onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    episodes: 0,
    rating: '',
    status: 'watching',
    review: '',
    photo: null
  });
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result });
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await onSubmit({
      ...formData,
      episodes: parseInt(formData.episodes) || 0,
      rating: formData.rating ? parseInt(formData.rating) : null
    });
    setLoading(false);
    if (result.success) onClose();
  };

  const inputClass = "w-full bg-white border-2 border-[#e0e0e8] shadow-[0_2px_0_#d0d0da] rounded-xl px-4 py-2.5 text-[14px] font-bold text-[#333] focus:outline-none focus:border-[#aaa] transition-all";

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      style={{ fontFamily: "'Nunito', sans-serif" }}
    >
      <div className="bg-[#f5f5f8] rounded-[24px] border-[3px] border-[#e0e0e8] shadow-[0_6px_0_#c8c8d4] w-full max-w-lg max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-white border-b-[3px] border-[#e0e0e8]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-8 rounded-full bg-[#f472b6]" />
            <h2 className="text-xl font-black text-[#222]">🎬 Nuevo Anime</h2>
          </div>
          <button onClick={onClose} className="w-9 h-9 bg-[#f4f4f8] border-2 border-[#e0e0e8] shadow-[0_2px_0_#d0d0da] rounded-xl flex items-center justify-center text-[#888] hover:text-[#333] font-black text-lg transition-all">×</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">

          {/* Portada */}
          <div>
            <label className="text-[11px] font-extrabold text-[#aaa] uppercase tracking-wider mb-1.5 block">Portada (opcional)</label>
            <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" id="anime-photo" />
            <label htmlFor="anime-photo" className="flex items-center justify-center w-full py-6 border-[3px] border-dashed border-[#e0e0e8] rounded-xl cursor-pointer hover:border-[#f472b6] hover:bg-[#fdf2f8] transition-all">
              {photoPreview ? (
                <div className="flex flex-col items-center gap-2">
                  <img src={photoPreview} alt="Preview" className="h-20 rounded-lg border-2 border-[#e0e0e8]" />
                  <p className="text-[12px] font-extrabold text-[#f472b6]">Click para cambiar</p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-2xl mb-1">📸</p>
                  <p className="text-[13px] font-extrabold text-[#aaa]">Subir portada</p>
                  <p className="text-[11px] text-[#ccc] font-bold">PNG, JPG (máx. 5MB)</p>
                </div>
              )}
            </label>
          </div>

          {/* Título */}
          <div>
            <label className="text-[11px] font-extrabold text-[#aaa] uppercase tracking-wider mb-1.5 block">Título *</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Ej: Attack on Titan" className={inputClass} required style={{ fontFamily: "'Nunito', sans-serif" }} />
          </div>

          {/* Episodios */}
          <div>
            <label className="text-[11px] font-extrabold text-[#aaa] uppercase tracking-wider mb-1.5 block">Episodios vistos</label>
            <input type="number" name="episodes" value={formData.episodes} onChange={handleChange} min="0" className={inputClass} style={{ fontFamily: "'Nunito', sans-serif" }} />
          </div>

          {/* Estado + Rating */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-extrabold text-[#aaa] uppercase tracking-wider mb-1.5 block">Estado</label>
              <select name="status" value={formData.status} onChange={handleChange} className={inputClass} style={{ fontFamily: "'Nunito', sans-serif" }}>
                <option value="watching">👀 Viendo</option>
                <option value="completed">✅ Completado</option>
                <option value="abandoned">❌ Abandonado</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-extrabold text-[#aaa] uppercase tracking-wider mb-1.5 block">Rating (1-5)</label>
              <input type="number" name="rating" value={formData.rating} onChange={handleChange} min="1" max="5" className={inputClass} style={{ fontFamily: "'Nunito', sans-serif" }} />
            </div>
          </div>

          {/* Reseña */}
          <div>
            <label className="text-[11px] font-extrabold text-[#aaa] uppercase tracking-wider mb-1.5 block">Reseña (opcional)</label>
            <textarea name="review" value={formData.review} onChange={handleChange} placeholder="¿Qué te pareció?" rows="3" className={`${inputClass} resize-none`} style={{ fontFamily: "'Nunito', sans-serif" }} />
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-2 border-t-[3px] border-[#e0e0e8] mt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 bg-[#f4f4f8] border-2 border-[#e0e0e8] shadow-[0_2px_0_#d0d0da] rounded-xl font-black text-[13px] text-[#888] hover:bg-white transition-all">
              Cancelar
            </button>
            <button type="submit" disabled={loading || !formData.title} className="flex-1 py-2.5 bg-[#222] border-2 border-[#111] shadow-[0_2px_0_#000] rounded-xl font-black text-[13px] text-white hover:-translate-y-0.5 hover:shadow-[0_4px_0_#000] disabled:opacity-50 transition-all">
              {loading ? '⏳ Guardando...' : '✨ Agregar Anime'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
