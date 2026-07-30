import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-white/60">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <Image
          src="/images/daedong-logo-white.svg"
          alt="대동모빌리티"
          width={150}
          height={19}
          className="h-5 w-auto opacity-90"
        />
        <p className="mt-5 text-sm leading-relaxed">
          (주)대동모빌리티 · 경기도 안성시 (본사/공장) · 대구광역시 달성군
          (제2공장)
        </p>
        <p className="mt-1 text-xs">
          본 페이지는 임직원 대상 생성형 AI 실습 교육을 위해 제작된 사내
          교육용 자료입니다.
        </p>
        <p className="mt-4 text-xs text-white/40">
          &copy; {new Date().getFullYear()} Daedong Mobility Corp. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
