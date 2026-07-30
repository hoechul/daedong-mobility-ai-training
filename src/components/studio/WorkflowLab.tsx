import SectionLabel from "../SectionLabel";
import {
  WORKFLOW_OVERVIEW,
  WORKFLOW_NODE_TYPES,
  WORKFLOW_GUARDRAIL,
  WORKFLOW_CLASSIFY,
  WORKFLOW_AGENT_A,
  WORKFLOW_AGENT_B,
  WORKFLOW_PUBLISH,
  WORKFLOW_TEST_SCENARIOS,
} from "@/lib/studio-content";

function TabHeader({ step, label }: { step: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-light text-sm font-extrabold text-brand">
        {step}
      </span>
      <h3 className="text-lg font-bold">{label}</h3>
    </div>
  );
}

function NodeChip({
  icon,
  label,
  sub,
}: {
  icon: string;
  label: string;
  sub?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-white px-4 py-2.5 text-center shadow-sm">
      <div className="text-sm font-bold">
        {icon} {label}
      </div>
      {sub && <div className="mt-0.5 text-xs text-muted">{sub}</div>}
    </div>
  );
}

export default function WorkflowLab() {
  return (
    <section id="workflow-lab" className="bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        <SectionLabel>실습② · WORKFLOW BUILDER</SectionLabel>
        <h2 className="text-2xl font-extrabold md:text-3xl">
          워크플로우 챗봇 만들기 — 「대동모빌리티 통합 고객상담봇」
        </h2>
        <p className="mt-3 max-w-2xl text-muted">{WORKFLOW_OVERVIEW}</p>

        <div className="mt-10 space-y-6">
          {/* 1. 워크플로우 구조 */}
          <div className="rounded-2xl border border-border bg-white p-6 md:p-8">
            <TabHeader step="1" label="워크플로우 구조" />

            <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-brand/30 bg-brand-light/40 p-6">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <NodeChip icon="▶️" label="Start" />
                <span className="text-muted" aria-hidden>
                  →
                </span>
                <NodeChip icon="🛡️" label="Guardrail" />
                <span className="text-muted" aria-hidden>
                  →
                </span>
                <NodeChip icon="🔀" label="Classify" />
              </div>
              <span className="text-muted" aria-hidden>
                ↓
              </span>
              <div className="flex flex-wrap items-start justify-center gap-8">
                <div className="flex flex-col items-center gap-1.5">
                  <span className="text-xs font-bold text-brand">농기구</span>
                  <NodeChip icon="🚜" label="Agent A" sub="농기구 상담사" />
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <span className="text-xs font-bold text-brand">
                    전기이동차량
                  </span>
                  <NodeChip icon="⚡" label="Agent B" sub="전기이동차량 상담사" />
                </div>
              </div>
              <span className="text-muted" aria-hidden>
                ↓
              </span>
              <NodeChip icon="⏹️" label="End" />
            </div>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[480px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs font-bold uppercase tracking-wide text-muted">
                    <th className="py-2 pr-4">노드 타입</th>
                    <th className="py-2">역할</th>
                  </tr>
                </thead>
                <tbody>
                  {WORKFLOW_NODE_TYPES.map((n) => (
                    <tr key={n.name} className="border-b border-border/60">
                      <td className="py-2.5 pr-4 font-semibold text-foreground/80">
                        {n.name}
                      </td>
                      <td className="py-2.5 text-foreground/70">{n.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 2. 노드별 설정 */}
          <div className="rounded-2xl border border-border bg-white p-6 md:p-8">
            <TabHeader step="2" label="노드별 설정" />

            <div className="mt-6 space-y-6">
              {/* Guardrail */}
              <div>
                <p className="text-sm font-bold text-brand">
                  2-1. Guardrail — 입력 안전 검사
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">
                  {WORKFLOW_GUARDRAIL.desc}
                </p>
                <ul className="mt-2 space-y-1.5">
                  {WORKFLOW_GUARDRAIL.settings.map((s) => (
                    <li
                      key={s.label}
                      className="rounded-lg bg-surface px-3 py-2 text-sm"
                    >
                      <span className="font-semibold text-foreground/80">
                        {s.label}
                      </span>{" "}
                      <span className="text-foreground/70">{s.value}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-muted">
                  ✅ Pass → {WORKFLOW_GUARDRAIL.pass} · ⛔ Fail →{" "}
                  {WORKFLOW_GUARDRAIL.fail}
                </p>
              </div>

              <div className="h-px bg-border" />

              {/* Classify */}
              <div>
                <p className="text-sm font-bold text-brand">
                  2-2. Classify — {WORKFLOW_CLASSIFY.name}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">
                  {WORKFLOW_CLASSIFY.guide}
                </p>
                <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <div className="rounded-lg bg-surface px-3 py-2 text-sm">
                    <span className="font-semibold text-foreground/80">
                      모델
                    </span>{" "}
                    <span className="text-foreground/70">
                      {WORKFLOW_CLASSIFY.model}
                    </span>
                  </div>
                  <div className="rounded-lg bg-surface px-3 py-2 text-sm">
                    <span className="font-semibold text-foreground/80">
                      카테고리_1
                    </span>{" "}
                    <span className="text-foreground/70">
                      {WORKFLOW_CLASSIFY.category1.name} →{" "}
                      {WORKFLOW_CLASSIFY.category1.target}
                    </span>
                  </div>
                  <div className="rounded-lg bg-surface px-3 py-2 text-sm sm:col-span-2">
                    <span className="font-semibold text-foreground/80">
                      카테고리_2
                    </span>{" "}
                    <span className="text-foreground/70">
                      {WORKFLOW_CLASSIFY.category2.name} →{" "}
                      {WORKFLOW_CLASSIFY.category2.target}
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-xs text-muted">
                  ⚠️ {WORKFLOW_CLASSIFY.warning}
                </p>
              </div>

              <div className="h-px bg-border" />

              {/* Agent A */}
              <div>
                <p className="text-sm font-bold text-brand">
                  2-3. {WORKFLOW_AGENT_A.label}
                </p>
                <p className="mt-1.5 text-xs font-bold uppercase tracking-wide text-muted">
                  첨부파일
                </p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {WORKFLOW_AGENT_A.files.map((f) => (
                    <a
                      key={f.name}
                      href={f.file}
                      download={f.name}
                      className="inline-flex items-center gap-1 rounded-full bg-surface px-3 py-1 text-xs font-medium text-foreground/70 hover:bg-brand-light hover:text-brand transition-colors"
                    >
                      📄 {f.name} <span aria-hidden>⬇</span>
                    </a>
                  ))}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                  {WORKFLOW_AGENT_A.promptSummary}
                </p>
              </div>

              <div className="h-px bg-border" />

              {/* Agent B */}
              <div>
                <p className="text-sm font-bold text-brand">
                  2-4. {WORKFLOW_AGENT_B.label}
                </p>
                <p className="mt-1.5 text-xs font-bold uppercase tracking-wide text-muted">
                  첨부파일
                </p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {WORKFLOW_AGENT_B.files.map((f) => (
                    <a
                      key={f.name}
                      href={f.file}
                      download={f.name}
                      className="inline-flex items-center gap-1 rounded-full bg-surface px-3 py-1 text-xs font-medium text-foreground/70 hover:bg-brand-light hover:text-brand transition-colors"
                    >
                      📄 {f.name} <span aria-hidden>⬇</span>
                    </a>
                  ))}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                  {WORKFLOW_AGENT_B.promptSummary}
                </p>
              </div>
            </div>
          </div>

          {/* 3. 검증 · 저장 · 게시 */}
          <div className="rounded-2xl border border-border bg-white p-6 md:p-8">
            <TabHeader step="3" label="검증 · 저장 · 게시" />
            <p className="mt-4 text-sm leading-relaxed text-foreground/80">
              {WORKFLOW_PUBLISH.desc}
            </p>
            <ul className="mt-3 space-y-1.5">
              {WORKFLOW_PUBLISH.warnings.map((w) => (
                <li
                  key={w}
                  className="flex items-start gap-2 text-sm text-foreground/70"
                >
                  <span className="text-brand">⚠️</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. 테스트 시나리오 */}
          <div className="rounded-2xl border border-border bg-white p-6 md:p-8">
            <TabHeader step="4" label="테스트 시나리오 — 분류 동작 확인" />
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs font-bold uppercase tracking-wide text-muted">
                    <th className="py-2 pr-4">입력 예시</th>
                    <th className="py-2 pr-4">기대 분류</th>
                    <th className="py-2">도착 에이전트</th>
                  </tr>
                </thead>
                <tbody>
                  {WORKFLOW_TEST_SCENARIOS.map((t) => (
                    <tr key={t.input} className="border-b border-border/60">
                      <td className="py-2.5 pr-4 text-foreground/80">
                        &ldquo;{t.input}&rdquo;
                      </td>
                      <td className="py-2.5 pr-4 font-semibold text-foreground/80">
                        {t.classify}
                      </td>
                      <td className="py-2.5 font-semibold text-brand">
                        {t.agent}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
