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
// 1. 관리기 사용설명서
// ---------------------------------------------------------------------------
async function buildManagerManual() {
  const doc = newDoc();
  header(doc, {
    title: "관리기 사용설명서",
    subtitle: "대동모빌리티 농기구 사업부 · 모델 DK-750 관리기",
    docNo: "DM-AG-001",
  });

  heading(doc, "1. 제품 개요");
  paragraph(
    doc,
    "DK-750 관리기는 밭갈이, 이랑 성형, 로터리 작업에 사용하는 보행형 농업기계입니다. 가솔린 4행정 엔진(7.5마력급)을 탑재하며, 전진 2단·후진 1단 변속 레버로 작업 속도를 조절합니다. 처음 사용하기 전 반드시 본 설명서와 엔진 취급설명서를 함께 숙지하십시오."
  );

  heading(doc, "2. 안전수칙");
  bullets(doc, [
    "회전 경운날에 옷자락·장갑이 말려 들어갈 수 있으니 작업 중 헐렁한 복장을 착용하지 않습니다.",
    "시동 전 안전핀과 클러치 레버가 정상 위치인지 반드시 확인합니다.",
    "엔진 가동 중 소음기·실린더 등 고온부에 직접 접촉하지 않습니다.",
    "경사지·습지에서는 전도 위험이 있으므로 저속(1단)으로만 작업합니다.",
    "연료 주입은 반드시 엔진 정지 후, 화기가 없는 장소에서 실시합니다.",
  ]);

  heading(doc, "3. 시동 및 조작법");
  bullets(doc, [
    "① 연료 콕을 열고 초크 레버를 닫음(冷간 시동 시) 위치로 조작합니다.",
    "② 변속 레버를 중립에 두고 리코일 스타터 손잡이를 천천히 당겨 저항을 확인한 뒤 강하게 당깁니다.",
    "③ 시동 후 30초~1분간 워밍업하며 초크 레버를 서서히 원위치로 되돌립니다.",
    "④ 전진/후진 레버와 경운 클러치 레버를 조작해 작업을 시작합니다.",
    "⑤ 작업 종료 시 클러치를 해제하고 스로틀을 저속으로 낮춘 뒤 엔진 스위치를 OFF 합니다.",
  ]);

  heading(doc, "4. 정기점검 항목");
  table(doc, {
    widths: [90, 130, 230],
    headers: ["점검주기", "점검 항목", "점검 내용"],
    rows: [
      ["매 사용 전", "엔진오일 · 연료량", "규정량 유지 확인, 누유 여부 점검"],
      ["매 사용 전", "경운날 · 볼트 체결", "마모·파손 및 볼트 풀림 여부 확인"],
      ["20시간마다", "에어클리너", "먼지 제거, 심한 오염 시 교체"],
      ["50시간마다", "엔진오일 교환", "규정 오일로 전량 교환"],
      ["100시간마다", "점화플러그", "전극 간극 점검, 그을음 제거"],
      ["시즌 종료 후", "연료계통", "연료 배출 후 건조 보관"],
    ],
  });

  heading(doc, "5. 고장 코드표");
  table(doc, {
    widths: [110, 160, 180],
    headers: ["증상", "예상 원인", "조치 방법"],
    rows: [
      ["시동이 걸리지 않음", "연료 부족, 점화플러그 오염", "연료 보충, 플러그 청소·교체"],
      ["시동 중 정지", "연료 필터 막힘", "필터 청소 또는 교체"],
      ["경운날 회전 불량", "클러치 벨트 이완", "벨트 장력 조정, 마모 시 교체"],
      ["과도한 진동·소음", "경운날 마모 불균형", "날 세트 교체, 볼트 재체결"],
      ["매연 과다", "엔진오일 과다 주입", "규정량으로 오일량 조정"],
    ],
  });

  footer(
    doc,
    "본 문서는 대동모빌리티 AI 실습 교육을 위해 제작된 예시 자료로, 국내 동종 보행형 관리기 사용설명서의 일반적인 구성을 참고해 작성했습니다. 실제 정비·수리는 반드시 가까운 대동모빌리티 대리점 또는 AS센터를 통해 진행하십시오."
  );

  return saveDoc(doc, "관리기_사용설명서.pdf");
}

