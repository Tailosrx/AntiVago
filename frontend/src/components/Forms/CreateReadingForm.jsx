import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function CreateReadingForm({ onSubmit, loading }) {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      author: '',
      category: 'Romantasy',
      rating: 5,
      status: 'reading',
      review: '',
      totalPages: '',      // NUEVO
      currentPage: 0       // NUEVO
    }
  });

  const totalPages = watch('totalPages');
  const currentPage = watch('currentPage');
  const progress = totalPages ? Math.round((currentPage / totalPages) * 100) : 0;

  const handleFormSubmit = async (data) => {
    const result = await onSubmit(data);
    if (result.success) {
      reset();
    }
  };

  const categories = [
    'Romantasy',
    'Manga',
    'Ciencia Ficción',
    'Dystopía',
    'Terror',
    'Misterio',
    'Fantasía'
  ];

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="bg-[#1B1022] border border-purple-500/30 p-6 rounded-lg text-white">
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        📖 Nueva Lectura
      </h2>

      {/* Título */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-purple-300 mb-1">Título *</label>
        <input
          type="text"
          {...register('title', { required: 'Título requerido' })}
          placeholder="Ej: El Conde de Montecristo"
          className="w-full p-2 bg-slate-800/50 border border-purple-500/30 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>

      {/* Autor */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-purple-300 mb-1">Autor</label>
        <input
          type="text"
          {...register('author')}
          placeholder="Ej: Alexandre Dumas"
          className="w-full p-2 bg-slate-800/50 border border-purple-500/30 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
        />
      </div>

      {/* Categoría */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-purple-300 mb-1">Categoría *</label>
        <select
          {...register('category')}
          className="w-full p-2 bg-slate-800/50 border border-purple-500/30 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Total de Páginas - NUEVO */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-purple-300 mb-1">Total de Páginas</label>
        <input
          type="number"
          {...register('totalPages', { min: 0 })}
          placeholder="Ej: 460"
          className="w-full p-2 bg-slate-800/50 border border-purple-500/30 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
        />
        <p className="text-xs text-purple-400 mt-1">Si dejas vacío, se estimará automáticamente</p>
      </div>

      {/* Página Actual - NUEVO */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-purple-300 mb-1">Página Actual</label>
        <input
          type="number"
          {...register('currentPage', { min: 0 })}
          placeholder="0"
          className="w-full p-2 bg-slate-800/50 border border-purple-500/30 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
        />
      </div>

      {/* Progress Bar - NUEVO */}
      {totalPages && (
        <div className="mb-4 p-3 bg-purple-500/10 rounded border border-purple-500/30">
          <div className="flex justify-between text-sm text-purple-300 mb-2">
            <span>Progreso</span>
            <span className="font-bold">{progress}%</span>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Rating */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-purple-300 mb-1">Rating (1-5)</label>
        <input
          type="number"
          min="1"
          max="5"
          {...register('rating', { min: 1, max: 5 })}
          className="w-full p-2 bg-slate-800/50 border border-purple-500/30 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
        />
      </div>

      {/* Status */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-purple-300 mb-1">Estado</label>
        <select
          {...register('status')}
          className="w-full p-2 bg-slate-800/50 border border-purple-500/30 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
        >
          <option value="reading">📖 Leyendo</option>
          <option value="completed">✅ Completado</option>
          <option value="abandoned">❌ Abandonado</option>
        </select>
      </div>

      {/* Review */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-purple-300 mb-1">Reseña (opcional)</label>
        <textarea
          {...register('review')}
          placeholder="¿Qué te pareció?"
          rows="3"
          className="w-full p-2 bg-slate-800/50 border border-purple-500/30 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
        />
      </div>


      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded font-bold hover:shadow-lg hover:shadow-purple-600/50 disabled:opacity-50 transition-all"
      >
        {loading ? '⏳ Guardando...' : '✨ Registrar Lectura'}
      </button>
    </form>
  );
}