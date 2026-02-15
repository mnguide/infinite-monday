import { useMemo } from 'react';
import { useGameStore } from '@/store/gameStore';
import { getScene, evaluateCondition } from '@/data/scenes';

export function ChoiceButtons() {
  const gameState = useGameStore();
  const { goToScene, applyEffect, isEnded } = gameState;
  const currentSceneId = gameState.loop.currentSceneId;

  const scene = useMemo(() => getScene(currentSceneId), [currentSceneId]);

  if (!scene || isEnded) {
    return null;
  }

  const availableChoices = scene.choices.filter(choice => {
    if (!choice.condition) return true;
    return evaluateCondition(choice.condition, gameState);
  });

  if (availableChoices.length === 0) {
    return null;
  }

  const currentMoney = gameState.loop.stats.money;

  const isMoneyInsufficient = (choice: typeof availableChoices[number]) => {
    const moneyCost = choice.effect?.stats?.money;
    return moneyCost !== undefined && moneyCost < 0 && currentMoney + moneyCost < 0;
  };

  const handleChoice = (choiceId: string) => {
    const choice = scene.choices.find(c => c.id === choiceId);
    if (!choice) return;
    if (isMoneyInsufficient(choice)) return;

    // Apply effect if exists
    if (choice.effect) {
      applyEffect(choice.effect);
    }

    // Go to next scene
    goToScene(choice.nextSceneId);
  };

  return (
    <div className="choices-container safe-area-bottom">
      {availableChoices.map((choice, index) => {
        const insufficient = isMoneyInsufficient(choice);
        return (
          <button
            key={choice.id}
            className={`choice-button slide-in${insufficient ? ' choice-disabled' : ''}`}
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => handleChoice(choice.id)}
            disabled={insufficient}
          >
            {choice.icon && <span className="choice-icon">{choice.icon}</span>}
            {choice.text}
            {insufficient
              ? <span className="choice-hint">(돈 부족)</span>
              : choice.hint && <span className="choice-hint">({choice.hint})</span>
            }
          </button>
        );
      })}
    </div>
  );
}
