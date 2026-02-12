import { useGameStore } from '@/store/gameStore';

export function Header() {
  const { loop, permanent } = useGameStore();

  // Convert minutes to display format
  const hour = Math.floor(loop.time / 60);
  const period = hour >= 12 ? '오후' : '오전';
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  const minute = loop.time % 60;
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
