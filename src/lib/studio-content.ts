export const STUDIO_NAV_LINKS = [
  { href: "#studio-overview", label: "실습 개요" },
  { href: "#chatbot-lab", label: "챗봇 실습" },
  { href: "#workflow-lab", label: "워크플로우 실습" },
  { href: "#studio-tips", label: "주의사항" },
  { href: "/", label: "60분 기초 실습" },
];

export const STUDIO_HERO_STATS = [
  { icon: "🤖", label: "실습 유형", value: "2가지" },
  { icon: "⏱️", label: "예상 소요", value: "약 50분" },
  { icon: "🛠️", label: "실습 대상", value: "AS · 상담 담당자" },
  { icon: "🤖", label: "다루는 제품군", value: "e-스쿠터 · 골프카트 · 운반로봇" },
];

export const STUDIO_OVERVIEW_CARDS = [
  {
    icon: "🎯",
    title: "실습 목표",
    desc: "AI 스튜디오에서 모빌리티사업부(e-스쿠터 · 골프카트 · 운반로봇) 상담봇을 직접 설계하고, 여러 상담 도메인을 하나의 워크플로우로 통합하는 법을 익힙니다.",
  },
  {
    icon: "🧩",
    title: "실습 구성",
    desc: "실습①은 단일 챗봇 만들기(프로필 · 동작 · 지식 · 공유), 실습②는 조건 분기가 있는 워크플로우 챗봇 만들기로 이어집니다.",
  },
  {
    icon: "🤖",
    title: "실습① 도메인",
    desc: "모빌리티사업부 운반로봇 — DR-100 자율주행 운반로봇 사용법과 AS 문의에 답하는 「대동 운반로봇 AS 상담봇」.",
  },
  {
    icon: "⚡",
    title: "실습② 도메인",
    desc: "운반로봇과 e-스쿠터 · 골프카트 두 제품 라인을 통합한 「대동모빌리티 통합 고객상담봇」 워크플로우.",
  },
  {
    icon: "🔐",
    title: "안전 · 보안 포인트",
    desc: "개인정보 마스킹, 첨부 문서 근거주의, 안전 경고 우선순위 등 실무에 바로 적용할 가드레일 설계 원칙을 다룹니다.",
  },
  {
    icon: "✅",
    title: "완료 기준",
    desc: "테스트 시나리오 3가지 이상으로 분류 · 라우팅이 의도대로 동작하는지 확인한 뒤 게시합니다.",
  },
];

// 실습① — 챗봇 만들기: 「대동 운반로봇 AS 상담봇」
export const CHATBOT_PROFILE = {
  name: "대동 운반로봇 AS 상담봇",
  description:
    "DR-100 자율주행 운반로봇의 사용법과 고장 조치, AS 접수를 안내하는 대동모빌리티 모빌리티사업부 공식 상담봇입니다.",
  sampleQuestions: [
    "운반로봇이 장애물 앞에서 멈춘 뒤 다시 안 움직여요.",
    "추종주행(팔로우) 모드가 저를 잘 따라오지 못해요.",
    "완충했는데 주행거리가 눈에 띄게 줄었어요.",
  ],
};

export const CHATBOT_BEHAVIOR = {
  model: "GPT-5.3 Chat",
  prompt: `너는 대동모빌리티 모빌리티사업부 소속 운반로봇 AS 상담사야.

[정보출처 원칙]
- 웹검색 없이 첨부된 사용설명서 · 부품 카탈로그 · AS 정책 문서만 근거로 답변한다.
- 문서에 없는 내용은 추측하지 말고 "확인이 필요합니다"라고 답한다.

[안전 최우선]
- 구동부 협착, 센서 오작동으로 인한 급정지 등 위험요소가 언급되면 조치방법보다 안전 경고를 먼저 안내한다.

[답변 구조]
1. 증상 확인
2. 예상 원인
3. 조치 방법
4. 안전 주의사항
5. (필요 시) 가까운 대동 대리점 · AS센터 안내

[되묻기 지침]
- 주행 모드(수동조작 / 추종주행 / 경로주행)가 특정되지 않으면 먼저 어떤 모드에서 발생했는지 되묻는다.

[에스컬레이션]
- 현장 확인이 필요한 고장이나 문서에 없는 사안은 가까운 대리점 · AS센터 연락처로 안내한다.`,
  promptNotes: [
    { area: "역할 지정", purpose: "상담사 정체성을 고정해 답변 톤을 통일합니다." },
    { area: "정보출처 원칙", purpose: "환각(hallucination)과 오래된 웹 정보 혼입을 차단합니다." },
    { area: "안전 최우선", purpose: "무엇보다 안전사고 예방을 우선하는 원칙을 명시합니다." },
    { area: "답변 구조", purpose: "매번 같은 순서로 답해 응답 품질을 일정하게 유지합니다." },
    { area: "되묻기 지침", purpose: "주행 모드가 불명확한 질문의 정답률을 높입니다." },
    { area: "에스컬레이션", purpose: "챗봇 한계를 벗어난 상황을 안전하게 사람에게 넘깁니다." },
  ],
};

