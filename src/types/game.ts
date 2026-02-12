// ============================================
// 무한 월요일 - 게임 타입 정의
// 기획서 기반 완전 재작성
// ============================================

// ============================================
// 기본 타입
// ============================================

/** 플레이어 스탯 */
export interface Stats {
  health: number;      // 체력 (0-100)
  mental: number;      // 멘탈 (0-100)
  reputation: number;  // 평판 (0-100)
  money: number;       // 돈 (원)
}

/** 게임 시간 (분 단위로 저장) */
export type GameTime = number; // 0 = 00:00, 420 = 07:00, 1440 = 24:00

/** 시간대 */
export type TimePeriod =
  | 'early_morning'  // 07:00~09:00
  | 'morning'        // 09:00~12:00
  | 'lunch'          // 12:00~14:00
  | 'afternoon'      // 14:00~18:00
  | 'evening'        // 18:00~22:00
  | 'night';         // 22:00~24:00

// ============================================
// 캐릭터 시스템
// ============================================

/** 캐릭터 ID */
export type CharacterId =
  | 'kim_donghyun'   // 부장
  | 'lee_seungho'    // 과장
  | 'yoon_jihyun'    // 지현
  | 'park_junhyuk'   // 준혁
  | 'choi_minsoo'    // 민수
  | 'jung_subin';    // 바리스타

/** 캐릭터 정보 */
export interface Character {
  id: CharacterId;
  name: string;
  title: string;        // 직급/역할
  department: string;   // 소속
  description: string;
  color: string;        // 테마 색상
}

/** 호감도 단계 */
export type AffinityStage =
  | 'hostile'    // -100 ~ -50
  | 'wary'       // -49 ~ -1
  | 'neutral'    // 0 ~ 19
  | 'friendly'   // 20 ~ 39
  | 'close'      // 40 ~ 59
  | 'trusted'    // 60 ~ 79
  | 'bonded';    // 80 ~ 100

/** 캐릭터별 호감도 데이터 */
export interface CharacterAffinity {
  level: number;              // -100 ~ 100
  unlockedEvents: string[];   // 해금된 이벤트
  flags: Record<string, boolean>; // 캐릭터별 플래그
}

// ============================================
// 단서 시스템
// ============================================

/** 단서 유형 */
export type ClueType =
  | 'physical'     // 물리적 증거
  | 'testimony'    // 증언
  | 'observation'  // 관찰
  | 'memory';      // 기억

/** 단서 상태 */
export type ClueState =
  | 'undiscovered' // 미발견
  | 'discovered'   // 발견
  | 'analyzed';    // 분석됨

/** 단서 정의 */
export interface Clue {
  id: string;
  name: string;
  type: ClueType;
  content: string;
  discovery: {
    location?: string;
    character?: CharacterId;
    time?: string;        // "14:30~16:30" 형식
    conditions?: string[];
  };
  leadsTo?: string[];     // 연결되는 다른 단서
}

/** 발견한 단서 */
export interface DiscoveredClue {
  id: string;
  state: ClueState;
  discoveredAt: number;   // 루프 번호
}

// ============================================
// 씬 & 대화 시스템
// ============================================

/** 화자 유형 */
export type Speaker = 'narrator' | 'player' | CharacterId;

/** 감정 */
export type Mood =
  | 'neutral' | 'happy' | 'sad' | 'angry'
  | 'surprised' | 'confused' | 'nervous' | 'thoughtful';

/** 대화 노드 */
export interface DialogueNode {
  speaker: Speaker;
  text: string;
  mood?: Mood;
}

/** 효과 정의 */
export interface Effect {
  time?: number;                    // 시간 추가 (분)
  stats?: Partial<Stats>;           // 스탯 변화
  affinity?: Partial<Record<CharacterId, number>>; // 호감도 변화
  flags?: Record<string, boolean>;  // 플래그 설정
  clues?: string[];                 // 단서 발견
  items?: string[];                 // 아이템 획득
}

/** 선택지 정의 */
export interface Choice {
  id: string;
  text: string;
  icon?: string;                    // 아이콘 (emoji)
  condition?: string;               // 조건 표현식
  effect?: Effect;
  nextSceneId: string;
  hint?: string;                    // 효과 힌트 (선택)
}

/** 씬 정의 */
export interface Scene {
  id: string;
  location: string;
  title?: string;
  description: string | ((state: GameState) => string);
  dialogue?: DialogueNode[];
  choices: Choice[];

  // 조건
  conditions?: {
    entry?: string[];               // 진입 조건
    time?: string;                  // 시간 조건
  };

  // 효과
  onEnter?: Effect;
  onExit?: Effect;

  // 엔딩
  isEnding?: boolean;
  endingType?: EndingType;
}

// ============================================
// 엔딩 시스템
// ============================================

