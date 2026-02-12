# 단서 시스템

## 개요

단서(Clue)는 미스터리 해결의 핵심. 수집하고, 분석하고, 제시하여 진실에 다가감.

---

## 단서 유형

### 물리적 증거 (Physical)

실물로 존재하는 단서.

```yaml
type: physical
examples:
  - 메모, 편지
  - 사진, 문서
  - 카드키, 열쇠
  - 영수증, 명함
```

### 증언 (Testimony)

캐릭터의 발언에서 얻는 정보.

```yaml
type: testimony
examples:
  - 동료의 말
  - 바리스타의 소문
  - 부장의 통화 내용
```

### 관찰 (Observation)

플레이어가 직접 목격한 것.

```yaml
type: observation
examples:
  - 부장의 행동 패턴
  - 12층 불빛
  - 준혁의 반응
```

### 기억 (Memory)

이전 루프에서 얻은 정보.

```yaml
type: memory
examples:
  - "어제" 있었던 일
  - 반복되는 패턴
  - 실패한 시도
```

---

## 단서 상태

```yaml
clue_states:
  undiscovered:
    label: "미발견"
    visible: false

  discovered:
    label: "발견"
    visible: true
    analyzed: false

  analyzed:
    label: "분석됨"
    visible: true
    analyzed: true
    usable: true
```

---

## 단서 목록

### 핵심 단서 (Main Clues)

| ID | 이름 | 유형 | 발견 조건 |
|----|------|------|-----------|
| `clue_12f_rumor` | 12층 소문 | 증언 | 바리스타 대화 |
| `clue_boss_call` | 부장의 통화 | 관찰 | 옥상 엿듣기 |
| `clue_boss_schedule` | 부장 일정 | 물리 | 책상 조사 |
| `clue_project_name` | 프로젝트 이름 | 물리 | 12층 탐색 |
| `clue_junhyuk_100` | 준혁의 비밀 | 증언 | 야간 대화 |
| `clue_player_file` | 내 파일 | 물리 | 12층 자료실 |

### 보조 단서 (Sub Clues)

| ID | 이름 | 유형 | 용도 |
|----|------|------|------|
| `clue_keycard` | 12층 카드키 | 물리 | 접근 수단 |
| `clue_password` | 비밀번호 | 기억 | PC 접근 |
| `clue_timeline` | 부장 타임라인 | 관찰 | 미행 정보 |

---

## 단서 수집

### 수집 방법

```yaml
collection_methods:
  - type: "탐색"
    description: "장소 조사"
    example: "부장 책상을 살펴본다"

  - type: "대화"
    description: "NPC와 대화"
    example: "바리스타에게 물어본다"

  - type: "관찰"
    description: "행동 관찰"
    example: "부장을 미행한다"

  - type: "연결"
    description: "기존 단서 조합"
    example: "일정표 + 통화 내용"
```

### 수집 조건

```yaml
clue_example:
  id: "clue_boss_memo"
  name: "부장의 메모"
  type: "physical"

  discovery:
    location: "office"
    time: "14:30~16:30"  # 부장 자리 비움
    action: "책상 조사"
    risk: "high"  # 발각 위험

  content: |
    "PM 진행 상황 보고 - 금일 17:00"
    "대상 #042 모니터링 강화"

  leads_to:
    - "clue_project_name"
    - "clue_player_file"
```

---

## 단서장 (Clue Log)

### UI 구조

```
┌─────────────────────────────────────┐
│           📋 단서장                  │
├─────────────────────────────────────┤
│  [물리적 증거]  [증언]  [관찰]       │
├─────────────────────────────────────┤
│                                      │
│  📄 부장의 메모                       │
│     "PM 진행 상황 보고..."            │
│     발견: 7층 사무실                  │
│     ─────────────────                │
│  📄 12층 카드키                       │
│     12층 연구소 출입 가능             │
│     발견: 야간 조사                   │
│     ─────────────────                │
│  💬 바리스타의 소문                   │
│     "12층에 뭔가 이상해요..."         │
│     출처: 정수빈                      │
│                                      │
├─────────────────────────────────────┤
│        수집: 5 / 15                  │
└─────────────────────────────────────┘
```

