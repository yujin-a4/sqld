import Link from "next/link";
import { CHAPTERS } from "@/data/chapters";
import { QUESTIONS } from "@/data/questions";

export default function QuizHome() {
  const chapters1 = CHAPTERS.filter((c) => c.subject === 1);
  const chapters2 = CHAPTERS.filter((c) => c.subject === 2);

  function ChapterList({ chapters }: { chapters: typeof CHAPTERS }) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {chapters.map((ch) => {
          const qs = QUESTIONS.filter((q) => q.chapterId === ch.id);
          const binchul = qs.filter((q) => q.difficulty === "빈출").length;
          return (
            <Link
              key={ch.id}
              href={qs.length > 0 ? `/quiz/${ch.id}` : "#"}
              style={{
                display: "flex",
                alignItems: "center",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                padding: "14px 20px",
                textDecoration: "none",
                opacity: qs.length === 0 ? 0.5 : 1,
                cursor: qs.length === 0 ? "not-allowed" : "pointer",
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 2 }}>
                  {ch.title}
                </div>
                <div style={{ fontSize: 12, color: "var(--text3)" }}>{ch.description}</div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
                {binchul > 0 && (
                  <span style={{ fontSize: 11, background: "var(--red-light)", color: "var(--red)", padding: "2px 7px", borderRadius: 4, fontWeight: 700 }}>
                    빈출 {binchul}
                  </span>
                )}
                <span style={{ fontSize: 13, fontWeight: 700, color: qs.length > 0 ? "var(--primary)" : "var(--text3)" }}>
                  {qs.length > 0 ? `${qs.length}문항 →` : "준비 중"}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px" }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6, letterSpacing: "-0.02em" }}>문제은행</h1>
      <p style={{ color: "var(--text2)", fontSize: 14, marginBottom: 36 }}>
        단원을 선택해서 문제를 풀어보세요. 풀이 후 AI 해설도 받을 수 있어요.
      </p>

      <section style={{ marginBottom: 36 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <span style={{ background: "var(--primary)", color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 4 }}>1과목</span>
          <h2 style={{ fontSize: 16, fontWeight: 700 }}>데이터 모델링의 이해</h2>
          <span style={{ fontSize: 12, color: "var(--text3)" }}>16문항 출제</span>
        </div>
        <ChapterList chapters={chapters1} />
      </section>

      <section>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <span style={{ background: "var(--green)", color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 4 }}>2과목</span>
          <h2 style={{ fontSize: 16, fontWeight: 700 }}>SQL 기본 및 활용</h2>
          <span style={{ fontSize: 12, color: "var(--text3)" }}>24문항 출제</span>
        </div>
        <ChapterList chapters={chapters2} />
      </section>
    </div>
  );
}
