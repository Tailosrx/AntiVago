import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">ReadPlay</h1>
        <p className="text-xl text-white/80 mb-8">Lee, juega, colecciona, gana logros</p>
        <div className="flex gap-4 justify-center">
          <Link to="/login" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100">
            Login
          </Link>
          <Link to="/register" className="bg-purple-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-purple-600">
            Registrar
          </Link>
        </div>
      </div>
    </div>
  );
}
