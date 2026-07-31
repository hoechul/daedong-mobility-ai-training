// 실습용 지식 문서 PDF 생성 스크립트.
// 대동모빌리티 공식 홈페이지(daedongmobility.co.kr) 공개 정보를 참고해 작성했으며,
// 홈페이지에 없는 항목(관리기·예초기·부품 카탈로그)은 국내 동종 농기계 제조사의
// 일반적인 사용설명서 구성을 참고해 대동모빌리티 명의로 재구성한 실습용 예시입니다.
import fs from "node:fs";
import path from "node:path";
import PDFDocument from "pdfkit";

const FONT_DIR = path.resolve(
  "node_modules/pretendard/dist/public/static/alternative"
);
const REGULAR = path.join(FONT_DIR, "Pretendard-Regular.ttf");
const BOLD = path.join(FONT_DIR, "Pretendard-Bold.ttf");
const OUT_DIR = path.resolve("public/docs");

fs.mkdirSync(OUT_DIR, { recursive: true });

const BRAND = "#ef4123";
const INK = "#1a1a1a";
const MUTED = "#555555";
const RULE = "#dddddd";

function newDoc() {
  const doc = new PDFDocument({ size: "A4", margin: 56 });
  doc.registerFont("regular", REGULAR);
  doc.registerFont("bold", BOLD);
  doc.font("regular");
  return doc;
}

function header(doc, { title, subtitle, docNo }) {
  doc.rect(0, 0, doc.page.width, 8).fill(BRAND);
  doc.moveDown(2);
  doc
    .fillColor(BRAND)
    .font("bold")
    .fontSize(11)
    .text("DAEDONG MOBILITY", 56, 40, { characterSpacing: 1.5 });
  doc
    .fillColor(INK)
    .font("bold")
    .fontSize(22)
    .text(title, 56, 64);
  doc
    .fillColor(MUTED)
    .font("regular")
    .fontSize(11)
    .text(subtitle, 56, doc.y + 4);
  doc
    .fillColor(MUTED)
    .fontSize(9)
    .text(`문서번호 ${docNo}  ·  발행 대동모빌리티 고객지원팀  ·  본 문서는 AI 실습 교육용 예시 자료입니다.`, {
      align: "left",
    });
  doc.moveDown(0.6);
  doc
    .moveTo(56, doc.y)
    .lineTo(doc.page.width - 56, doc.y)
    .strokeColor(RULE)
    .lineWidth(1)
    .stroke();
  doc.moveDown(1);
}

function heading(doc, text) {
  if (doc.y > doc.page.height - 140) doc.addPage();
  doc.moveDown(0.8);
  doc
    .fillColor(BRAND)
    .font("bold")
    .fontSize(13)
    .text(text);
  doc
    .moveTo(56, doc.y + 2)
    .lineTo(56 + 24, doc.y + 2)
    .strokeColor(BRAND)
    .lineWidth(2)
    .stroke();
  doc.moveDown(0.6);
  doc.fillColor(INK).font("regular").fontSize(10.5);
}

function paragraph(doc, text) {
  doc.fillColor(INK).font("regular").fontSize(10.5).text(text, {
    align: "left",
    lineGap: 3,
  });
  doc.moveDown(0.4);
}

function bullets(doc, items) {
  items.forEach((item) => {
    doc
      .fillColor(INK)
      .font("regular")
      .fontSize(10.5)
      .text(`•  ${item}`, { indent: 4, lineGap: 3 });
  });
  doc.moveDown(0.4);
}