### 단서 상세 보기

```yaml
clue_detail_view:
  header:
    - 아이콘 (유형별)
    - 이름
    - 상태 (분석됨/미분석)

  body:
    - 내용 (텍스트/이미지)
    - 발견 장소
    - 발견 시간
    - 관련 인물

  footer:
    - 관련 단서 (연결)
    - 사용 가능 여부
```

---

## 증거 제시 시스템

### 제시 타이밍

대화 중 **[증거 제시]** 선택지가 등장할 때.

```yaml
evidence_prompt:
  trigger: "특정 대화 노드"
  ui:
    - "증거를 제시하시겠습니까?"
    - "[예] → 단서장 열기"
    - "[아니오] → 대화 계속"
```

### 올바른 증거 제시

```yaml
correct_evidence:
  scene: "boss_confrontation"
  required: "clue_project_name"

  result:
    dialogue: |
      당신은 문서를 내밀었다.
      "이게 뭐죠, 부장님?"

      김부장의 표정이 굳는다.
      "...어디서 이걸..."

    effect:
      - "진실 공개 진행"
      - "호감도 변화 (관계에 따라)"
```

### 잘못된 증거 제시

```yaml
wrong_evidence:
  result:
    dialogue: |
      김부장이 고개를 갸웃한다.
      "이게 뭐랑 관련 있다는 거지?"

      어색한 침묵.

    effect:
      - 호감도 -5
      - 시간 소모
      - 해당 대화 실패
```

---

## 단서 연결

### 연결 시스템

관련 단서들을 조합하여 새로운 통찰 획득.

```yaml
clue_connection:
  clue_a: "clue_boss_schedule"
  clue_b: "clue_boss_call"

  connection:
    id: "insight_boss_12f"
    name: "부장과 12층의 관계"
    content: |
      부장은 매일 17:00에 12층에 간다.
      통화 내용으로 보아 프로젝트 관련.

  unlocks:
    - 미행 선택지
    - 12층 관련 질문
```

### 자동 연결 vs 수동 연결

```yaml
connection_modes:
  auto:
    description: "조건 충족 시 자동 연결"
    example: "두 단서 모두 발견 시"

  manual:
    description: "플레이어가 직접 연결"
    example: "단서장에서 두 단서 선택"
```

---

## 힌트 시스템

### 막혔을 때

```yaml
hint_system:
  trigger: "같은 씬 3회 이상 방문"

  levels:
    - level: 1
      content: "방향 힌트"
      cost: "무료 (1일 1회)"
      example: "옥상에서 뭔가 단서가..."

    - level: 2
      content: "구체적 힌트"
      cost: "광고 1회"
      example: "부장이 자리 비울 때 책상을..."

    - level: 3
      content: "정답"
      cost: "광고 2회"
      example: "14:30에 부장 책상의 메모를 확인하세요"
```

---

## 데이터 구조

```typescript
interface Clue {
  id: string;
  name: string;
  type: 'physical' | 'testimony' | 'observation' | 'memory';

  // 발견 조건
  discovery: {
    location: string;
    time?: string;
    character?: string;
    conditions?: string[];
  };

  // 내용
  content: string;
  image?: string;

  // 상태
  state: 'undiscovered' | 'discovered' | 'analyzed';

  // 연결
  relatedClues?: string[];
  leadsTo?: string[];
}

interface ClueSystem {
  clues: Map<string, Clue>;

  discover(clueId: string): void;
  analyze(clueId: string): void;
  connect(clueA: string, clueB: string): Insight | null;
  present(clueId: string, sceneId: string): PresentResult;
}
```

---

## 단서 목록 전체

### 카테고리별

```yaml
clues_by_category:
  project_monday:
    - clue_project_name
    - clue_experiment_log
    - clue_subject_list
    - clue_escape_condition

  boss_related:
    - clue_boss_memo
    - clue_boss_schedule
    - clue_boss_call
    - clue_boss_role

  junhyuk_related:
    - clue_junhyuk_note
    - clue_junhyuk_100_loops
    - clue_junhyuk_first

  player_related:
    - clue_player_file
    - clue_player_selection
    - clue_player_past

  items:
    - clue_keycard_12f
    - clue_password
```