/** 엔딩 타입 */
export type EndingType =
  | 'ESCAPE'        // 탈출
  | 'SECRET'        // 비밀
  | 'LOVE'          // 사랑
  | 'PROMOTION'     // 승진
  | 'STARTUP'       // 창업
  | 'RICH'          // 부자
  | 'ENLIGHTENED'   // 깨달음
  | 'BURNOUT'       // 번아웃
  | 'HOSPITALIZED'  // 입원
  | 'FIRED';        // 해고

/** 엔딩 기록 */
export interface EndingRecord {
  type: EndingType;
  achievedAt: number;   // timestamp
  loopCount: number;    // 몇 번째 루프에서
}

// ============================================
// 게임 상태
// ============================================

/** 영구 저장 데이터 (루프 간 유지) */
export interface PermanentData {
  // 진행도
  totalLoops: number;
  achievedEndings: EndingRecord[];

  // 수집
  discoveredClues: DiscoveredClue[];
  unlockedChoices: string[];
  acquiredItems: string[];

  // 관계
  characterAffinities: Record<CharacterId, CharacterAffinity>;

  // 스토리 진행
  storyFlags: Record<string, boolean>;

  // 기록
  highestMoney: number;
  fastestEscape: number | null;
}

/** 현재 루프 상태 (매 루프 리셋) */
export interface LoopState {
  time: GameTime;
  stats: Stats;
  currentSceneId: string;
  visitedScenes: string[];
  flags: Record<string, boolean>;
}

/** 전체 게임 상태 */
export interface GameState {
  // 현재 루프
  loop: LoopState;

  // 영구 데이터
  permanent: PermanentData;

  // 메타
  userId: string | null;
  isInitialized: boolean;
  isEnded: boolean;
  currentEnding: EndingType | null;
}

// ============================================
// 초기값
// ============================================

/** 초기 스탯 */
export const INITIAL_STATS: Stats = {
  health: 100,
  mental: 80,
  reputation: 50,
  money: 25000,
};

/** 초기 시간 (07:00 = 420분) */
export const INITIAL_TIME: GameTime = 7 * 60; // 420

/** 하루 종료 시간 (24:00 = 1440분) */
export const DAY_END_TIME: GameTime = 24 * 60; // 1440

/** 초기 캐릭터 호감도 */
export const INITIAL_AFFINITIES: Record<CharacterId, CharacterAffinity> = {
  kim_donghyun: { level: 0, unlockedEvents: [], flags: {} },
  lee_seungho: { level: 15, unlockedEvents: [], flags: {} },
  yoon_jihyun: { level: 10, unlockedEvents: [], flags: {} },
  park_junhyuk: { level: 5, unlockedEvents: [], flags: {} },
  choi_minsoo: { level: 20, unlockedEvents: [], flags: {} },
  jung_subin: { level: 0, unlockedEvents: [], flags: {} },
};

/** 초기 영구 데이터 */
export const INITIAL_PERMANENT: PermanentData = {
  totalLoops: 0,
  achievedEndings: [],
  discoveredClues: [],
  unlockedChoices: [],
  acquiredItems: [],
  characterAffinities: { ...INITIAL_AFFINITIES },
  storyFlags: {},
  highestMoney: 0,
  fastestEscape: null,
};

/** 초기 루프 상태 */
export const INITIAL_LOOP: LoopState = {
  time: INITIAL_TIME,
  stats: { ...INITIAL_STATS },
  currentSceneId: 'loop_start',
  visitedScenes: [],
  flags: {},
};

// ============================================
// 유틸리티 타입
// ============================================

/** 시간 포맷 헬퍼 */
export function formatTime(minutes: GameTime): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

/** 시간대 판정 */
export function getTimePeriod(minutes: GameTime): TimePeriod {
  const hour = Math.floor(minutes / 60);
  if (hour < 9) return 'early_morning';
  if (hour < 12) return 'morning';
  if (hour < 14) return 'lunch';
  if (hour < 18) return 'afternoon';
  if (hour < 22) return 'evening';
  return 'night';
}

/** 호감도 단계 판정 */
export function getAffinityStage(level: number): AffinityStage {
  if (level <= -50) return 'hostile';
  if (level < 0) return 'wary';
  if (level < 20) return 'neutral';
  if (level < 40) return 'friendly';
  if (level < 60) return 'close';
  if (level < 80) return 'trusted';
  return 'bonded';
}

/** 호감도 단계 라벨 */
export function getAffinityLabel(stage: AffinityStage): string {
  const labels: Record<AffinityStage, string> = {
    hostile: '적대',
    wary: '경계',
    neutral: '중립',
    friendly: '호의',
    close: '친밀',
    trusted: '신뢰',
    bonded: '깊은 유대',
  };
  return labels[stage];
}
