# 콘텐츠 데이터

## 개요

게임 내 실제 콘텐츠를 YAML 형식으로 정의. 코드가 이 데이터를 읽어 게임을 구동.

---

## 폴더 구조

```
06-content/
├── _index.md (이 파일)
├── scenes/           # 씬 데이터
│   ├── act-1/
│   ├── act-2/
│   ├── act-3/
│   └── act-4/
├── dialogues/        # 대화 데이터
│   ├── kim-donghyun/
│   ├── yoon-jihyun/
│   ├── park-junhyuk/
│   ├── lee-seungho/
│   └── choi-minsoo/
├── events/           # 이벤트 데이터
│   ├── random/
│   └── story/
├── clues/            # 단서 데이터
│   └── clues.yaml
└── items/            # 아이템 데이터
    └── items.yaml
```

---

## 데이터 형식

### 공통 규칙

```yaml
# 모든 파일 상단에 메타 정보
_meta:
  version: "1.0"
  author: "designer"
  updated: "2025-01-29"

# ID는 snake_case
id: "scene_home_morning"

# 참조는 ID 사용
next: "scene_commute"
character: "kim_donghyun"
```

### YAML 스타일

```yaml
# 긴 텍스트는 | 사용
description: |
  여러 줄의
  설명 텍스트

# 조건은 문자열로
condition: "loop >= 5 && jihyun >= 30"

# 배열은 - 사용
choices:
  - text: "선택 1"
  - text: "선택 2"

# 객체는 들여쓰기
effect:
  stats:
    health: -10
    mental: +5
  affinity:
    jihyun: +5
```

---

## 씬 데이터

### 기본 구조

```yaml
# scenes/act-1/home-morning.yaml
id: "scene_home_morning"
location: "home"
time_cost: 0

title: "아침 기상"

description: |
  알람 소리에 눈을 떴다.
  익숙한 천장이 보인다.
  ...또 월요일이다.

choices:
  - text: "일어난다"
    effect:
      time: +30
    next: "scene_home_prepare"

  - text: "5분만 더..."
    effect:
      time: +15
    next: "scene_home_oversleep"

conditions:
  entry: null  # 항상 접근 가능
```

### 조건부 씬

```yaml
id: "scene_rooftop_junhyuk_night"
location: "rooftop"
time_cost: 60

conditions:
  entry:
    - "time >= 22:00"
    - "loop >= 10"
    - "junhyuk >= 60"

title: "야간 옥상"

description: |
  밤하늘 아래 누군가 있다.
  ...준혁이다.

dialogue:
  - speaker: "junhyuk"
    text: "...선배, 오셨군요."
    mood: "calm"

choices:
  - text: "이 시간에 여기서 뭐해?"
    next: "scene_junhyuk_truth_1"

  - text: "날 기다린 거야?"
    next: "scene_junhyuk_truth_direct"
```

---

## 대화 데이터

### 기본 대화

```yaml
# dialogues/yoon-jihyun/greetings.yaml
_meta:
  character: "yoon_jihyun"
  category: "greetings"

dialogues:
  - id: "jihyun_greeting_morning"
    trigger: "time < 12:00"
    affinity_min: 0
    lines:
      - speaker: "jihyun"
        text: "오빠, 안녕하세요!"
        mood: "happy"

  - id: "jihyun_greeting_afternoon"
    trigger: "time >= 12:00 && time < 18:00"
    affinity_min: 0
    lines:
      - speaker: "jihyun"
        text: "오빠, 점심 드셨어요?"
        mood: "neutral"
```

### 호감도별 대화

```yaml
# dialogues/yoon-jihyun/affinity-stages.yaml
affinity_dialogues:
  stage_0_30:
    greeting: "안녕하세요!"
    farewell: "수고하세요~"
    random:
      - "오늘 날씨 좋네요."
      - "회의 잘 끝났어요?"

  stage_30_60:
    greeting: "오빠, 왔어요?"
    farewell: "내일 봐요~"
    random:
      - "오빠 없으면 심심해요."
      - "점심 같이 먹어요!"

  stage_60_plus:
    greeting: "오빠... 보고 싶었어요."
    farewell: "조심히 가요... 보고 싶을 거예요."
    random:
      - "오빠 생각하면 기분 좋아져요."
      - "같이 있으면 시간이 빨리 가요."
```

