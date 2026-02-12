// ============================================
// 무한 월요일 - 씬 데이터
// 기획서 기반 완전 재작성
// ============================================

import {
  Scene,
  GameState,
  EndingType,
  CharacterId,
} from '@/types/game';

// ============================================
// 헬퍼 함수
// ============================================

/** 호감도 가져오기 */
function getAffinity(state: GameState, charId: CharacterId): number {
  return state.permanent.characterAffinities[charId]?.level ?? 0;
}

/** 플래그 확인 */
function hasFlag(state: GameState, flag: string): boolean {
  return state.loop.flags[flag] === true;
}

/** 단서 발견 여부 (조건 평가에서 사용) */
export function hasClue(state: GameState, clueId: string): boolean {
  return state.permanent.discoveredClues.some(c => c.id === clueId);
}

/** 루프 수 */
function loops(state: GameState): number {
  return state.permanent.totalLoops;
}

// ============================================
// 씬 데이터
// ============================================

export const scenes: Record<string, Scene> = {
  // ============================================
  // 루프 시스템 씬
  // ============================================

  loop_start: {
    id: 'loop_start',
    location: 'home',
    title: '시작',
    description: (state) => {
      const loopCount = loops(state);
      if (loopCount <= 1) {
        return `...

꿈을 꾸고 있었다.
무슨 꿈이었는지 기억이 안 난다.

다만, 무언가 중요한 일이...
곧 일어날 것 같은 느낌이 든다.`;
      }
      return `${loopCount}번째 월요일이 시작된다.`;
    },
    choices: [
      {
        id: 'begin',
        text: '눈을 뜬다',
        nextSceneId: 'home_morning',
      },
    ],
  },

  loop_transition: {
    id: 'loop_transition',
    location: 'void',
    title: '다시 월요일...',
    description: (state) => {
      const loopCount = loops(state);

      if (loopCount === 2) {
        return `...!!!

눈을 떴다.

"삐빅- 삐빅- 삐빅-"

핸드폰 알람 소리.

잠깐. 방금 전에...
분명 전화가 왔었다.

"12층을 기억하세요..."

...꿈이었나?

핸드폰을 확인한다.
'2024년 11월 11일 월요일 오전 7:00'

...월요일?

분명 어젯밤에 잠들었는데.
방금 전까지 회사에서 일하고...
그 이상한 전화를 받고...

잠깐.
이거... 어제랑 똑같은 아침이다.

뭐야 이게?

【2번째 월요일】`;
      } else if (loopCount <= 5) {
        return `...또다시.

이제 확실하다.
같은 월요일이 반복되고 있다.

왜? 어떻게?
아무것도 모르겠다.

하지만 분명 단서가 있을 거야.

【${loopCount}번째 월요일】`;
      } else if (loopCount <= 10) {
        return `이제는 익숙해진 감각.

반복되는 월요일.
하지만 조금씩 달라지는 것들이 있다.

사람들과의 관계... 12층의 비밀...
무언가 연결되어 있다.

【${loopCount}번째 월요일】`;
      } else if (loopCount <= 15) {
        return `${loopCount}번째...

반복에 익숙해졌다.
이제 이 회사의 비밀이 보이기 시작한다.

프로젝트 먼데이.
김부장이 알고 있는 진실.

조금만 더...

【${loopCount}번째 월요일】`;
      } else {
        return `${loopCount}번째 월요일.

끝이 보인다.
탈출 조건을 알았다.

이번에는 반드시.

【${loopCount}번째 월요일】`;
      }
    },
    choices: [
      {
        id: 'accept_loop',
        text: '눈을 뜬다...',
        nextSceneId: 'home_morning',
      },
    ],
  },

  // ============================================
  // 1막: 아침 (자택)
  // ============================================

  home_morning: {
    id: 'home_morning',
    location: 'home',
    title: '월요일 아침',
    description: (state) => {
      const loopCount = loops(state);

      if (loopCount === 1) {
        return `삐빅- 삐빅- 삐빅-

스마트폰 알람 소리에 눈을 떴다.

...

핸드폰 화면을 확인한다.
'2024년 11월 11일 월요일 오전 7:00'

이상하다.
분명 어젯밤에... 무슨 일이 있었던 것 같은데.
기억이 안 난다.

창밖을 본다. 흐린 하늘.
건물 사이로 비둘기 한 마리가 날아간다.

...왠지 익숙한 광경이다.
전에도 이 장면을 본 적 있는 것 같은데?

그냥 기분 탓이겠지.`;
      }

      const base = `삐빅- 삐빅- 삐빅-

스마트폰 알람 소리에 눈을 떴다.
화면에는 '월요일 오전 7:00'이라고 적혀 있다.

창밖으로 흐린 하늘이 보인다.`;

      if (loopCount <= 3) {
        return base + `\n\n...또 월요일이다. (${loopCount}번째)`;
      } else {
        return base + `\n\n${loopCount}번째 월요일. 이젠 익숙하다.`;
      }
    },
    onEnter: {
      time: 0,
    },
    choices: [
      {
        id: 'wake_energetic',
        text: '✨ 벌떡 일어난다',
        hint: '멘탈 +5',
        effect: {
          time: 10,
          stats: { mental: 5 },
        },
        nextSceneId: 'home_prepare',
      },
      {
        id: 'wake_lazy',
        text: '😴 5분만 더... (스누즈)',
        hint: '시간 +20분',
        effect: {
          time: 20,
          stats: { health: -5 },
        },
        nextSceneId: 'home_late',
      },
      {
        id: 'wake_sick',
        text: '🤒 아프다고 문자 보내고 눕기',
        condition: 'loops >= 3 || health < 50',
        hint: '평판 -15',
        effect: {
          time: 60,
          stats: { health: 20, reputation: -15 },
          flags: { called_in_sick: true },
        },
        nextSceneId: 'home_sick_day',
      },
    ],
  },

  home_prepare: {
    id: 'home_prepare',
    location: 'home',
    title: '아침 준비',
    description: (state) => {
      const loopCount = loops(state);

      if (loopCount === 1) {
        return `세수를 하고 거울을 본다.

...?

잠깐, 방금 뭔가...
거울 속 내 모습이 조금 늦게 움직인 것 같았는데.

다시 본다.
...아무것도 아니다. 눈이 피곤한가 보다.

살짝 부은 눈. 다크서클.
컨디션이 별로인 것 같다.

아침은 어떻게 할까?`;
      }

      return `세수를 하고 거울을 본다.
살짝 부은 눈, 어젯밤의 흔적이다.

아침은 어떻게 할까?`;
    },
    choices: [
      {
        id: 'breakfast_full',
        text: '🍳 든든하게 아침 먹기',
        hint: '체력 +10, -8,000원',
        effect: {
          time: 30,
          stats: { health: 10, money: -8000 },
        },
        nextSceneId: 'commute_subway',
      },
      {
        id: 'breakfast_quick',
        text: '🍙 편의점 삼각김밥',
        hint: '-1,500원',
        effect: {
          time: 15,
          stats: { money: -1500 },
        },
        nextSceneId: 'commute_subway',
      },
      {
        id: 'breakfast_skip',
        text: '⏭️ 그냥 나간다',
        hint: '체력 -5',
        effect: {
          time: 5,
          stats: { health: -5 },
        },
        nextSceneId: 'commute_subway',
      },
    ],
  },

  home_late: {
    id: 'home_late',
    location: 'home',
    title: '늦잠',
    description: `헉, 벌써 7시 30분이다!
서둘러 준비해야 한다.

샤워할 시간이 없다...`,
    choices: [
      {
        id: 'rush_out',
        text: '🏃 뛰어나간다!',
        hint: '멘탈 -10',
        effect: {
          time: 10,
          stats: { mental: -10 },
          flags: { rushed_morning: true },
        },
        nextSceneId: 'commute_rush',
      },
      {
        id: 'calm_late',
        text: '😌 어차피 늦었으니 여유롭게',
        hint: '평판 -10',
        effect: {
          time: 30,
          stats: { reputation: -10 },
        },
        nextSceneId: 'commute_subway',
      },
    ],
  },

  home_sick_day: {
    id: 'home_sick_day',
    location: 'home',
    title: '병가',
    description: `"오늘 컨디션이 안 좋아서..."

문자를 보내고 다시 이불 속으로.
어쩐지 마음이 편치 않다.

하루 종일 뭘 할까?`,
    choices: [
      {
        id: 'sick_rest',
        text: '😴 푹 쉰다',
        hint: '체력 +30, 멘탈 +10',
        effect: {
          time: 360, // 6시간
          stats: { health: 30, mental: 10 },
        },
        nextSceneId: 'home_evening_sick',
      },
      {
        id: 'sick_investigate',
        text: '🔍 회사 정보 조사',
        condition: 'loops >= 5',
        hint: '단서 발견 가능',
        effect: {
          time: 240,
          stats: { mental: -5 },
          flags: { investigated_from_home: true },
        },
        nextSceneId: 'home_investigation',
      },
    ],
  },

  // ============================================
  // 1막: 출근길
  // ============================================

  commute_subway: {
    id: 'commute_subway',
    location: 'subway',
    title: '지하철',
    description: (state) => {
      const loopCount = loops(state);
      const time = state.loop.time;
      const isRushHour = time >= 8 * 60 && time < 9 * 60;

      // 첫 번째 루프 - 이상한 사람
      if (loopCount === 1) {
        if (isRushHour) {
          return `지옥철이다.

사람들 사이에 끼어서 숨쉬기도 힘들다.

...?

맞은편에 서 있는 남자가 나를 빤히 쳐다보고 있다.
뭐지? 아는 사람인가?

눈이 마주친다.
그가 입을 움직인다.

"...또 만나네요."

뭐라고?

사람들 사이로 그의 모습이 가려진다.
내리는 역이 다가온다.

...뭐였지, 방금?`;
        }
        return `다행히 일찍 나와서 자리에 앉을 수 있었다.

창밖을 보며 잠시 생각에 잠긴다.

...?

창문에 비친 내 모습.
잠깐, 옆에 앉은 사람이...

고개를 돌린다. 아무도 없다.
창문을 다시 본다.

내 옆 자리에 희미한 그림자 같은 게...

아니다. 착각이다.
요즘 피곤해서 그런가.`;
      }

      if (isRushHour) {
        return `지옥철이다.

사람들 사이에 끼어서 숨쉬기도 힘들다.
누군가의 가방이 계속 등을 찌른다.`;
      }
      return `다행히 일찍 나와서 자리에 앉을 수 있었다.

창밖 풍경을 보며 잠시 생각에 잠긴다.
오늘 하루는 어떻게 될까...`;
    },
    choices: [
      {
        id: 'commute_music',
        text: '🎵 음악 듣기',
        hint: '멘탈 +5',
        effect: {
          time: 40,
          stats: { mental: 5 },
        },
        nextSceneId: 'office_arrival',
      },
      {
        id: 'commute_news',
        text: '📰 뉴스 읽기',
        effect: {
          time: 40,
          flags: { read_news: true },
        },
        nextSceneId: 'office_arrival',
      },
      {
        id: 'commute_observe',
        text: '👀 주변 관찰하기',
        condition: 'loops >= 4',
        hint: '루프 활용',
        effect: {
          time: 40,
          flags: { observed_commute: true },
        },
        nextSceneId: 'office_arrival',
      },
      {
        id: 'commute_convenience',
        text: '🏪 편의점 들르기',
        nextSceneId: 'convenience_store',
      },
    ],
  },

  convenience_store: {
    id: 'convenience_store',
    location: 'convenience_store',
    title: '편의점',
    description: `지하철역 앞 편의점.

아침 출근길 직장인들로 붐빈다.
뭘 살까?`,
    choices: [
      {
        id: 'conv_sandwich',
        text: '🥪 삼각김밥 + 음료',
        hint: '-2,500원, 체력 +10',
        effect: {
          time: 10,
          stats: { money: -2500, health: 10 },
        },
        nextSceneId: 'office_arrival',
      },
      {
        id: 'conv_energy',
        text: '⚡ 에너지 드링크',
        hint: '-3,000원, 멘탈 +15, 체력 -5',
        effect: {
          time: 5,
          stats: { money: -3000, mental: 15, health: -5 },
        },
        nextSceneId: 'office_arrival',
      },
      {
        id: 'conv_coffee',
        text: '☕ 캔커피',
        hint: '-1,500원, 멘탈 +5',
        effect: {
          time: 5,
          stats: { money: -1500, mental: 5 },
        },
        nextSceneId: 'office_arrival',
      },
      {
        id: 'conv_snack',
        text: '🍫 간식거리',
        hint: '-5,000원, 평판 +3 (동료에게 나눠주기)',
        effect: {
          time: 5,
          stats: { money: -5000, reputation: 3 },
          flags: { bought_snacks: true },
        },
        nextSceneId: 'office_arrival',
      },
      {
        id: 'conv_lottery',
        text: '🎰 복권 구매',
        condition: 'loops >= 10',
        hint: '-5,000원, ???',
        effect: {
          time: 5,
          stats: { money: -5000 },
          flags: { bought_lottery: true },
        },
        nextSceneId: 'conv_lottery_result',
      },
      {
        id: 'conv_nothing',
        text: '👋 그냥 나가기',
        effect: {
          time: 5,
        },
        nextSceneId: 'office_arrival',
      },
    ],
  },

  conv_lottery_result: {
    id: 'conv_lottery_result',
    location: 'convenience_store',
    title: '복권',
    description: (state) => {
      const loopCount = loops(state);
      // 15번째 루프에서 복권 번호를 기억
      if (loopCount >= 15 && hasFlag(state, 'remembered_lottery_numbers')) {
        return `긁어본다...

!!!

1등 당첨!
50,000,000원!

"어... 어떻게 알았어요?!"
점원이 놀란 표정으로 쳐다본다.`;
      }
      return `긁어본다...

꽝.

5천원 날렸다.
...뭘 기대한 거지?

하지만 이상하다.
당첨 번호가... 어딘가 익숙하다.`;
    },
    onEnter: {
      flags: { saw_lottery_numbers: true },
    },
    choices: [
      {
        id: 'lottery_win',
        text: '💰 당첨금 수령',
        condition: 'loops >= 15 && remembered_lottery_numbers',
        effect: {
          stats: { money: 50000000 },
          flags: { won_lottery: true },
        },
        nextSceneId: 'office_arrival',
      },
      {
        id: 'lottery_memorize',
        text: '📝 번호 기억하기',
        condition: 'loops >= 12',
        hint: '다음 루프에 활용?',
        effect: {
          flags: { remembered_lottery_numbers: true },
        },
        nextSceneId: 'office_arrival',
      },
      {
        id: 'lottery_leave',
        text: '😔 그냥 가기',
        nextSceneId: 'office_arrival',
      },
    ],
  },

  commute_rush: {
    id: 'commute_rush',
    location: 'subway',
    title: '지각 위기',
    description: `심장이 쿵쾅거린다.
9시까지 도착할 수 있을까?

엘리베이터에서 부장님 마주치면 어쩌지...`,
    choices: [
      {
        id: 'rush_run',
        text: '🏃 전력 질주',
        hint: '체력 -10, 멘탈 -5',
        effect: {
          time: 35,
          stats: { health: -10, mental: -5 },
        },
        nextSceneId: 'office_arrival_barely',
      },
      {
        id: 'rush_taxi',
        text: '🚕 택시 타기',
        condition: 'money >= 15000',
        hint: '-15,000원',
        effect: {
          time: 25,
          stats: { money: -15000 },
        },
        nextSceneId: 'office_arrival',
      },
    ],
  },

  // ============================================
  // 1막: 사무실
  // ============================================

  office_arrival: {
    id: 'office_arrival',
    location: 'office',
    title: '출근',
    description: (state) => {
      const loopCount = loops(state);

      if (loopCount === 1) {
        return `무사히 회사에 도착했다.

엘리베이터를 기다린다.

"띵-"

문이 열리자 김동현 부장이 나온다.
서류를 들고 바쁜 표정이다.

스쳐 지나가려는 순간, 그가 멈춘다.
나를 본다.

"..."

뭔가 말하려는 것 같았는데...
그냥 고개를 끄덕이고 지나간다.

이상하다. 왠지 그의 눈빛이...
마치 나를 안다는 듯한 느낌이었다.

자리에 앉으니 이메일이 쌓여 있다.`;
      }

      return `무사히 회사에 도착했다.

엘리베이터에서 동료들과 눈인사를 나눈다.
"오늘 회의 있는 거 알죠?"

자리에 앉으니 이메일이 쌓여 있다.`;
    },
    choices: [
      {
        id: 'check_email',
        text: '📧 이메일 확인',
        effect: {
          time: 20,
          flags: { checked_email: true },
        },
        nextSceneId: 'office_morning_work',
      },
      {
        id: 'get_coffee',
        text: '☕ 커피 마시러 가기',
        hint: '카페 이동',
        effect: {
          time: 10,
        },
        nextSceneId: 'cafe_morning',
      },
      {
        id: 'greet_minsoo',
        text: '👋 민수에게 인사하기',
        hint: '민수 호감 +3',
        effect: {
          time: 5,
          affinity: { choi_minsoo: 3 },
        },
        nextSceneId: 'office_minsoo_greeting',
      },
    ],
  },

  office_arrival_barely: {
    id: 'office_arrival_barely',
    location: 'office',
    title: '아슬아슬',
    description: `헉헉...

겨우 9시 직전에 도착했다.
식은땀이 흐른다.

이승호 과장이 의미심장한 눈빛으로 쳐다본다.`,
    dialogue: [
      {
        speaker: 'lee_seungho',
        text: '오, 아슬아슬하게 왔네. 괜찮아?',
        mood: 'neutral',
      },
    ],
    choices: [
      {
        id: 'pretend_normal',
        text: '😅 태연한 척 자리로',
        effect: {
          time: 5,
          flags: { barely_made_it: true },
        },
        nextSceneId: 'office_morning_work',
      },
    ],
  },

  office_minsoo_greeting: {
    id: 'office_minsoo_greeting',
    location: 'office',
    title: '인사',
    description: (state) => {
      const affinity = getAffinity(state, 'choi_minsoo');
      if (affinity >= 30) {
        return `최민수가 밝게 웃는다.

"선배님! 안녕하세요!"
"오늘도 좋은 하루 되세요!"

열정이 넘친다.`;
      }
      return `최민수가 긴장한 표정으로 인사한다.

"아, 안녕하세요 선배님..."

새내기 특유의 어색함이 느껴진다.`;
    },
    dialogue: [
      {
        speaker: 'choi_minsoo',
        text: '선배님, 오늘 회의 준비 다 하셨어요?',
        mood: 'nervous',
      },
    ],
    choices: [
      {
        id: 'minsoo_encourage',
        text: '😊 "민수도 열심히 해!"',
        hint: '민수 호감 +5',
        effect: {
          time: 5,
          affinity: { choi_minsoo: 5 },
        },
        nextSceneId: 'office_morning_work',
      },
      {
        id: 'minsoo_advice',
        text: '📝 업무 조언 해주기',
        hint: '민수 호감 +8, 시간 +15분',
        effect: {
          time: 15,
          affinity: { choi_minsoo: 8 },
        },
        nextSceneId: 'office_morning_work',
      },
    ],
  },

  office_morning_work: {
    id: 'office_morning_work',
    location: 'office',
    title: '오전 업무',
    description: `모니터를 켜니 업무가 산더미다.

오전 중으로 보고서를 완성해야 하고,
10시에는 팀 회의가 있다.`,
    choices: [
      {
        id: 'work_focus',
        text: '💼 집중해서 일하기',
        hint: '평판 +5, 멘탈 -10',
        effect: {
          time: 60,
          stats: { reputation: 5, mental: -10 },
        },
        nextSceneId: 'office_team_meeting',
      },
      {
        id: 'work_slack',
        text: '📱 대충하고 SNS 보기',
        hint: '멘탈 +5, 평판 -5',
        effect: {
          time: 60,
          stats: { mental: 5, reputation: -5 },
          flags: { slacked_off: true },
        },
        nextSceneId: 'office_team_meeting',
      },
      {
        id: 'work_help_seungho',
        text: '🙋 승호 과장에게 도움 요청',
        hint: '승호 호감 +5',
        effect: {
          time: 60,
          affinity: { lee_seungho: 5 },
          flags: { asked_seungho_help: true },
        },
        nextSceneId: 'office_team_meeting',
      },
    ],
  },

  // ============================================
  // 1막: 팀 회의
  // ============================================

  office_team_meeting: {
    id: 'office_team_meeting',
    location: 'meeting_room',
    title: '팀 회의',
    description: (state) => {
      const loopCount = loops(state);

      if (loopCount === 1) {
        return `10시, 팀 회의가 시작됐다.

김동현 부장이 이번 주 목표에 대해 설명한다.
"이번 프로젝트 마감이 금요일입니다."

그런데 부장이 잠시 말을 멈춘다.
나를 본다.

"...어디 아파요?"

갑자기 무슨 소리지?
"아뇨, 괜찮은데요?"

"그래요..."

부장이 고개를 젓는다.
뭔가 말하려다 그만둔 것 같다.

"...아무것도 아니에요. 진행 상황은 어때요?"`;
      }

      const base = `10시, 팀 회의가 시작됐다.

김동현 부장이 이번 주 목표에 대해 설명한다.
"이번 프로젝트 마감이 금요일입니다."

갑자기 질문이 날아온다.`;

      if (hasFlag(state, 'slacked_off')) {
        return base + '\n\n(아까 대충 한 게 떠오른다...)';
      }
      return base;
    },
    dialogue: [
      {
        speaker: 'kim_donghyun',
        text: '진행 상황은 어때요?',
        mood: 'neutral',
      },
    ],
    choices: [
      {
        id: 'meeting_confident',
        text: '😎 "순조롭게 진행 중입니다!"',
        condition: '!slacked_off',
        hint: '평판 +5',
        effect: {
          time: 30,
          stats: { reputation: 5 },
          affinity: { kim_donghyun: 3 },
        },
        nextSceneId: 'office_after_meeting',
      },
      {
        id: 'meeting_honest',
        text: '😓 "솔직히 좀 막혀 있습니다..."',
        hint: '부장 호감 +3',
        effect: {
          time: 30,
          stats: { reputation: -3 },
          affinity: { kim_donghyun: 3 },
          flags: { was_honest_in_meeting: true },
        },
        nextSceneId: 'office_after_meeting',
      },
      {
        id: 'meeting_lie',
        text: '😬 "거의 다 됐습니다!" (거짓말)',
        condition: 'slacked_off',
        hint: '위험',
        effect: {
          time: 30,
          flags: { lied_in_meeting: true },
        },
        nextSceneId: 'office_after_meeting',
      },
    ],
  },

  office_after_meeting: {
    id: 'office_after_meeting',
    location: 'office',
    title: '회의 후',
    description: `회의가 끝났다.

점심시간까지 아직 시간이 남았다.
무엇을 할까?`,
    choices: [
      {
        id: 'continue_work',
        text: '💼 계속 업무',
        effect: {
          time: 60,
          stats: { reputation: 3, mental: -5 },
        },
        nextSceneId: 'lunch_time',
      },
      {
        id: 'investigate_boss',
        text: '🔍 부장 책상 살펴보기',
        condition: 'loops >= 7',
        hint: '위험! 단서 발견 가능',
        effect: {
          time: 30,
        },
        nextSceneId: 'office_boss_desk',
      },
      {
        id: 'chat_jihyun',
        text: '💬 지현에게 말 걸기',
        hint: '지현 호감 +3',
        effect: {
          time: 20,
          affinity: { yoon_jihyun: 3 },
        },
        nextSceneId: 'office_chat_jihyun',
      },
    ],
  },

  // ============================================
  // 2막: 카페
  // ============================================

  cafe_morning: {
    id: 'cafe_morning',
    location: 'cafe',
    title: '1층 카페',
    description: (state) => {
      const subinAffinity = getAffinity(state, 'jung_subin');
      const loopCount = loops(state);

      let base = `1층 카페에 도착했다.
커피 향이 코끝을 간질인다.`;

      if (subinAffinity >= 20) {
        base += '\n\n정수빈이 반갑게 손을 흔든다.';
      } else {
        base += '\n\n바리스타가 주문을 기다린다.';
      }

      if (loopCount >= 5 && subinAffinity >= 10) {
        base += '\n\n(뭔가 물어볼 게 있는 것 같다...)';
      }

      return base;
    },
    choices: [
      {
        id: 'cafe_menu',
        text: '☕ 메뉴 보기',
        nextSceneId: 'cafe_menu',
      },
      {
        id: 'cafe_chat',
        text: '💬 바리스타와 대화',
        hint: '수빈 호감 +3',
        effect: {
          time: 15,
          affinity: { jung_subin: 3 },
        },
        nextSceneId: 'cafe_chat_subin',
      },
      {
        id: 'cafe_ask_rumor',
        text: '❓ 12층에 대해 물어보기',
        condition: 'loops >= 5 && jung_subin >= 10',
        hint: '단서 발견 가능',
        effect: {
          time: 20,
        },
        nextSceneId: 'cafe_12f_rumor',
      },
      {
        id: 'cafe_leave',
        text: '👋 그냥 나가기',
        nextSceneId: 'office_arrival',
      },
    ],
  },

  cafe_menu: {
    id: 'cafe_menu',
    location: 'cafe',
    title: '메뉴판',
    description: `메뉴판을 본다.

☕ 아메리카노 - 4,000원
☕ 카페라떼 - 4,500원
🍵 녹차라떼 - 5,000원
🧁 마들렌 세트 - 7,500원
🥐 크루아상 세트 - 8,500원`,
    choices: [
      {
        id: 'order_americano',
        text: '☕ 아메리카노',
        hint: '-4,000원, 멘탈 +5',
        effect: {
          time: 10,
          stats: { money: -4000, mental: 5 },
        },
        nextSceneId: 'cafe_ordered',
      },
      {
        id: 'order_latte',
        text: '☕ 카페라떼',
        hint: '-4,500원, 멘탈 +7',
        effect: {
          time: 10,
          stats: { money: -4500, mental: 7 },
        },
        nextSceneId: 'cafe_ordered',
      },
      {
        id: 'order_greentea',
        text: '🍵 녹차라떼',
        hint: '-5,000원, 멘탈 +10, 체력 +5',
        effect: {
          time: 10,
          stats: { money: -5000, mental: 10, health: 5 },
        },
        nextSceneId: 'cafe_ordered',
      },
      {
        id: 'order_madeleine',
        text: '🧁 마들렌 세트',
        hint: '-7,500원, 멘탈 +10, 체력 +10',
        effect: {
          time: 15,
          stats: { money: -7500, mental: 10, health: 10 },
        },
        nextSceneId: 'cafe_ordered',
      },
      {
        id: 'order_croissant',
        text: '🥐 크루아상 세트',
        hint: '-8,500원, 멘탈 +15, 체력 +15',
        effect: {
          time: 15,
          stats: { money: -8500, mental: 15, health: 15 },
        },
        nextSceneId: 'cafe_ordered',
      },
      {
        id: 'menu_back',
        text: '⬅️ 돌아가기',
        nextSceneId: 'cafe_morning',
      },
    ],
  },

  cafe_ordered: {
    id: 'cafe_ordered',
    location: 'cafe',
    title: '주문 완료',
    description: `주문한 음료를 받았다.
따뜻한 커피 향이 코끝을 스친다.

기분이 좀 나아진 것 같다.`,
    choices: [
      {
        id: 'ordered_go',
        text: '☕ 들고 출근하기',
        nextSceneId: 'office_arrival',
      },
    ],
  },

  cafe_chat_subin: {
    id: 'cafe_chat_subin',
    location: 'cafe',
    title: '수빈과 대화',
    description: `커피를 받으며 잡담을 나눈다.`,
    dialogue: [
      {
        speaker: 'jung_subin',
        text: '오늘도 월요일이네요. 힘내세요!',
        mood: 'happy',
      },
    ],
    choices: [
      {
        id: 'subin_thanks',
        text: '😊 "고마워요"',
        effect: {
          time: 0,
        },
        nextSceneId: 'office_arrival',
      },
    ],
  },

  cafe_12f_rumor: {
    id: 'cafe_12f_rumor',
    location: 'cafe',
    title: '수상한 소문',
    description: `12층에 대해 물어보자 수빈의 표정이 묘해진다.`,
    dialogue: [
      {
        speaker: 'jung_subin',
        text: '12층요? 거기... 뭔가 이상해요.',
        mood: 'nervous',
      },
      {
        speaker: 'jung_subin',
        text: '밤에 불이 켜져 있는 거 봤거든요. 근데 그 층엔 아무도 안 들어가잖아요...',
        mood: 'thoughtful',
      },
    ],
    onEnter: {
      clues: ['clue_12f_rumor'],
    },
    choices: [
      {
        id: 'rumor_more',
        text: '❓ "더 자세히 알려줄 수 있어요?"',
        hint: '수빈 호감 +5',
        effect: {
          time: 10,
          affinity: { jung_subin: 5 },
        },
        nextSceneId: 'cafe_12f_detail',
      },
      {
        id: 'rumor_thanks',
        text: '🙏 "고마워요, 참고할게요"',
        effect: {
          time: 0,
        },
        nextSceneId: 'office_arrival',
      },
    ],
  },

  cafe_12f_detail: {
    id: 'cafe_12f_detail',
    location: 'cafe',
    title: '더 자세한 이야기',
    description: '수빈이 목소리를 낮추고 주위를 살핀다.',
    dialogue: [
      {
        speaker: 'jung_subin',
        text: '사실... 김부장님이 매일 저녁에 12층 가시는 거 봤어요.',
        mood: 'nervous',
      },
      {
        speaker: 'jung_subin',
        text: '다른 사람은 못 들어가는데 부장님은 카드키가 있더라고요.',
        mood: 'thoughtful',
      },
    ],
    onEnter: {
      clues: ['clue_boss_schedule'],
    },
    choices: [
      {
        id: 'detail_thanks',
        text: '🤔 "알겠어요. 비밀로 할게요."',
        effect: {
          time: 0,
        },
        nextSceneId: 'office_arrival',
      },
    ],
  },

  // ============================================
  // 2막: 점심
  // ============================================

  lunch_time: {
    id: 'lunch_time',
    location: 'office',
    title: '점심시간',
    description: (state) => {
      const loopCount = loops(state);

      if (loopCount === 1) {
        return `드디어 12시다.

일어서려는데, 옆자리 박준혁이 말을 건다.

"선배님..."

"응?"

"...아니에요. 아무것도."

이상하다.
뭔가 말하려다 그만둔 것 같은데.

그의 눈빛이 묘하다.
마치... 뭔가 알고 있다는 듯한.

"선배님, 오늘... 조심하세요."

뭐?

"아, 아무것도 아니에요. 점심 맛있게 드세요."

그가 자리를 피한다.

...뭐였지, 방금?`;
      }

      return `드디어 12시다.

동료들이 점심 먹으러 가자고 한다.
오늘 뭘 먹을까?`;
    },
    choices: [
      {
        id: 'lunch_team',
        text: '👥 팀원들과 함께',
        hint: '평판 +3, -12,000원',
        effect: {
          time: 60,
          stats: { money: -12000, reputation: 3 },
        },
        nextSceneId: 'lunch_team_scene',
      },
      {
        id: 'lunch_alone',
        text: '🍱 혼자 조용히',
        hint: '멘탈 +10, -8,000원',
        effect: {
          time: 45,
          stats: { money: -8000, mental: 10 },
        },
        nextSceneId: 'afternoon_work',
      },
      {
        id: 'lunch_jihyun',
        text: '💕 지현에게 밥 먹자고 하기',
        condition: 'loops >= 2',
        hint: '지현 호감 +10',
        effect: {
          time: 60,
          stats: { money: -15000 },
          affinity: { yoon_jihyun: 10 },
        },
        nextSceneId: 'lunch_jihyun_scene',
      },
      {
        id: 'lunch_junhyuk',
        text: '🎮 준혁이랑 밥 먹기',
        condition: 'loops >= 3 || park_junhyuk >= 20',
        hint: '준혁 호감 +8',
        effect: {
          time: 60,
          stats: { money: -10000 },
          affinity: { park_junhyuk: 8 },
        },
        nextSceneId: 'lunch_junhyuk_scene',
      },
    ],
  },

  lunch_team_scene: {
    id: 'lunch_team_scene',
    location: 'cafeteria',
    title: '팀 점심',
    description: `팀원들과 구내식당에서 점심을 먹는다.

이런저런 회사 이야기가 오간다.`,
    dialogue: [
      {
        speaker: 'lee_seungho',
        text: '요즘 야근 너무 많지 않아? 다들 힘들어 보여.',
        mood: 'thoughtful',
      },
    ],
    choices: [
      {
        id: 'team_agree',
        text: '😮‍💨 "진짜요. 너무 힘들어요."',
        hint: '승호 호감 +5',
        effect: {
          time: 0,
          affinity: { lee_seungho: 5 },
        },
        nextSceneId: 'afternoon_work',
      },
      {
        id: 'team_endure',
        text: '💪 "그래도 버텨야죠."',
        hint: '평판 +3',
        effect: {
          time: 0,
          stats: { reputation: 3 },
        },
        nextSceneId: 'afternoon_work',
      },
    ],
  },

  lunch_jihyun_scene: {
    id: 'lunch_jihyun_scene',
    location: 'restaurant',
    title: '지현과 점심',
    description: (state) => {
      const affinity = getAffinity(state, 'yoon_jihyun');
      if (affinity >= 40) {
        return `지현이 밝게 웃으며 앉는다.

"오빠랑 밥 먹으니까 좋다~"

왠지 설렌다.`;
      }
      return `지현이 의아한 표정으로 앉는다.

"갑자기 웬일이에요?"`;
    },
    choices: [
      {
        id: 'jihyun_honest',
        text: '😊 "같이 먹고 싶어서요"',
        hint: '지현 호감 +5',
        effect: {
          time: 0,
          affinity: { yoon_jihyun: 5 },
          stats: { mental: 10 },
        },
        nextSceneId: 'lunch_jihyun_talk',
      },
      {
        id: 'jihyun_awkward',
        text: '😅 "아, 그냥... 밥값 있어서..."',
        effect: {
          time: 0,
          stats: { mental: -5 },
        },
        nextSceneId: 'afternoon_work',
      },
    ],
  },

  lunch_jihyun_talk: {
    id: 'lunch_jihyun_talk',
    location: 'restaurant',
    title: '대화',
    description: (state) => {
      const affinity = getAffinity(state, 'yoon_jihyun');
      if (affinity >= 60) {
        return `지현이 조용히 말한다.

"사실 저... 여행 작가가 되고 싶어요."
"회사 다니면서 꿈 얘기 하기가 웃기지만..."

진심이 느껴진다.`;
      }
      return `즐거운 점심 시간.
지현과 이런저런 이야기를 나눈다.`;
    },
    choices: [
      {
        id: 'jihyun_dream_support',
        text: '✨ "멋진 꿈이에요. 응원해요."',
        condition: 'yoon_jihyun >= 60',
        hint: '지현 호감 +15',
        effect: {
          time: 0,
          affinity: { yoon_jihyun: 15 },
          flags: { knows_jihyun_dream: true },
        },
        nextSceneId: 'afternoon_work',
      },
      {
        id: 'jihyun_talk_end',
        text: '😊 "즐거웠어요"',
        effect: {
          time: 0,
        },
        nextSceneId: 'afternoon_work',
      },
    ],
  },

  lunch_junhyuk_scene: {
    id: 'lunch_junhyuk_scene',
    location: 'restaurant',
    title: '준혁과 점심',
    description: (state) => {
      const affinity = getAffinity(state, 'park_junhyuk');
      if (affinity >= 40) {
        return `준혁이 어색하게 웃는다.

"선배님이랑 밥 먹으니까 좋네요.
보통은 혼자 먹거든요."`;
      }
      return `준혁이 어색하게 앉아있다.

"저... 저랑 왜 같이 먹으려고요?"`;
    },
    choices: [
      {
        id: 'junhyuk_honest',
        text: '😊 "친해지고 싶어서요"',
        hint: '준혁 호감 +10',
        effect: {
          time: 0,
          affinity: { park_junhyuk: 10 },
        },
        nextSceneId: 'lunch_junhyuk_talk',
      },
      {
        id: 'junhyuk_casual',
        text: '🤷 "혼자 먹기 싫어서요"',
        hint: '준혁 호감 +3',
        effect: {
          time: 0,
          affinity: { park_junhyuk: 3 },
        },
        nextSceneId: 'afternoon_work',
      },
    ],
  },

  lunch_junhyuk_talk: {
    id: 'lunch_junhyuk_talk',
    location: 'restaurant',
    title: '대화',
    description: `준혁의 표정이 부드러워진다.`,
    dialogue: [
      {
        speaker: 'park_junhyuk',
        text: '사실 저, 게임 만들고 있어요. 퇴근하고 혼자서요.',
        mood: 'nervous',
      },
      {
        speaker: 'park_junhyuk',
        text: '아무한테도 말 안 했는데... 선배님한테는 왠지 말하고 싶었어요.',
        mood: 'thoughtful',
      },
    ],
    choices: [
      {
        id: 'junhyuk_game_interest',
        text: '🎮 "어떤 게임이에요? 보여주세요!"',
        hint: '준혁 호감 +15',
        effect: {
          time: 0,
          affinity: { park_junhyuk: 15 },
          flags: { knows_junhyuk_game: true },
        },
        nextSceneId: 'afternoon_work',
      },
      {
        id: 'junhyuk_support',
        text: '👍 "멋지네요. 응원할게요."',
        hint: '준혁 호감 +8',
        effect: {
          time: 0,
          affinity: { park_junhyuk: 8 },
        },
        nextSceneId: 'afternoon_work',
      },
    ],
  },

  // ============================================
  // 2막: 오후
  // ============================================

  afternoon_work: {
    id: 'afternoon_work',
    location: 'office',
    title: '오후 업무',
    description: (state) => {
      const time = state.loop.time;
      const remaining = 18 * 60 - time; // 퇴근 시간까지

      if (remaining <= 60) {
        return `슬슬 퇴근 시간이 다가온다.

오늘 하루도 무사히 끝날 것 같다.`;
      }
      return `오후 업무가 시작됐다.

나른한 오후. 졸음이 밀려온다.`;
    },
    choices: [
      {
        id: 'work_afternoon',
        text: '💼 열심히 일하기',
        hint: '평판 +5, 멘탈 -10',
        effect: {
          time: 120,
          stats: { reputation: 5, mental: -10 },
        },
        nextSceneId: 'evening_decision',
      },
      {
        id: 'go_rooftop',
        text: '🏢 옥상 가기',
        hint: '멘탈 +10',
        effect: {
          time: 30,
          stats: { mental: 10 },
        },
        nextSceneId: 'rooftop_afternoon',
      },
      {
        id: 'investigate_boss_afternoon',
        text: '🔍 부장 책상 조사',
        condition: 'loops >= 7 && time >= 870 && time <= 990',
        hint: '부장 자리 비움! 위험',
        effect: {
          time: 20,
        },
        nextSceneId: 'office_boss_desk',
      },
    ],
  },

  // ============================================
  // 2막: 옥상
  // ============================================

  rooftop_afternoon: {
    id: 'rooftop_afternoon',
    location: 'rooftop',
    title: '옥상',
    description: `옥상에 올라왔다.

시원한 바람이 분다.
멀리 도시의 풍경이 보인다.`,
    choices: [
      {
        id: 'rooftop_rest',
        text: '😌 잠시 쉬기',
        hint: '멘탈 +5',
        effect: {
          time: 15,
          stats: { mental: 5 },
        },
        nextSceneId: 'afternoon_work',
      },
      {
        id: 'rooftop_seungho',
        text: '💬 승호 과장과 대화',
        condition: 'loops >= 4',
        hint: '승호 호감 +5',
        effect: {
          time: 30,
          affinity: { lee_seungho: 5 },
        },
        nextSceneId: 'rooftop_seungho_talk',
      },
    ],
  },

  rooftop_seungho_talk: {
    id: 'rooftop_seungho_talk',
    location: 'rooftop',
    title: '승호와 대화',
    description: `이승호 과장이 옥상에 있다.
담배를 피우며 먼 곳을 바라본다.`,
    dialogue: [
      {
        speaker: 'lee_seungho',
        text: '여기 좋지? 복잡한 머리 식히기 딱이야.',
        mood: 'thoughtful',
      },
      {
        speaker: 'lee_seungho',
        text: '...가끔 생각해. 이게 맞나 싶어.',
        mood: 'sad',
      },
    ],
    choices: [
      {
        id: 'seungho_listen',
        text: '👂 "무슨 고민 있으세요?"',
        hint: '승호 호감 +10',
        effect: {
          time: 0,
          affinity: { lee_seungho: 10 },
        },
        nextSceneId: 'rooftop_seungho_secret',
      },
      {
        id: 'seungho_back',
        text: '😊 "저도 그래요. 그래도 힘내요."',
        effect: {
          time: 0,
        },
        nextSceneId: 'afternoon_work',
      },
    ],
  },

  rooftop_seungho_secret: {
    id: 'rooftop_seungho_secret',
    location: 'rooftop',
    title: '승호의 고민',
    description: '승호 과장이 담배를 깊게 빨고 말을 이었다.',
    dialogue: [
      {
        speaker: 'lee_seungho',
        text: '사실... 스타트업 친구가 같이 창업하자고 했어.',
        mood: 'nervous',
      },
      {
        speaker: 'lee_seungho',
        text: '이 안정적인 직장 버리고? 미친 거 아니냐고.',
        mood: 'thoughtful',
      },
      {
        speaker: 'lee_seungho',
        text: '근데 매일 이렇게 사는 게... 사는 건가 싶어.',
        mood: 'sad',
      },
    ],
    onEnter: {
      flags: { knows_seungho_startup: true },
    },
    choices: [
      {
        id: 'seungho_encourage',
        text: '✨ "도전해보시는 것도 좋을 것 같아요."',
        hint: '승호 호감 +15',
        effect: {
          time: 0,
          affinity: { lee_seungho: 15 },
          flags: { encouraged_seungho_startup: true },
        },
        nextSceneId: 'afternoon_work',
      },
      {
        id: 'seungho_practical',
        text: '🤔 "신중하게 생각하세요."',
        hint: '승호 호감 +5',
        effect: {
          time: 0,
          affinity: { lee_seungho: 5 },
        },
        nextSceneId: 'afternoon_work',
      },
    ],
  },

  // ============================================
  // 3막: 부장 책상 조사
  // ============================================

  office_boss_desk: {
    id: 'office_boss_desk',
    location: 'office',
    title: '부장 책상',
    description: (state) => {
      const time = state.loop.time;
      const bossAway = time >= 14.5 * 60 && time <= 16.5 * 60;

      if (bossAway) {
        return `김부장 자리가 비어있다.
지금이 기회다.

서랍을 열어볼까?
들키면 큰일이다...`;
      }
      return `김부장이 자리에 있다.
조사할 수 없다.`;
    },
    choices: [
      {
        id: 'boss_desk_search',
        text: '🔍 서랍 조사하기',
        condition: 'time >= 870 && time <= 990',
        hint: '단서 발견! 위험',
        effect: {
          time: 10,
        },
        nextSceneId: 'office_boss_memo',
      },
      {
        id: 'boss_desk_back',
        text: '↩️ 돌아가기',
        effect: {
          time: 0,
        },
        nextSceneId: 'afternoon_work',
      },
    ],
  },

  office_boss_memo: {
    id: 'office_boss_memo',
    location: 'office',
    title: '발견',
    description: `서랍에서 메모지를 발견했다.

"PM 진행 상황 보고 - 금일 17:00"
"대상 #042 모니터링 강화"

뒷면에 희미하게 적혀있다.
"...미안하다"

PM? 대상 #042? 무슨 의미지?`,
    onEnter: {
      clues: ['clue_boss_memo'],
    },
    choices: [
      {
        id: 'memo_take',
        text: '📝 메모 가져가기',
        hint: '위험',
        effect: {
          time: 0,
          flags: { took_boss_memo: true },
        },
        nextSceneId: 'afternoon_work',
      },
      {
        id: 'memo_leave',
        text: '📷 사진만 찍기',
        effect: {
          time: 5,
        },
        nextSceneId: 'afternoon_work',
      },
    ],
  },

  // ============================================
  // 저녁 & 야근
  // ============================================

  evening_decision: {
    id: 'evening_decision',
    location: 'office',
    title: '퇴근 시간',
    description: (state) => {
      const time = state.loop.time;
      if (time >= 18 * 60) {
        return `6시가 됐다. 퇴근 시간이다.

하지만 김부장은 아직 자리에 있다.
눈치가 보인다...`;
      }
      return `아직 퇴근 시간 전이다.`;
    },
    choices: [
      {
        id: 'go_home',
        text: '🏠 퇴근하기',
        hint: '평판 -5',
        effect: {
          time: 0,
          stats: { reputation: -5 },
        },
        nextSceneId: 'evening_commute',
      },
      {
        id: 'stay_overtime',
        text: '💼 야근하기',
        hint: '평판 +5, 체력 -10, 멘탈 -10',
        effect: {
          time: 120,
          stats: { reputation: 5, health: -10, mental: -10 },
        },
        nextSceneId: 'overtime_work',
      },
      {
        id: 'follow_boss',
        text: '🕵️ 부장 미행하기',
        condition: 'loops >= 7 && time >= 1020',
        hint: '위험! 단서 발견 가능',
        effect: {
          time: 60,
        },
        nextSceneId: 'follow_boss_scene',
      },
    ],
  },

  overtime_work: {
    id: 'overtime_work',
    location: 'office',
    title: '야근',
    description: `야근이다.

주변이 조용해진다.
한명 두명 퇴근하고 사무실이 텅 빈다.`,
    choices: [
      {
        id: 'overtime_continue',
        text: '💼 계속 일하기',
        hint: '평판 +3, 체력 -10',
        effect: {
          time: 120,
          stats: { reputation: 3, health: -10 },
        },
        nextSceneId: 'night_office',
      },
      {
        id: 'overtime_investigate',
        text: '🔍 사무실 조사',
        condition: 'loops >= 10',
        hint: '야간 조사 가능',
        effect: {
          time: 60,
        },
        nextSceneId: 'night_investigation',
      },
    ],
  },

  // ============================================
  // 3막: 부장 미행
  // ============================================

  follow_boss_scene: {
    id: 'follow_boss_scene',
    location: 'office',
    title: '미행',
    description: `김부장이 자리에서 일어났다.
17시가 됐다.

몰래 뒤를 따라간다...`,
    choices: [
      {
        id: 'follow_careful',
        text: '🕵️ 조심스럽게 따라가기',
        effect: {
          time: 0,
        },
        nextSceneId: 'follow_boss_12f',
      },
    ],
  },

  follow_boss_12f: {
    id: 'follow_boss_12f',
    location: 'elevator',
    title: '12층으로',
    description: `김부장이 엘리베이터에 탔다.
12층 버튼을 누른다.

12층... 아무도 가지 않는 그 층.
카드키를 찍는 모습이 보인다.

문이 닫힌다.`,
    onEnter: {
      clues: ['clue_boss_12f_connection'],
    },
    choices: [
      {
        id: 'try_12f',
        text: '🚪 12층 진입 시도',
        hint: '카드키 필요',
        effect: {
          time: 10,
        },
        nextSceneId: 'floor_12_locked',
      },
      {
        id: 'retreat',
        text: '↩️ 일단 물러나기',
        effect: {
          time: 0,
        },
        nextSceneId: 'evening_commute',
      },
    ],
  },

  floor_12_locked: {
    id: 'floor_12_locked',
    location: 'floor_12',
    title: '잠긴 문',
    description: `12층에 도착했다.

"딸깍"

카드키가 필요하다.
문이 열리지 않는다.

어떻게든 카드키를 구해야 한다...`,
    choices: [
      {
        id: 'leave_12f',
        text: '↩️ 돌아가기',
        effect: {
          time: 0,
        },
        nextSceneId: 'evening_commute',
      },
    ],
  },

  // ============================================
  // 3막: 야간 조사
  // ============================================

  night_office: {
    id: 'night_office',
    location: 'office',
    title: '야간 사무실',
    description: `밤이 깊었다.

사무실에 나 혼자다.
조용한 사무실에서 뭔가 할 수 있을 것 같다.`,
    choices: [
      {
        id: 'night_rest',
        text: '😴 잠깐 눈 붙이기',
        hint: '체력 +10',
        effect: {
          time: 60,
          stats: { health: 10 },
        },
        nextSceneId: 'ending_check',
      },
      {
        id: 'night_investigate',
        text: '🔍 야간 조사',
        condition: 'loops >= 10',
        effect: {
          time: 60,
        },
        nextSceneId: 'night_investigation',
      },
    ],
  },

  night_investigation: {
    id: 'night_investigation',
    location: 'office',
    title: '야간 조사',
    description: `어두운 사무실.
이 시간이라면 아무도 없다.

무엇을 조사할까?`,
    choices: [
      {
        id: 'investigate_boss_pc',
        text: '💻 부장 PC 확인',
        condition: 'discovered_clue_password',
        hint: '비밀번호 필요',
        effect: {
          time: 30,
        },
        nextSceneId: 'boss_pc_access',
      },
      {
        id: 'investigate_files',
        text: '📁 서류함 조사',
        effect: {
          time: 30,
        },
        nextSceneId: 'file_cabinet_search',
      },
      {
        id: 'go_home_night',
        text: '🏠 집에 가기',
        effect: {
          time: 0,
        },
        nextSceneId: 'ending_check',
      },
    ],
  },

  // ============================================
  // 3막: 준혁의 진실
  // ============================================

  rooftop_junhyuk_night: {
    id: 'rooftop_junhyuk_night',
    location: 'rooftop',
    title: '야간 옥상',
    description: `밤하늘 아래 누군가 있다.

...준혁이다.

그가 천천히 돌아본다.`,
    dialogue: [
      {
        speaker: 'park_junhyuk',
        text: '...선배, 오셨군요.',
        mood: 'neutral',
      },
      {
        speaker: 'park_junhyuk',
        text: '기다리고 있었어요.',
        mood: 'thoughtful',
      },
    ],
    choices: [
      {
        id: 'junhyuk_night_ask',
        text: '❓ "이 시간에 여기서 뭐해?"',
        effect: {
          time: 0,
        },
        nextSceneId: 'junhyuk_truth_1',
      },
      {
        id: 'junhyuk_night_wait',
        text: '👀 "날 기다린 거야?"',
        effect: {
          time: 0,
        },
        nextSceneId: 'junhyuk_truth_1',
      },
    ],
  },

  junhyuk_truth_1: {
    id: 'junhyuk_truth_1',
    location: 'rooftop',
    title: '진실',
    description: '준혁이 뭔가 의미심장한 표정으로 물었다.',
    dialogue: [
      {
        speaker: 'park_junhyuk',
        text: '선배... 오늘 무슨 요일이에요?',
        mood: 'neutral',
      },
      {
        speaker: 'player',
        text: '월요일이지.',
        mood: 'confused',
      },
      {
        speaker: 'park_junhyuk',
        text: '...그렇죠. 월요일이죠.',
        mood: 'sad',
      },
    ],
    choices: [
      {
        id: 'junhyuk_truth_continue',
        text: '❓ "뭔가 알고 있어?"',
        effect: {
          time: 0,
        },
        nextSceneId: 'junhyuk_truth_2',
      },
    ],
  },

  junhyuk_truth_2: {
    id: 'junhyuk_truth_2',
    location: 'rooftop',
    title: '100번째 루프',
    description: '준혁이 천천히 입을 열었다.',
    dialogue: [
      {
        speaker: 'park_junhyuk',
        text: '저도... 반복하고 있어요.',
        mood: 'sad',
      },
      {
        speaker: 'park_junhyuk',
        text: '선배보다 먼저요. 벌써 100번째.',
        mood: 'neutral',
      },
      {
        speaker: 'park_junhyuk',
        text: '처음엔 미칠 것 같았어요. 이제는... 그냥 익숙해졌죠.',
        mood: 'thoughtful',
      },
      {
        speaker: 'park_junhyuk',
        text: '포기하면 편해요. 근데...',
        mood: 'neutral',
      },
      {
        speaker: 'park_junhyuk',
        text: '선배를 보면 희망이 생겨요.',
        mood: 'happy',
      },
    ],
    onEnter: {
      clues: ['clue_junhyuk_100_loops'],
      affinity: { park_junhyuk: 20 },
    },
    choices: [
      {
        id: 'junhyuk_truth_together',
        text: '🤝 "함께 빠져나가자."',
        hint: '준혁 호감 +20',
        effect: {
          time: 0,
          affinity: { park_junhyuk: 20 },
          flags: { junhyuk_ally: true },
        },
        nextSceneId: 'junhyuk_alliance',
      },
      {
        id: 'junhyuk_truth_how',
        text: '❓ "방법을 알아?"',
        effect: {
          time: 0,
        },
        nextSceneId: 'junhyuk_method',
      },
    ],
  },

  junhyuk_alliance: {
    id: 'junhyuk_alliance',
    location: 'rooftop',
    title: '동맹',
    description: '준혁의 눈에 희망이 비쳤다.',
    dialogue: [
      {
        speaker: 'park_junhyuk',
        text: '...정말요?',
        mood: 'surprised',
      },
      {
        speaker: 'park_junhyuk',
        text: '선배가 그렇게 말해주니까... 진짜 가능할 것 같아요.',
        mood: 'happy',
      },
      {
        speaker: 'park_junhyuk',
        text: '제가 아는 건 다 알려드릴게요.',
        mood: 'neutral',
      },
    ],
    choices: [
      {
        id: 'alliance_continue',
        text: '✨ "고마워, 준혁."',
        effect: {
          time: 0,
        },
        nextSceneId: 'ending_check',
      },
    ],
  },

  // ============================================
  // 저녁 귀가
  // ============================================

  evening_commute: {
    id: 'evening_commute',
    location: 'subway',
    title: '귀가',
    description: `퇴근 지하철.

하루가 끝나간다.
피곤한 몸을 이끌고 집으로 향한다.`,
    choices: [
      {
        id: 'go_home_normal',
        text: '🏠 집으로',
        effect: {
          time: 60,
        },
        nextSceneId: 'ending_check',
      },
    ],
  },

  // ============================================
  // 엔딩 체크
  // ============================================

  ending_check: {
    id: 'ending_check',
    location: 'home',
    title: '하루의 끝',
    description: (state) => {
      const loopCount = loops(state);
      const time = state.loop.time;

      // 첫 번째 루프 - 극적인 엔딩
      if (loopCount <= 1) {
        return `집에 도착했다.

오늘 하루, 이상한 일들이 많았다.
지하철에서 본 그 남자...
부장의 이상한 눈빛...
거울 속 나의 모습...

그냥 피곤해서 그런 거겠지.

침대에 눕는다.
눈을 감는다.

...

...?

핸드폰이 울린다.
모르는 번호다.

받아야 하나?

"...여보세요?"

아무 소리도 안 들린다.
아니, 잠깐...

"...포기하지 마세요."

뭐라고?

"당신은 빠져나올 수 있어요.
하지만 시간이 얼마 없어요.
12층... 12층을 기억하세요...
내일... 아니, 오늘... 반드시..."

전화가 끊겼다.

뭐였지, 방금?
12층? 무슨 소리야?

갑자기 눈이 감긴다.
의식이 흐려진다.

안 돼, 잠깐...!

어...?`;
      }

      if (time >= 24 * 60) {
        return `시계가 자정을 가리킨다.

의식이 흐려진다.
또다시... 월요일이...`;
      }
      return `하루가 끝나간다.

피곤하다. ${loopCount}번째 월요일이 끝났다.
이 루프에서 탈출할 방법을 찾아야 해.`;
    },
    choices: [
      {
        id: 'sleep',
        text: '눈이 감긴다...',
        effect: {
          time: 0,
        },
        nextSceneId: 'loop_transition',
      },
    ],
  },

  // ============================================
  // 엔딩 씬들
  // ============================================

  ending_escape: {
    id: 'ending_escape',
    location: 'outside',
    title: '탈출',
    description: `드디어... 화요일이다.

창밖으로 햇살이 들어온다.
알람 소리가 다르게 들린다.

끝났다. 정말로 끝났다.
이제 새로운 하루가 시작된다.`,
    isEnding: true,
    endingType: 'ESCAPE',
    choices: [],
  },

  ending_burnout: {
    id: 'ending_burnout',
    location: 'hospital',
    title: '번아웃',
    description: `더 이상 버틸 수 없다.

모든 것이 무의미하게 느껴진다.
출근도, 업무도, 이 반복도...

병원에서 눈을 떴다.
"과로로 쓰러지셨어요."

아이러니하게도, 루프에서 벗어났다.
하지만 대가는 컸다.`,
    isEnding: true,
    endingType: 'BURNOUT',
    choices: [],
  },

  ending_hospitalized: {
    id: 'ending_hospitalized',
    location: 'hospital',
    title: '입원',
    description: `몸이 더 이상 버티지 못했다.

병원 침대에서 눈을 떴다.
창밖으로 화요일의 햇살이 들어온다.

루프는 끝났다.
하지만 건강을 잃었다.`,
    isEnding: true,
    endingType: 'HOSPITALIZED',
    choices: [],
  },

  ending_fired: {
    id: 'ending_fired',
    location: 'office',
    title: '해고',
    description: `"이번 달까지입니다."

인사팀에서 나온 통보.
평판이 바닥을 쳤다.

아이러니하게도, 회사를 떠나니 루프도 끝났다.
하지만 이런 방식은 아니었다.`,
    isEnding: true,
    endingType: 'FIRED',
    choices: [],
  },

  ending_love: {
    id: 'ending_love',
    location: 'park',
    title: '사랑',
    description: `"같이 나가자."

그/그녀의 손을 잡았다.
둘이 함께라면 어떤 월요일도 두렵지 않다.

화요일 아침, 옆에서 눈을 떴다.
루프는 끝났다. 사랑과 함께.`,
    isEnding: true,
    endingType: 'LOVE',
    choices: [],
  },

  ending_promotion: {
    id: 'ending_promotion',
    location: 'office',
    title: '승진',
    description: `"축하합니다, 과장님."

루프를 완벽하게 활용했다.
모든 업무를 예측하고 처리했다.

승진했다.
하지만... 아직도 월요일이다.

아이러니하게도, 원했던 것을 얻었지만
여전히 갇혀있다.`,
    isEnding: true,
    endingType: 'PROMOTION',
    choices: [],
  },

  ending_startup: {
    id: 'ending_startup',
    location: 'office_new',
    title: '창업',
    description: `"같이 시작하자."

이승호 과장과 함께 회사를 나왔다.
새로운 시작.

루프에서 얻은 지식과 경험으로
새로운 길을 걷는다.

화요일, 작은 사무실에서 눈을 떴다.
이제 진짜 새로운 하루다.`,
    isEnding: true,
    endingType: 'STARTUP',
    choices: [],
  },

  ending_rich: {
    id: 'ending_rich',
    location: 'home_luxury',
    title: '부자',
    description: `루프를 이용했다.

주식, 로또, 모든 것을 예측했다.
돈은 넘쳐났다.

하지만 마음은 텅 비어있다.
이것이 원했던 것인가?`,
    isEnding: true,
    endingType: 'RICH',
    choices: [],
  },

  ending_enlightened: {
    id: 'ending_enlightened',
    location: 'temple',
    title: '깨달음',
    description: `모든 진실을 알았다.

루프의 의미, 존재의 이유.
모든 것을 이해했다.

더 이상 탈출하려 하지 않는다.
이 순간을 온전히 받아들인다.

그러자... 문이 열렸다.
집착을 버리니 자유가 왔다.`,
    isEnding: true,
    endingType: 'ENLIGHTENED',
    choices: [],
  },

  ending_secret: {
    id: 'ending_secret',
    location: 'floor_12',
    title: '비밀',
    description: `모든 조각이 맞춰졌다.

프로젝트 먼데이, 대상자 #042, 관리자.
그리고... 진짜 목적.

준혁이 말했다.
"이제 알겠죠? 우리가 뭔지."

화면이 깜빡인다.
"시뮬레이션 종료. 새 사이클 준비 중..."

...이건 시작에 불과했다.`,
    isEnding: true,
    endingType: 'SECRET',
    choices: [],
  },

  // ============================================
  // 기타 씬 (추가 컨텐츠용)
  // ============================================

  office_chat_jihyun: {
    id: 'office_chat_jihyun',
    location: 'office',
    title: '지현과 대화',
    description: (state) => {
      const affinity = getAffinity(state, 'yoon_jihyun');
      if (affinity >= 60) {
        return `지현이 밝게 웃으며 다가온다.

"오빠! 뭐해요?"

그녀의 웃음이 유난히 빛난다.`;
      }
      return `지현에게 말을 건넸다.

"안녕하세요, 바쁘세요?"`;
    },
    choices: [
      {
        id: 'jihyun_chat_work',
        text: '💼 "요즘 업무 어때요?"',
        hint: '지현 호감 +3',
        effect: {
          time: 30,
          affinity: { yoon_jihyun: 3 },
        },
        nextSceneId: 'lunch_time',
      },
      {
        id: 'jihyun_chat_personal',
        text: '😊 "주말에 뭐 했어요?"',
        condition: 'yoon_jihyun >= 30',
        hint: '지현 호감 +5',
        effect: {
          time: 30,
          affinity: { yoon_jihyun: 5 },
        },
        nextSceneId: 'lunch_time',
      },
    ],
  },

  home_evening_sick: {
    id: 'home_evening_sick',
    location: 'home',
    title: '저녁',
    description: `하루 종일 쉬었더니 몸이 좀 나아졌다.

하지만 뭔가 허전하다.
내일도... 월요일이겠지.`,
    choices: [
      {
        id: 'sick_sleep',
        text: '😴 잠든다',
        effect: {
          time: 0,
        },
        nextSceneId: 'loop_transition',
      },
    ],
  },

  home_investigation: {
    id: 'home_investigation',
    location: 'home',
    title: '조사',
    description: `노트북을 열고 회사 정보를 찾아봤다.

12층... 공식적으로는 "시설관리" 부서.
하지만 출입 기록이 없다.

이상하다.`,
    choices: [
      {
        id: 'investigation_more',
        text: '🔍 더 조사하기',
        hint: '단서 발견 가능',
        effect: {
          time: 120,
          stats: { mental: -10 },
        },
        nextSceneId: 'home_evening_sick',
      },
      {
        id: 'investigation_stop',
        text: '😴 그만두고 쉬기',
        effect: {
          time: 0,
        },
        nextSceneId: 'home_evening_sick',
      },
    ],
  },

  boss_pc_access: {
    id: 'boss_pc_access',
    location: 'office',
    title: '부장 PC',
    description: `비밀번호를 입력했다.
MONDAY0101...

로그인 성공.

파일을 살펴본다.`,
    onEnter: {
      clues: ['clue_project_name'],
    },
    choices: [
      {
        id: 'pc_search',
        text: '🔍 프로젝트 먼데이 검색',
        effect: {
          time: 30,
        },
        nextSceneId: 'project_monday_discovery',
      },
    ],
  },

  project_monday_discovery: {
    id: 'project_monday_discovery',
    location: 'office',
    title: '프로젝트 먼데이',
    description: `"PROJECT MONDAY - 시간 인지 연구"

파일을 열어본다.

"대상자 격리 및 반복 루프 유지"
"대상자 #042 - 모니터링 진행 중"

#042... 그게 나?`,
    onEnter: {
      clues: ['clue_player_file'],
    },
    choices: [
      {
        id: 'discovery_shock',
        text: '😱 "이게... 나?"',
        effect: {
          time: 0,
          stats: { mental: -20 },
        },
        nextSceneId: 'ending_check',
      },
    ],
  },

  file_cabinet_search: {
    id: 'file_cabinet_search',
    location: 'office',
    title: '서류함',
    description: `서류함을 뒤져봤다.

대부분 일반 업무 서류다.
하지만 한 파일이 눈에 띈다.

"PM 관련 인원 명단"`,
    choices: [
      {
        id: 'read_file',
        text: '📄 파일 확인',
        effect: {
          time: 20,
          clues: ['clue_experiment_log'],
        },
        nextSceneId: 'ending_check',
      },
      {
        id: 'leave_file',
        text: '↩️ 돌아가기',
        effect: {
          time: 0,
        },
        nextSceneId: 'ending_check',
      },
    ],
  },

  junhyuk_method: {
    id: 'junhyuk_method',
    location: 'rooftop',
    title: '방법',
    description: '준혁이 목소리를 낮추고 말했다.',
    dialogue: [
      {
        speaker: 'park_junhyuk',
        text: '12층이에요. 거기에 답이 있어요.',
        mood: 'neutral',
      },
      {
        speaker: 'park_junhyuk',
        text: '저는 카드키가 없어서 못 들어가요.',
        mood: 'sad',
      },
      {
        speaker: 'park_junhyuk',
        text: '김부장님... 그분이 관리자예요.',
        mood: 'thoughtful',
      },
    ],
    onEnter: {
      clues: ['clue_boss_role'],
    },
    choices: [
      {
        id: 'method_together',
        text: '🤝 "같이 해보자."',
        hint: '준혁 호감 +15',
        effect: {
          time: 0,
          affinity: { park_junhyuk: 15 },
          flags: { junhyuk_ally: true },
        },
        nextSceneId: 'ending_check',
      },
    ],
  },
};