function table(doc, { widths, headers, rows }) {
  const startX = 56;
  const colX = [];
  let acc = startX;
  widths.forEach((w) => {
    colX.push(acc);
    acc += w;
  });
  const totalWidth = widths.reduce((a, b) => a + b, 0);
  const rowHeight = 22;

  if (doc.y > doc.page.height - 160) doc.addPage();

  // Track the row cursor in a local variable rather than doc.y — pdfkit
  // advances doc.y after every text() call even when explicit x/y are
  // passed, so reusing doc.y mid-table causes header/row rows to drift.
  let y = doc.y;
  doc.rect(startX, y, totalWidth, rowHeight).fill(INK);
  doc.font("bold").fontSize(9.5);
  headers.forEach((h, i) => {
    doc.fillColor("#ffffff").text(h, colX[i] + 6, y + 6, {
      width: widths[i] - 10,
      lineBreak: false,
    });
  });
  y += rowHeight;

  doc.font("regular").fontSize(9.5);
  rows.forEach((row, rIdx) => {
    if (y > doc.page.height - 90) {
      doc.addPage();
      y = doc.y;
    }
    if (rIdx % 2 === 0) {
      doc.rect(startX, y, totalWidth, rowHeight).fill("#f7f7f7");
    }
    row.forEach((cell, i) => {
      doc.fillColor(INK).text(String(cell), colX[i] + 6, y + 6, {
        width: widths[i] - 10,
        lineBreak: false,
      });
    });
    y += rowHeight;
  });

  // Explicit-x text() calls above leave doc.x pinned at the last column's
  // position; reset it to the left margin so the next flowed text() call
  // (heading/paragraph) doesn't wrap into a narrow trailing column.
  doc.x = startX;
  doc.y = y;
  doc.moveDown(1);
}

function footer(doc, note) {
  doc.moveDown(1.2);
  doc
    .moveTo(56, doc.y)
    .lineTo(doc.page.width - 56, doc.y)
    .strokeColor(RULE)
    .stroke();
  doc.moveDown(0.4);
  doc
    .fillColor(MUTED)
    .font("regular")
    .fontSize(8.5)
    .text(note, { lineGap: 2 });
}

function saveDoc(doc, filename) {
  const filePath = path.join(OUT_DIR, filename);
  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);
  doc.end();
  return new Promise((resolve, reject) => {
    stream.on("finish", () => resolve(filePath));
    stream.on("error", reject);
  });
}

