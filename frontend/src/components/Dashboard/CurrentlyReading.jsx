export default function CurrentlyReading({ readings }) {
    const currentlyReading = readings.filter(r => r.status === 'reading').slice(0, 3);
  
    if (currentlyReading.length === 0) {
      return (
        <div className="text-center py-12 rounded-2xl border-2 border-dashed border-purple-500/20">
          <p className="text-5xl mb-4">📚</p>
          <p className="text-white font-bold mb-2">Start Reading</p>
          <p className="text-purple-300 text-sm">No books currently being read</p>
        </div>
      );
    }
  
    return (
      <div>
        <h2 className="text-xl font-black text-white mb-6 flex items-center gap-2">
          🎯 Currently Consuming
        </h2>
  
        <div className="grid grid-cols-1 gap-4">
          {currentlyReading.map(book => (
            <div
              key={book.id}
              className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-500/40 transition-all cursor-pointer group"
            >
              <div className="flex h-32">
                {/* Placeholder Image */}
                <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl">
                  📖
                </div>
  
                {/* Content */}
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-purple-500/30 text-purple-200 px-2 py-1 rounded font-bold uppercase">
                        BOOK
                      </span>
                    </div>
                    <h3 className="font-black text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all">
                      {book.title}
                    </h3>
                    <p className="text-xs text-purple-300 mt-1">{book.author}</p>
                  </div>
  
                  <div>
                    <div className="flex justify-between text-xs text-purple-300 mb-2">
                      <span>Progress</span>
                      <span>45%</span>
                    </div>
                    <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }