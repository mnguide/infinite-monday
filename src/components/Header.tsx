import { useGameStore } from '@/store/gameStore';

export function Header() {
  const { loop, permanent } = useGameStore();

  // Convert minutes to display format (clamp to 24h range)
  const clampedTime = Math.min(loop.time, 24 * 60);
  const hour = Math.floor(clampedTime / 60) % 24;
  const period = hour >= 12 ? '오후' : '오전';
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  const minute = clampedTime % 60;
  const timeDisplay = `${period} ${displayHour}:${minute.toString().padStart(2, '0')}`;

  return (
    <header className="game-header safe-area-top">
      <div>
        <div className="game-time">{timeDisplay}</div>
        <div className="game-day">월요일</div>
      </div>
      {permanent.totalLoops > 1 && (
        <div className="loop-count">
          Loop #{permanent.totalLoops}
        </div>
      )}
    </header>
  );
}
