import SectionLabel from "./SectionLabel";
import { RESOURCES } from "@/lib/content";

export default function Resources() {
  return (
    <section id="resources" className="bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        <SectionLabel>RESOURCES</SectionLabel>
        <h2 className="text-2xl font-extrabold md:text-3xl">자료 · 매뉴얼</h2>
        <p className="mt-3 max-w-2xl text-muted">
          교육이 끝난 뒤에도 다시 찾아볼 수 있는 자료입니다.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {RESOURCES.map((res) => (
            <a
              key={res.title}
              href={res.href}
              target={res.external ? "_blank" : undefined}
              rel={res.external ? "noreferrer" : undefined}
              className="group rounded-2xl border border-border bg-white p-6 transition-shadow hover:shadow-md"
            >
              <div className="text-2xl">{res.icon}</div>
              <h3 className="mt-4 flex items-center gap-1 font-bold">
                {res.title}
                <span className="text-muted transition-transform group-hover:translate-x-0.5">
                  ↗
                </span>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {res.desc}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
