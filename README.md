# 대동모빌리티 생성형 AI 실무 활용 실습 교육 (60분)

대동모빌리티(daedongmobility.co.kr) 임직원을 위한 60분짜리 생성형 AI 실습 교육 랜딩페이지입니다.
실습 중심(약 65%)으로 구성되어 있으며, ChatGPT · Claude · Gemini를 활용해 업무 보고서 작성,
품질/공정 데이터 요약, 사내·거래처 커뮤니케이션까지 직접 실습합니다.

## 스택

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Pretendard 웹폰트
- Vercel 배포

> Windows 경로에 한글(예: `클로드.강의`)이 포함되면 Turbopack이 크래시하는 알려진 버그가 있어,
> `dev`/`build` 스크립트에 `--webpack` 플래그를 명시했습니다.

## 브랜드

- 로고 · 파비콘: 대동모빌리티 공식 홈페이지 에셋 기반
- 메인 컬러: `#EF4123` (대동모빌리티 공식 사이트 CSS에서 추출)

## 개발

```bash
npm install
npm run dev
```

http://localhost:3000 에서 확인합니다.

## 배포

```bash
npm run build
vercel --prod
```
