import { useGameStore } from '@/store/gameStore';

export function StatsBar() {
  const { loop } = useGameStore();
  const stats = loop.stats;

  const formatMoney = (amount: number) => {
    if (amount >= 10000) {
      return `${Math.floor(amount / 10000)}만`;
    }
    return amount.toLocaleString();
  };

  return (
    <div className="stats-bar">
      <div className="stat-item stat-health">
        <span className="stat-icon">❤️</span>
        <span className="stat-value">{stats.health}</span>
        <div className="stat-bar">
          <div
            className="stat-bar-fill"
            style={{ width: `${stats.health}%` }}
          />
        </div>
      </div>

      <div className="stat-item stat-mental">
        <span className="stat-icon">🧠</span>
        <span className="stat-value">{stats.mental}</span>
        <div className="stat-bar">
          <div
            className="stat-bar-fill"
            style={{ width: `${stats.mental}%` }}
          />
        </div>
      </div>

      <div className="stat-item stat-reputation">
        <span className="stat-icon">⭐</span>
        <span className="stat-value">{stats.reputation}</span>
        <div className="stat-bar">
          <div
            className="stat-bar-fill"
            style={{ width: `${stats.reputation}%` }}
          />
        </div>
      </div>

      <div className="stat-item stat-money">
        <span className="stat-icon">💰</span>
        <span className="stat-value">{formatMoney(stats.money)}</span>
        <div className="stat-bar">
          <div
            className="stat-bar-fill"
            style={{ width: `${Math.min(100, stats.money / 1000)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
