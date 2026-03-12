import { useState } from 'react';

export default function Sidebar({ user, logout, total }) {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'library', label: 'Library', icon: '📚' },
    { id: 'achievements', label: 'Achievements', icon: '🏆' },
    { id: 'community', label: 'Community', icon: '👥' },
  ];

  return (
    <aside className="w-64 border-r border-purple-500/20 backdrop-blur-md bg-slate-950/50 flex flex-col">
      {/* Logo */}
      <div className="p-8 border-b border-purple-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <span className="text-xl font-black">📖</span>
          </div>
          <div>
            <h1 className="text-lg font-black text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
              ReadPlay
            </h1>
            <p className="text-xs text-purple-300">v1.0</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveMenu(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeMenu === item.id
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'text-purple-300 hover:bg-purple-500/20'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-bold">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* User Profile */}
      <div className="border-t border-purple-500/20 p-4">
        <div className="bg-purple-500/10 rounded-xl p-4 mb-4 border border-purple-500/20">
          <p className="text-xs text-purple-400 uppercase tracking-widest font-bold mb-2">Progress</p>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: '45%' }}></div>
          </div>
          <p className="text-xs text-purple-300">{total}/50 items</p>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
          <div className="flex-1">
            <p className="text-sm font-bold text-white">{user?.username}</p>
            <p className="text-xs text-purple-300">Lvl 12 Explorer</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full py-2 px-4 rounded-lg text-sm font-bold bg-red-500/20 text-red-300 hover:bg-red-500/40 transition-all border border-red-500/20"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}