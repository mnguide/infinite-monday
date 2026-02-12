# UI/UX 설계

## 개요

"무한 월요일"의 UI/UX 설계 문서. 모바일 최적화, 다크 모드 기본.

---

## 디자인 원칙

### 1. 모바일 퍼스트

- 세로 레이아웃 (Portrait)
- 최대 너비 480px
- 엄지 영역 고려 (하단 선택지)
- 터치 타겟 44px 이상

### 2. 텍스트 중심

- 이미지보다 텍스트로 표현
- 가독성 최우선
- 감정은 대사와 묘사로

### 3. 레트로 감성

- 픽셀 폰트 활용
- 미니멀한 아이콘
- 게임기 느낌의 UI

### 4. 다크 모드

- 어두운 배경 기본
- 눈의 피로 감소
- 게임 분위기와 부합

---

## 컬러 팔레트

### 기본 색상

```yaml
colors:
  # 배경
  bg_primary: "#1A1A2E"      # 메인 배경
  bg_secondary: "#16213E"    # 서브 배경
  bg_elevated: "#0F3460"     # 카드/팝업

  # 텍스트
  text_primary: "#FFFFFF"    # 본문
  text_secondary: "#B4B4B4"  # 부가 정보
  text_accent: "#FFD700"     # 강조

  # 강조
  accent_primary: "#E94560"  # 주요 액션
  accent_secondary: "#3498DB" # 링크/정보
  accent_success: "#2ECC71"  # 성공/긍정
  accent_warning: "#F39C12"  # 경고
  accent_danger: "#E74C3C"   # 위험/오류

  # 스탯 바
  stat_health: "#E74C3C"     # 체력 (빨강)
  stat_mental: "#9B59B6"     # 멘탈 (보라)
  stat_reputation: "#F1C40F" # 평판 (노랑)
  stat_money: "#2ECC71"      # 돈 (녹색)
```

### 시간대별 테마

```yaml
time_themes:
  morning:
    bg_overlay: "rgba(255, 200, 100, 0.1)"  # 따뜻한 아침
  afternoon:
    bg_overlay: "rgba(100, 150, 255, 0.1)"  # 나른한 오후
  evening:
    bg_overlay: "rgba(150, 100, 200, 0.1)"  # 노을 저녁
  night:
    bg_overlay: "rgba(0, 0, 50, 0.2)"       # 어두운 밤
```

---

## 타이포그래피

### 폰트 패밀리

```yaml
fonts:
  display:
    name: "Galmuri11"
    use: "제목, 강조, 숫자"
    fallback: "system-ui"

  body:
    name: "Pretendard"
    use: "본문, 대화"
    fallback: "Apple SD Gothic Neo, sans-serif"

  mono:
    name: "Galmuri11"
    use: "시간, 스탯"
    fallback: "monospace"
```

### 폰트 크기

```yaml
font_sizes:
  xs: "12px"    # 부가 정보
  sm: "14px"    # 캡션
  base: "16px"  # 본문
  lg: "18px"    # 강조
  xl: "20px"    # 소제목
  2xl: "24px"   # 제목
  3xl: "32px"   # 대제목
```

### 줄 간격

```yaml
line_heights:
  tight: 1.25   # 제목
  normal: 1.5   # 본문
  relaxed: 1.75 # 대화
```

---

## 레이아웃

### 메인 화면 구조

```
┌─────────────────────────────────────┐
│  HEADER (고정)                       │
│  [로고]    [시간]    [루프 카운터]    │
├─────────────────────────────────────┤
│  STATS BAR (고정)                    │
│  ❤️ 85  🧠 72  ⭐ 65  💰 18,500      │
├─────────────────────────────────────┤
│                                      │
│  SCENE CONTENT (스크롤)              │
│                                      │
│  [장소 표시]                         │
│                                      │
│  나레이션/대화 텍스트                 │
│  ...                                 │
│  ...                                 │
│                                      │
├─────────────────────────────────────┤
│  CHOICES (고정)                      │
│  ┌───────────────────────────────┐  │
│  │  선택지 1                      │  │
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │  선택지 2                      │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

### 간격 시스템

```yaml
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
```

---

## 컴포넌트

### 헤더

```yaml
header:
  height: "48px"
  position: "fixed top"
  background: "bg_primary"
  border_bottom: "1px solid rgba(255,255,255,0.1)"

  contents:
    left: "로고/게임명"
    center: "현재 시간"
    right: "LOOP 카운터"
```

### 스탯 바

```yaml
stats_bar:
  height: "40px"
  position: "fixed below header"
  background: "bg_secondary"

  layout: "flex row space-between"
  items:
    - icon: "❤️"
      value: "health"
      color: "stat_health"
    - icon: "🧠"
      value: "mental"
      color: "stat_mental"
    - icon: "⭐"
      value: "reputation"
      color: "stat_reputation"
    - icon: "💰"
      value: "money"
      color: "stat_money"
