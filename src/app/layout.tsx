import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "대동모빌리티 생성형 AI 실무 활용 실습 교육 | 60분 완성",
  description:
    "대동모빌리티 임직원을 위한 60분 생성형 AI 실습 교육. 보고서 작성, 데이터 정리, 사내 커뮤니케이션까지 현장에서 바로 쓰는 AI 활용법을 실습 중심으로 배웁니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
