import SectionLabel from "./SectionLabel";
import { TOOLS } from "@/lib/content";

export default function ToolCompare() {
  return (
    <section id="tools" className="bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        <SectionLabel>AI TOOL GUIDE</SectionLabel>
        <h2 className="text-2xl font-extrabold md:text-3xl">
          AI 도구 비교 &mdash; 무엇을 쓸까요?
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          세 가지 대표 생성형 AI의 강점과 대동모빌리티 업무 추천 활용처를
          비교해 보세요. 오늘 실습은 무료 요금제만으로 충분합니다.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {TOOLS.map((tool) => (
            <div
              key={tool.name}
              className="rounded-2xl border border-border bg-white p-6"
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: tool.color }}
                />
                <h3 className="text-lg font-bold">{tool.name}</h3>
                <span className="text-xs text-muted">{tool.maker}</span>
              </div>

              <div className="mt-4 text-sm">
                <p className="font-semibold text-foreground/80">강점</p>
                <p className="mt-1 leading-relaxed text-muted">
                  {tool.strength}
                </p>
              </div>

              <div className="mt-4 text-sm">
                <p className="font-semibold text-foreground/80">추천 업무</p>
                <p className="mt-1 leading-relaxed text-muted">
                  {tool.bestFor}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-brand/20 bg-brand-light px-6 py-5 text-sm leading-relaxed text-foreground/80">
          💳 <strong>크레딧 절약 팁</strong> — 세 서비스 모두 무료 요금제로
          오늘 실습에 필요한 4가지 미션을 전부 진행할 수 있습니다. 결과가
          부족하면 프롬프트에 &ldquo;표로 정리해줘&rdquo;, &ldquo;3줄로
          요약해줘&rdquo;처럼 형식을 구체적으로 지정해 다시 시도해 보세요.
        </div>
      </div>
    </section>
  );
}