// ---------------------------------------------------------------------------
// 1. 운반로봇 사용설명서
// ---------------------------------------------------------------------------
async function buildRobotManual() {
  const doc = newDoc();
  header(doc, {
    title: "운반로봇 사용설명서",
    subtitle: "대동모빌리티 모빌리티사업부 · 모델 DR-100 자율주행 운반로봇",
    docNo: "DM-RB-001",
  });

  heading(doc, "1. 제품 개요");
  paragraph(
    doc,
    "DR-100은 최대 100kg까지 적재 가능한 4륜 자율주행 운반로봇으로, 완충 시 약 20km 주행합니다. 수동조작 · 추종주행(팔로우) · 경로주행 3가지 모드를 지원하며, LiDAR와 카메라로 주변 장애물을 인식합니다. 골프장 · 공장 · 캠퍼스 등 실외 환경에서 물품 운반 용도로 사용합니다."
  );

  heading(doc, "2. 안전수칙");
  bullets(doc, [
    "구동휠 및 하부 협착 위험 부위에 손이나 발을 넣지 않습니다.",
    "운행 시작 전 본체 후면의 비상정지 버튼(적색) 위치를 반드시 확인합니다.",
    "계단, 급경사, 20cm 이상 단차 구간에서는 주행하지 않습니다.",
    "방수등급(IP54)을 초과하는 침수 환경(폭우 · 물웅덩이 통과 등)에서는 사용을 중단합니다.",
    "사람이 많은 구역에서는 반드시 저속 모드로 전환한 뒤 주행합니다.",
  ]);

  heading(doc, "3. 전원 및 조작법");
  bullets(doc, [
    "① 전원 버튼을 3초간 눌러 부팅하고, 계기판에서 배터리 잔량을 확인합니다.",
    "② 조작 모드를 선택합니다(수동조작 / 추종주행 / 경로주행).",
    "③ 추종주행 모드는 리모컨 태그를 소지자에게 페어링한 뒤 시작합니다.",
    "④ 주행 시작 전 장애물 센서 상태 LED가 정상(녹색)인지 확인합니다.",
    "⑤ 운행 종료 후 비상정지 버튼으로 정지시킨 뒤 전원을 OFF 합니다.",
  ]);

  heading(doc, "4. 정기점검 항목");
  table(doc, {
    widths: [90, 130, 230],
    headers: ["점검주기", "점검 항목", "점검 내용"],
    rows: [
      ["매 사용 전", "배터리 잔량", "20% 이하 시 충전 후 운행 권장"],
      ["매 사용 전", "휠 · 타이어", "마모, 이물질 끼임 여부 확인"],
      ["주 1회", "센서 렌즈(LiDAR · 카메라)", "먼지 · 이물질 제거, 마른 천으로 청소"],
      ["주 1회", "범퍼 충격센서", "눌림 시 정상 반응(정지)하는지 테스트"],
      ["월 1회", "펌웨어 버전", "최신 버전 여부 확인, 필요 시 업데이트"],
      ["시즌 종료 후", "배터리 보관", "50% 충전 상태로 서늘한 곳에 보관"],
    ],
  });

  heading(doc, "5. 고장 코드표");
  table(doc, {
    widths: [110, 160, 180],
    headers: ["증상", "예상 원인", "조치 방법"],
    rows: [
      ["장애물 감지 후 정지 유지", "센서 인식 후 안전정지 상태 유지", "장애물 제거 확인 후 재시작 버튼 입력"],
      ["추종주행 신호 끊김", "리모컨 태그 배터리 부족 · 거리 이탈", "태그 배터리 교체, 5m 이내 거리 유지"],
      ["배터리 저전압 경고", "배터리 노후 · 완전방전 반복", "정품 충전기로 충전, 미개선 시 배터리팩 점검"],
      ["휠 슬립 경고", "노면 미끄러움 · 과적재", "적재량 확인(100kg 이하), 저속 모드 전환"],
      ["펌웨어 업데이트 실패", "통신 불안정 · 배터리 부족", "충전 50% 이상에서 재시도, Wi-Fi 연결 확인"],
    ],
  });

  footer(
    doc,
    "본 문서는 대동모빌리티 AI 실습 교육을 위해 제작된 예시 자료입니다. 실제 정비·수리는 반드시 가까운 대동모빌리티 대리점 또는 AS센터를 통해 진행하십시오."
  );

  return saveDoc(doc, "운반로봇_사용설명서.pdf");
}

// ---------------------------------------------------------------------------
// 2. 운반로봇 부품 카탈로그
// ---------------------------------------------------------------------------
async function buildRobotPartsCatalog() {
  const doc = newDoc();
  header(doc, {
    title: "운반로봇 부품 카탈로그",
    subtitle: "DR-100 자율주행 운반로봇 소모품 및 교체 부품 안내",
    docNo: "DM-RB-002",
  });

  heading(doc, "1. DR-100 소모품 · 교체 부품");
  table(doc, {
    widths: [75, 140, 90, 90, 105],
    headers: ["품번", "품명", "적용 모델", "참고가격", "취급 대리점"],
    rows: [
      ["DR100-A01", "배터리팩(51.2V)", "DR-100", "850,000원", "전국 대동 대리점"],
      ["DR100-B02", "구동휠 모듈", "DR-100", "145,000원", "전국 대동 대리점"],
      ["DR100-C03", "LiDAR 센서 유닛", "DR-100", "320,000원", "전국 대동 대리점"],
      ["DR100-D04", "범퍼 충격센서", "DR-100", "45,000원", "전국 대동 대리점"],
      ["DR100-E05", "리모컨(페어링 태그)", "DR-100", "38,000원", "전국 대동 대리점"],
    ],
  });

  heading(doc, "2. 주문 및 취급 안내");
  bullets(doc, [
    "표기 가격은 2026년 기준 권장 소비자가이며, 대리점별로 변동될 수 있습니다.",
    "부품 주문은 가까운 대동모빌리티 대리점 또는 고객지원 온라인 문의를 통해 접수합니다.",
    "순정 부품이 아닌 사제 부품 사용 시 무상보증 대상에서 제외될 수 있습니다.",
  ]);

  footer(
    doc,
    "본 문서는 대동모빌리티 AI 실습 교육을 위해 제작된 예시 자료입니다. 실제 품번·가격·재고는 가까운 대동모빌리티 대리점에 문의해 확인하십시오."
  );

  return saveDoc(doc, "운반로봇_부품_카탈로그.pdf");
}

