import { useGameStore } from '@/store/gameStore';
import { getScene } from '@/data/scenes';
import { EndingType } from '@/types/game';

const ENDING_INFO: Record<EndingType, { emoji: string; name: string; subtitle: string }> = {
  FIRED: { emoji: '📦', name: '해고', subtitle: '새로운 시작... 일지도?' },
  BURNOUT: { emoji: '🔥', name: '번아웃', subtitle: '더 이상은 무리야' },
  HOSPITALIZED: { emoji: '🏥', name: '과로 입원', subtitle: '건강이 최고야' },
  PROMOTION: { emoji: '👔', name: '승진', subtitle: '드디어 대리!' },
  ESCAPE: { emoji: '🎉', name: '화요일', subtitle: '드디어 탈출!' },
  RICH: { emoji: '💎', name: '부자', subtitle: '정보는 힘이다' },
  LOVE: { emoji: '💕', name: '사랑', subtitle: '함께라서 행복해' },
  STARTUP: { emoji: '🚀', name: '창업', subtitle: '새로운 도전' },
  ENLIGHTENED: { emoji: '🧘', name: '깨달음', subtitle: '모든 것이 명확해졌다' },
  SECRET: { emoji: '✨', name: '???', subtitle: '모든 것을 경험한 자' },
};

export function EndingScreen() {
  const gameState = useGameStore();
  const { currentEnding, permanent, startNewLoop } = gameState;
  const currentSceneId = gameState.loop.currentSceneId;

  if (!currentEnding) return null;

  const scene = getScene(currentSceneId);
  const endingInfo = ENDING_INFO[currentEnding];
  const isNewEnding = !permanent.achievedEndings.slice(0, -1).some(e => e.type === currentEnding);

  return (
    <div className="ending-screen fade-in">
      <div className="ending-badge">{endingInfo.emoji}</div>

      {isNewEnding && (
        <div style={{
          background: 'linear-gradient(90deg, #3182f6, #a855f7)',
          padding: '4px 12px',
          borderRadius: '12px',
          fontSize: '11px',
          fontWeight: '600',
          marginBottom: '16px',
        }}>
          NEW ENDING!
        </div>
      )}

      <h1 className="ending-title">{endingInfo.name}</h1>
      <p className="ending-subtitle">{endingInfo.subtitle}</p>

      {scene && (
        <p className="ending-description">
          {typeof scene.description === 'function'
            ? scene.description(gameState)
            : scene.description}
        </p>
      )}

      <div className="ending-stats">
        <div className="ending-stat">
          <div className="ending-stat-value">{permanent.totalLoops}</div>
          <div className="ending-stat-label">총 루프</div>
        </div>
        <div className="ending-stat">
          <div className="ending-stat-value">{permanent.achievedEndings.length}</div>
          <div className="ending-stat-label">달성 엔딩</div>
        </div>
      </div>

      <button className="restart-button" onClick={startNewLoop}>
        다시 월요일
      </button>
    </div>
  );
}
