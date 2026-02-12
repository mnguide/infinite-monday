# 호감도 시스템

## 개요

캐릭터와의 관계를 수치화. 호감도에 따라 대화, 이벤트, 엔딩이 변화.

---

## 기본 규칙

### 호감도 범위

| 범위 | 단계 | 설명 |
|------|------|------|
| -100 ~ -50 | 적대 | 대화 거부, 방해 |
| -49 ~ -1 | 경계 | 차가운 반응 |
| 0 ~ 19 | 중립 | 기본 상태 |
| 20 ~ 39 | 호의 | 친절한 반응 |
| 40 ~ 59 | 친밀 | 개인적 대화 가능 |
| 60 ~ 79 | 신뢰 | 비밀 공유 |
| 80 ~ 100 | 깊은 유대 | 특별 이벤트 |

### 루프 간 유지

호감도는 **영구 데이터**로 루프 간 유지됨.

```yaml
persistence:
  type: "permanent"
  reset: false  # 루프 리셋되지 않음

  narrative_explanation: |
    NPC는 플레이어를 기억하지 못하지만,
    플레이어의 "인상"은 무의식적으로 남아있음.

  game_expression:
    high: "왠지 모르게 이 사람한테 호감이 간다."
    low: "왠지 모르게 이 사람이 불편하다."
```

---

## 캐릭터별 초기값

| 캐릭터 | 초기 호감도 | 특성 |
|--------|-------------|------|
| 김동현 | 0 | 올리기 어려움 |
| 이승호 | 15 | 기본 호의적 |
| 윤지현 | 10 | 친해지기 쉬움 |
| 박준혁 | 5 | 마음 열기 어려움 |
| 최민수 | 20 | 열정적 존경 |

---

## 호감도 변화

### 증가 요인

| 행동 | 변화량 | 예시 |
|------|--------|------|
| 인사/대화 | +1~3 | 일상적 대화 |
| 도움 | +5~10 | 업무 도움, 위로 |
| 선물 | +3~8 | 커피 사주기 |
| 비밀 공유 | +10~15 | 고민 들어주기 |
| 함께 시간 | +3~5 | 점심, 커피 |
| 정확한 이해 | +5~10 | 공감, 맞는 말 |

### 감소 요인

| 행동 | 변화량 | 예시 |
|------|--------|------|
| 무시 | -3~5 | 대화 거절 |
| 실수 | -5~10 | 잘못된 선택 |
| 거짓말 | -10~20 | 발각 시 |
| 배신 | -30~50 | 비밀 누설 등 |
| 잘못된 증거 | -5~10 | 틀린 증거 제시 |

---

## 단계별 해금

### 김동현 (부장)

```yaml
kim_donghyun:
  0_20:
    reaction: "업무적 대화만"
    unlocks: []

  20_40:
    reaction: "가끔 인간적인 면"
    unlocks:
      - event: "boss_coffee_thanks"

  40_60:
    reaction: "고민을 내비침"
    unlocks:
      - event: "boss_overtime_talk"
      - clue: "clue_boss_stress"

  60_80:
    reaction: "진심을 털어놓음"
    unlocks:
      - event: "boss_rooftop_truth"
      - clue: "clue_boss_role_hint"

  80_100:
    reaction: "협력 가능"
    unlocks:
      - route: "boss_cooperation"
      - item: "clue_keycard_12f"
```

### 윤지현 (대리)

```yaml
yoon_jihyun:
  0_20:
    reaction: "밝고 친절"
    unlocks:
      - event: "jihyun_greeting"

  20_40:
    reaction: "친한 동료"
    unlocks:
      - event: "jihyun_lunch_together"
      - event: "jihyun_coffee"

  40_60:
    reaction: "마음을 열기 시작"
    unlocks:
      - event: "jihyun_cafe_talk"
      - clue: "clue_jihyun_worry"

  60_80:
    reaction: "솔직한 감정"
    unlocks:
      - event: "jihyun_rooftop_sunset"
      - flag: "romance_route_available"

  80_100:
    reaction: "사랑"
    unlocks:
      - event: "jihyun_confession"
      - ending: "LOVE"
```

### 박준혁 (사원)

