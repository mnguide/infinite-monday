import { useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { EndingType } from '@/types/game';

const ALL_ENDINGS: { type: EndingType; emoji: string; name: string }[] = [
  { type: 'ESCAPE', emoji: '🎉', name: '화요일' },
  { type: 'PROMOTION', emoji: '👔', name: '승진' },
  { type: 'LOVE', emoji: '💕', name: '사랑' },
  { type: 'STARTUP', emoji: '🚀', name: '창업' },
  { type: 'RICH', emoji: '💎', name: '부자' },
  { type: 'ENLIGHTENED', emoji: '🧘', name: '깨달음' },
  { type: 'BURNOUT', emoji: '🔥', name: '번아웃' },
  { type: 'HOSPITALIZED', emoji: '🏥', name: '입원' },
  { type: 'FIRED', emoji: '📦', name: '해고' },
  { type: 'SECRET', emoji: '✨', name: '???' },
];

export function CollectionModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { permanent } = useGameStore();

  const achievedEndingTypes = permanent.achievedEndings.map(e => e.type);

  return (
    <>
      <button
        className="collection-button"
        onClick={() => setIsOpen(true)}
      >
        📚
      </button>

      {isOpen && (
        <div
          className="collection-modal"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div className="collection-content">
            <div className="collection-header">
              <h2 className="collection-title">엔딩 컬렉션</h2>
              <button
                className="collection-close"
                onClick={() => setIsOpen(false)}
              >
                ×
              </button>
            </div>

            <div style={{ marginBottom: '16px', fontSize: '13px', color: 'var(--text-muted)' }}>
              {achievedEndingTypes.length} / {ALL_ENDINGS.length} 달성
            </div>

            <div className="endings-grid">
              {ALL_ENDINGS.map((ending) => {
                const achieved = achievedEndingTypes.includes(ending.type);
                const record = permanent.achievedEndings.find(e => e.type === ending.type);

                return (
                  <div
                    key={ending.type}
                    className={`ending-card ${!achieved ? 'locked' : ''}`}
                  >
                    <div className="ending-card-icon">
                      {achieved ? ending.emoji : '🔒'}
                    </div>
                    <div className="ending-card-name">
                      {achieved ? ending.name : '???'}
                    </div>
                    {achieved && record && (
                      <div className="ending-card-loop">
                        Loop #{record.loopCount}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {permanent.fastestEscape && (
              <div style={{
                marginTop: '20px',
                padding: '12px',
                background: 'var(--bg-tertiary)',
                borderRadius: '12px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  최단 탈출 기록
                </div>
                <div style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: 'var(--accent-blue)',
                  marginTop: '4px',
                }}>
                  {Math.floor(permanent.fastestEscape / 60)}시간 {permanent.fastestEscape % 60}분
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
