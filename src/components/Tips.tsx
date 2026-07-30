import SectionLabel from "./SectionLabel";
import { TIPS } from "@/lib/content";

export default function Tips() {
  return (
    <section id="tips" className="mx-auto max-w-6xl px-5 py-20 md:py-24">
      <SectionLabel>TIPS</SectionLabel>
      <h2 className="text-2xl font-extrabold md:text-3xl">활용 팁 &amp; 유의사항</h2>
      <p className="mt-3 max-w-2xl text-muted">
        실습을 마친 뒤에도 현업에서 꼭 기억해야 할 6가지입니다.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TIPS.map((tip) => (
          <div
            key={tip.text}
            className="flex items-start gap-3 rounded-2xl border border-border bg-white p-5"
          >
            <span className="text-xl leading-none">{tip.icon}</span>
            <p className="text-sm leading-relaxed text-foreground/80">
              {tip.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
