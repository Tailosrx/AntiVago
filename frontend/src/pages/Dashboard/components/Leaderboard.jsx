import rankingIcon from "../../../assets/ranking.svg";

export default function Leaderboard() {
  return (
    <div className="leaderboard">
      <h2 className="leaderboard-title">
        <img src={rankingIcon} alt="" />
        Leaderboard
      </h2>

      <div className="leaderboard-list">
        {/* Top 1 */}
        <div className="leaderboard-item">
          <span className="leaderboard-rank">1</span>

          <div className="leaderboard-avatar">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkOSZD-hJ9ZERCTrB0bYM9FQdk4UlVv70HuveASzeAJZd58q8VMXfhK69I0FLDY3du8lUIn6zQi7-4l7Bm0gRx_vd6AvJPnWfZiAYrENVX3A7QRRf81U8p4ZZbQ7_-m22IquQgmakuwplUaFWZXdUIuDznPV0ptPuQlGJbAC6JBAHKJbUWW3ee5we5aJ9uHEXMhKqe07mRBjaYMmBAwWAMoHLdqbpZ6PAt_HHLfpQAs4u3YZrMVNLV27SjbqGpaa74BVR2PTPRiIY"
              alt="User avatar"
            />
          </div>

          <div className="leaderboard-name">SkyWalker</div>

          <span className="leaderboard-score">12.4k</span>
        </div>

        {/* Aquí puedes repetir el patrón para más jugadores */}
      </div>
    </div>
  );
}
