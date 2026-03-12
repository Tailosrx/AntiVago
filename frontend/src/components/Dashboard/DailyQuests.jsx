export default function DailyQuests() {
    const quests = [
      { id: 1, title: 'Read 20 pages: Project Hail Mary', points: '+10 XP', completed: true },
      { id: 2, title: 'Play 1hr: Elden Ring', points: '+10 XP', completed: true },
      { id: 3, title: 'Daily Login Reward', points: '+10 XP', completed: false },
    ];
  
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            ✅ Daily Quests
            <span className="text-sm text-purple-400">4/6 COMPLETE</span>
          </h2>
        </div>
  
        <div className="space-y-3">
          {quests.map(quest => (
            <div
              key={quest.id}
              className="bg-slate-900/50 border border-purple-500/20 rounded-lg p-4 flex items-center justify-between hover:border-purple-500/40 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded border-2 ${
                  quest.completed 
                    ? 'bg-green-500 border-green-500' 
                    : 'border-purple-400'
                }`}>
                  {quest.completed && <span className="text-white text-xs">✓</span>}
                </div>
                <p className={`font-medium ${quest.completed ? 'text-purple-300 line-through' : 'text-white'}`}>
                  {quest.title}
                </p>
              </div>
              <p className="text-purple-400 font-bold text-sm">{quest.points}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }