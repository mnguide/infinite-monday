import { useMemo } from 'react';
import { useGameStore } from '@/store/gameStore';
import { getScene } from '@/data/scenes';

export function SceneDisplay() {
  const gameState = useGameStore();
  const currentSceneId = gameState.loop.currentSceneId;

  const scene = useMemo(() => getScene(currentSceneId), [currentSceneId]);

  if (!scene) {
    return (
      <div className="scene-content">
        <p>Scene not found: {currentSceneId}</p>
      </div>
    );
  }

  const description = typeof scene.description === 'function'
    ? scene.description(gameState)
    : scene.description;

  return (
    <div className="scene-content fade-in" key={currentSceneId}>
      <span className="scene-location">{scene.location}</span>
      {scene.title && <h1 className="scene-title">{scene.title}</h1>}
      <p className="scene-description">{description}</p>
    </div>
  );
}