// ---------------------------------------------------------------------------
// 4. AS 정책 및 보증기간 안내 (실제 공식 홈페이지 품질보증 안내 기준)
// ---------------------------------------------------------------------------
async function buildWarrantyPolicy() {
  const doc = newDoc();
  header(doc, {
    title: "AS 정책 및 보증기간 안내",
    subtitle: "대동모빌리티 공식 홈페이지 「품질보증 안내」·「정비 점검 가이드」 기준 요약",
    docNo: "DM-CS-004",
  });

  heading(doc, "1. 전동카트(운반차 등) 보증");
  paragraph(
    doc,
    "보증기간은 사용기간 1년이며, 감속기(주변장치·전장부 제외)·밋션 관련 조합부·씰/가스켓류·유압계통·의장부·전장부·캐빈부·조향장치 조합·작업기가 보증 대상입니다."
  );

  heading(doc, "2. 운반로봇(DR-100) 보증");
  paragraph(
    doc,
    "전동카트와 동일한 기준으로 구입일로부터 1년간 무상보증을 적용합니다. 구동모터·휠 모듈·배터리팩·제어보드(MCU) 결함은 무상 대상이며, 범퍼·센서 커버 등 소모성 외장 부품은 정상 마모 시 보증에서 제외됩니다."
  );

  heading(doc, "3. 유상수리(보증 제외) 사유");
  bullets(doc, [
    "정기 점검사항 미이행(전원계통 청소, 브레이크 점검 등)",
    "소모성 부품의 정상 마모(필터 · 고무 · 전구 · 퓨즈 · 벨트류 등)",
    "지정 유류 미사용, 사용설명서에 명시된 취급방법 불이행",
    "임의 개조 또는 비순정 부품 사용",
    "보관 부주의로 인한 동파 · 열파 · 방전",
    "천재지변 등 불가항력적 사유",
  ]);

  heading(doc, "4. AS 접수 절차");
  bullets(doc, [
    "① 고장 증상을 확인하고 가까운 대동모빌리티 대리점 또는 서비스센터에 연락합니다.",
    "② 차대번호(또는 제품 일련번호)와 구입일자를 안내해 보증 대상 여부를 확인합니다.",
    "③ 방문 점검 또는 입고 수리 일정을 예약합니다.",
    "④ 수리 완료 후 점검 내역서를 수령해 보관합니다.",
  ]);

  footer(
    doc,
    "본 문서는 대동모빌리티 공식 홈페이지(daedongmobility.co.kr) 「품질보증 안내」, 「정비 점검 가이드」 페이지 공개 내용을 바탕으로 요약했으며, 운반로봇(DR-100) 관련 항목은 전동카트 보증 정책을 준용해 작성한 실습용 예시입니다. 정확한 보증조건은 반드시 공식 홈페이지 또는 대리점에서 확인하십시오."
  );

  return saveDoc(doc, "AS_정책_및_보증기간_안내.pdf");
}

