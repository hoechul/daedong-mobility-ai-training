import SectionLabel from "./SectionLabel";
import { OVERVIEW_CARDS } from "@/lib/content";

export default function Overview() {
  return (
    <section id="overview" className="mx-auto max-w-6xl px-5 py-20 md:py-24">
      <SectionLabel>OVERVIEW</SectionLabel>
      <h2 className="text-2xl font-extrabold md:text-3xl">교육 개요</h2>
      <p className="mt-3 max-w-2xl text-muted">
        누가, 무엇을 준비해서, 어떻게 60분을 보내는지 한눈에 확인하세요.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {OVERVIEW_CARDS.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-border bg-white p-6 transition-shadow hover:shadow-md"
          >
            <div className="text-2xl">{card.icon}</div>
            <h3 className="mt-4 font-bold">{card.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
