export default function SectionLabel({ children }: { children: string }) {
  return (
    <span className="inline-block text-xs font-bold tracking-[0.2em] text-brand mb-3">
      {children}
    </span>
  );
}