// ---------------------------------------------------------------------------
// 5. 배터리 보증정책 (실제 GS100/GS100 Lite 품질보증 안내 기준)
// ---------------------------------------------------------------------------
async function buildBatteryWarranty() {
  const doc = newDoc();
  header(doc, {
    title: "배터리 보증정책",
    subtitle: "GS100 · GS100 Lite 전기스쿠터 및 GA300 · GA900 전동카트 배터리",
    docNo: "DM-CS-005",
  });

  heading(doc, "1. GS100 · GS100 Lite 전기스쿠터");
  paragraph(
    doc,
    "구입일로부터 2년간, 주행거리 20,000km 중 먼저 도래하는 시점까지 보증합니다. 이 기준 내에서 구동모터 · MCU · DC-DC컨버터와 배터리 팩 관련 전용부품 일부가 보증 대상입니다. 충전기 · 헤드램프 · 혼은 1년 · 10,000km 보증이 적용됩니다."
  );

  heading(doc, "2. GA300 · GA900 전동카트");
  paragraph(
    doc,
    "국내 최초로 주요 부품 5년 무상보증을 제공하며, 배터리를 포함한 감속기 · 구동모터 · 차량제어기 · 모터제어기 · 오토기어박스 · 전자브레이크가 대상입니다."
  );

  heading(doc, "3. 보증 제외 항목");
  bullets(doc, [
    "휠 · 핸들바 · 시트 · 후사경 · 캘리퍼 · 브레이크 레버 · 커버류(차체)",
    "타이어 · 액세서리류 · 브레이크 패드 · 브레이크 디스크 · 각종 케이블류(소모성 부품)",
    "타이어는 당사 보증 대상이 아니며 해당 제조회사 보증을 따릅니다.",
  ]);

  heading(doc, "4. 유상수리 사유");
  bullets(doc, [
    "지정 정비 미이행 또는 비지정 서비스점에서의 수리",
    "비순정 부품 사용, 무단 개조 · 변형",
    "조작 미숙, 사고, 경주 등 정상 사용 범위를 벗어난 혹사",
    "천재지변, 외부요인(매연 · 염분 등)으로 인한 손상",
    "주행거리(적산계) 확인 불가 또는 고장 · 변조",
  ]);

  heading(doc, "5. 안전 주의사항");
  bullets(doc, [
    "배터리는 지정된 정품 충전기로만 충전하며, 침수 · 낙하 시 즉시 사용을 중단하고 점검을 받습니다.",
    "여름철 고온 환경에서는 배터리 효율이 일시적으로 저하될 수 있으며, 겨울철에는 평소 대비 10~20% 감소할 수 있습니다.",
    "부품 보유기간은 제조일로부터 7년입니다.",
  ]);

  footer(
    doc,
    "본 문서는 대동모빌리티 공식 홈페이지(daedongmobility.co.kr) 「품질보증 안내」 페이지 공개 내용을 바탕으로 작성한 요약 자료입니다. 연도 · 모델별 세부 조건이 변경될 수 있으니 정확한 내용은 공식 홈페이지 또는 가까운 대리점에서 확인하십시오."
  );

  return saveDoc(doc, "배터리_보증정책.pdf");
}

// ---------------------------------------------------------------------------
// 6~8. e-ZTR(전동 제로턴 잔디깎이) 시장 규모와 전망 — 미국 · 일본 · 유럽
// 실습 미션 4(프로젝트 기능) 완성 예시 산출물. 수치는 모두 학습용 가상
// 추정치이며, 실제 시장조사 데이터가 아닙니다.
// ---------------------------------------------------------------------------
function eztrDisclaimer(doc) {
  doc.moveDown(0.2);
  doc.rect(56, doc.y, doc.page.width - 112, 34).fill(BRAND);
  doc
    .fillColor("#ffffff")
    .font("bold")
    .fontSize(9)
    .text(
      "⚠ 본 리포트는 AI 실습 교육(프로젝트 기능) 완성 예시입니다. 모든 수치는 학습용 가상 추정치이며 실제 시장 데이터가 아닙니다.",
      66,
      doc.y + 10,
      { width: doc.page.width - 132 }
    );
  doc.moveDown(1.6);
  doc.fillColor(INK).font("regular").fontSize(10.5);
}

