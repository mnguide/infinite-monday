# 대화 시스템

## 개요

게임의 주요 표현 수단. 나레이션, NPC 대사, 선택지로 구성.

---

## 대화 구조

### 씬 구조

```yaml
scene:
  id: "scene_cafe_jihyun"
  location: "cafe"
  time_cost: 30

  # 내용
  description: |
    카페에 들어서자 지현이 창가에 앉아있다.
    무언가 생각에 잠긴 표정.

  dialogue:
    - speaker: "narrator"
      text: "커피 향이 은은하게 퍼진다."

    - speaker: "jihyun"
      text: "어? 오빠 여기 웬일이에요?"
      mood: "surprised"

  choices:
    - text: "커피 마시러 왔지"
      effect: null
      next: "scene_cafe_jihyun_casual"

    - text: "지현씨 보러 왔지"
      effect:
        affinity: { jihyun: +5 }
      next: "scene_cafe_jihyun_flirt"
```

### 대화 노드

```yaml
dialogue_node:
  speaker: "character_id" | "narrator" | "player"
  text: "대사 내용"
  mood: "emotion"  # 선택
  animation: "animation_id"  # 선택
```

---

## 화자 유형

### 나레이터 (Narrator)

2인칭 시점의 상황 묘사.

```yaml
narrator_style:
  tense: "현재형 또는 과거형"
  person: "2인칭 (당신/너)"

examples:
  - "당신은 사무실에 들어섰다."
  - "익숙한 키보드 소리가 들린다."
  - "창밖으로 노을이 보인다."
```

### NPC

각 캐릭터의 개성을 반영한 대사.

```yaml
npc_styles:
  kim_donghyun:
    tone: "권위적, 짧음"
    examples:
      - "보고서 확인했나?"
      - "오늘 일정 변동 없다."

  yoon_jihyun:
    tone: "밝음, 친근함"
    honorific: "~요"
    examples:
      - "오빠, 점심 뭐 먹어요?"
      - "커피 한 잔 할래요?"

  park_junhyuk:
    tone: "과묵, 짧음"
    examples:
      - "...네."
      - "알겠습니다."
```

### 플레이어 (내적 독백)

```yaml
player_thoughts:
  style: "1인칭, 내면"
  examples:
    - "...뭔가 이상해."
    - "이 사람, 뭔가 숨기고 있어."
    - "오늘은 다르게 해보자."
```

---

## 선택지 시스템

### 선택지 구조

```yaml
choice:
  text: "선택지 텍스트"
  condition: "표시 조건"  # 선택
  effect: "선택 효과"
  next: "다음 씬 ID"
```

### 선택지 유형

```yaml
choice_types:
  # 기본 선택
  basic:
    text: "그냥 가볍게 인사한다"
    effect: null

  # 효과 있는 선택
  effective:
    text: "커피를 사준다"
    effect:
      money: -4000
      affinity: { jihyun: +5 }

  # 조건부 선택
  conditional:
    text: "[호감도 50+] 솔직하게 말한다"
    condition: "jihyun >= 50"
    effect:
      affinity: { jihyun: +10 }

  # 스킵 선택
  skip:
    text: "[스킵] 이미 알고 있는 내용이다"
    condition: "loop >= 5 && scene_seen"
    effect:
      time: -15  # 시간 단축
```

### 숨겨진 선택지

```yaml
hidden_choices:
  unlock_conditions:
    - "특정 단서 보유"
    - "특정 호감도 달성"
    - "특정 루프 수 도달"
    - "특정 플래그 활성화"

  example:
    text: "[???] 12층에 대해 묻는다"
    condition: "clue_12f_rumor && loop >= 7"
    visible_when_locked: false
```

---

## 증거 제시

### 제시 프롬프트

```yaml
evidence_prompt:
  trigger: "특정 대화 노드"
  ui:
    prompt: "증거를 제시하시겠습니까?"
    options:
      - "[예] 단서장 열기"
      - "[아니오] 계속"
```

### 증거 판정