```

### 씬 콘텐츠

```yaml
scene_content:
  padding: "md"
  background: "transparent"

  location_tag:
    position: "top-left"
    style: "chip"
    font: "Galmuri11"

  text:
    font: "Pretendard"
    size: "base"
    line_height: "relaxed"
    color: "text_primary"

  dialogue:
    speaker:
      font: "Galmuri11"
      size: "sm"
      color: "accent_secondary"
    text:
      margin_top: "xs"
```

### 선택지 버튼

```yaml
choice_button:
  min_height: "48px"
  padding: "md"
  margin_bottom: "sm"
  background: "bg_elevated"
  border_radius: "8px"
  border: "1px solid rgba(255,255,255,0.1)"

  text:
    font: "Pretendard"
    size: "base"
    color: "text_primary"

  states:
    hover:
      background: "accent_primary opacity 0.2"
    pressed:
      background: "accent_primary opacity 0.4"
    disabled:
      opacity: 0.5
      color: "text_secondary"

  conditional:
    prefix: "🔓"  # 조건부 해금
    color: "accent_warning"
```

---

## 모달/팝업

### 단서장

```yaml
clue_log_modal:
  width: "90%"
  max_height: "80vh"
  background: "bg_secondary"
  border_radius: "16px"

  header:
    title: "📋 단서장"
    close_button: true

  tabs:
    - "물리적 증거"
    - "증언"
    - "관찰"

  clue_item:
    icon: "유형별"
    title: "단서 이름"
    preview: "내용 요약..."
    status: "분석됨/미분석"
```

### 엔딩 화면

```yaml
ending_screen:
  fullscreen: true
  background: "gradient or solid"

  content:
    title:
      font: "Galmuri11"
      size: "3xl"
    subtitle:
      size: "lg"
      color: "text_secondary"
    description:
      margin_top: "xl"
      max_width: "300px"

  buttons:
    - "다시 시작"
    - "메인으로"
    - "공유하기"
```

---

## 애니메이션

### 씬 전환

```yaml
scene_transition:
  type: "fade"
  duration: "300ms"
  easing: "ease-in-out"
```

### 루프 전환

```yaml
loop_transition:
  type: "glitch"
  duration: "1000ms"
  effects:
    - "screen_shake"
    - "color_distortion"
    - "static_noise"
```

### 선택지

```yaml
choice_animation:
  enter:
    type: "slide-up"
    stagger: "50ms"
  select:
    type: "scale"
    duration: "150ms"
```

### 스탯 변화

```yaml
stat_change_animation:
  positive:
    type: "bounce"
    color: "accent_success"
  negative:
    type: "shake"
    color: "accent_danger"
```

---

## 화면 목록

### 주요 화면

| 화면 | 파일 | 설명 |
|------|------|------|
| 메인 게임 | `game.md` | 게임 플레이 |
| 타이틀 | `title.md` | 시작 화면 |
| 엔딩 | `ending.md` | 엔딩 도달 |
| 도감 | `collection.md` | 엔딩/단서 목록 |
| 설정 | `settings.md` | 옵션 |

### 모달

| 모달 | 파일 | 설명 |
|------|------|------|
| 단서장 | `clue-log.md` | 수집한 단서 |
| 관계도 | `relationships.md` | 호감도 현황 |
| 힌트 | `hint.md` | 힌트 시스템 |
| 광고 제안 | `ad-prompt.md` | 보상형 광고 |

---

## 반응형

### 브레이크포인트

```yaml
breakpoints:
  sm: "320px"   # 작은 폰
  md: "375px"   # iPhone
  lg: "414px"   # 큰 폰
  xl: "480px"   # 최대 너비
```

### 적응 규칙

```yaml
responsive_rules:
  small_screen:
    font_size: "-1px"
    padding: "-4px"
    button_height: "44px"

  large_screen:
    font_size: "base"
    padding: "md"
    button_height: "48px"
```

---

## 접근성

### 요구사항

```yaml
accessibility:
  # 명암비
  contrast:
    text: "4.5:1 이상"
    large_text: "3:1 이상"

  # 터치 타겟
  touch_target:
    min_size: "44x44px"
    spacing: "8px"

  # 폰트
  font:
    min_size: "14px"
    scalable: true

  # 색상
  color:
    color_blind_safe: true
    not_only_color: true
```

### 구현

- 버튼에 아이콘 + 텍스트
- 스탯은 색상 + 숫자
- 상태는 색상 + 아이콘