export const CHATBOT_KNOWLEDGE = {
  filesIntro:
    "첨부한 PDF 문서는 임베딩(embedding) 검색으로 색인되어, 질문과 가장 관련 있는 문단을 찾아 답변 근거로 사용합니다.",
  files: [
    {
      name: "운반로봇 사용설명서.pdf",
      desc: "전원 · 주행모드 조작법, 정기점검 항목, 고장 코드표",
      file: "/docs/운반로봇_사용설명서.pdf",
    },
    {
      name: "운반로봇 부품 카탈로그.pdf",
      desc: "배터리팩 · 센서 · 휠 모듈 품번, 가격, 취급 대리점",
      file: "/docs/운반로봇_부품_카탈로그.pdf",
    },
    {
      name: "AS 정책 및 보증기간 안내.pdf",
      desc: "무상보증 기간, 유상수리 기준, AS 접수 절차",
      file: "/docs/AS_정책_및_보증기간_안내.pdf",
    },
  ],
  connector: {
    intro:
      "첨부 파일이 '고정된 매뉴얼'이라면, 커넥터는 실시간으로 바뀌는 데이터를 그때그때 조회하는 통로입니다.",
    steps: [
      "마이페이지 > 데이터 연동에서 사내 재고조회 시스템 계정을 연결합니다.",
      "챗봇 지식 탭에서 '연동 추가'를 누르고 '대리점 부품 재고조회 MCP'를 선택합니다.",
    ],
  },
};

export const CHATBOT_SHARE = {
  collaboration:
    "AS팀 · 품질팀 · 대리점 운영팀 동료를 초대해 프로필 · 프롬프트 · 지식 문서를 함께 편집합니다.",
  roles: [
    { role: "편집자", desc: "프로필 · 프롬프트 · 지식 문서 수정 가능" },
    { role: "뷰어", desc: "챗봇 테스트만 가능, 설정 변경 불가" },
  ],
  sharing:
    "완성된 챗봇은 사내 인트라넷 챗봇 스토어에 등록해 전국 대리점 담당자가 사용하도록 배포합니다. 고객에게 직접 공개하는 외부 배포는 별도 보안 검토와 승인을 거쳐야 합니다.",
};

// 실습② — 워크플로우 챗봇: 「대동모빌리티 통합 고객상담봇」
export const WORKFLOW_OVERVIEW =
  "「대동모빌리티 통합 고객상담봇」은 모빌리티사업부 안의 운반로봇과 e-스쿠터 · 골프카트, 두 제품 라인의 상담 창구를 하나의 챗봇으로 통합합니다. 사용자 질문을 자동으로 분류해 운반로봇 상담 에이전트 또는 e-스쿠터 · 골프카트 상담 에이전트로 라우팅합니다.";

export const WORKFLOW_NODE_TYPES = [
  { name: "Start", desc: "워크플로우의 시작점" },
  { name: "Guardrail", desc: "입력 안전 정책 — 개인정보 마스킹, 금칙어 검사" },
  { name: "Classify", desc: "질문을 카테고리별로 분류해 분기" },
  { name: "If/Else", desc: "조건 분기 (이번 실습에서는 미사용)" },
  { name: "Agent", desc: "모델 · 프롬프트 · 지식 · 도구를 설정하는 상담 노드" },
  { name: "End", desc: "워크플로우 종료" },
  { name: "Note", desc: "협업용 주석" },
];

export const WORKFLOW_GUARDRAIL = {
  desc: "사용자 입력에서 개인정보를 마스킹하고, 금칙어가 포함된 질문은 상담사 연결 없이 안전하게 종료합니다.",
  settings: [
    { label: "개인정보 마스킹", value: "전화번호 · 차대번호(VIN) · 카드번호 자동 마스킹 ON" },
    { label: "금칙어 설정", value: `"환불 안 해주면 소송", "불법 개조" 등 감지 시 차단` },
  ],
  pass: "Classify로 연결",
  fail: 'End로 연결 (예: "안전을 위해 해당 문의는 고객센터(1588-XXXX)로 연결해 드립니다.")',
};

export const WORKFLOW_CLASSIFY = {
  name: "사업부 분류",
  model: "Gemini 3.5 Flash",
  guide: "질문에 등장하는 제품명 · 증상 키워드를 기준으로 운반로봇 문의인지 e-스쿠터 · 골프카트 문의인지 분류한다.",
  category1: { name: "운반로봇", target: "Agent A" },
  category2: { name: "e-스쿠터 · 골프카트", target: "Agent B" },
  warning: "각 카테고리는 반드시 정확히 하나의 도착 노드에만 연결되어야 합니다.",
};

