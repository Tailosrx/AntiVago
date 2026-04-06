import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      
      {/* Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-10"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-pink-600 rounded-full mix-blend-screen filter blur-3xl opacity-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl">
        
        {/* Logo */}
        <div className="mb-8 animate-fade-in">
          <img 
            className="w-64 mx-auto drop-shadow-2xl" 
            src="/antivago2.png" 
            alt="ReadPlay Logo" 
          />
        </div>

        {/* Título */}
        <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
          ReadPlay
        </h1>

        {/* Descripción */}
        <p className="text-xl md:text-2xl text-purple-300 mb-4 font-light">
          No abandones tus hobbies
        </p>
        
        <p className="text-base md:text-lg text-purple-400/80 mb-12 leading-relaxed max-w-xl mx-auto">
          Registra libros, juegos y animes mientras consigues logros, acumulas puntos y compites en el leaderboard comunitario.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-12 py-8 border-y border-purple-500/20">
          <div>
            <p className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">9+</p>
            <p className="text-sm text-purple-300 mt-1">Logros</p>
          </div>
          <div>
            <p className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">3</p>
            <p className="text-sm text-purple-300 mt-1">Categorías</p>
          </div>
          <div>
            <p className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">∞</p>
            <p className="text-sm text-purple-300 mt-1">Posibilidades</p>
          </div>
        </div>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/login" 
            className="px-8 py-4 rounded-lg font-black text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-600/50 hover:scale-105 transition-all duration-300"
          >
            ✨ Inicia Sesión
          </Link>
          <Link 
            to="/register" 
            className="px-8 py-4 rounded-lg font-black text-white border-2 border-purple-500 hover:bg-purple-500/10 hover:scale-105 transition-all duration-300"
          >
            🚀 Crear Cuenta
          </Link>
        </div>

        {/* Features Rápidas */}
        <div className="mt-16 space-y-3 text-left max-w-md mx-auto">
          <div className="flex items-center gap-3 text-purple-300">
            <span className="text-2xl">📚</span>
            <p>Registra libros, juegos y animes</p>
          </div>
          <div className="flex items-center gap-3 text-purple-300">
            <span className="text-2xl">🏆</span>
            <p>Desbloquea logros y acumula puntos</p>
          </div>
          <div className="flex items-center gap-3 text-purple-300">
            <span className="text-2xl">📊</span>
            <p>Sigue tu progreso en tiempo real</p>
          </div>
        </div>

        {/* Footer Link */}
        <p className="mt-12 text-purple-400/60 text-sm">
          ¿Problemas? <a href="mailto:soporte@readplay.app" className="text-purple-300 hover:text-white underline">Contactanos</a>
        </p>
      </div>
    </div>
  );
}