# 무한 월요일 (Infinite Monday)

토스 미니앱으로 만든 텍스트 기반 타임루프 RPG 게임

## 게임 소개

> 어느 월요일 아침, 알람 소리에 눈을 떴다.
> 출근하고, 일하고, 퇴근했다.
> 다음 날 아침... 또 월요일이다.
>
> 당신은 이 무한 월요일에서 탈출해야 한다.

### 특징

- **타임루프 시스템**: 같은 월요일이 반복되며, 매번 다른 선택이 다른 결과를 만듭니다
- **10개의 엔딩**: 승진, 사랑, 창업, 번아웃 등 다양한 결말을 수집하세요
- **스탯 관리**: 체력, 멘탈, 평판, 돈을 관리하며 최적의 하루를 보내세요
- **영구 진행**: 루프를 반복할수록 새로운 선택지와 스토리가 해금됩니다

## 기술 스택

- **프레임워크**: React 18 + TypeScript
- **빌드 도구**: Vite
- **상태 관리**: Zustand
- **토스 SDK**: @apps-in-toss/web-framework

## 프로젝트 구조

```
src/
├── components/       # React 컴포넌트
│   ├── Game.tsx          # 메인 게임 컨테이너
│   ├── Header.tsx        # 시간/루프 표시
│   ├── StatsBar.tsx      # 스탯 바
│   ├── SceneDisplay.tsx  # 씬 텍스트 표시
│   ├── ChoiceButtons.tsx # 선택지 버튼
│   ├── EndingScreen.tsx  # 엔딩 화면
│   └── CollectionModal.tsx # 엔딩 컬렉션
├── store/
│   └── gameStore.ts  # Zustand 상태 관리
├── data/
│   └── scenes.ts     # 게임 씬/스토리 데이터
├── hooks/
│   └── useTossGame.ts # 토스 SDK 연동 훅
├── types/
│   └── game.ts       # 타입 정의
└── styles/
    └── index.css     # 전역 스타일
```

## 개발 환경 설정

```bash
# 의존성 설치
yarn install

# 개발 서버 실행 (일반 웹 개발)
yarn dev

# 토스 샌드박스 연동 개발
yarn dev  # granite dev 실행
```

## 토스 미니앱 배포

```bash
# 빌드
yarn build

# 배포
yarn deploy  # ait deploy 실행
```

## 게임 엔딩 목록

| 엔딩 | 조건 |
|------|------|
| 화요일 | 완벽한 하루를 보내기 |
| 승진 | 높은 평판 유지 |
| 사랑 | 특별한 사람과의 관계 |
| 창업 | 퇴사 후 새로운 시작 |
| 부자 | 반복되는 정보 활용 |
| 깨달음 | 모든 진리 발견 |
| 번아웃 | 멘탈 소진 |
| 입원 | 체력 소진 |
| 해고 | 평판 추락 |
| ??? | 모든 엔딩 달성 |

## 라이선스

MIT
