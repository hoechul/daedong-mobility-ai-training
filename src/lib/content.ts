export const NAV_LINKS = [
  { href: "#overview", label: "팩트챗 실습" },
  { href: "/studio", label: "챗봇(워크플로우) 실습" },
  { href: "#tools", label: "AI 도구 가이드" },
  { href: "#curriculum", label: "커리큘럼" },
  { href: "#practice", label: "실습 미션" },
  { href: "#tips", label: "활용 팁" },
  { href: "#resources", label: "자료 · 매뉴얼" },
];

export const HERO_STATS = [
  { icon: "⏱️", label: "소요 시간", value: "60분" },
  { icon: "🧩", label: "실습 미션", value: "4개" },
  { icon: "👥", label: "교육 대상", value: "전 부서 임직원" },
  { icon: "💻", label: "준비물", value: "노트북 · 회사 이메일" },
];

export const OVERVIEW_CARDS = [
  {
    icon: "🎯",
    title: "교육 목표",
    desc: "생성형 AI로 보고서 작성, 데이터 정리, 사내 커뮤니케이션 업무 시간을 단축합니다.",
  },
  {
    icon: "👥",
    title: "교육 대상",
    desc: "사무 · 설계 · 품질 · 생산관리 등 전 부서 임직원 누구나 참여할 수 있습니다.",
  },
  {
    icon: "🖥️",
    title: "준비물",
    desc: "사내 노트북, 회사 이메일 계정, ChatGPT · Claude · Gemini 무료 계정이면 충분합니다.",
  },
  {
    icon: "🗓️",
    title: "진행 방식",
    desc: "60분 실습형 구성 · 이론 15분 + 실습 40분 + 마무리 Q&A 5분.",
  },
  {
    icon: "🧪",
    title: "실습 비율",
    desc: "전체 교육 시간의 약 65%를 직접 실습에 투입하는 실습 중심 커리큘럼입니다.",
  },
  {
    icon: "📦",
    title: "산출물",
    desc: "실습으로 완성한 문서 초안 3종을 개인 저장하고 팀에 바로 공유할 수 있습니다.",
  },
];

export const TOOLS = [
  {
    name: "ChatGPT",
    maker: "OpenAI",
    color: "#10A37F",
    strength: "범용성이 뛰어나고 아이디어 브레인스토밍, GPTs 확장 기능이 강점입니다.",
    bestFor: "신제품 아이디어 정리, 초안 작성, 회의록 브레인스토밍",
  },
  {
    name: "Claude",
    maker: "Anthropic",
    color: "#D97757",
    strength: "긴 문서를 정확히 이해하고, 안전하고 신중한 톤으로 정리해 줍니다.",
    bestFor: "품질 보고서 요약, 작업표준서(SOP) 교정, 사내 규정 문서 정리",
  },
  {
    name: "Gemini",
    maker: "Google",
    color: "#4285F4",
    strength: "구글 워크스페이스와 연동이 편리하고 표·이미지 데이터 이해에 강합니다.",
    bestFor: "스프레드시트 생산 데이터 정리, 구글 문서 공동작업",
  },
];

