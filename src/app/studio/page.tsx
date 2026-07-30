import type { Metadata } from "next";
import Header from "@/components/Header";
import Overview from "@/components/Overview";
import Tips from "@/components/Tips";
import Resources from "@/components/Resources";
import Footer from "@/components/Footer";
import StudioHero from "@/components/studio/StudioHero";
import ChatbotLab from "@/components/studio/ChatbotLab";
import WorkflowLab from "@/components/studio/WorkflowLab";
import {
  STUDIO_NAV_LINKS,
  STUDIO_OVERVIEW_CARDS,
  STUDIO_TIPS,
  STUDIO_RESOURCES,
} from "@/lib/studio-content";

export const metadata: Metadata = {
  title: "챗봇 · 워크플로우 만들기 심화 실습 | 대동모빌리티 AI 스튜디오",
  description:
    "대동모빌리티 농기구 · 전기이동차량 사업부 실제 사례로 AI 챗봇과 워크플로우를 직접 설계해보는 심화 실습 페이지입니다.",
};

export default function StudioPage() {
  return (
    <>
      <Header
        navLinks={STUDIO_NAV_LINKS}
        ctaHref="#chatbot-lab"
        ctaLabel="실습 시작하기"
        logoHref="/"
      />
      <main className="flex-1">
        <StudioHero />
        <Overview
          id="studio-overview"
          label="STUDIO OVERVIEW"
          title="심화 실습 개요"
          subtitle="어떤 챗봇을 왜, 어떤 순서로 만드는지 한눈에 확인하세요."
          cards={STUDIO_OVERVIEW_CARDS}
        />
        <ChatbotLab />
        <WorkflowLab />
        <Tips
          id="studio-tips"
          title="스튜디오 실습 주의사항"
          subtitle="챗봇 · 워크플로우를 설계할 때 꼭 지켜야 할 6가지입니다."
          items={STUDIO_TIPS}
        />
        <Resources
          id="studio-resources"
          title="자료 · 바로가기"
          subtitle="실습을 마친 뒤에도 다시 찾아볼 수 있는 자료입니다."
          items={STUDIO_RESOURCES}
        />
      </main>
      <Footer />
    </>
  );
}
