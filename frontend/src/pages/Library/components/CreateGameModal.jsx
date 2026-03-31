import { useState } from 'react';

export default function CreateReadingModal({ onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Acción',
    platform: 'PC',
    hoursPlayed: 0,
    rating: '',
    status: 'playing',
    review: '',
    isFavorite: false
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await onSubmit({
      ...formData,
      hoursPlayed: parseInt(formData.hoursPlayed) || 0,
      rating: formData.rating ? parseInt(formData.rating) : null
    });
    
    setLoading(false);
    if (result.success) {
      onClose();
    }
  };

  const progress = formData.totalPages ? 
    Math.round((formData.currentPage / formData.totalPages) * 100) : 0;

    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-[#1a1d23] text-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-6 border-b border-purple-500/20 pb-6">
            <h2 className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              🎮 Nuevo Juego
            </h2>
            <button
              onClick={onClose}
              className="text-3xl text-purple-300 hover:text-white transition-all"
            >
              ×
            </button>
          </div>
  
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Título */}
            <div>
              <label className="block text-sm font-bold text-purple-300 mb-2">
                Título *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Ej: Elden Ring"
                className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
                required
              />
            </div>
  
            {/* Categoría */}
            <div>
              <label className="block text-sm font-bold text-purple-300 mb-2">
                Categoría
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
              >
                <option>Acción</option>
                <option>RPG</option>
                <option>Estrategia</option>
                <option>Aventura</option>
                <option>Puzzle</option>
                <option>Deportes</option>
                <option>Simulación</option>
                <option>Indie</option>
              </select>
            </div>
  
            {/* Plataforma */}
            <div>
              <label className="block text-sm font-bold text-purple-300 mb-2">
                Plataforma
              </label>
              <select
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
              >
                <option>PC</option>
                <option>PlayStation 5</option>
                <option>Xbox Series X</option>
                <option>Nintendo Switch</option>
                <option>Mobile</option>
                <option>Múltiples</option>
              </select>
            </div>
  
            {/* Horas Jugadas */}
            <div>
              <label className="block text-sm font-bold text-purple-300 mb-2">
                Horas Jugadas
              </label>
              <input
                type="number"
                name="hoursPlayed"
                value={formData.hoursPlayed}
                onChange={handleChange}
                placeholder="0"
                min="0"
                className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
              />
            </div>
  
            {/* Estado y Rating */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-purple-300 mb-2">
                  Estado
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="playing">🎮 Jugando</option>
                  <option value="completed">✅ Completado</option>
                  <option value="abandoned">❌ Abandonado</option>
                </select>
              </div>
  
              <div>
                <label className="block text-sm font-bold text-purple-300 mb-2">
                  Rating (1-5)
                </label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  min="1"
                  max="5"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
  
            {/* Reseña */}
            <div>
              <label className="block text-sm font-bold text-purple-300 mb-2">
                Reseña (opcional)
              </label>
              <textarea
                name="review"
                value={formData.review}
                onChange={handleChange}
                placeholder="¿Qué te pareció?"
                rows="3"
                className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500 resize-none"
              />
            </div>
  
            {/* Favorito */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isFavorite"
                checked={formData.isFavorite}
                onChange={handleChange}
                className="w-4 h-4 cursor-pointer"
              />
              <label className="text-sm font-bold text-purple-300 cursor-pointer">
                Marcar como favorito ❤️
              </label>
            </div>
  
            {/* Botones */}
            <div className="flex gap-3 pt-6 border-t border-purple-500/20">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 rounded-lg font-bold text-purple-300 hover:bg-purple-500/20 transition-all"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading || !formData.title}
                className="flex-1 px-4 py-3 rounded-lg font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-600/50 disabled:opacity-50 transition-all"
              >
                {loading ? '⏳ Guardando...' : '✨ Agregar Juego'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }