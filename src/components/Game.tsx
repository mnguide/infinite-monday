import { useGameStore } from '@/store/gameStore';
import { useTossGame } from '@/hooks/useTossGame';
import { Header } from './Header';
import { StatsBar } from './StatsBar';
import { SceneDisplay } from './SceneDisplay';
import { ChoiceButtons } from './ChoiceButtons';
import { EndingScreen } from './EndingScreen';
import { CollectionModal } from './CollectionModal';

export function Game() {
  const { isInitialized } = useTossGame();
  const { isEnded } = useGameStore();

  if (!isInitialized) {
    return (
      <div className="game-container">
        <div className="loading-screen">
          <div className="loading-spinner" />
          <div className="loading-text">게임 로딩 중...</div>
        </div>
      </div>
    );
  }

  if (isEnded) {
    return (
      <div className="game-container">
        <EndingScreen />
        <CollectionModal />
      </div>
    );
  }

  return (
    <div className="game-container">
      <Header />
      <StatsBar />
      <SceneDisplay />
      <ChoiceButtons />
      <CollectionModal />
    </div>
  );
}
