import SectionLabel from "./SectionLabel";
import PromptBox from "./PromptBox";
import { PRACTICE_MISSIONS } from "@/lib/content";

export default function Practice() {
  return (
    <section id="practice" className="bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        <SectionLabel>FEATURES · HANDS-ON</SectionLabel>
        <h2 className="text-2xl font-extrabold md:text-3xl">
          실습 미션 4가지
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          아래 프롬프트를 그대로 복사해서 AI 도구에 붙여넣고, 결과를 우리
          업무 상황에 맞게 다듬어 보세요. 미션 4는 프로젝트 기능을 활용한
          심화 리서치 실습입니다.
        </p>

        <div className="mt-10 space-y-6">
          {PRACTICE_MISSIONS.map((mission) => (
            <div
              key={mission.id}
              id={mission.id}
              className="grid grid-cols-1 gap-6 rounded-2xl border border-border bg-white p-6 md:grid-cols-2 md:p-8"
            >
              <div>
                <span className="text-xs font-bold tracking-wide text-brand">
                  {mission.tag}
                </span>
                <h3 className="mt-2 flex items-center gap-2 text-lg font-bold">
                  <span className="text-xl">{mission.icon}</span>
                  {mission.title}
                </h3>

                <ul className="mt-4 space-y-2">
                  {mission.checklist.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-foreground/80"
                    >
                      <span className="mt-0.5 text-brand">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-4 rounded-lg bg-brand-light px-3 py-2.5 text-xs leading-relaxed text-foreground/70">
                  ⚠️ {mission.note}
                </p>

                {mission.downloads && (
                  <div className="mt-4">
                    <p className="text-xs font-bold text-foreground/70">
                      {mission.downloads.label}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {mission.downloads.files.map((f) => (
                        <a
                          key={f.file}
                          href={f.file}
                          download
                          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold text-foreground/80 hover:border-brand hover:text-brand transition-colors"
                        >
                          <span>{f.flag}</span>
                          {f.label} PDF
                          <span aria-hidden>↓</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <PromptBox prompt={mission.prompt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