```yaml
evidence_check:
  scene: "boss_confrontation"
  expected: "clue_project_name"

  correct:
    reaction: "shocked"
    dialogue: "...어디서 이걸..."
    next: "boss_confrontation_success"

  wrong:
    reaction: "confused"
    dialogue: "이게 뭐랑 관련 있다는 거지?"
    effect:
      affinity: { kim_donghyun: -5 }
      time: +10
    next: "boss_confrontation_fail"
```

---

## 감정 표현

### 감정 태그

```yaml
moods:
  neutral: "평범"
  happy: "기쁨"
  sad: "슬픔"
  angry: "화남"
  surprised: "놀람"
  confused: "혼란"
  nervous: "긴장"
  embarrassed: "부끄러움"
  thoughtful: "생각"
```

### 감정 연출 (텍스트)

```yaml
mood_expressions:
  happy:
    prefix: "(웃으며)"
    suffix: ""

  sad:
    prefix: "(눈을 내리깔며)"
    suffix: ""

  nervous:
    prefix: "(조심스럽게)"
    suffix: ""

example:
  speaker: "jihyun"
  text: "오빠... 나, 할 말이 있어요."
  mood: "nervous"
  # → "(조심스럽게) 오빠... 나, 할 말이 있어요."
```

---

## 분기 시스템

### 조건 분기

```yaml
conditional_dialogue:
  check: "jihyun >= 50"

  if_true:
    - speaker: "jihyun"
      text: "오빠, 사실..."
      next: "jihyun_secret"

  if_false:
    - speaker: "jihyun"
      text: "아, 아무것도 아니에요."
      next: "jihyun_normal"
```

### 변수 삽입

```yaml
variable_insertion:
  text: "{player_name}씨, 고마워요."
  variables:
    player_name: state.playerName

  text: "벌써 {loop_count}번째 월요일이야..."
  variables:
    loop_count: state.totalLoops
```

---

## UI 레이아웃

### 대화 화면

```
┌─────────────────────────────────────┐
│  [장소: 카페]     [시간: 13:00]      │
├─────────────────────────────────────┤
│                                      │
│  카페에 들어서자 지현이              │
│  창가에 앉아있다.                    │
│                                      │
│  ┌───────────────────────────────┐  │
│  │       윤지현                  │  │
│  │  "어? 오빠 여기 웬일이에요?"  │  │
│  └───────────────────────────────┘  │
│                                      │
├─────────────────────────────────────┤
│  ┌───────────────────────────────┐  │
│  │  커피 마시러 왔지             │  │
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │  지현씨 보러 왔지             │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

### 텍스트 표시

```yaml
text_display:
  typing_speed: "즉시 또는 타이핑 효과"
  auto_proceed: false
  tap_to_proceed: true
  max_lines: 4
```

---

## 데이터 구조

```typescript
interface DialogueNode {
  speaker: 'narrator' | 'player' | string;  // string = characterId
  text: string;
  mood?: Mood;
  animation?: string;
}

interface Choice {
  text: string;
  condition?: string;  // 조건 표현식
  effect?: Effect;
  next: string;  // 다음 씬 ID
}

interface Scene {
  id: string;
  location: string;
  timeCost: number;

  description?: string;
  dialogue?: DialogueNode[];
  choices: Choice[];

  // 조건
  condition?: string;
  onEnter?: Effect;
  onExit?: Effect;
}
```

---

## 작성 가이드라인

### 대사 작성 원칙

1. **간결하게**: 모바일 화면 고려, 3줄 이내
2. **캐릭터답게**: 각 캐릭터의 말투 유지
3. **정보 제공**: 불필요한 대사 최소화
4. **감정 전달**: 행동/표정 묘사 활용

### 선택지 작성 원칙

1. **명확한 차이**: 선택의 결과 예측 가능
2. **의미 있는 선택**: 실제로 영향을 주는 선택
3. **플레이어 의도 반영**: 다양한 플레이 스타일
4. **숨겨진 선택의 가치**: 발견의 재미