```yaml
park_junhyuk:
  0_20:
    reaction: "무심함"
    unlocks: []

  20_40:
    reaction: "조금 열림"
    unlocks:
      - event: "junhyuk_game_talk"

  40_60:
    reaction: "의미심장한 말"
    unlocks:
      - event: "junhyuk_strange_words"
      - clue: "clue_junhyuk_hint"

  60_80:
    reaction: "진실 공유"
    unlocks:
      - event: "junhyuk_night_talk"
      - clue: "clue_junhyuk_100_loops"

  80_100:
    reaction: "동지/연인"
    unlocks:
      - route: "junhyuk_cooperation"
      - ending: "ESCAPE_TOGETHER"
```

---

## 호감도 UI

### 표시 방식

```
┌─────────────────────────────────────┐
│         💛 관계                      │
├─────────────────────────────────────┤
│  김동현 (부장)                        │
│  [░░░░░░░░░░] 중립                   │
│                                      │
│  윤지현 (대리)                        │
│  [████████░░] 신뢰                   │
│                                      │
│  박준혁 (사원)                        │
│  [██░░░░░░░░] 호의                   │
│                                      │
│  이승호 (과장)                        │
│  [███████░░░] 친밀                   │
│                                      │
│  최민수 (인턴)                        │
│  [█████░░░░░] 친밀                   │
└─────────────────────────────────────┘
```

### 숨기는 정보

- 정확한 수치 (플레이어에게 보이지 않음)
- 다음 단계 조건
- 해금 이벤트 목록

---

## 대화 분기

### 호감도에 따른 대사 변화

```yaml
dialogue_variation:
  character: "kim_donghyun"
  trigger: "아침 인사"

  variations:
    low:  # 0~30
      text: "..."
      attitude: "무시"

    mid:  # 31~60
      text: "응, 아침."
      attitude: "무난"

    high:  # 61~100
      text: "왔어? 오늘도 화이팅."
      attitude: "친근"
```

### 선택지 해금

```yaml
choice_unlock:
  scene: "cafeteria_lunch"

  choices:
    - text: "팀과 함께 먹는다"
      condition: null  # 항상

    - text: "지현과 둘이 먹는다"
      condition: "jihyun >= 30"

    - text: "준혁과 대화한다"
      condition: "junhyuk >= 40"
```

---

## 특수 관계

### 로맨스 플래그

```yaml
romance_flags:
  jihyun_romance:
    requirement: "jihyun >= 60"
    events:
      - "jihyun_rooftop_sunset"
      - "jihyun_confession"
    ending: "LOVE"

  junhyuk_romance:  # 선택적 로맨스
    requirement: "junhyuk >= 70"
    events:
      - "junhyuk_bond"
      - "junhyuk_confession"
    ending: "LOVE_JUNHYUK"
```

### 적대 관계

```yaml
antagonist_flags:
  boss_enemy:
    trigger: "kim_donghyun <= -30"
    effects:
      - "부장이 적극적으로 방해"
      - "12층 접근 더 어려워짐"
      - "해고 엔딩 위험 증가"
```

---

## 데이터 구조

```typescript
interface CharacterAffinity {
  characterId: string;
  level: number;  // -100 ~ 100
  unlockedEvents: string[];
  flags: Record<string, boolean>;
}

interface AffinitySystem {
  affinities: Map<string, CharacterAffinity>;

  // 호감도 조작
  modify(characterId: string, delta: number): void;
  get(characterId: string): number;
  getStage(characterId: string): AffinityStage;

  // 해금 체크
  checkEventUnlock(eventId: string): boolean;
  checkChoiceUnlock(choiceId: string): boolean;

  // 영구 저장
  save(): CharacterAffinity[];
  load(data: CharacterAffinity[]): void;
}
```

---

## 밸런스 원칙

### 호감도 획득 속도

- 한 루프에 최대 +30 정도
- 80+ 도달에 3~5 루프 필요
- 너무 쉬우면 의미 없음
- 너무 어려우면 답답함

### 감소 리스크

- 잘못된 선택에 페널티 있지만
- 회복 불가능할 정도는 아님
- 극단적 배신만 큰 감소
