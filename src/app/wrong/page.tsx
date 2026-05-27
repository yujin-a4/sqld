"use client";
import { useQuizStore } from "@/store/useQuizStore";
import { QUESTIONS } from "@/data/questions";
import { CHAPTERS } from "@/data/chapters";
import Link from "next/link";
import { useState } from "react";
import QuizPlayer from "@/components/QuizPlayer";

export default function WrongPage() {
  const { wrongAnswers, clearWrongAnswers, removeWrongAnswer } = useQuizStore();
  const [practicing, setPracticing] = useState(false);

  const wrongQuestions = wrongAnswers
    .map((wa) => QUESTIONS.find((q) => q.id === wa.questionId))
    .filter(Boolean) as (typeof QUESTIONS)[number][];

  if (practicing && wrongQuestions.length > 0) {
    return (
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "36px 24px" }}>
        <button
          onClick={() => setPracticing(false)}
          style={{ fontSize: 13, color: "var(--text3)", background: "none", border: "none", cursor: "pointer", marginBottom: 16 }}
        >
          ← 오답노트로 돌아가기
        </button>
        <QuizPlayer questions={wrongQuestions} chapterTitle="오답 재풀기" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>오답노트</h1>
          <p style={{ color: "var(--text2)", fontSize: 14 }}>틀린 문제 {wrongAnswers.length}개가 저장되어 있습니다.</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {wrongQuestions.length > 0 && (
            <button
              onClick={() => setPracticing(true)}
              style={{
                padding: "8px 18px",
                background: "var(--primary)",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              오답 재풀기 ({wrongQuestions.length})
            </button>
          )}
          {wrongAnswers.length > 0 && (
            <button
              onClick={() => { if (confirm("오답노트를 모두 지우시겠습니까?")) clearWrongAnswers(); }}
              style={{
                padding: "8px 14px",
                background: "var(--red-light)",
                color: "var(--red)",
                border: "1px solid var(--red)",
                borderRadius: 8,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              전체 삭제
            </button>
          )}
        </div>
      </div>

      {wrongAnswers.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text3)" }}>
          <p style={{ fontSize: 40, marginBottom: 12 }}>🎉</p>
          <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>오답이 없습니다!</p>
          <p style={{ fontSize: 14, marginBottom: 24 }}>문제를 풀면 틀린 문제가 자동으로 저장됩니다.</p>
          <Link href="/quiz" style={{ color: "var(--primary)", fontWeight: 600, textDecoration: "none" }}>
            문제 풀러 가기 →
          </Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {wrongAnswers.map((wa) => {
            const q = QUESTIONS.find((x) => x.id === wa.questionId);
            const ch = CHAPTERS.find((x) => x.id === wa.chapterId);
            if (!q) return null;
            return (
              <div
                key={wa.questionId}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderLeft: "3px solid var(--red)",
                  borderRadius: 8,
                  padding: "16px 20px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 11, background: "var(--primary-light)", color: "var(--primary)", padding: "2px 7px", borderRadius: 4, fontWeight: 600 }}>
                        {ch?.title ?? wa.chapterId}
                      </span>
                      <span style={{ fontSize: 11, color: "var(--text3)" }}>
                        {new Date(wa.solvedAt).toLocaleDateString("ko-KR")}
                      </span>
                    </div>
                    <p style={{ fontSize: 14, fontWeight: 500, color: "var(--text)", marginBottom: 8, lineHeight: 1.6, whiteSpace: "pre-line" }}>
                      {q.question}
                    </p>
                    <div style={{ display: "flex", gap: 16, fontSize: 13 }}>
                      <span style={{ color: "var(--red)" }}>
                        내 답: {wa.myAnswer}번 — {q.choices.find((c) => c.num === wa.myAnswer)?.text}
                      </span>
                      <span style={{ color: "var(--green)" }}>
                        정답: {wa.correctAnswer}번 — {q.choices.find((c) => c.num === wa.correctAnswer)?.text}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeWrongAnswer(wa.questionId)}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text3)", fontSize: 16, flexShrink: 0 }}
                    title="삭제"
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
