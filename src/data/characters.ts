// ============================================
// 무한 월요일 - 캐릭터 데이터
// 기획서 기반 완전 재작성
// ============================================

import { Character, CharacterId } from '@/types/game';

// ============================================
// 캐릭터 정의
// ============================================

export const characters: Record<CharacterId, Character> = {
  // ----------------------------------------
  // 김동현 부장 - 핵심 NPC, 미스터리 열쇠
  // ----------------------------------------
  kim_donghyun: {
    id: 'kim_donghyun',
    name: '김동현',
    title: '부장',
    department: '기획팀',
    description: `15년차 베테랑. 무뚝뚝하고 엄격하지만 속정이 있다.
10년 전 과로로 인해 이혼. 지금은 일만 남은 인생.
젊은 직원들이 자신의 전철을 밟지 않길 바라지만, 표현 방법을 모른다.
프로젝트 먼데이의 핵심 인물이자 12층 연구소의 비밀을 알고 있다.`,
    color: '#4A5568', // 무거운 회색
  },

  // ----------------------------------------
  // 이승호 과장 - 조력자, 멘토
  // ----------------------------------------
  lee_seungho: {
    id: 'lee_seungho',
    name: '이승호',
    title: '과장',
    department: '기획팀',
    description: `스타트업 출신 3년차. 모두에게 친절한 중간 관리자.
처음엔 대기업의 안정성에 만족했지만, 점점 관료주의에 환멸.
겉으론 웃지만 속으론 회의적. 스타트업 친구의 창업 제안을 고민 중.
플레이어에게 조언을 주는 형 같은 존재.`,
    color: '#48BB78', // 따뜻한 초록
  },

  // ----------------------------------------
  // 윤지현 대리 - 로맨스 루트 A
  // ----------------------------------------
  yoon_jihyun: {
    id: 'yoon_jihyun',
    name: '윤지현',
    title: '대리',
    department: '마케팅팀',
    description: `마케팅팀의 에이스. 밝은 성격으로 회사에서 인기가 많다.
하지만 그 밝음 뒤에는 외로움이 있다.
지방에서 혼자 올라와 서울에 가족도 친구도 거의 없다.
진짜 꿈은 여행 작가. 플레이어와의 로맨스 가능.`,
    color: '#ED8936', // 활기찬 주황
  },

  // ----------------------------------------
  // 박준혁 사원 - 로맨스/친구 루트 B, 핵심 반전
  // ----------------------------------------
  park_junhyuk: {
    id: 'park_junhyuk',
    name: '박준혁',
    title: '사원',
    department: '개발팀',
    description: `개발팀에서 코딩 실력은 최고지만 말수가 적어 존재감이 없다.
원래 꿈은 인디 게임 개발자였지만, 현실에 타협해 대기업에 취직.
퇴근 후 혼자 게임을 만들고 있지만 완성하지 못하고 있다.
사실 그도 루프를 인지하고 있다 - 100번째 루프 중.`,
    color: '#667EEA', // 차분한 파랑
  },

  // ----------------------------------------
  // 최민수 인턴 - 조력자, 코믹 릴리프
  // ----------------------------------------
  choi_minsoo: {
    id: 'choi_minsoo',
    name: '최민수',
    title: '인턴',
    department: '기획팀',
    description: `취업 1개월차 인턴. 모든 것이 새롭고 두렵다.
열심히 하고 싶지만 실수할까봐 두렵고, 선배들 눈치 보느라 질문도 못 한다.
플레이어의 과거 모습을 비추는 거울 같은 존재.
순수한 열정과 불안함 사이에서 흔들린다.`,
    color: '#38B2AC', // 밝은 청록
  },

  // ----------------------------------------
  // 정수빈 바리스타 - 정보통
  // ----------------------------------------
  jung_subin: {
    id: 'jung_subin',
    name: '정수빈',
    title: '바리스타',
    department: '1층 카페',
    description: `1층 카페에서 일하는 바리스타. 회사 직원은 아니지만 모든 소문을 알고 있다.
직원들의 커피 취향으로 그 사람의 상태를 파악할 정도로 관찰력이 뛰어나다.
12층에 대한 수상한 소문을 처음 알려주는 인물.
친해지면 유용한 정보를 많이 준다.`,
    color: '#9F7AEA', // 부드러운 보라
  },
};

// ============================================
// 캐릭터 ID 목록
// ============================================

export const CHARACTER_IDS: CharacterId[] = [
  'kim_donghyun',
  'lee_seungho',
  'yoon_jihyun',
  'park_junhyuk',
  'choi_minsoo',
  'jung_subin',
];

// ============================================
// 로맨스 가능 캐릭터
// ============================================

export const ROMANCEABLE_CHARACTERS: CharacterId[] = [
  'yoon_jihyun',
  'park_junhyuk',
];

// ============================================
// 헬퍼 함수
// ============================================

/** 캐릭터 정보 가져오기 */
export function getCharacter(id: CharacterId): Character {
  return characters[id];
}

/** 캐릭터 이름 가져오기 */
export function getCharacterName(id: CharacterId): string {
  return characters[id]?.name ?? '???';
}

/** 캐릭터 풀네임 (이름 + 직급) */
export function getCharacterFullName(id: CharacterId): string {
  const char = characters[id];
  if (!char) return '???';
  return `${char.name} ${char.title}`;
}

/** 캐릭터가 로맨스 가능한지 */
export function isRomanceable(id: CharacterId): boolean {
  return ROMANCEABLE_CHARACTERS.includes(id);
}

/** 캐릭터 테마 색상 가져오기 */
export function getCharacterColor(id: CharacterId): string {
  return characters[id]?.color ?? '#FFFFFF';
}
