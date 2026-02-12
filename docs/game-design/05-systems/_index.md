# 게임 시스템 목록

## 개요

"무한 월요일"의 핵심 게임 시스템 문서.

---

## 시스템 목록

| 시스템 | 파일 | 설명 |
|--------|------|------|
| 시간 | [time.md](./time.md) | 하루 시간 흐름, 시간 소모 |
| 단서 | [clues.md](./clues.md) | 단서 수집, 증거 제시 |
| 호감도 | [affinity.md](./affinity.md) | 캐릭터 관계, 이벤트 해금 |
| 대화 | [dialogue.md](./dialogue.md) | 대화 구조, 선택지 |
| 아이템 | [items.md](./items.md) | 소지품, 사용 |
| 루프 | [loop.md](./loop.md) | 타임루프 메커니즘 |
| 스탯 | [stats.md](./stats.md) | 체력, 멘탈, 평판, 돈 |
| 엔딩 | [endings.md](./endings.md) | 엔딩 조건, 판정 |

---

## 시스템 상호작용

```
                    ┌─────────┐
                    │  루프   │
                    │ (Loop)  │
                    └────┬────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
    ┌─────────┐    ┌─────────┐    ┌─────────┐
    │  시간   │    │  스탯   │    │  단서   │
    │ (Time)  │←──→│ (Stats) │←──→│ (Clues) │
    └────┬────┘    └────┬────┘    └────┬────┘
         │               │               │
         └───────┬───────┴───────┬───────┘
                 │               │
                 ▼               ▼
           ┌─────────┐    ┌─────────┐
           │  대화   │    │ 호감도  │
           │(Dialog) │←──→│(Affinity)│
           └────┬────┘    └────┬────┘
                │               │
                └───────┬───────┘
                        │
                        ▼
                  ┌─────────┐
                  │  엔딩   │
                  │(Ending) │
                  └─────────┘
```

---

## 데이터 흐름

### 루프 내 데이터 (리셋됨)

```yaml
loop_state:
  time: 09:00  # 현재 시간
  stats:
    health: 100
    mental: 80
    reputation: 50
    money: 25000
  flags: {}  # 당일 플래그
  current_scene: "home_morning"
```

### 영구 데이터 (유지됨)

```yaml
permanent_state:
  total_loops: 0
  achieved_endings: []
  unlocked_choices: []
  clues_discovered: []
  character_affinities:
    kim_donghyun: 0
    yoon_jihyun: 0
    park_junhyuk: 0
    lee_seungho: 0
    choi_minsoo: 0
```

---

## 시스템 우선순위

### 게임 진행에 필수

1. **시간 시스템** - 모든 행동의 비용
2. **스탯 시스템** - 상태 관리
3. **대화 시스템** - 게임 표현

### 깊이를 더하는 시스템

4. **호감도 시스템** - 관계 발전
5. **단서 시스템** - 미스터리 핵심
6. **루프 시스템** - 게임 구조

### 보조 시스템

7. **아이템 시스템** - 추가 옵션
8. **엔딩 시스템** - 결말 판정

---

## 구현 참고

### 코드 구조

```
src/
├── types/
│   └── game.ts         # 타입 정의
├── store/
│   └── gameStore.ts    # Zustand 스토어
├── data/
│   ├── scenes.ts       # 씬 데이터
│   ├── characters.ts   # 캐릭터 데이터
│   ├── clues.ts        # 단서 데이터
│   └── items.ts        # 아이템 데이터
└── hooks/
    └── useGame.ts      # 게임 로직 훅
```

### 상태 관리

- **Zustand** 사용
- 단일 스토어 패턴
- 영구/임시 데이터 분리
