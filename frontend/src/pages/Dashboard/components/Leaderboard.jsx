import rankingIcon from "../../../assets/ranking.svg";

export default function Leaderboard() {
  return (
    <div className="bg-slate-900/40 rounded-xl border border-primary/10 p-6">
      <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
        <span className="material-symbols-outlined text-primary">leaderboard</span>
        Ranking
      </h2>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 p-3 bg-primary/20 rounded-xl border border-primary/30">
          <span className="font-bold text-lg w-6 text-center">1</span>
          <div className="size-8 rounded-full bg-slate-700 overflow-hidden">
            <img
              className="w-full h-full object-cover"
              data-alt="Leaderboard user avatar 1"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkOSZD-hJ9ZERCTrB0bYM9FQdk4UlVv70HuveASzeAJZd58q8VMXfhK69I0FLDY3du8lUIn6zQi7-4l7Bm0gRx_vd6AvJPnWfZiAYrENVX3A7QRRf81U8p4ZZbQ7_-m22IquQgmakuwplUaFWZXdUIuDznPV0ptPuQlGJbAC6JBAHKJbUWW3ee5we5aJ9uHEXMhKqe07mRBjaYMmBAwWAMoHLdqbpZ6PAt_HHLfpQAs4u3YZrMVNLV27SjbqGpaa74BVR2PTPRiIY"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold">SkyWalker</p>
          </div>
          <span className="text-primary font-bold">12.4k</span>
        </div>
        <div className="flex items-center gap-3 p-3 hover:bg-slate-800/50 rounded-xl transition-all">
          <span className="font-bold text-lg w-6 text-center">2</span>
          <div className="size-8 rounded-full bg-slate-700 overflow-hidden">
            <img
              className="w-full h-full object-cover"
              data-alt="Leaderboard user avatar 2"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7DBf5hM5WZsXKGZho0cdDbi-ATEZloXQAGB5Cz4VcRy9st1Nqf89N9dJHpu-WYN5pvy6_cjzQfLrBK_LtzWKzDPmWyiuy7XAQMkyBDKdG6Q5FSbwEDiJQH6xc7B200eBIwVW_JXjoPb3ps17Mduc_wOGwwfqdxn3QueJzHsqUddoq0H9YN1n4H1jMyGt3ekcMKI3ya0OlO7LdbGfU71djqu-eGUVdw8PkuT22GzVEQYMQxNUw-UXYyWTgSATOsTt6hh5RLv9U3W0"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold">PixelArt</p>
          </div>
          <span className="text-slate-400 font-bold">10.1k</span>
        </div>
        <div className="flex items-center gap-3 p-3 hover:bg-slate-800/50 rounded-xl transition-all">
          <span className="font-bold text-lg w-6 text-center">3</span>
          <div className="size-8 rounded-full bg-slate-700 overflow-hidden">
            <img
              className="w-full h-full object-cover"
              data-alt="Leaderboard user avatar 3"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuADTYrIfaXPeR3XYvf33K85Yh9BIyleSoVBVl3eK4eklFykRVa5na9c-jTWgVZomv0KFZt5W5lGxe_far7UHdazejeNYQSoFNgASNjuu1A9c89N2AMVrfwI_hQFcx7M1gji3QEiEsH3fD2XApF5-VNTGs5aX3XX5uGHKLdTT4lPqubhHMmzesvA9leDSWHhrlAAUPiHnHu1dmDg14r82pcNHL-Cq0oa11YaSm5zTbJE6YanQ20p37Nqhl5u2RvqyAQMrc5bFx1G_-U"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold">You (Alex)</p>
          </div>
          <span className="text-slate-400 font-bold">9.8k</span>
        </div>
      </div>
    </div>
  );
}
