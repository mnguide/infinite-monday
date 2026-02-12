// ============================================
// 무한 월요일 - 게임 스토어
// 기획서 기반 완전 재작성
// ============================================

import { create } from 'zustand';
import {
  GameState,
  PermanentData,
  Stats,
  EndingType,
  EndingRecord,
  Effect,
  CharacterId,
  INITIAL_STATS,
  INITIAL_TIME,
  DAY_END_TIME,
  INITIAL_PERMANENT,
  INITIAL_LOOP,
} from '@/types/game';

// ============================================
// 스토어 인터페이스
// ============================================

interface GameStore extends GameState {
  // 초기화
  initialize: (userId: string | null, savedData: PermanentData | null) => void;

  // 게임 진행
  makeChoice: (choiceId: string) => void;
  goToScene: (sceneId: string) => void;

  // 효과 적용
  applyEffect: (effect: Effect) => void;
  modifyStats: (stats: Partial<Stats>) => void;
  modifyAffinity: (characterId: CharacterId, delta: number) => void;
  addTime: (minutes: number) => void;
  setFlag: (flag: string, value: boolean) => void;
  discoverClue: (clueId: string) => void;

  // 루프 관리
  startNewLoop: () => void;
  checkLoopEnd: () => 'time_up' | 'health_zero' | 'mental_zero' | 'reputation_zero' | null;

  // 엔딩
  setEnding: (ending: EndingType) => void;

  // 리셋
  resetGame: () => void;

  // 데이터
  getSaveData: () => PermanentData;
}

// ============================================
// 초기 상태
// ============================================

const createInitialState = (): GameState => ({
  loop: { ...INITIAL_LOOP },
  permanent: { ...INITIAL_PERMANENT },
  userId: null,
  isInitialized: false,
  isEnded: false,
  currentEnding: null,
});

// ============================================
// 스토어 생성
// ============================================

