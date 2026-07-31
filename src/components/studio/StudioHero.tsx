import Link from "next/link";
import { STUDIO_HERO_STATS } from "@/lib/studio-content";

export default function StudioHero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-foreground pt-[72px] text-white"
    >
      <div
        className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--brand)" }}
      />
      <div className="relative mx-auto max-w-6xl px-5 py-20 md:py-28">
        <span className="inline-block rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-bold tracking-[0.15em] text-white/70">
          DAEDONG MOBILITY · AI STUDIO LAB
        </span>

        <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">
          나만의 업무봇, <br className="hidden md:block" />
          <span className="text-brand">챗봇 · 워크플로우</span>로 직접 만들기
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
          60분 기초 실습을 마쳤다면, 이제 AI 스튜디오에서 대동모빌리티
          모빌리티사업부(e-스쿠터 · 골프카트 · 운반로봇) 사례로 실제 상담봇을
          설계해 봅니다. 실습①은 챗봇 한 개 만들기, 실습②는 두 제품 라인을
          하나로 통합하는 워크플로우 챗봇입니다.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 md:max-w-2xl">
          {STUDIO_HERO_STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-center"
            >
              <div className="text-2xl">{stat.icon}</div>
              <div className="mt-2 text-base font-bold">{stat.value}</div>
              <div className="mt-0.5 text-xs text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#chatbot-lab"
            className="inline-flex items-center justify-center rounded-full bg-brand px-7 py-3.5 text-sm font-bold text-white hover:bg-brand-dark transition-colors"
          >
            실습① 챗봇 만들기
          </a>
          <a
            href="#workflow-lab"
            className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition-colors"
          >
            실습② 워크플로우 만들기
          </a>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-1 rounded-full px-7 py-3.5 text-sm font-bold text-white/70 hover:text-white transition-colors"
          >
            ← 60분 기초 실습으로
          </Link>
        </div>
      </div>
    </section>
  );
}
