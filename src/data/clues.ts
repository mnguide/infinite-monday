// ============================================
// 무한 월요일 - 단서 데이터
// 기획서 기반 완전 재작성
// ============================================

import { Clue, ClueType } from '@/types/game';

// ============================================
// 단서 정의
// ============================================

export const clues: Record<string, Clue> = {
  // ============================================
  // 12층/프로젝트 먼데이 관련
  // ============================================

  clue_12f_rumor: {
    id: 'clue_12f_rumor',
    name: '12층 소문',
    type: 'testimony',
    content: `"12층 있잖아요? 거기 뭔가 이상해요."
"밤에 불이 켜져 있는 거 봤거든요."
"근데 그 층엔 아무도 안 들어가잖아요..."`,
    discovery: {
      location: 'cafe',
      character: 'jung_subin',
      conditions: ['loop >= 5'],
    },
    leadsTo: ['clue_boss_12f_connection'],
  },

  clue_project_name: {
    id: 'clue_project_name',
    name: '프로젝트 먼데이',
    type: 'physical',
    content: `문서 상단에 크게 적힌 제목:
"PROJECT MONDAY - 시간 인지 연구"

하단에 작은 글씨:
"대상자 격리 및 반복 루프 유지"`,
    discovery: {
      location: 'floor_12',
      conditions: ['has_keycard_12f', 'loop >= 15'],
    },
    leadsTo: ['clue_player_file', 'clue_escape_condition'],
  },

  clue_experiment_log: {
    id: 'clue_experiment_log',
    name: '실험 일지',
    type: 'physical',
    content: `실험 일지 #127

대상자 #042 - 반복 7회차
시간 인지 능력 확인됨
탈출 시도 0회

소견: 적응 단계 진입 예상
다음 관찰 포인트: 10회차`,
    discovery: {
      location: 'floor_12',
      conditions: ['has_keycard_12f', 'loop >= 15'],
    },
    leadsTo: ['clue_player_file'],
  },

  clue_escape_condition: {
    id: 'clue_escape_condition',
    name: '탈출 조건 문서',
    type: 'physical',
    content: `[극비] 프로젝트 종료 조건

1. 대상자의 자각적 인지
2. 관리자(김동현) 동의
3. 시스템 해제 코드 입력

* 강제 종료 시 대상자 기억 소거`,
    discovery: {
      location: 'floor_12',
      conditions: ['has_keycard_12f', 'analyzed_project_name'],
    },
    leadsTo: ['clue_boss_role'],
  },

  // ============================================
  // 김부장 관련
  // ============================================

  clue_boss_memo: {
    id: 'clue_boss_memo',
    name: '부장의 메모',
    type: 'physical',
    content: `급하게 적은 메모:

"PM 진행 상황 보고 - 금일 17:00"
"대상 #042 모니터링 강화"

뒷면에 희미하게:
"...미안하다"`,
    discovery: {
      location: 'office',
      time: '14:30~16:30',
      conditions: ['loop >= 7'],
    },
    leadsTo: ['clue_project_name', 'clue_boss_schedule'],
  },

  clue_boss_schedule: {
    id: 'clue_boss_schedule',
    name: '부장 일정표',
    type: 'observation',
    content: `관찰 결과:

08:30 - 출근
12:00 - 점심 (혼자)
14:30 - 외출 (약 2시간)
17:00 - 12층 이동 (매일)
21:00 - 퇴근

매일 같은 패턴이다.`,
    discovery: {
      location: 'office',
      conditions: ['loop >= 7'],
    },
    leadsTo: ['clue_boss_12f_connection'],
  },

  clue_boss_call: {
    id: 'clue_boss_call',
    name: '부장의 통화 내용',
    type: 'observation',
    content: `옥상에서 엿들은 통화:

"...네, 오늘도 이상 없습니다."
"아니, 아직 자각은..."
"...네, 알겠습니다. 계속 관찰하겠습니다."

(긴 한숨)
"...언제까지 이래야 하는 건지."`,
    discovery: {
      location: 'rooftop',
      time: '18:00~19:00',
      conditions: ['loop >= 5'],
    },
    leadsTo: ['clue_boss_12f_connection', 'clue_boss_role'],
  },

  clue_boss_12f_connection: {
    id: 'clue_boss_12f_connection',
    name: '부장과 12층',
    type: 'observation',
    content: `연결된 정보:

김부장은 매일 17:00에 12층에 간다.
통화 내용으로 보아 "프로젝트" 관련.
"관찰" "자각" - 누군가를 감시 중인 것 같다.

...그 누군가가 나인 것 같다.`,
    discovery: {
      conditions: [
        'discovered_clue_boss_schedule',
        'discovered_clue_boss_call',
      ],
    },
  },

  clue_boss_role: {
    id: 'clue_boss_role',
    name: '부장의 역할',
    type: 'testimony',
    content: `김부장이 말했다:

"나도... 선택의 여지가 없었어."
"이 프로젝트가 시작됐을 때부터 관리자로 배정됐지."
"자네가 여기서 나가려면... 내 동의가 필요해."
"하지만 그러면 나도..."`,
    discovery: {
      character: 'kim_donghyun',
      conditions: ['kim_donghyun_affinity >= 60', 'discovered_clue_project_name'],
    },
    leadsTo: ['clue_escape_condition'],
  },

  // ============================================
  // 박준혁 관련
  // ============================================

  clue_junhyuk_dejavu: {
    id: 'clue_junhyuk_dejavu',
    name: '준혁의 이상한 반응',
    type: 'observation',
    content: `준혁이 물었다:
"선배... 오늘 무슨 요일이에요?"

당연히 월요일이라고 대답했다.
그가 의미심장하게 웃었다.
"...그렇죠, 월요일이죠."

뭔가 아는 것 같다.`,
    discovery: {
      character: 'park_junhyuk',
      conditions: ['park_junhyuk_affinity >= 40', 'loop >= 7'],
    },
    leadsTo: ['clue_junhyuk_100_loops'],
  },

  clue_junhyuk_100_loops: {
    id: 'clue_junhyuk_100_loops',
    name: '준혁의 비밀',
    type: 'testimony',
    content: `야간 옥상에서 준혁이 말했다:

"저도... 반복하고 있어요."
"선배보다 먼저요. 벌써 100번째."
"처음엔 미칠 것 같았어요."
"이제는... 그냥 익숙해졌죠."
"포기하면 편해요. 근데..."
"선배를 보면 희망이 생겨요."`,
    discovery: {
      location: 'rooftop',
      character: 'park_junhyuk',
      time: '22:00~24:00',
      conditions: ['park_junhyuk_affinity >= 60', 'loop >= 10'],
    },
    leadsTo: ['clue_junhyuk_first'],
  },

  clue_junhyuk_first: {
    id: 'clue_junhyuk_first',
    name: '첫 번째 루퍼',
    type: 'testimony',
    content: `준혁이 말했다:

"저는... 첫 번째 대상자예요."
"프로젝트 시작할 때부터."
"처음엔 탈출하려고 미친 듯이 노력했어요."
"근데... 방법을 못 찾았어요."
"선배는 다를 거예요. 저보다 빠르게 적응했잖아요."`,
    discovery: {
      character: 'park_junhyuk',
      conditions: ['discovered_clue_junhyuk_100_loops', 'park_junhyuk_affinity >= 80'],
    },
  },

  // ============================================
  // 플레이어 관련
  // ============================================

  clue_player_file: {
    id: 'clue_player_file',
    name: '내 실험 파일',
    type: 'physical',
    content: `대상자 파일 #042

이름: [플레이어]
부서: 기획팀
루프 시작일: 2026-05-25
현재 루프: {totalLoops}회차

특이사항:
- 시간 인지 능력 우수
- 관계 형성 속도 빠름
- 탈출 가능성: 높음

담당 관리자: 김동현`,
    discovery: {
      location: 'floor_12',
      conditions: ['has_keycard_12f', 'loop >= 15'],
    },
    leadsTo: ['clue_escape_condition'],
  },

  clue_player_selection: {
    id: 'clue_player_selection',
    name: '선발 기준',
    type: 'physical',
    content: `대상자 선발 기준서

1. 회사 근속 3년 이상
2. 주변 관계 희박
3. 업무 스트레스 높음
4. 시간 민감도 높음

* 기준 미달 시 기억 소거 후 퇴사 처리`,
    discovery: {
      location: 'floor_12',
      conditions: ['has_keycard_12f', 'discovered_clue_player_file'],
    },
  },

  // ============================================
  // 아이템/접근 수단
  // ============================================

  clue_keycard_12f: {
    id: 'clue_keycard_12f',
    name: '12층 카드키',
    type: 'physical',
    content: `12층 연구소 출입이 가능한 카드키.

뒷면에 작게 적혀있다:
"긴급 시에만 사용"`,
    discovery: {
      character: 'kim_donghyun',
      conditions: ['kim_donghyun_affinity >= 80'],
    },
  },

  clue_password: {
    id: 'clue_password',
    name: '시스템 비밀번호',
    type: 'memory',
    content: `부장의 PC 비밀번호를 기억해냈다:

"MONDAY0101"

몇 번의 루프 끝에 어깨너머로 봤던 기억.`,
    discovery: {
      conditions: ['loop >= 12', 'discovered_clue_boss_schedule'],
    },
  },
};