export const useGameStore = create<GameStore>((set, get) => ({
  ...createInitialState(),

  // ----------------------------------------
  // 초기화
  // ----------------------------------------
  initialize: (userId, savedData) => {
    const permanent = savedData
      ? { ...savedData }
      : { ...INITIAL_PERMANENT };

    // 새 루프 시작
    set({
      loop: {
        time: INITIAL_TIME,
        stats: { ...INITIAL_STATS },
        currentSceneId: 'loop_start',
        visitedScenes: [],
        flags: {},
      },
      permanent: {
        ...permanent,
        totalLoops: permanent.totalLoops + 1,
      },
      userId,
      isInitialized: true,
      isEnded: false,
      currentEnding: null,
    });
  },

  // ----------------------------------------
  // 선택지 처리
  // ----------------------------------------
  makeChoice: (choiceId) => {
    // scenes.ts에서 처리할 것이므로 여기서는 기본 구조만
    // 실제 로직은 Scene의 choice.effect와 nextSceneId로 처리
    console.log(`Choice made: ${choiceId}`);
  },

  // ----------------------------------------
  // 씬 이동
  // ----------------------------------------
  goToScene: (sceneId) => {
    const state = get();
    set({
      loop: {
        ...state.loop,
        currentSceneId: sceneId,
        visitedScenes: [...state.loop.visitedScenes, state.loop.currentSceneId],
      },
    });
  },

  // ----------------------------------------
  // 효과 적용 (통합)
  // ----------------------------------------
  applyEffect: (effect) => {
    const state = get();
    const store = get();

    // 시간 추가
    if (effect.time !== undefined) {
      store.addTime(effect.time);
    }

    // 스탯 변화
    if (effect.stats) {
      store.modifyStats(effect.stats);
    }

    // 호감도 변화
    if (effect.affinity) {
      for (const [charId, delta] of Object.entries(effect.affinity)) {
        if (delta !== undefined) {
          store.modifyAffinity(charId as CharacterId, delta);
        }
      }
    }

    // 플래그 설정
    if (effect.flags) {
      for (const [flag, value] of Object.entries(effect.flags)) {
        store.setFlag(flag, value);
      }
    }

    // 단서 발견
    if (effect.clues) {
      for (const clueId of effect.clues) {
        store.discoverClue(clueId);
      }
    }

    // 아이템 획득
    if (effect.items) {
      const newItems = effect.items.filter(
        item => !state.permanent.acquiredItems.includes(item)
      );
      if (newItems.length > 0) {
        set({
          permanent: {
            ...state.permanent,
            acquiredItems: [...state.permanent.acquiredItems, ...newItems],
          },
        });
      }
    }
  },

  // ----------------------------------------
  // 스탯 수정
  // ----------------------------------------
  modifyStats: (statChanges) => {
    const state = get();
    const currentStats = state.loop.stats;

    const newStats: Stats = {
      health: clamp(currentStats.health + (statChanges.health ?? 0), 0, 100),
      mental: clamp(currentStats.mental + (statChanges.mental ?? 0), 0, 100),
      reputation: clamp(currentStats.reputation + (statChanges.reputation ?? 0), 0, 100),
      money: Math.max(0, currentStats.money + (statChanges.money ?? 0)),
    };

    set({
      loop: {
        ...state.loop,
        stats: newStats,
      },
    });

    // 최고 금액 기록
    if (newStats.money > state.permanent.highestMoney) {
      set({
        permanent: {
          ...state.permanent,
          highestMoney: newStats.money,
        },
      });
    }
  },

  // ----------------------------------------
  // 호감도 수정
  // ----------------------------------------
  modifyAffinity: (characterId, delta) => {
    const state = get();
    const affinities = state.permanent.characterAffinities;
    const current = affinities[characterId];

    if (!current) return;

    const newLevel = clamp(current.level + delta, -100, 100);

    set({
      permanent: {
        ...state.permanent,
        characterAffinities: {
          ...affinities,
          [characterId]: {
            ...current,
            level: newLevel,
          },
        },
      },
    });
  },

  // ----------------------------------------
  // 시간 추가
  // ----------------------------------------
  addTime: (minutes) => {
    const state = get();
    const newTime = state.loop.time + minutes;

    set({
      loop: {
        ...state.loop,
        time: newTime,
      },
    });
  },

  // ----------------------------------------
  // 플래그 설정
  // ----------------------------------------
  setFlag: (flag, value) => {
    const state = get();
    set({
      loop: {
        ...state.loop,
        flags: {
          ...state.loop.flags,
          [flag]: value,
        },
      },
    });
  },

  // ----------------------------------------
  // 단서 발견
  // ----------------------------------------
  discoverClue: (clueId) => {
    const state = get();
    const existing = state.permanent.discoveredClues.find(c => c.id === clueId);

    if (existing) return; // 이미 발견됨

    set({
      permanent: {
        ...state.permanent,
        discoveredClues: [
          ...state.permanent.discoveredClues,
          {
            id: clueId,
            state: 'discovered',
            discoveredAt: state.permanent.totalLoops,
          },
        ],
      },
    });
  },

  // ----------------------------------------
  // 루프 종료 체크
  // ----------------------------------------
  checkLoopEnd: () => {
    const state = get();
    const { time, stats } = state.loop;

    if (time >= DAY_END_TIME) return 'time_up';
    if (stats.health <= 0) return 'health_zero';
    if (stats.mental <= 0) return 'mental_zero';
    if (stats.reputation <= 0) return 'reputation_zero';

    return null;
  },

  // ----------------------------------------
  // 새 루프 시작
  // ----------------------------------------
  startNewLoop: () => {
    const state = get();

    set({
      loop: {
        time: INITIAL_TIME,
        stats: { ...INITIAL_STATS },
        currentSceneId: 'loop_transition',
        visitedScenes: [],
        flags: {},
      },
      permanent: {
        ...state.permanent,
        totalLoops: state.permanent.totalLoops + 1,
      },
      isEnded: false,
      currentEnding: null,
    });
  },

  // ----------------------------------------
  // 엔딩 설정
  // ----------------------------------------
  setEnding: (ending) => {
    const state = get();

    // 이미 달성한 엔딩인지 확인
    const alreadyAchieved = state.permanent.achievedEndings.some(
      e => e.type === ending
    );

    const newEnding: EndingRecord = {
      type: ending,
      achievedAt: Date.now(),
      loopCount: state.permanent.totalLoops,
    };

    let newPermanent = { ...state.permanent };

    // 새 엔딩이면 추가
    if (!alreadyAchieved) {
      newPermanent.achievedEndings = [
        ...state.permanent.achievedEndings,
        newEnding,
      ];
    }

    // ESCAPE 엔딩 최고 기록
    if (ending === 'ESCAPE') {
      const elapsedMinutes = state.loop.time - INITIAL_TIME;
      if (
        !newPermanent.fastestEscape ||
        elapsedMinutes < newPermanent.fastestEscape
      ) {
        newPermanent.fastestEscape = elapsedMinutes;
      }
    }

    // 엔딩 씬으로 이동
    const endingSceneId = getEndingSceneId(ending);

    set({
      loop: {
        ...state.loop,
        currentSceneId: endingSceneId,
      },
      permanent: newPermanent,
      isEnded: true,
      currentEnding: ending,
    });
  },

  // ----------------------------------------
  // 게임 리셋
  // ----------------------------------------
  resetGame: () => {
    const state = get();
    set({
      ...createInitialState(),
      userId: state.userId,
      isInitialized: true,
    });
  },

  // ----------------------------------------
  // 저장 데이터 반환
  // ----------------------------------------
  getSaveData: () => {
    return get().permanent;
  },
}));

// ============================================
// 유틸리티 함수
// ============================================

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function getEndingSceneId(ending: EndingType): string {
  const endingScenes: Record<EndingType, string> = {
    ESCAPE: 'ending_escape',
    SECRET: 'ending_secret',
    LOVE: 'ending_love',
    PROMOTION: 'ending_promotion',
    STARTUP: 'ending_startup',
    RICH: 'ending_rich',
    ENLIGHTENED: 'ending_enlightened',
    BURNOUT: 'ending_burnout',
    HOSPITALIZED: 'ending_hospitalized',
    FIRED: 'ending_fired',
  };
  return endingScenes[ending];
}

// ============================================
// 셀렉터 (성능 최적화용)
// ============================================

export const selectLoopState = (state: GameState) => state.loop;
export const selectPermanentData = (state: GameState) => state.permanent;
export const selectCurrentScene = (state: GameState) => state.loop.currentSceneId;
export const selectStats = (state: GameState) => state.loop.stats;
export const selectTime = (state: GameState) => state.loop.time;
export const selectTotalLoops = (state: GameState) => state.permanent.totalLoops;
export const selectAffinities = (state: GameState) => state.permanent.characterAffinities;
