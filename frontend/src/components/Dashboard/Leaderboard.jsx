export default function Leaderboard() {
    const leaderboard = [
      { rank: 1, name: 'SkyWalker', points: '12.4k', avatar: '👨‍💻' },
      { rank: 2, name: 'PixelArt', points: '10.1k', avatar: '🎨' },
      { rank: 3, name: 'You (Alex)', points: '9.8k', avatar: '👤', isYou: true },
    ];
  
    return (
      <div className="bg-slate-900/50 border border-purple-500/20 rounded-2xl p-6">
        <h2 className="text-xl font-black text-white mb-6 flex items-center gap-2">
          📊 Leaderboard
        </h2>
  
        <div className="space-y-3">
          {leaderboard.map(user => (
            <div
              key={user.rank}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                user.isYou 
                  ? 'bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/50' 
                  : 'hover:bg-purple-500/10'
              }`}
            >
              <div className="text-lg font-black w-8 text-center">
                {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'}
              </div>
              <div className="text-2xl">{user.avatar}</div>
              <div className="flex-1">
                <p className="text-sm font-bold text-white">{user.name}</p>
              </div>
              <p className={`font-black text-sm ${user.isYou ? 'text-pink-400' : 'text-purple-400'}`}>
                {user.points}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }