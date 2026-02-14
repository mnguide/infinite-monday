# 무한 월요일 (Infinite Monday)

> **토스 미니앱으로 만든 텍스트 기반 타임루프 RPG 게임**

---

## 게임 소개

```
어느 월요일 아침, 알람 소리에 눈을 떴다.
출근하고, 일하고, 퇴근했다.
다음 날 아침... 또 월요일이다.

당신은 이 무한 월요일에서 탈출해야 한다.
```

### 특징

| | 특징 | 설명 |
|---|---|---|
| :arrows_counterclockwise: | **타임루프** | 같은 월요일이 반복되며, 매번 다른 선택이 다른 결과를 만듭니다 |
| :trophy: | **10개의 엔딩** | 승진, 사랑, 창업, 번아웃 등 다양한 결말을 수집하세요 |
| :bar_chart: | **스탯 관리** | 체력, 멘탈, 평판, 돈을 관리하며 최적의 하루를 보내세요 |
| :unlock: | **영구 진행** | 루프를 반복할수록 새로운 선택지와 스토리가 해금됩니다 |

---

## 기술 스택

| 분류 | 기술 |
|---|---|
| 프레임워크 | React 18 + TypeScript |
| 빌드 도구 | Vite + SWC |
| 상태 관리 | Zustand |
| 스타일 | Pure CSS (다크 테마, 모바일 퍼스트) |
| 플랫폼 | 토스 미니앱 (@apps-in-toss/web-framework) |

---

## 시작하기

### 사전 요구사항

- Node.js 18+
- npm

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (localhost:5173)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview

# 린트 실행
npm run lint

# 토스 배포
npm run deploy
```

---

## 프로젝트 구조

```
src/
├── components/          # React 컴포넌트
│   ├── Game.tsx             # 메인 게임 컨테이너
│   ├── Header.tsx           # 시간/루프 표시
│   ├── StatsBar.tsx         # 스탯 바
│   ├── SceneDisplay.tsx     # 씬 텍스트 표시
│   ├── ChoiceButtons.tsx    # 선택지 버튼
│   ├── EndingScreen.tsx     # 엔딩 화면
│   └── CollectionModal.tsx  # 엔딩 컬렉션
├── store/
│   └── gameStore.ts         # Zustand 상태 관리
├── data/
│   └── scenes.ts            # 게임 씬/스토리 데이터
├── hooks/
│   └── useTossGame.ts       # 토스 SDK 연동 훅
├── types/
│   └── game.ts              # 타입 정의
└── styles/
    └── index.css            # 전역 스타일 (다크 테마)
```

### 컴포넌트 흐름

```
App.tsx → Game.tsx
           ├── Header.tsx         (시간, 루프 카운트)
           ├── StatsBar.tsx       (체력, 멘탈, 평판, 돈)
           ├── SceneDisplay.tsx   (씬 텍스트)
           ├── ChoiceButtons.tsx  (플레이어 선택지)
           ├── EndingScreen.tsx   (엔딩 도달 시)
           └── CollectionModal.tsx(엔딩 컬렉션)
```

---

## 게임 엔딩

총 **10개**의 엔딩을 수집할 수 있습니다.

| | 엔딩 | 힌트 |
|---|---|---|
| :sun_with_face: | 화요일 | 완벽한 하루를 보내기 |
| :briefcase: | 승진 | 높은 평판 유지 |
| :heart: | 사랑 | 특별한 사람과의 관계 |
| :rocket: | 창업 | 퇴사 후 새로운 시작 |
| :moneybag: | 부자 | 반복되는 정보 활용 |
| :sparkles: | 깨달음 | 모든 진리 발견 |
| :fire: | 번아웃 | 멘탈 소진 |
| :hospital: | 입원 | 체력 소진 |
| :x: | 해고 | 평판 추락 |
| :question: | ??? | 모든 엔딩 달성 |

---

## 라이선스

MIT