export const CURRICULUM = [
  {
    step: "01",
    time: "00:00 – 00:05",
    duration: "5분",
    icon: "👋",
    title: "오리엔테이션",
    subtitle: "Getting Started",
    desc: "교육 목표와 실습 환경(계정, 노트북)을 점검하고 60분 진행 순서를 안내합니다.",
    case: {
      label: "실습 준비 체크",
      text: "노트북에서 ChatGPT · Claude · Gemini 중 최소 1개 로그인을 확인하고, 오늘 실습에서 다룰 '배터리 장착 공정 SOP', '도색 공정 품질 이슈', 'GS100 배터리 부품 납기' 3가지 실습 상황을 미리 훑어봅니다.",
    },
  },
  {
    step: "02",
    time: "00:05 – 00:15",
    duration: "10분",
    icon: "🤖",
    title: "생성형 AI 기초 이해",
    subtitle: "AI Basics",
    desc: "ChatGPT · Claude · Gemini의 차이와 제조 현장에서의 활용 포인트를 비교합니다.",
    case: {
      label: "비교 실습 사례",
      text: "실습: 대동모빌리티 '빌트인 사계절 에어컨 카트 GA300 HVAC' 제품 소개 문구를 세 도구에 똑같이 입력해 결과의 톤 · 정확도 · 완성도 차이를 함께 비교해 봅니다.",
    },
  },
  {
    step: "03",
    time: "00:15 – 00:30",
    duration: "15분",
    icon: "📝",
    title: "[실습 1] 보고서 · 작업표준서 초안 작성",
    subtitle: "Hands-on: Documents",
    desc: "AI에게 역할과 형식을 지정해 업무 보고서와 SOP 초안을 직접 작성해 봅니다.",
    case: {
      label: "실습 사례",
      text: "사례: 안성 본사 조립라인의 '배터리 장착 공정' 작업표준서(SOP)를 AI와 함께 10분 만에 초안으로 완성합니다.",
      link: { href: "#mission-1", label: "실습 미션 1 바로 실행하기" },
    },
  },
  {
    step: "04",
    time: "00:30 – 00:45",
    duration: "15분",
    icon: "📊",
    title: "[실습 2] 품질 · 공정 데이터 요약",
    subtitle: "Hands-on: Data",
    desc: "품질 이슈 데이터와 생산일지를 AI로 정리하고 핵심 이슈를 요약합니다.",
    case: {
      label: "실습 사례",
      text: "사례: 프리미엄 리무진 카트 'GA900' 도색 공정에서 발생한 품질 이슈 목록을 AI로 정리해 상위 3개 이슈와 재발 방지 대책 초안을 뽑아냅니다.",
      link: { href: "#mission-2", label: "실습 미션 2 바로 실행하기" },
    },
  },
  {
    step: "05",
    time: "00:45 – 00:55",
    duration: "10분",
    icon: "✉️",
    title: "[실습 3] 사내 공지 · 거래처 커뮤니케이션",
    subtitle: "Hands-on: Communication",
    desc: "사내 공지문과 해외 거래처용 영문 이메일을 AI와 함께 작성 · 번역합니다.",
    case: {
      label: "실습 사례",
      text: "사례: 전기스쿠터 'GS100' 시리즈 배터리 부품을 공급하는 해외 협력사에 납기 단축을 요청하는 비즈니스 영문 이메일을 AI와 함께 작성합니다.",
      link: { href: "#mission-3", label: "실습 미션 3 바로 실행하기" },
    },
  },
  {
    step: "06",
    time: "00:55 – 01:00",
    duration: "5분",
    icon: "🎓",
    title: "마무리 & Q&A",
    subtitle: "Wrap-up",
    desc: "사내 AI 활용 가이드와 보안 준수사항을 안내하고 질의응답으로 마무리합니다.",
    case: {
      label: "마무리 사례",
      text: "사례: 오늘 완성한 SOP · 품질 요약 · 거래처 이메일 3종을 안성 본사와 대구 제2공장 담당자에게 공유하는 교육 후기 공지문을 AI와 함께 정리하며 마무리합니다.",
    },
  },
];