---

## 이벤트 데이터

### 랜덤 이벤트

```yaml
# events/random/daily.yaml
random_events:
  - id: "event_subway_delay"
    probability: 0.20
    time_range: "07:00~09:00"
    scene:
      title: "지하철 지연"
      description: |
        안내 방송이 울린다.
        "선로 점검으로 인해 열차 운행이 지연되고 있습니다."
      effect:
        time: +15
      choices:
        - text: "기다린다"
          effect:
            time: +15
          next: "scene_commute_delayed"
        - text: "택시를 탄다"
          effect:
            money: -15000
          next: "scene_commute_taxi"

  - id: "event_coffee_spill"
    probability: 0.10
    time_range: "09:00~12:00"
    location: "office"
    scene:
      title: "커피 사고"
      description: |
        누군가와 부딪혀 커피가 쏟아졌다.
        셔츠에 얼룩이 생겼다.
      effect:
        reputation: -5
        mental: -5
```

### 스토리 이벤트

```yaml
# events/story/loop-milestones.yaml
story_events:
  - id: "event_loop_3_realization"
    trigger:
      loop: 3
      one_time: true
    scene:
      id: "scene_loop_realization"
      description: |
        ...이건 꿈이 아니야.
        진짜로 월요일이 반복되고 있어.

        왜? 어떻게?
        도대체 무슨 일이 일어나고 있는 거지?
      effect:
        flags:
          loop_aware: true
```

---

## 단서 데이터

```yaml
# clues/clues.yaml
clues:
  - id: "clue_12f_rumor"
    name: "12층 소문"
    type: "testimony"
    discovery:
      location: "cafe"
      character: "jung_subin"
      conditions:
        - "subin_affinity >= 10"
        - "loop >= 5"
    content: |
      "12층 있잖아요? 거기 뭔가 이상해요."
      "밤에 불이 켜져 있는 거 봤거든요."
    leads_to:
      - "clue_boss_12f_connection"

  - id: "clue_boss_memo"
    name: "부장의 메모"
    type: "physical"
    discovery:
      location: "office"
      time: "14:30~16:30"
      action: "boss_desk_search"
      risk: "high"
    content: |
      "PM 진행 상황 보고 - 금일 17:00"
      "대상 #042 모니터링 강화"
    leads_to:
      - "clue_project_name"
      - "clue_player_file"
```

---

## 아이템 데이터

```yaml
# items/items.yaml
items:
  - id: "item_keycard_12f"
    name: "12층 카드키"
    type: "key"
    description: "12층 연구소 출입이 가능한 카드키"
    obtainable:
      - method: "boss_affinity_80"
        description: "김부장에게 받음"
      - method: "night_office_search"
        description: "야간 사무실 수색"
    usable_at:
      - "floor_12_entrance"

  - id: "item_coffee"
    name: "아메리카노"
    type: "consumable"
    description: "따뜻한 커피"
    effect:
      mental: +5
    cost: 4000
    obtainable:
      - method: "purchase"
        location: "cafe"
```

---

## 데이터 검증

### 필수 필드 체크

```yaml
validation_rules:
  scene:
    required:
      - id
      - location
      - choices
    optional:
      - title
      - description
      - dialogue
      - conditions
      - effect

  clue:
    required:
      - id
      - name
      - type
      - content
      - discovery
```

### ID 참조 체크

모든 참조 ID가 실제로 존재하는지 확인:

- `next` → 씬 ID
- `character` → 캐릭터 ID
- `clue` → 단서 ID
- `location` → 장소 ID

---

## 코드 연동

### 데이터 로딩

```typescript
// 예시: 씬 데이터 로딩
import homeScenes from '@/content/scenes/act-1/*.yaml';

const scenes = new Map<string, Scene>();
for (const scene of homeScenes) {
  scenes.set(scene.id, scene);
}
```

### 조건 평가

```typescript
// 조건 문자열 파싱 및 평가
function evaluateCondition(condition: string, state: GameState): boolean {
  // "loop >= 5 && jihyun >= 30"
  // → state.totalLoops >= 5 && state.affinities.jihyun >= 30
  return parseAndEvaluate(condition, state);
}
```
