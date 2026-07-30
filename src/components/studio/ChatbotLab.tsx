import SectionLabel from "../SectionLabel";
import PromptBox from "../PromptBox";
import {
  CHATBOT_PROFILE,
  CHATBOT_BEHAVIOR,
  CHATBOT_KNOWLEDGE,
  CHATBOT_SHARE,
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

export default function ChatbotLab() {
  return (
    <section id="chatbot-lab" className="mx-auto max-w-6xl px-5 py-20 md:py-24">
      <SectionLabel>실습① · CHATBOT BUILDER</SectionLabel>
      <h2 className="text-2xl font-extrabold md:text-3xl">
        챗봇 만들기 — 「{CHATBOT_PROFILE.name}」
      </h2>
      <p className="mt-3 max-w-2xl text-muted">
        농기구(관리기 · 예초기 · 운반차) 사용설명서와 AS 정책 문서를 근거로
        사용법 문의부터 고장 조치, AS 접수까지 안내하는 챗봇을 스튜디오에서
        직접 만듭니다. 프로필 → 동작 → 지식 → 공유 탭 순서로 완성합니다.
      </p>

      <div className="mt-10 space-y-6">
        {/* 프로필 탭 */}
        <div className="rounded-2xl border border-border bg-white p-6 md:p-8">
          <TabHeader step="1" label="프로필 탭" />
          <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-muted">
                챗봇 이름
              </p>
              <p className="mt-1 font-semibold">{CHATBOT_PROFILE.name}</p>
              <p className="mt-3 text-xs font-bold uppercase tracking-wide text-muted">
                소개
              </p>
              <p className="mt-1 text-sm leading-relaxed text-foreground/80">
                {CHATBOT_PROFILE.description}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-muted">
                추천 질문 3가지
              </p>
              <ul className="mt-2 space-y-2">
                {CHATBOT_PROFILE.sampleQuestions.map((q) => (
                  <li
                    key={q}
                    className="flex items-start gap-2 rounded-lg bg-surface px-3 py-2 text-sm text-foreground/80"
                  >
                    <span className="text-brand">💬</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 동작 탭 */}
        <div className="rounded-2xl border border-border bg-white p-6 md:p-8">
          <TabHeader step="2" label="동작 탭 — 모델 · 프롬프트" />
          <p className="mt-4 text-sm">
            <span className="font-bold text-brand">사용할 모델 </span>
            {CHATBOT_BEHAVIOR.model}
          </p>

          <div className="mt-4">
            <PromptBox prompt={CHATBOT_BEHAVIOR.prompt} />
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs font-bold uppercase tracking-wide text-muted">
                  <th className="py-2 pr-4">프롬프트 영역</th>
                  <th className="py-2">성능 향상 목적</th>
                </tr>
              </thead>
              <tbody>
                {CHATBOT_BEHAVIOR.promptNotes.map((note) => (
                  <tr key={note.area} className="border-b border-border/60">
                    <td className="py-2.5 pr-4 font-semibold text-foreground/80">
                      {note.area}
                    </td>
                    <td className="py-2.5 text-foreground/70">
                      {note.purpose}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 지식 탭 */}
        <div className="rounded-2xl border border-border bg-white p-6 md:p-8">
          <TabHeader step="3" label="지식 탭 — 첨부 파일 · 커넥터" />

          <p className="mt-4 text-sm leading-relaxed text-foreground/80">
            {CHATBOT_KNOWLEDGE.filesIntro}
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs font-bold uppercase tracking-wide text-muted">
                  <th className="py-2 pr-4">첨부 문서</th>
                  <th className="py-2">주요 내용</th>
                </tr>
              </thead>
              <tbody>
                {CHATBOT_KNOWLEDGE.files.map((file) => (
                  <tr key={file.name} className="border-b border-border/60">
                    <td className="py-2.5 pr-4 font-semibold text-foreground/80">
                      📄 {file.name}
                    </td>
                    <td className="py-2.5 text-foreground/70">{file.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 rounded-xl bg-brand-light px-4 py-3">
            <p className="text-xs font-bold text-brand">🔌 커넥터 (실시간 데이터 연동)</p>
            <p className="mt-1 text-sm leading-relaxed text-foreground/80">
              {CHATBOT_KNOWLEDGE.connector.intro}
            </p>
            <ol className="mt-2 space-y-1 text-sm text-foreground/80">
              {CHATBOT_KNOWLEDGE.connector.steps.map((step, i) => (
                <li key={step} className="flex gap-2">
                  <span className="font-bold text-brand">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* 공유 탭 */}
        <div className="rounded-2xl border border-border bg-white p-6 md:p-8">
          <TabHeader step="4" label="공유 탭 — 협업 · 배포" />

          <p className="mt-4 text-sm leading-relaxed text-foreground/80">
            {CHATBOT_SHARE.collaboration}
          </p>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {CHATBOT_SHARE.roles.map((r) => (
              <div
                key={r.role}
                className="rounded-lg border border-border bg-surface px-4 py-3"
              >
                <p className="text-sm font-bold text-brand">{r.role}</p>
                <p className="mt-1 text-sm text-foreground/70">{r.desc}</p>
              </div>
            ))}
          </div>

          <p className="mt-4 rounded-lg bg-brand-light px-3 py-2.5 text-sm leading-relaxed text-foreground/80">
            🏬 {CHATBOT_SHARE.sharing}
          </p>
        </div>
      </div>
    </section>
  );
}
