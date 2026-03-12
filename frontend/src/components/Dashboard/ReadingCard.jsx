import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useEntries } from '../../hooks/useEntries';
import CreateReadingForm from '../../components/Forms/CreateReadingForm';
import ReadingCard from '../../components/Dashboard/ReadingCard';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { readings, loading, createReading, deleteEntry } = useEntries();
  const [activeTab, setActiveTab] = useState('readings');
  const [showForm, setShowForm] = useState(false);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Cargando...</div>;
  }

  const handleCreateReading = async (data) => {
    const result = await createReading(data);
    if (result.success) {
      setShowForm(false);
    }
    return result;
  };

  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro?')) {
      await deleteEntry('reading', id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">ReadPlay</h1>
            <p className="text-blue-100">Bienvenido, {user?.username}!</p>
          </div>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded font-bold"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-600 text-sm">Libros Leídos</p>
            <p className="text-3xl font-bold text-blue-600">{readings.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-600 text-sm">Juegos Completados</p>
            <p className="text-3xl font-bold text-green-600">0</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-600 text-sm">Animes Vistos</p>
            <p className="text-3xl font-bold text-purple-600">0</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 border-b">
          <button
            onClick={() => setActiveTab('readings')}
            className={`px-4 py-2 font-bold ${
              activeTab === 'readings'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600'
            }`}
          >
            📚 Lecturas
          </button>
          <button
            onClick={() => setActiveTab('games')}
            className={`px-4 py-2 font-bold ${
              activeTab === 'games'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600'
            }`}
          >
            🎮 Juegos
          </button>
          <button
            onClick={() => setActiveTab('animes')}
            className={`px-4 py-2 font-bold ${
              activeTab === 'animes'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600'
            }`}
          >
            🎬 Animes
          </button>
        </div>

        {/* Content */}
        {activeTab === 'readings' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form */}
            <div>
              {showForm ? (
                <CreateReadingForm
                  onSubmit={handleCreateReading}
                  loading={loading}
                />
              ) : (
                <button
                  onClick={() => setShowForm(true)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 text-lg"
                >
                  + Registrar Lectura
                </button>
              )}
            </div>

            {/* List */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-4">Mis Libros ({readings.length})</h2>
              {readings.length === 0 ? (
                <p className="text-gray-600">No has registrado libros aún.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {readings.map(reading => (
                    <ReadingCard
                      key={reading.id}
                      reading={reading}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tabs para Games y Animes (similar) */}
        {activeTab === 'games' && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Gestión de juegos - En construcción</p>
          </div>
        )}

        {activeTab === 'animes' && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Gestión de animes - En construcción</p>
          </div>
        )}
      </div>
    </div>
  );
}