// ============================================
// 씬 가져오기
// ============================================

export function getScene(id: string): Scene | undefined {
  return scenes[id];
}

// ============================================
// 조건 평가
// ============================================

export function evaluateCondition(condition: string | undefined, state: GameState): boolean {
  if (!condition) return true;

  // 간단한 조건 파서
  const ctx = {
    loops: state.permanent.totalLoops,
    health: state.loop.stats.health,
    mental: state.loop.stats.mental,
    reputation: state.loop.stats.reputation,
    money: state.loop.stats.money,
    time: state.loop.time,
    // 호감도
    kim_donghyun: getAffinity(state, 'kim_donghyun'),
    lee_seungho: getAffinity(state, 'lee_seungho'),
    yoon_jihyun: getAffinity(state, 'yoon_jihyun'),
    park_junhyuk: getAffinity(state, 'park_junhyuk'),
    choi_minsoo: getAffinity(state, 'choi_minsoo'),
    jung_subin: getAffinity(state, 'jung_subin'),
    // 플래그
    ...state.loop.flags,
    // 단서
    ...Object.fromEntries(
      state.permanent.discoveredClues.map(c => [`discovered_${c.id}`, true])
    ),
  };

  try {
    // 조건 문자열을 평가 (보안상 주의 필요)
    const fn = new Function(...Object.keys(ctx), `return ${condition}`);
    return fn(...Object.values(ctx));
  } catch {
    console.warn(`Invalid condition: ${condition}`);
    return false;
  }
}