function buildEztrMarketReport({
  region,
  docNo,
  filename,
  marketOverview,
  sizeTable,
  players,
  channels,
  consumerLike,
  consumerDislike,
  regulation,
  outlook,
}) {
  return async function build() {
    const doc = newDoc();
    header(doc, {
      title: `e-ZTR 시장 규모와 전망 – ${region}`,
      subtitle: "실습 미션 4 완성 예시 · 프로젝트 기능 리서치 산출물 샘플",
      docNo,
    });
    eztrDisclaimer(doc);

    heading(doc, "1. 시장 개요 (정성)");
    paragraph(doc, marketOverview);

    heading(doc, "2. 시장 규모 추정 (예시 추정치)");
    table(doc, sizeTable);

    heading(doc, "3. 주요 판매사 · Selling Point (Zero Turn Mower 기준)");
    table(doc, players);

    heading(doc, "4. 유통 채널");
    bullets(doc, channels);

    heading(doc, "5. 구매자 반응 — Why / Why-Not");
    paragraph(doc, `👍 선호 이유: ${consumerLike}`);
    paragraph(doc, `👎 비선호 이유: ${consumerDislike}`);

    heading(doc, "6. 규제 환경");
    paragraph(doc, regulation);

    heading(doc, "7. 전망 및 시사점");
    bullets(doc, outlook);

    footer(
      doc,
      "본 문서는 대동모빌리티 AI 실습 교육(챗봇 프로젝트 기능) 미션 4의 완성 예시이며, 시장 규모 · 점유율 수치는 실제 조사 결과가 아닌 학습용 가상 추정치입니다. 실제 사업 의사결정에는 사용할 수 없으며, 반드시 검증된 시장조사 자료로 교차 확인해야 합니다."
    );

    return saveDoc(doc, filename);
  };
}

const buildEztrMarketUS = buildEztrMarketReport({
  region: "미국",
  docNo: "DM-MKT-EZTR-US",
  filename: "eZTR_시장규모와전망_미국.pdf",
  marketOverview:
    "미국 Zero Turn Mower 시장은 상업용(조경업체) 비중이 크고, 최근 배터리 전동화(e-ZTR)가 프리미엄 라인 중심으로 시작되는 초기 단계입니다. 전시회 현장 반응은 아직 판매량 자체는 크지 않다는 인상이 우세하며, 프리미엄 조경 장비 브랜드가 우선 진입하고 있습니다.",
  sizeTable: {
    widths: [90, 110, 110, 170],
    headers: ["연도(예시)", "e-ZTR 대수(예시)", "e-ZTR 매출(예시)", "비고"],
    rows: [
      ["2024", "약 6,000대", "약 US$1.1억", "프리미엄 라인 중심 초기 확산"],
      ["2025", "약 9,000대", "약 US$1.7억", "조경업체 시범 도입 확대"],
      ["2026(추정)", "약 13,000대", "약 US$2.4억", "Honda 등 신규 진입 예고로 성장 가속 기대"],
    ],
  },
  players: {
    widths: [80, 90, 90, 210],
    headers: ["회사", "포지셔닝", "가격대(예시)", "특징"],
    rows: [
      ["Toro", "프리미엄", "US$12K~18K", "42~60인치 데크, Commercial 조경업체 타깃"],
      ["GRAVELY", "프리미엄", "US$11K~16K", "내구성 강조, 딜러망 기반 B2B 영업"],
      ["Greenworks", "보급형", "US$4K~7K", "42인치급, Residential/Homeowner 타깃"],
      ["Honda(예고)", "-", "미정", "e-ZTR 라인업 출시 예고, 채널 전략 미공개"],
    ],
  },
  channels: [
    "Online: 브랜드 자사몰 · Amazon 등 (Residential 소형 모델 위주)",
    "Big Box Retail: Home Depot 등 대형 리테일 (보급형 중심)",
    "Turf Care 전문매장: 도시 인근 조경 · 잔디관리 전문점 (Commercial 상담 판매)",
    "트랙터 OEM 딜러망: 기존 라이딩 트랙터 딜러가 e-ZTR 병행 취급",
  ],
  consumerLike:
    "저소음(주택가 새벽 작업 가능), 배기가스 없는 친환경성, 진동이 적어 장시간 작업 피로도 감소.",
  consumerDislike:
    "1회 충전 작업 가능 면적(배터리 용량) 한계, 현장 급속 충전 인프라 부족, Residential 고객 기준 초기 구입비 대비 체감 비용 부담.",
  regulation:
    "캘리포니아 등 일부 주는 소형 엔진 배출가스 규제(예: 상업용 소형 엔진 판매 제한 논의)로 전동화에 우호적인 반면, 별도의 e-ZTR 전용 보조금 · 규제는 아직 제한적입니다(주별 상이, 확인 필요).",
  outlook: [
    "당장은 Commercial 조경업체의 시범 도입 단계로, 대량 전환보다는 프리미엄 라인 우선 확산이 예상됩니다.",
    "Honda 등 대형 브랜드 진입 시 가격 경쟁과 인지도 상승으로 Residential 확산이 빨라질 수 있습니다.",
    "충전 인프라 · 배터리 가격 개선이 Residential 시장 확대의 핵심 변수로 보입니다.",
  ],
});