export const PRACTICE_MISSIONS = [
  {
    id: "mission-1",
    icon: "📝",
    tag: "실습 미션 1",
    title: "작업표준서(SOP) 초안 작성",
    checklist: [
      "AI에게 '제조 현장 안전관리자' 역할 부여하기",
      "공정명 · 위험요소 · 조치사항 항목 지정하기",
      "생성된 초안을 사내 양식에 맞게 다듬기",
    ],
    prompt: `너는 전동카트 조립 공정의 안전관리자야.
'배터리 장착 공정'에 대한 작업표준서(SOP)를 아래 형식으로 작성해줘.

1. 공정 개요
2. 필요 보호구
3. 작업 순서(단계별)
4. 위험요소 및 안전조치
5. 이상 발생 시 보고 절차

- 문장은 현장 작업자가 이해하기 쉽게 짧고 명확하게
- 표 형식으로 정리`,
    note: "실제 도면 · 기밀 스펙은 입력하지 말고, 공정명과 일반 절차만으로 실습하세요.",
  },
  {
    id: "mission-2",
    icon: "📊",
    tag: "실습 미션 2",
    title: "품질 이슈 데이터 요약",
    checklist: [
      "품질 이슈 목록(가상 데이터)을 AI에게 정리 요청하기",
      "발생 빈도가 높은 이슈 상위 3개 뽑아내기",
      "재발 방지 대책 초안 받아보기",
    ],
    prompt: `아래는 이번 달 품질 이슈 목록이야.
[예: 도색 불량 12건, 배터리 커넥터 접촉불량 7건, 시트 재봉 불량 5건, 조향 유격 3건]

1. 발생 빈도 기준 상위 3개 이슈를 표로 정리해줘
2. 각 이슈별 예상 원인을 2가지씩 제안해줘
3. 재발 방지를 위한 개선 조치안을 간단히 제시해줘`,
    note: "실제 품질 데이터 대신 예시 수치로 연습한 뒤, 사내 데이터는 보안 절차에 따라 적용하세요.",
  },
  {
    id: "mission-3",
    icon: "✉️",
    tag: "실습 미션 3",
    title: "해외 거래처 이메일 작성 · 번역",
    checklist: [
      "한국어로 용건을 먼저 정리하기",
      "AI에게 비즈니스 톤의 영문 이메일 요청하기",
      "결과물에서 회사명 · 제품명 오타 최종 확인하기",
    ],
    prompt: `아래 내용을 정중하고 간결한 비즈니스 영어 이메일로 작성해줘.
받는 사람: 해외 부품 협력사 담당자
용건: 다음 달 납품 예정인 전동스쿠터 배터리 부품의 납기를 2주 앞당겨 줄 수 있는지 문의
톤: 정중하지만 명확하게, 5문장 이내`,
    note: "발신 전 담당 부서 검토를 거치고, 계약 관련 확정 표현은 AI 문구를 그대로 쓰지 마세요.",
  },
  {
    id: "mission-4",
    icon: "🗂️",
    tag: "실습 미션 4 · (중요) 프로젝트 기능",
    title: "프로젝트 기능으로 KIOTI e-ZTR 시장 리서치하기",
    checklist: [
      "ChatGPT 프로젝트 · Claude Projects · Gemini Gem 중 하나로 새 프로젝트 생성하기",
      "보유 중인 정량 데이터 파일('eZTR 시장 데이터_추출본' 등)을 프로젝트 지식(파일)에 업로드하기",
      "아래 프롬프트로 미국 시장 정성 리서치를 요청하고 결과를 PDF 1개로 저장하기",
      "같은 프로젝트 안에서 '이번엔 일본 시장 기준으로', '이번엔 유럽 시장 기준으로'만 바꿔 재요청 → 미국·일본·유럽 PDF 3개 완성하기",
    ],
    prompt: `너는 KIOTI의 e-ZTR(전동 제로턴 잔디깎이) 프로젝트 실행 여부를 검토하는 상품기획자야.
딜러망 · 판매채널 전략은 다음 단계에서 다룰 예정이니 이번에는 제외하고, 먼저 미국 시장을 정성적으로 이해하고 싶어.
정량 데이터는 첨부한 'eZTR 시장 데이터_추출본' 파일을 참고하고, 아래 5가지 주제로 조사해서 정리해줘.

[출력 형식]
- PPT일 필요는 없어. 엑셀 파일 안에 주제별 시트(Discussion Topic)로 나누고, 내용에 따라 텍스트 · 표 · 차트를 자유롭게 섞어서 정리해줘.
- 확인된 사실과 너의 추정(가정)을 구분해서 표시해줘.

1. 판매자 관점 / Selling Point
   - Riding Mower, Robot Mower는 제외하고 Zero Turn Mower만 대상으로 조사
   - 현재 e-ZTR을 판매 중인 회사, 데크 인치수, 가격대 정리
     (예: Toro · GRAVELY 같은 프리미엄형, Greenworks 같은 보급형)
   - 각 회사 홈페이지 · 유튜브 · 페이스북 등 SNS 채널에서 내세우는 특장점 · 가치 · 사용 목적(occasion) 파악
   - Commercial vs Residential(Homeowner)로 구분해서 정리
   - Honda 등 향후 e-ZTR 진입이 예상되는 회사들의 움직임도 조사

2. 유통 채널
   - Online / Big Box Retail(Home Depot 등) / 도시 인근 Turf Care 전문매장 / 트랙터 OEM 딜러로 구분하고,
     더 세분화할 수 있는 채널이 있다면 추가해줘

3. 시장 점유율
   - PPM Data 등 회사별 e-ZTR 점유율을 알 수 있는 자료가 있다면 조사해줘

4. 구매자 관점 / Why or Why-Not
   - Facebook · YouTube · 사용자 커뮤니티 등 SNS에서 호감/비호감 이유 조사
     (예: 호감 - 저소음, 친환경 / 비호감 - 배터리 용량, 충전 인프라 부족, Residential 대비 높은 이용 비용)

5. 규제 환경
   - e-ZTR에 우호적이거나 불리한 주(州)별 규제가 있는지 조사해줘

[다음 단계]
이번 요청은 '미국' 기준이야. 결과가 정리되면 같은 형식 그대로 "이번엔 일본 시장 기준으로 정리해줘",
"이번엔 유럽 시장 기준으로 정리해줘"라고 이어서 요청할 테니, 국가만 바꿔서 같은 틀로 정리해줘.`,
    note: "프로젝트(Projects/Gem) 기능은 업로드한 자료와 대화 맥락을 계속 기억하기 때문에 국가만 바꿔가며 반복 요청하면 미국 · 일본 · 유럽 리포트를 각각 PDF로 빠르게 완성할 수 있습니다. 단, 리서치 결과는 AI의 추정을 포함할 수 있으니 실제 의사결정 전 시장조사팀 검토를 거치고, 사내 기밀 딜러 계약 조건은 입력하지 마세요.",
    downloads: {
      label: "완성 예시 다운로드 (실습 전 참고용)",
      files: [
        { flag: "🇺🇸", label: "미국", file: "/docs/eZTR_시장규모와전망_미국.pdf" },
        { flag: "🇯🇵", label: "일본", file: "/docs/eZTR_시장규모와전망_일본.pdf" },
        { flag: "🇪🇺", label: "유럽", file: "/docs/eZTR_시장규모와전망_유럽.pdf" },
      ],
    },
  },
];

