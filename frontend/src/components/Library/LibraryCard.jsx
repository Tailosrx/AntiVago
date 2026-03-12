import { useState } from 'react';

export default function LibraryCard({ item, type }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer"
    >
      {/* Card */}
      <div className="relative rounded-lg overflow-hidden bg-gradient-to-br from-purple-600 to-pink-600 p-0.5 h-64 mb-3 transition-all hover:shadow-lg hover:shadow-purple-500/50">
        <div className="w-full h-full bg-gradient-to-br from-purple-700 to-pink-700 rounded-lg flex items-center justify-center text-5xl relative">
          {type === 'book' ? '📖' : '🎮'}

          {/* Overlay */}
          {isHovered && (
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-4">
              <button className="w-full py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg text-sm">
                {item.status === 'completed' ? 'View Details' : 'Continue'}
              </button>
            </div>
          )}

          {/* Tag */}
          <div className="absolute top-2 right-2 bg-purple-500/80 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded">
            {type === 'book' ? 'BOOK' : 'GAME'}
          </div>

          {/* Status */}
          {item.status === 'completed' && (
            <div className="absolute top-2 left-2 bg-green-500/80 text-white text-xs font-bold px-2 py-1 rounded">
              ✓ Completed
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <h3 className="font-black text-white text-sm line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all">
        {item.title}
      </h3>
      <p className="text-xs text-purple-300 mt-1">{item.author || item.category}</p>
      
      {item.status === 'reading' && (
        <div className="mt-2">
          <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: '45%' }}></div>
          </div>
          <p className="text-xs text-purple-400 mt-1">45% • Level Up Available!</p>
        </div>
      )}
    </div>
  );
}