// ---------------------------------------------------------------------------
// 2. 예초기 사용설명서
// ---------------------------------------------------------------------------
async function buildMowerManual() {
  const doc = newDoc();
  header(doc, {
    title: "예초기 사용설명서",
    subtitle: "대동모빌리티 농기구 사업부 · 모델 DH-330 배부식 예초기",
    docNo: "DM-AG-002",
  });

  heading(doc, "1. 제품 개요");
  paragraph(
    doc,
    "DH-330 예초기는 2행정 혼합유 엔진을 탑재한 배부식 예초기로, 과수원·밭두렁·공한지 제초 작업에 사용합니다. 나일론 커터 또는 금속 회전날을 장착할 수 있으며, 작업 목적에 맞는 날을 선택해 사용합니다."
  );

  heading(doc, "2. 안전수칙");
  bullets(doc, [
    "칼날 반경 15m 이내에는 작업자 외 다른 사람이나 동물을 접근시키지 않습니다.",
    "보안경, 안전화, 무릎까지 오는 보호복을 반드시 착용합니다.",
    "돌·이물질이 많은 지역에서는 금속날 대신 나일론 커터 사용을 권장합니다.",
    "엔진 가동 중 연료를 보충하지 않으며, 급유 전 5분 이상 엔진을 식힙니다.",
    "작업 중 칼날이 튀는 반동(킥백)에 대비해 항상 양손으로 손잡이를 고정합니다.",
  ]);

  heading(doc, "3. 시동 및 조작법");
  bullets(doc, [
    "① 연료 콕을 열고 프라이머 펌프를 5~7회 눌러 연료를 공급합니다.",
    "② 초크를 닫고 스로틀을 저속 고정한 뒤 리코일 스타터를 당겨 시동합니다.",
    "③ 시동 후 초크를 해제하고 1~2분간 저속으로 워밍업합니다.",
    "④ 어깨 하네스 길이를 조정해 칼날이 지면과 수평이 되도록 맞춥니다.",
    "⑤ 작업 종료 후 스로틀을 저속으로 낮추고 정지 스위치로 엔진을 끕니다.",
  ]);

  heading(doc, "4. 칼날 교체 주기");
  table(doc, {
    widths: [120, 120, 160],
    headers: ["부품", "권장 교체 주기", "비고"],
    rows: [
      ["금속 회전날(3도, 4도)", "50시간 또는 6개월", "날 끝 마모·균열 시 즉시 교체"],
      ["나일론 커터 코드", "20시간 또는 소모 시", "예비 코드 상시 비치 권장"],
      ["보호 커버", "1년", "균열·파손 확인 후 교체"],
    ],
  });

  heading(doc, "5. 엔진오일 규격");
  table(doc, {
    widths: [120, 120, 160],
    headers: ["구분", "규격", "혼합비"],
    rows: [
      ["혼합유", "무연 휘발유 + 2행정 전용유", "25 : 1 (권장)"],
      ["엔진오일 등급", "FD급 이상 2행정 오일", "-"],
      ["기어박스 그리스", "리튬계 그리스", "20시간마다 소량 보충"],
    ],
  });

  footer(
    doc,
    "본 문서는 대동모빌리티 AI 실습 교육을 위해 제작된 예시 자료로, 국내 동종 배부식 예초기 사용설명서의 일반적인 구성을 참고해 작성했습니다. 실제 정비·수리는 반드시 가까운 대동모빌리티 대리점 또는 AS센터를 통해 진행하십시오."
  );

  return saveDoc(doc, "예초기_사용설명서.pdf");
}

