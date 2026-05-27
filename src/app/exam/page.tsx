import Link from "next/link";
import { QUESTIONS } from "@/data/questions";

export default function ExamHome() {
  const sub1Count = QUESTIONS.filter((q) => q.chapterId.startsWith("1")).length;
  const sub2Count = QUESTIONS.filter((q) => q.chapterId.startsWith("2")).length;

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "60px 24px" }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 6, letterSpacing: "-0.02em" }}>모의고사</h1>
      <p style={{ color: "var(--text2)", fontSize: 14, marginBottom: 36 }}>
        실제 SQLD 시험 환경을 그대로 재현합니다. 40문항 · 50분
      </p>

      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          padding: "28px",
          marginBottom: 20,
        }}
      >
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>시험 구성</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              <th style={{ textAlign: "left", padding: "8px 0", color: "var(--text2)", fontWeight: 600, width: "40%" }}>과목</th>
              <th style={{ textAlign: "center", padding: "8px 0", color: "var(--text2)", fontWeight: 600 }}>문항 수</th>
              <th style={{ textAlign: "center", padding: "8px 0", color: "var(--text2)", fontWeight: 600 }}>배점</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              <td style={{ padding: "10px 0" }}>1과목: 데이터 모델링</td>
              <td style={{ textAlign: "center" }}>16문항</td>
              <td style={{ textAlign: "center" }}>40점</td>
            </tr>
            <tr>
              <td style={{ padding: "10px 0" }}>2과목: SQL 기본 및 활용</td>
              <td style={{ textAlign: "center" }}>24문항</td>
              <td style={{ textAlign: "center" }}>60점</td>
            </tr>
          </tbody>
        </table>
        <div
          style={{
            marginTop: 16,
            padding: "12px 16px",
            background: "var(--yellow-light)",
            borderRadius: 8,
            fontSize: 13,
            color: "var(--yellow)",
          }}
        >
          ⚠️ 합격 기준: 총점 60점 이상 + 각 과목 40점 이상
        </div>
      </div>

      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          padding: "28px",
          marginBottom: 28,
        }}
      >
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>현재 문제 풀(Pool)</h2>
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ flex: 1, padding: "12px", background: "var(--bg)", borderRadius: 8, textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "var(--text3)", fontWeight: 700, marginBottom: 4 }}>1과목</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "var(--primary)" }}>{sub1Count}</div>
            <div style={{ fontSize: 11, color: "var(--text3)" }}>문항</div>
          </div>
          <div style={{ flex: 1, padding: "12px", background: "var(--bg)", borderRadius: 8, textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "var(--text3)", fontWeight: 700, marginBottom: 4 }}>2과목</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "var(--primary)" }}>{sub2Count}</div>
            <div style={{ fontSize: 11, color: "var(--text3)" }}>문항</div>
          </div>
        </div>
        {(sub1Count < 16 || sub2Count < 24) && (
          <p style={{ marginTop: 12, fontSize: 12, color: "var(--orange)", background: "var(--orange-light)", padding: "8px 12px", borderRadius: 6 }}>
            문제 풀이 수가 부족합니다. 현재 가능한 문항에서 무작위로 출제됩니다.
          </p>
        )}
      </div>

      <Link
        href="/exam/start"
        style={{
          display: "block",
          textAlign: "center",
          background: "var(--primary)",
          color: "#fff",
          padding: "16px",
          borderRadius: 10,
          fontWeight: 700,
          fontSize: 16,
          textDecoration: "none",
        }}
      >
        모의고사 시작하기 →
      </Link>
    </div>
  );
}
