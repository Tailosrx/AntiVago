import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen pattern bg-gray-100 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl">
        
        {/* Logo - Mismo tamaño que Library */}
        <div className="mb-12">
          <img 
            className="w-56 mx-auto drop-shadow-2xl " 
            src="/antivago2.png" 
            alt="ReadPlay Logo" 
          />
        </div>


        {/* Subtítulo */}
        <p className="text-xl md:text-2xl text-black mb-4 font-bold"
         style={{ fontFamily: "'Nunito', sans-serif" }}>
          No abandones tus hobbies
        </p>
        
        {/* Descripción - Mismo color que Login */}
        <p className="text-base md:text-lg text-gray-600 mb-12 leading-relaxed max-w-xl mx-auto"
         style={{ fontFamily: "'Nunito', sans-serif" }}>
          Registra libros, juegos y animes mientras consigues logros, acumulas puntos y compites en el leaderboard comunitario.
        </p>

        

        {/* Botones - Estilo Wii */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
          <Link 
            to="/login" 
            className="w-full h-auto bg-blue-600 text-white p-2 rounded font-bold hover:bg-blue-700"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            ✨ Inicia Sesión
          </Link>
          <Link 
            to="/register" 
            className="w-full h-auto bg-green-500 text-white p-2 rounded font-bold hover:bg-green-600"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            🚀 Crear Cuenta
          </Link>
        </div>

         {/* Features - Estilo Wii */}
         <div className="bg-white/80 border-4 border-purple-300 rounded-3xl p-8 mb-12 shadow-xl">
          <h2 className="text-3xl font-black text-blue-700 mb-8 text-center"
            style={{ fontFamily: "'Nunito', sans-serif" }}>
            ✨ Características
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-6 border-1 border-blue-300 hover:shadow-lg hover:scale-105 transition-all duration-300">
            <img className="w-14 mx-auto block mb-3" src='/book.png' />              
            <p className="text-blue-700 font-black text-sm" style={{ fontFamily: "'Nunito', sans-serif" }}>Registra libros, juegos y animes</p>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl p-6 border-1 border-purple-300 hover:shadow-lg hover:scale-105 transition-all duration-300">
              <img className="w-14 mx-auto block mb-3" src='/locked.webp' />
              <p className="text-purple-700 font-black text-sm" style={{ fontFamily: "'Nunito', sans-serif" }}>Desbloquea logros y acumula puntos</p>
            </div>
            <div className="bg-gradient-to-br from-pink-100 to-pink-50 rounded-2xl p-6 border-1 border-pink-300 hover:shadow-lg hover:scale-105 transition-all duration-300">
            <img className="w-14 mx-auto block mb-3" src='/anime.png' />
              <p className="text-pink-700 font-black text-sm" style={{ fontFamily: "'Nunito', sans-serif" }}>Sigue tu progreso en tiempo real</p>
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <p className="mt-12 text-gray-600 text-sm font-bold" style={{ fontFamily: "'Nunito', sans-serif" }}>
          ¿Problemas? <a href="mailto:kevinrx03@gmail.com" className="text-blue-600 hover:text-purple-600 underline font-black">Contactanos</a>
        </p>
      </div>
    </div>
  );
}