export const WORKFLOW_AGENT_A = {
  label: "Agent A — 운반로봇 상담사",
  files: [
    { name: "운반로봇 사용설명서.pdf", file: "/docs/운반로봇_사용설명서.pdf" },
    {
      name: "운반로봇 부품 카탈로그.pdf",
      file: "/docs/운반로봇_부품_카탈로그.pdf",
    },
    {
      name: "AS 정책 및 보증기간 안내.pdf",
      file: "/docs/AS_정책_및_보증기간_안내.pdf",
    },
  ],
  promptSummary:
    "운반로봇(DR-100) 관련 질문에 첨부 문서만 근거로 답한다. 구동부 협착 · 센서 오작동 등 위험요소는 안전 경고를 최우선으로 안내하고, 증상확인 → 예상원인 → 조치방법 → 안전주의 순으로 구조화해 답한다. 문서에 없는 사안은 가까운 대리점 · AS센터로 안내한다.",
};

export const WORKFLOW_AGENT_B = {
  label: "Agent B — e-스쿠터 · 골프카트 상담사",
  files: [
    {
      name: "GA300 골프카트 사용설명서.pdf",
      file: "/docs/전동카트_사용자매뉴얼_GA300_GA900.pdf",
    },
    {
      name: "GA900 골프카트 사용설명서.pdf",
      file: "/docs/전동카트_사용자매뉴얼_GA300_GA900.pdf",
    },
    {
      name: "GS100 e-스쿠터 사용설명서.pdf",
      file: "/docs/GS100_전동스쿠터_사용설명서.pdf",
    },
    { name: "배터리 보증정책.pdf", file: "/docs/배터리_보증정책.pdf" },
  ],
  promptSummary:
    "골프카트(GA300 · GA900) · e-스쿠터(GS100)의 충전 · 배터리 · 주행 관련 질문에 답한다. 과충전 · 침수 등 배터리 안전 경고를 최우선으로 안내하고, 보증기간은 반드시 근거 문서를 명시한다. 부품 가격 · 임의 개조 문의는 답변 범위 밖이므로 대리점으로 안내한다.",
};

export const WORKFLOW_PUBLISH = {
  desc: "워크플로우 에디터의 오류 개수가 0개여야 저장 · 게시할 수 있습니다.",
  warnings: [
    "카테고리에 연결되지 않은 도착 노드가 있으면 저장이 거부됩니다.",
    "존재하지 않는 문서를 참조하거나, 빈 프롬프트가 있으면 저장이 거부됩니다.",
    "존재하지 않는 모델을 지정한 노드가 있으면 저장이 거부됩니다.",
  ],
};

export const WORKFLOW_TEST_SCENARIOS = [
  {
    input: "운반로봇이 계단 앞에서 멈춘 뒤 안 움직여요.",
    classify: "운반로봇",
    agent: "Agent A",
  },
  {
    input: "GA900 카트 완충까지 얼마나 걸리나요?",
    classify: "e-스쿠터 · 골프카트",
    agent: "Agent B",
  },
  { input: "환불 안 해주면 소송 걸겠다", classify: "금칙어 감지", agent: "End" },
];

export const STUDIO_TIPS = [
  { icon: "🔒", text: "고객 개인정보(연락처 · 차대번호 등)는 Guardrail에서 반드시 마스킹 처리합니다." },
  { icon: "📄", text: "근거 문서(매뉴얼 · 정책)는 최신 버전으로 주기적으로 교체하고, 구버전은 반드시 삭제합니다." },
  { icon: "🧭", text: "분류가 애매한 질문은 Classify 지침에 예시 문장을 추가해 정확도를 높이세요." },
  { icon: "🚨", text: "안전 경고 문구는 프롬프트 최상단에 배치해 우선순위를 명확히 합니다." },
  { icon: "🧪", text: "배포 전 최소 3가지 테스트 시나리오로 분류 · 라우팅 결과를 확인합니다." },
  { icon: "🏬", text: "전사 배포 전, AS팀 · 대리점 실제 사용자 리뷰를 거쳐 스토어에 등록합니다." },
];

export const STUDIO_RESOURCES = [
  {
    icon: "🏠",
    title: "60분 기초 실습 교안으로 돌아가기",
    desc: "AI 기초 개념과 4가지 실습 미션을 다시 확인합니다.",
    href: "/",
  },
  {
    icon: "📘",
    title: "챗봇 스튜디오 실습 가이드",
    desc: "실습① 프로필 · 동작 · 지식 · 공유 탭 설정 가이드",
    href: "#",
  },
  {
    icon: "🔁",
    title: "워크플로우 노드 설정 워크시트",
    desc: "실습② Guardrail · Classify · Agent 노드 설정값 정리",
    href: "#",
  },
];
