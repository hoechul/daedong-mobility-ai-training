import { HERO_STATS } from "@/lib/content";

export default function Hero() {
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
          DAEDONG MOBILITY · AI PRACTICE TRAINING
        </span>

        <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">
          생성형 AI, <br className="hidden md:block" />
          <span className="text-brand">현장 실무</span>에 바로 쓰는 법
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
          60분 안에 끝내는 대동모빌리티 임직원 실습형 AI 교육입니다.
          이론은 짧게, 실습은 길게 — 보고서 작성부터 데이터 정리, 거래처
          커뮤니케이션까지 오늘 바로 업무에 적용해 보세요.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 md:max-w-2xl">
          {HERO_STATS.map((stat) => (
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
            href="#curriculum"
            className="inline-flex items-center justify-center rounded-full bg-brand px-7 py-3.5 text-sm font-bold text-white hover:bg-brand-dark transition-colors"
          >
            60분 커리큘럼 보기
          </a>
          <a
            href="#practice"
            className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition-colors"
          >
            실습 미션 3가지 미리보기
          </a>
          <a
            href="#resources"
            className="inline-flex items-center justify-center gap-1 rounded-full px-7 py-3.5 text-sm font-bold text-white/70 hover:text-white transition-colors"
          >
            자료 다운로드 <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