// ============================================
// 단서 ID 목록
// ============================================

export const CLUE_IDS = Object.keys(clues);

// ============================================
// 카테고리별 단서
// ============================================

export const cluesByCategory: Record<string, string[]> = {
  project_monday: [
    'clue_12f_rumor',
    'clue_project_name',
    'clue_experiment_log',
    'clue_escape_condition',
  ],
  boss_related: [
    'clue_boss_memo',
    'clue_boss_schedule',
    'clue_boss_call',
    'clue_boss_12f_connection',
    'clue_boss_role',
  ],
  junhyuk_related: [
    'clue_junhyuk_dejavu',
    'clue_junhyuk_100_loops',
    'clue_junhyuk_first',
  ],
  player_related: [
    'clue_player_file',
    'clue_player_selection',
  ],
  items: [
    'clue_keycard_12f',
    'clue_password',
  ],
};

// ============================================
// 헬퍼 함수
// ============================================

/** 단서 정보 가져오기 */
export function getClue(id: string): Clue | undefined {
  return clues[id];
}

/** 단서 이름 가져오기 */
export function getClueName(id: string): string {
  return clues[id]?.name ?? '???';
}

/** 유형별 아이콘 */
export function getClueIcon(type: ClueType): string {
  const icons: Record<ClueType, string> = {
    physical: '📄',
    testimony: '💬',
    observation: '👁️',
    memory: '🧠',
  };
  return icons[type];
}

/** 유형별 라벨 */
export function getClueTypeLabel(type: ClueType): string {
  const labels: Record<ClueType, string> = {
    physical: '물리적 증거',
    testimony: '증언',
    observation: '관찰',
    memory: '기억',
  };
  return labels[type];
}

/** 핵심 단서인지 확인 */
export function isMainClue(id: string): boolean {
  const mainClues = [
    'clue_12f_rumor',
    'clue_project_name',
    'clue_boss_call',
    'clue_junhyuk_100_loops',
    'clue_player_file',
    'clue_escape_condition',
  ];
  return mainClues.includes(id);
}
