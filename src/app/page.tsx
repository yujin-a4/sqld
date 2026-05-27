import Link from "next/link";
import { CHAPTERS } from "@/data/chapters";
import { QUESTIONS } from "@/data/questions";

export default function Home() {
  const totalQ = QUESTIONS.length;
  const chapters1 = CHAPTERS.filter((c) => c.subject === 1);
  const chapters2 = CHAPTERS.filter((c) => c.subject === 2);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>
      {/* 히어로 */}
      <div style={{ marginBottom: 48, textAlign: "center" }}>
        <div
          style={{
            display: "inline-block",
            background: "var(--primary-light)",
            color: "var(--primary)",
            fontSize: 12,
            fontWeight: 700,
            padding: "4px 12px",
            borderRadius: 20,
            letterSpacing: ".06em",
            marginBottom: 16,
          }}
        >
          국가공인 자격증 대비
        </div>
        <h1
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: "var(--text)",
            lineHeight: 1.25,
            marginBottom: 12,
            letterSpacing: "-0.02em",
          }}
        >
          SQLD 시험,<br />
          <span style={{ color: "var(--primary)" }}>문제 풀이부터 AI 해설까지</span>
        </h1>
        <p style={{ color: "var(--text2)", fontSize: 16, marginBottom: 28 }}>
          {totalQ}문항 문제은행 · 실전 모의고사(40문항/50분) · Claude AI 해설
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/exam"
            style={{
              background: "var(--primary)",
              color: "#fff",
              padding: "12px 28px",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 15,
              textDecoration: "none",
            }}
          >
            모의고사 시작 →
          </Link>
          <Link
            href="/quiz"
            style={{
              background: "var(--surface)",
              color: "var(--primary)",
              border: "1.5px solid var(--primary)",
              padding: "12px 28px",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 15,
              textDecoration: "none",
            }}
          >
            단원별 문제 풀기
          </Link>
        </div>
      </div>

      {/* 스탯 카드 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
          marginBottom: 48,
        }}
      >
        {[
          { label: "총 문항", value: `${totalQ}문항`, sub: "지속 업데이트 중" },
          { label: "시험 범위", value: `${CHAPTERS.length}단원`, sub: "1과목 + 2과목 전범위" },
          { label: "AI 해설", value: "Claude", sub: "틀린 문제 즉시 설명" },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              padding: "20px 24px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 11, color: "var(--text3)", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "var(--primary)", letterSpacing: "-0.02em" }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 4 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* 과목별 목차 */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: "var(--text)" }}>
          📚 1과목 — 데이터 모델링의 이해
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10 }}>
          {chapters1.map((ch) => {
            const count = QUESTIONS.filter((q) => q.chapterId === ch.id).length;
            return (
              <Link
                key={ch.id}
                href={`/quiz/${ch.id}`}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  padding: "14px 18px",
                  textDecoration: "none",
                  display: "block",
                  transition: "border-color .15s",
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 4 }}>{ch.title}</div>
                <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 8 }}>{ch.description}</div>
                <div style={{ fontSize: 12, color: count > 0 ? "var(--primary)" : "var(--text3)", fontWeight: 600 }}>
                  {count > 0 ? `${count}문항` : "준비 중"}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: "var(--text)" }}>
          🗄️ 2과목 — SQL 기본 및 활용
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10 }}>
          {chapters2.map((ch) => {
            const count = QUESTIONS.filter((q) => q.chapterId === ch.id).length;
            return (
              <Link
                key={ch.id}
                href={`/quiz/${ch.id}`}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  padding: "14px 18px",
                  textDecoration: "none",
                  display: "block",
                  transition: "border-color .15s",
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 4 }}>{ch.title}</div>
                <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 8 }}>{ch.description}</div>
                <div style={{ fontSize: 12, color: count > 0 ? "var(--primary)" : "var(--text3)", fontWeight: 600 }}>
                  {count > 0 ? `${count}문항` : "준비 중"}
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