const buildEztrMarketJapan = buildEztrMarketReport({
  region: "일본",
  docNo: "DM-MKT-EZTR-JP",
  filename: "eZTR_시장규모와전망_일본.pdf",
  marketOverview:
    "일본은 골프장 · 공원 등 상업 시설 관리 수요가 중심이며, 주택 정원 규모가 미국 대비 작아 소형 데크 위주로 시장이 형성될 것으로 예상됩니다. Yanmar · Kubota · Honda 등 자국 종합 농기계 브랜드의 영향력이 커서, 해외 브랜드보다 로컬 브랜드 중심 채택이 예상됩니다.",
  sizeTable: {
    widths: [90, 110, 110, 170],
    headers: ["연도(예시)", "e-ZTR 대수(예시)", "e-ZTR 매출(예시)", "비고"],
    rows: [
      ["2024", "약 1,200대", "약 20억원", "골프장 · 공공시설 시범 도입 중심"],
      ["2025", "약 1,800대", "약 30억원", "지자체 공원관리 예산 일부 반영"],
      ["2026(추정)", "약 2,600대", "약 43억원", "로컬 브랜드 신모델 출시로 완만한 성장"],
    ],
  },
  players: {
    widths: [80, 90, 90, 210],
    headers: ["회사", "포지셔닝", "가격대(예시)", "특징"],
    rows: [
      ["Yanmar", "프리미엄", "300만~450만원", "골프장 · 조경업체 대상 B2B 영업 강점"],
      ["Kubota", "프리미엄", "320만~470만원", "종합 농기계 딜러망 통한 교차판매"],
      ["Honda", "중가", "250만~380만원", "소형 정원 · 공공시설 대상 라인업 검토"],
    ],
  },
  channels: [
    "농협(JA) 계열 대리점: 지방 공공 · 농업 관련 구매처",
    "홈센터(Kohnan, Cainz 등): Residential 소형 모델 판매",
    "조경 전문 딜러: 골프장 · 공원 관리업체 대상 B2B 상담 판매",
    "온라인: 소형 부속 · 액세서리 위주, 본체는 오프라인 상담 선호",
  ],
  consumerLike:
    "주택 밀집 지역에서 소음 민원 부담이 적음, 실내 격납고(차고) 배기가스 없이 보관 가능.",
  consumerDislike:
    "정원 면적 대비 상대적으로 높은 초기 구입비 체감, 충전 시간 대비 사용 빈도가 낮은 Residential 고객의 낮은 구매 유인.",
  regulation:
    "도시 지역 소음 규제 조례가 저소음 장비에 우호적이나, e-ZTR 전용 보조금은 지자체별로 상이하며 전국 단위 정책은 확인되지 않았습니다(가정).",
  outlook: [
    "상업 시설(골프장 · 공원) 중심의 완만한 성장이 예상되며, Residential 확산은 더딜 것으로 보입니다.",
    "로컬 브랜드(Yanmar · Kubota · Honda)의 자국 딜러망이 진입장벽으로 작용할 가능성이 있습니다.",
    "저소음 특성이 도심 인근 작업 수요에서 차별화 포인트가 될 수 있습니다.",
  ],
});

