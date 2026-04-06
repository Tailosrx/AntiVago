import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      
      {/* Background Blobs - Mismo estilo que Login */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-10"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-pink-600 rounded-full mix-blend-screen filter blur-3xl opacity-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl">
        
        {/* Logo - Mismo tamaño que Library */}
        <div className="mb-12">
          <img 
            className="w-56 mx-auto drop-shadow-2xl hover:scale-105 transition-transform duration-300" 
            src="/antivago2.png" 
            alt="ReadPlay Logo" 
          />
        </div>

        {/* Título - Mismo estilo que Login */}
        <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
          ReadPlay
        </h1>

        {/* Subtítulo */}
        <p className="text-xl md:text-2xl text-purple-300 mb-4 font-bold">
          No abandones tus hobbies
        </p>
        
        {/* Descripción - Mismo color que Login */}
        <p className="text-base md:text-lg text-purple-400/80 mb-12 leading-relaxed max-w-xl mx-auto">
          Registra libros, juegos y animes mientras consigues logros, acumulas puntos y compites en el leaderboard comunitario.
        </p>

        {/* Stats - Estilo Library con border */}
        <div className="grid grid-cols-3 gap-6 mb-12 py-8 border-y border-purple-500/20">
          <div className="text-center">
            <p className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">9+</p>
            <p className="text-sm text-purple-300 mt-2 font-bold">Logros</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">3</p>
            <p className="text-sm text-purple-300 mt-2 font-bold">Categorías</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">∞</p>
            <p className="text-sm text-purple-300 mt-2 font-bold">Posibilidades</p>
          </div>
        </div>

        {/* Botones - Mismo estilo que Login */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link 
            to="/login" 
            className="px-8 py-3 rounded-lg font-black text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-600/50 hover:scale-105 transition-all duration-300"
          >
            ✨ Inicia Sesión
          </Link>
          <Link 
            to="/register" 
            className="px-8 py-3 rounded-lg font-black text-white border-2 border-purple-500 hover:bg-purple-500/10 hover:scale-105 transition-all duration-300"
          >
            🚀 Crear Cuenta
          </Link>
        </div>

        {/* Features - Mismo estilo que Library */}
        <div className="bg-slate-900/30 border border-purple-500/20 rounded-2xl p-8 mb-12 backdrop-blur-sm">
          <h2 className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 text-center">
            ✨ Características
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="text-4xl">📚</span>
              <p className="text-purple-300 font-bold text-sm">Registra libros, juegos y animes</p>
            </div>
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="text-4xl">🏆</span>
              <p className="text-purple-300 font-bold text-sm">Desbloquea logros y acumula puntos</p>
            </div>
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="text-4xl">📊</span>
              <p className="text-purple-300 font-bold text-sm">Sigue tu progreso en tiempo real</p>
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-8">
          <p className="text-purple-300 mb-4 font-semibold">
            ¿Listo para completar tus hobbies?
          </p>
          <Link 
            to="/register" 
            className="inline-block px-8 py-3 rounded-lg font-black text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-600/50 hover:scale-105 transition-all duration-300"
          >
            🚀 Comienza Ahora
          </Link>
        </div>

        {/* Footer Link - Mismo color que Login */}
        <p className="mt-12 text-purple-400/60 text-sm">
          ¿Problemas? <a href="mailto:soporte@readplay.app" className="text-purple-300 hover:text-white underline font-bold">Contactanos</a>
        </p>
      </div>
    </div>
  );
}