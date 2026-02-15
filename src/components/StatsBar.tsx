import { useGameStore } from '@/store/gameStore';

export function StatsBar() {
  const { loop } = useGameStore();
  const stats = loop.stats;

  const formatMoney = (amount: number) => {
    if (amount >= 100000000) {
      const eok = Math.floor(amount / 100000000);
      const remainder = amount % 100000000;
      if (remainder === 0) return `${eok}억`;
      const man = Math.floor(remainder / 10000);
      const rest = remainder % 10000;
      if (rest === 0) return `${eok}억 ${man.toLocaleString()}만`;
      return `${eok}억 ${man.toLocaleString()}만 ${rest.toLocaleString()}`;
    }
    if (amount >= 10000) {
      const man = Math.floor(amount / 10000);
      const rest = amount % 10000;
      if (rest === 0) return `${man.toLocaleString()}만`;
      return `${man.toLocaleString()}만 ${rest.toLocaleString()}`;
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
