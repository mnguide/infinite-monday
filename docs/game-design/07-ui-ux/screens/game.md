# 게임 메인 화면

## 개요

게임 플레이의 중심 화면. 모든 게임 진행이 이루어지는 곳.

---

## 화면 구조

### 와이어프레임

```
┌─────────────────────────────────────┐ ← 상태바 영역
│ 9:41                    🔋 100%     │    (시스템)
├─────────────────────────────────────┤
│  🌙 무한 월요일    14:30   🔄 7    │ ← 헤더
├─────────────────────────────────────┤
│  ❤️ 85  🧠 72  ⭐ 65  💰 18,500    │ ← 스탯바
├─────────────────────────────────────┤
│                                      │
│  📍 7층 사무실                       │ ← 장소 태그
│                                      │
│  오후 시간이 느리게 흘러간다.         │
│  김부장이 자리를 비웠다.              │ ← 씬 텍스트
│  평소와 다른 기회.                    │
│                                      │
│  ─────────────────────────          │
│                                      │
│  "선배, 부장님 어디 가신 거예요?"     │ ← NPC 대화
│                        - 최민수      │
│                                      │
│                                      │
│                                      │
├─────────────────────────────────────┤
│  ┌───────────────────────────────┐  │
│  │  📋 업무에 집중한다           │  │ ← 선택지
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │  🔍 부장 책상을 살펴본다       │  │
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │  🚶 다른 곳으로 이동한다       │  │
│  └───────────────────────────────┘  │
│                                      │
│  ┌─────┐  ┌─────┐  ┌─────┐         │ ← 퀵 메뉴
│  │ 📋  │  │ 💛  │  │ ⚙️  │         │
│  └─────┘  └─────┘  └─────┘         │
└─────────────────────────────────────┘
```

---

## 영역별 상세

### 헤더 (Header)

```yaml
header:
  height: "48px"
  layout: "flex row space-between"
  padding: "0 16px"
  background: "#1A1A2E"

  left:
    content: "🌙 무한 월요일"
    font: "Galmuri11"
    size: "14px"
    tap_action: "show_menu"

  center:
    content: "{current_time}"  # 14:30
    font: "Galmuri11"
    size: "18px"
    format: "HH:mm"

  right:
    content: "🔄 {loop_count}"  # 🔄 7
    font: "Galmuri11"
    size: "14px"
    tap_action: "show_loop_info"
```

### 스탯바 (Stats Bar)

```yaml
stats_bar:
  height: "40px"
  layout: "flex row space-around"
  padding: "8px 16px"
  background: "#16213E"

  items:
    - icon: "❤️"
      label: "체력"
      value: "{health}"
      max: 100
      color: "#E74C3C"
      bar: true

    - icon: "🧠"
      label: "멘탈"
      value: "{mental}"
      max: 100
      color: "#9B59B6"
      bar: true

    - icon: "⭐"
      label: "평판"
      value: "{reputation}"
      max: 100
      color: "#F1C40F"
      bar: true

    - icon: "💰"
      label: "돈"
      value: "{money}"
      format: "comma"
      color: "#2ECC71"
      bar: false
```

### 씬 콘텐츠 (Scene Content)

```yaml
scene_content:
  layout: "flex column"
  padding: "16px"
  scroll: true
  flex: 1

  location_tag:
    style: "chip"
    icon: "📍"
    text: "{location_name}"
    background: "rgba(255,255,255,0.1)"
    font: "Galmuri11"
    size: "12px"
    margin_bottom: "16px"

  description:
    font: "Pretendard"
    size: "16px"
    line_height: 1.7
    color: "#FFFFFF"
    margin_bottom: "16px"

  dialogue:
    container:
      margin_top: "16px"
      padding: "12px"
      background: "rgba(255,255,255,0.05)"
      border_left: "3px solid {character_color}"
      border_radius: "0 8px 8px 0"

    text:
      font: "Pretendard"
      size: "15px"
      color: "#FFFFFF"
      font_style: "italic"

    speaker:
      font: "Galmuri11"
      size: "12px"
      color: "#B4B4B4"
      margin_top: "8px"
      text_align: "right"
```

### 선택지 영역 (Choices)

```yaml
choices_area:
  layout: "flex column"
  padding: "16px"
  gap: "8px"
  background: "linear-gradient(transparent, #1A1A2E)"

  choice_button:
    min_height: "48px"
    padding: "12px 16px"
    background: "#0F3460"
    border_radius: "8px"
    border: "1px solid rgba(255,255,255,0.1)"

    layout: "flex row align-center"

    icon:
      size: "16px"
      margin_right: "8px"

    text:
      font: "Pretendard"
      size: "15px"
      color: "#FFFFFF"
      flex: 1

    effect_hint:
      font: "Galmuri11"
      size: "11px"
      color: "#B4B4B4"

    states:
      default:
        background: "#0F3460"
      hover:
        background: "#1a4a80"
      pressed:
        background: "#0a2540"
        scale: 0.98
      disabled:
        opacity: 0.5

    conditional:
      prefix_icon: "🔓"
      prefix_color: "#F39C12"
```

### 퀵 메뉴 (Quick Menu)

```yaml
quick_menu:
  layout: "flex row center"
  padding: "8px 16px 24px"
  gap: "16px"

  buttons:
    - icon: "📋"
      label: "단서장"
      action: "open_clue_log"

    - icon: "💛"
      label: "관계"
      action: "open_relationships"

    - icon: "⚙️"
      label: "설정"
      action: "open_settings"

  button_style:
    size: "48px"
    border_radius: "12px"
    background: "rgba(255,255,255,0.1)"
```

---

## 인터랙션

### 선택지 선택

```yaml
choice_selection:
  tap:
    - haptic: "light"
    - animation: "scale 0.98"
    - delay: "100ms"
    - execute_effect: true
    - transition: "fade to next scene"

  long_press:
    - show_effect_preview: true
    - "시간 -30분, 평판 +5"
```

### 텍스트 진행

```yaml
text_progression:
  tap_anywhere:
    - action: "show_next_dialogue"
    - if_no_more: "show_choices"

  auto_mode:
    enabled: false
    delay: "2000ms"
```

### 스탯 변화

```yaml
stat_change:
  positive:
    animation: "bounce + glow"
    color: "#2ECC71"
    duration: "300ms"
    text: "+10 ❤️"

  negative:
    animation: "shake"
    color: "#E74C3C"
    duration: "300ms"
    text: "-15 🧠"
```

---

## 상태별 화면

### 시간 부족 경고

```yaml
time_warning:
  trigger: "time >= 21:00"
  ui:
    header_pulse: true
    time_color: "#F39C12"
    overlay: "subtle orange gradient"
```

### 스탯 위험

```yaml
stat_danger:
  trigger: "any_stat <= 20"
  ui:
    stat_bar_pulse: true
    stat_color: "#E74C3C"
    warning_icon: "⚠️"
```

### 증거 제시 모드

```yaml
evidence_mode:
  trigger: "evidence_prompt"
  ui:
    choices_replaced: true
    clue_log_overlay: true
    prompt: "제시할 증거를 선택하세요"
    cancel_button: true
```

---

## 반응형 조정

### 작은 화면 (320px)

```yaml
small_screen:
  header_height: "44px"
  stats_font: "12px"
  description_font: "15px"
  choice_padding: "10px 14px"
```

### 큰 화면 (414px+)

```yaml
large_screen:
  max_content_width: "480px"
  center_content: true
  larger_margins: true
```