// ---------------------------------------------------------------------------
// 3. 농기구 부품 카탈로그
// ---------------------------------------------------------------------------
async function buildPartsCatalog() {
  const doc = newDoc();
  header(doc, {
    title: "농기구 부품 카탈로그",
    subtitle: "관리기 · 예초기 소모품 및 교체 부품 안내",
    docNo: "DM-AG-003",
  });

  heading(doc, "1. 관리기(DK-750) 소모품");
  table(doc, {
    widths: [70, 140, 100, 90, 100],
    headers: ["품번", "품명", "적용 모델", "참고가격", "취급 대리점"],
    rows: [
      ["DK750-A11", "경운날 세트(6매)", "DK-750", "89,000원", "전국 대동 대리점"],
      ["DK750-B04", "구동 벨트", "DK-750", "34,000원", "전국 대동 대리점"],
      ["DK750-C02", "에어클리너 엘리먼트", "DK-750", "12,000원", "전국 대동 대리점"],
      ["DK750-D07", "점화플러그", "DK-750", "8,500원", "전국 대동 대리점"],
      ["DK750-E01", "엔진오일(1L, 4행정용)", "DK-750", "15,000원", "전국 대동 대리점"],
    ],
  });

  heading(doc, "2. 예초기(DH-330) 소모품");
  table(doc, {
    widths: [70, 140, 100, 90, 100],
    headers: ["품번", "품명", "적용 모델", "참고가격", "취급 대리점"],
    rows: [
      ["DH330-A03", "금속 회전날(4도)", "DH-330", "18,000원", "전국 대동 대리점"],
      ["DH330-A05", "나일론 커터 코드(10m)", "DH-330", "6,000원", "전국 대동 대리점"],
      ["DH330-B02", "보호 커버", "DH-330", "22,000원", "전국 대동 대리점"],
      ["DH330-C01", "2행정 혼합유(1L)", "DH-330", "9,000원", "전국 대동 대리점"],
      ["DH330-D04", "어깨 하네스", "DH-330", "27,000원", "전국 대동 대리점"],
    ],
  });

  heading(doc, "3. 주문 및 취급 안내");
  bullets(doc, [
    "표기 가격은 2026년 기준 권장 소비자가이며, 대리점별로 변동될 수 있습니다.",
    "부품 주문은 가까운 대동모빌리티 대리점 또는 고객지원 온라인 문의를 통해 접수합니다.",
    "순정 부품이 아닌 사제 부품 사용 시 무상보증 대상에서 제외될 수 있습니다.",
  ]);

  footer(
    doc,
    "본 문서는 대동모빌리티 AI 실습 교육을 위해 제작된 예시 자료입니다. 실제 품번·가격·재고는 가까운 대동모빌리티 대리점에 문의해 확인하십시오."
  );

  return saveDoc(doc, "농기구_부품_카탈로그.pdf");
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

  heading(doc, "2. 농기구(관리기 · 예초기) 보증");
  paragraph(
    doc,
    "전동카트와 동일한 기준으로 구입일로부터 1년간 무상보증을 적용합니다. 엔진 본체·변속 클러치·프레임 결함은 무상 대상이며, 소모품(칼날, 벨트, 필터, 점화플러그 등)은 정상 마모 시 보증에서 제외됩니다."
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
    "본 문서는 대동모빌리티 공식 홈페이지(daedongmobility.co.kr) 「품질보증 안내」, 「정비 점검 가이드」 페이지 공개 내용을 바탕으로 요약했으며, 농기구(관리기·예초기) 관련 항목은 전동카트 보증 정책을 준용해 작성한 실습용 예시입니다. 정확한 보증조건은 반드시 공식 홈페이지 또는 대리점에서 확인하십시오."
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

async function main() {
  const files = await Promise.all([
    buildManagerManual(),
    buildMowerManual(),
    buildPartsCatalog(),
    buildWarrantyPolicy(),
    buildBatteryWarranty(),
  ]);
  files.forEach((f) => console.log("생성됨:", f));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
