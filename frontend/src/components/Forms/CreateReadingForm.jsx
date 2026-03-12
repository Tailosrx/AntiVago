import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function CreateReadingForm({ onSubmit, loading }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      author: '',
      category: 'Romantasy',
      rating: 5,
      status: 'reading',
      review: '',
      isFavorite: false
    }
  });

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
    <form onSubmit={handleSubmit(handleFormSubmit)} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Registrar Lectura</h2>

      {/* Título */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Título *</label>
        <input
          type="text"
          {...register('title', { required: 'Título requerido' })}
          placeholder="Ej: El Conde de Montecristo"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>

      {/* Autor */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Autor</label>
        <input
          type="text"
          {...register('author')}
          placeholder="Ej: Alexandre Dumas"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Categoría */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Categoría *</label>
        <select
          {...register('category')}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Rating */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Rating (1-5)</label>
        <input
          type="number"
          min="1"
          max="5"
          {...register('rating', { min: 1, max: 5 })}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Status */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Estado</label>
        <select
          {...register('status')}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="reading">Leyendo</option>
          <option value="completed">Completado</option>
          <option value="abandoned">Abandonado</option>
        </select>
      </div>

      {/* Review */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Reseña (opcional)</label>
        <textarea
          {...register('review')}
          placeholder="¿Qué te pareció?"
          rows="3"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Favorito */}
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          {...register('isFavorite')}
          className="mr-2"
        />
        <label className="text-sm font-medium">Marcar como favorito</label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? 'Guardando...' : 'Registrar Lectura'}
      </button>
    </form>
  );
}