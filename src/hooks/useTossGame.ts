import { useEffect, useCallback } from 'react';
import { useGameStore } from '@/store/gameStore';
import { PermanentData } from '@/types/game';

// Storage mock for development (실제로는 @apps-in-toss/web-framework의 Storage 사용)
const StorageMock = {
  async getItem(key: string): Promise<string | null> {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(key);
    }
    return null;
  },
  async setItem(key: string, value: string): Promise<void> {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  },
};

// getUserKeyForGame mock for development
const getUserKeyForGameMock = async (): Promise<{ type: 'HASH'; hash: string } | 'INVALID_CATEGORY' | 'ERROR' | undefined> => {
  // 개발 환경에서는 mock 데이터 반환
  return {
    type: 'HASH',
    hash: 'dev-user-' + Math.random().toString(36).substr(2, 9),
  };
};

const STORAGE_KEY = 'infinite-monday-save';

export function useTossGame() {
  const {
    initialize,
    getSaveData,
    isInitialized,
    userId,
    permanent,
  } = useGameStore();

  // 게임 초기화
  const initializeGame = useCallback(async () => {
    try {
      // 토스 SDK 가져오기 시도
      let Storage: typeof StorageMock;
      let getUserKeyForGame: typeof getUserKeyForGameMock;

      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sdk = await import('@apps-in-toss/web-framework') as any;
        Storage = sdk.Storage;
        getUserKeyForGame = sdk.getUserKeyForGame;
      } catch {
        // SDK 로드 실패시 mock 사용 (개발 환경)
        console.log('[Dev Mode] Using mock storage and user key');
        Storage = StorageMock;
        getUserKeyForGame = getUserKeyForGameMock;
      }

      // 유저 키 가져오기
      let userKey: string | null = null;
      const result = await getUserKeyForGame();

      if (result && typeof result === 'object' && result.type === 'HASH') {
        userKey = result.hash;
      } else {
        console.log('Game login not available, using anonymous mode');
        userKey = 'anonymous-' + Date.now();
      }

      // 저장된 데이터 불러오기
      let savedData: PermanentData | null = null;
      const savedJson = await Storage.getItem(`${STORAGE_KEY}-${userKey}`);

      if (savedJson) {
        try {
          savedData = JSON.parse(savedJson);
        } catch (e) {
          console.error('Failed to parse saved data:', e);
        }
      }

      // 게임 초기화
      initialize(userKey, savedData);
    } catch (error) {
      console.error('Failed to initialize game:', error);
      // 에러 시에도 게임은 시작
      initialize(null, null);
    }
  }, [initialize]);

  // 게임 저장
  const saveGame = useCallback(async () => {
    try {
      let Storage: typeof StorageMock;

      try {
        const sdk = await import('@apps-in-toss/web-framework');
        Storage = sdk.Storage;
      } catch {
        Storage = StorageMock;
      }

      const saveData = getSaveData();
      const key = userId || 'anonymous';
      await Storage.setItem(`${STORAGE_KEY}-${key}`, JSON.stringify(saveData));
      console.log('Game saved successfully');
    } catch (error) {
      console.error('Failed to save game:', error);
    }
  }, [getSaveData, userId]);

  // 초기화
  useEffect(() => {
    if (!isInitialized) {
      initializeGame();
    }
  }, [isInitialized, initializeGame]);

  // 상태 변경시 자동 저장
  useEffect(() => {
    if (isInitialized) {
      saveGame();
    }
  }, [isInitialized, permanent, saveGame]);

  return {
    isInitialized,
    saveGame,
  };
}
