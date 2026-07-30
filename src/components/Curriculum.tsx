import SectionLabel from "./SectionLabel";
import { CURRICULUM } from "@/lib/content";

export default function Curriculum() {
  return (
    <section id="curriculum" className="mx-auto max-w-6xl px-5 py-20 md:py-24">
      <SectionLabel>CURRICULUM</SectionLabel>
      <h2 className="text-2xl font-extrabold md:text-3xl">
        60분 실습 커리큘럼
      </h2>
      <p className="mt-3 max-w-2xl text-muted">
        이론 15분, 실습 40분, 마무리 5분 &mdash; 6단계로 진행합니다.
      </p>

      <ol className="mt-10 space-y-4">
        {CURRICULUM.map((item) => (
          <li
            key={item.step}
            className="flex flex-col gap-4 rounded-2xl border border-border bg-white p-6 sm:flex-row sm:items-center"
          >
            <div className="flex shrink-0 items-center gap-4 sm:w-40 sm:flex-col sm:items-start sm:gap-1">
              <span className="text-3xl font-extrabold text-brand/25">
                {item.step}
              </span>
              <div>
                <p className="text-sm font-bold">{item.time}</p>
                <p className="text-xs text-muted">{item.duration}</p>
              </div>
            </div>

            <div className="hidden h-12 w-px bg-border sm:block" />

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xl">{item.icon}</span>
                <h3 className="font-bold">{item.title}</h3>
              </div>
              <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-brand">
                {item.subtitle}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.desc}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