export const TIPS = [
  {
    icon: "🔒",
    text: "사내 기밀 도면 · 설계 데이터는 외부 AI 서비스에 절대 입력하지 않습니다.",
  },
  {
    icon: "👀",
    text: "AI가 생성한 결과물은 반드시 담당자가 최종 검토한 뒤 사용합니다.",
  },
  {
    icon: "🎯",
    text: "좋은 프롬프트의 공식: 역할 지정 + 현재 상황 + 원하는 결과 형식.",
  },
  {
    icon: "🔁",
    text: "반복되는 업무는 프롬프트를 템플릿으로 저장해 재사용하세요.",
  },
  {
    icon: "💳",
    text: "무료 요금제만으로도 오늘 실습은 충분히 진행할 수 있습니다.",
  },
  {
    icon: "⚠️",
    text: "AI 답변은 사실 확인 없이 외부에 그대로 배포하지 않습니다.",
  },
];

export const RESOURCES = [
  {
    icon: "🤖",
    title: "심화 실습: 챗봇 · 워크플로우 만들기",
    desc: "모빌리티사업부(e-스쿠터 · 골프카트 · 운반로봇) 실제 사례로 나만의 상담봇을 직접 설계해보는 추가 실습 페이지",
    href: "/studio",
  },
  {
    icon: "📘",
    title: "교육 자료 PDF",
    desc: "오늘 교육에 사용한 슬라이드와 스크립트 전체",
    href: "#",
  },
  {
    icon: "🗂️",
    title: "실습 워크시트",
    desc: "미션 1~3 실습용 프롬프트 예시 모음",
    href: "#",
  },
  {
    icon: "🏭",
    title: "대동모빌리티 공식 홈페이지",
    desc: "회사 소개 및 제품 정보 바로가기",
    href: "https://www.daedongmobility.co.kr",
    external: true,
  },
];