const buildEztrMarketEurope = buildEztrMarketReport({
  region: "유럽",
  docNo: "DM-MKT-EZTR-EU",
  filename: "eZTR_시장규모와전망_유럽.pdf",
  marketOverview:
    "유럽은 도시별 내연기관 정원장비 사용 제한 움직임과 친환경 소비 성향이 맞물려 전동화 전환 속도가 상대적으로 빠른 지역으로 분류됩니다. Husqvarna · STIHL 등 전통 강자가 배터리 라인을 확대하는 동시에, 로봇 잔디깎이(Robot Mower)와의 대체 경쟁도 함께 고려해야 합니다.",
  sizeTable: {
    widths: [90, 110, 110, 170],
    headers: ["연도(예시)", "e-ZTR 대수(예시)", "e-ZTR 매출(예시)", "비고"],
    rows: [
      ["2024", "약 2,500대", "약 €450만", "독일 · 북유럽 도시 중심 초기 채택"],
      ["2025", "약 3,800대", "약 €680만", "일부 도시 내연기관 사용 제한 확대"],
      ["2026(추정)", "약 5,600대", "약 €1,000만", "조경업체 교체수요 유입"],
    ],
  },
  players: {
    widths: [80, 90, 90, 210],
    headers: ["회사", "포지셔닝", "가격대(예시)", "특징"],
    rows: [
      ["Husqvarna", "프리미엄", "€9K~14K", "배터리 플랫폼(BLi) 공유로 생태계 구축"],
      ["STIHL", "프리미엄", "€8.5K~13K", "딜러 네트워크 기반 B2B 영업 강점"],
      ["Egholm 등 지역 브랜드", "니치/전문", "€10K~20K", "지자체 · 대형 시설 관리용 특화 모델"],
    ],
  },
  channels: [
    "전문 딜러(Fachhändler): 조경 · 농기계 전문매장, Commercial 상담 판매 중심",
    "온라인: 액세서리 · 소형 부속 위주",
    "지자체 조달(공공입찰): 공원 · 도로변 관리용 대량 구매",
    "농기계 종합 대리점: 트랙터 · 관리기와 교차판매",
  ],
  consumerLike:
    "도시 소음 규제 · 친환경 이미지에 부합, 실내 보관 시 배기가스 우려 없음.",
  consumerDislike:
    "로봇 잔디깎이 대비 상대적으로 높은 인건비 필요(자동화 아님), 배터리 가격으로 인한 높은 초기 투자비.",
  regulation:
    "독일 · 프랑스 일부 도시는 특정 시간대 내연기관 정원장비 사용을 제한하는 조례를 운영 중인 것으로 알려져 있어 e-ZTR에 우호적이나, EU 차원의 통일 규제는 확인되지 않았습니다(가정, 국가별 확인 필요).",
  outlook: [
    "도시 규제 확대가 계속될 경우 Commercial 조경업체의 교체 수요가 성장을 견인할 가능성이 있습니다.",
    "로봇 잔디깎이와의 용도 구분(대면적 · 고속 작업은 e-ZTR, 상시 관리는 로봇)이 포지셔닝의 핵심이 될 수 있습니다.",
    "배터리 플랫폼 공유 전략(Husqvarna 등)이 구매 후 확장성 측면에서 경쟁 우위가 될 수 있습니다.",
  ],
});

async function main() {
  const files = await Promise.all([
    buildRobotManual(),
    buildRobotPartsCatalog(),
    buildWarrantyPolicy(),
    buildBatteryWarranty(),
    buildEztrMarketUS(),
    buildEztrMarketJapan(),
    buildEztrMarketEurope(),
  ]);
  files.forEach((f) => console.log("생성됨:", f));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