// ============================================
// 엔딩 체크
// ============================================

export function checkEnding(state: GameState): EndingType | null {
  const { stats } = state.loop;
  const { totalLoops, characterAffinities, discoveredClues } = state.permanent;

  // 나쁜 엔딩 체크 (우선순위 높음)
  if (stats.health <= 0) return 'HOSPITALIZED';
  if (stats.mental <= 0) return 'BURNOUT';
  if (stats.reputation <= 0) return 'FIRED';

  // 비밀 엔딩
  const hasAllMainClues = [
    'clue_project_name',
    'clue_player_file',
    'clue_junhyuk_100_loops',
    'clue_escape_condition',
  ].every(id => discoveredClues.some(c => c.id === id));

  if (hasAllMainClues && totalLoops >= 25) {
    return 'SECRET';
  }

  // 사랑 엔딩
  const jihyunAffinity = characterAffinities.yoon_jihyun?.level ?? 0;
  const junhyukAffinity = characterAffinities.park_junhyuk?.level ?? 0;

  if (jihyunAffinity >= 80 || junhyukAffinity >= 80) {
    return 'LOVE';
  }

  // 창업 엔딩
  const seunghoAffinity = characterAffinities.lee_seungho?.level ?? 0;
  if (seunghoAffinity >= 70 && state.loop.flags.encouraged_seungho_startup) {
    return 'STARTUP';
  }

  // 승진 엔딩
  if (stats.reputation >= 90) {
    return 'PROMOTION';
  }

  // 부자 엔딩
  if (stats.money >= 100000000) { // 1억
    return 'RICH';
  }

  // 깨달음 엔딩
  if (totalLoops >= 30 && stats.mental >= 80) {
    return 'ENLIGHTENED';
  }

  // 탈출 엔딩 (기본)
  const hasEscapeConditions =
    discoveredClues.some(c => c.id === 'clue_escape_condition') &&
    characterAffinities.kim_donghyun?.level >= 60;

  if (hasEscapeConditions && totalLoops >= 15) {
    return 'ESCAPE';
  }

  return null; // 아직 엔딩 조건 미충족
}
