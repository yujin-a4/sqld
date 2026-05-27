"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import type { Question } from "@/data/questions";
import { useQuizStore } from "@/store/useQuizStore";
import Link from "next/link";

interface Props {
  questions: Question[];
  totalMinutes: number;
}

interface ExamResult {
  answers: (number | null)[];
  timeUsedSec: number;
}

export default function ExamSession({ questions, totalMinutes }: Props) {
  const totalSec = totalMinutes * 60;
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [flags, setFlags] = useState<boolean[]>(Array(questions.length).fill(false));
  const [remaining, setRemaining] = useState(totalSec);
  const [result, setResult] = useState<ExamResult | null>(null);
  const [showReview, setShowReview] = useState(false);
  const startTimeRef = useRef(Date.now());
  const { addWrongAnswer, recordSolve } = useQuizStore();

  // 타이머
  useEffect(() => {
    if (result) return;
    const timer = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(timer);
          submitExam(answers, Math.floor((Date.now() - startTimeRef.current) / 1000));
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [result]);

  const submitExam = useCallback(
    (finalAnswers: (number | null)[], timeSec: number) => {
      // 오답 기록
      questions.forEach((q, i) => {
        const my = finalAnswers[i];
        if (my !== null) {
          const correct = my === q.answer;
          recordSolve(q.id, correct);
          if (!correct) {
            addWrongAnswer({
              questionId: q.id,
              chapterId: q.chapterId,
              myAnswer: my,
              correctAnswer: q.answer,
              solvedAt: new Date().toISOString(),
            });
          }
        }
      });
      setResult({ answers: finalAnswers, timeUsedSec: timeSec });
    },
    [questions, addWrongAnswer, recordSolve]
  );

  const handleSubmit = () => {
    const unanswered = answers.filter((a) => a === null).length;
    const msg = unanswered > 0
      ? `아직 ${unanswered}문항을 풀지 않았습니다. 제출하시겠습니까?`
      : "모의고사를 제출하시겠습니까?";
    if (!confirm(msg)) return;
    submitExam(answers, Math.floor((Date.now() - startTimeRef.current) / 1000));
  };

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");
  const isUrgent = remaining <= 300; // 5분 이하

  // 결과 화면
  if (result) {
    const sub1Qs = questions.filter((q) => q.chapterId.startsWith("1"));
    const sub2Qs = questions.filter((q) => q.chapterId.startsWith("2"));

    const calcScore = (qs: typeof questions) => {
      const correct = qs.filter((q) => {
        const i = questions.indexOf(q);
        return result.answers[i] === q.answer;
      }).length;
      return { correct, total: qs.length, score: Math.round((correct / qs.length) * (qs[0]?.chapterId.startsWith("1") ? 40 : 60)) };
    };
    const s1 = calcScore(sub1Qs);
    const s2 = calcScore(sub2Qs);
    const totalScore = s1.score + s2.score;
    const passed = totalScore >= 60 && s1.score >= 16 && s2.score >= 24;
    const timeMin = Math.floor(result.timeUsedSec / 60);
    const timeSec = result.timeUsedSec % 60;

    if (!showReview) {
      return (
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "48px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <p style={{ fontSize: 48, marginBottom: 8 }}>{passed ? "🎉" : "📚"}</p>
            <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 4 }}>
              {passed ? "합격 예상!" : "불합격 예상"}
            </h1>
            <p style={{ color: "var(--text2)", fontSize: 14 }}>
              소요 시간: {timeMin}분 {timeSec}초
            </p>
          </div>

          {/* 점수 카드 */}
          <div
            style={{
              background: passed ? "var(--green-light)" : "var(--red-light)",
              border: `2px solid ${passed ? "var(--green)" : "var(--red)"}`,
              borderRadius: 12,
              padding: "24px",
              textAlign: "center",
              marginBottom: 24,
            }}
          >
            <div style={{ fontSize: 14, color: passed ? "var(--green)" : "var(--red)", fontWeight: 700, marginBottom: 8 }}>
              총점
            </div>
            <div style={{ fontSize: 52, fontWeight: 900, color: passed ? "var(--green)" : "var(--red)", letterSpacing: "-0.04em" }}>
              {totalScore}
            </div>
            <div style={{ fontSize: 14, color: "var(--text3)" }}>/ 100점</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
            {[
              { label: "1과목 (40점 만점)", score: s1.score, correct: s1.correct, total: s1.total, pass: s1.score >= 16 },
              { label: "2과목 (60점 만점)", score: s2.score, correct: s2.correct, total: s2.total, pass: s2.score >= 24 },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  background: "var(--surface)",
                  border: `1px solid ${s.pass ? "var(--green)" : "var(--red)"}`,
                  borderRadius: 10,
                  padding: "16px 20px",
                }}
              >
                <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: s.pass ? "var(--green)" : "var(--red)" }}>
                  {s.score}점
                </div>
                <div style={{ fontSize: 12, color: "var(--text2)" }}>{s.correct}/{s.total} 정답</div>
                <div style={{ fontSize: 11, color: s.pass ? "var(--green)" : "var(--red)", marginTop: 4, fontWeight: 700 }}>
                  {s.pass ? "✓ 과목 통과" : "✗ 과목 과락"}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 12, flexDirection: "column" }}>
            <button
              onClick={() => setShowReview(true)}
              style={{
                padding: "14px",
                background: "var(--primary)",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 15,
                cursor: "pointer",
              }}
            >
              오답 리뷰 →
            </button>
            <Link
              href="/exam"
              style={{
                padding: "12px",
                background: "var(--surface)",
                color: "var(--text)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              다시 시험 보기
            </Link>
          </div>
        </div>
      );
    }

    // 오답 리뷰 모드
    const wrongIdxs = questions
      .map((q, i) => ({ q, i, correct: result.answers[i] === q.answer }))
      .filter((x) => !x.correct);

    return (
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "36px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800 }}>오답 리뷰 ({wrongIdxs.length}문항)</h2>
          <button
            onClick={() => setShowReview(false)}
            style={{ background: "none", border: "none", color: "var(--text3)", cursor: "pointer", fontSize: 14 }}
          >
            ← 결과로 돌아가기
          </button>
        </div>
        {wrongIdxs.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--green)", fontSize: 16, fontWeight: 700, padding: "40px 0" }}>
            🎉 모든 문제를 맞혔습니다!
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {wrongIdxs.map(({ q, i }) => (
              <div
                key={q.id}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderLeft: "3px solid var(--red)",
                  borderRadius: 10,
                  padding: "20px 24px",
                }}
              >
                <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 8 }}>문항 {i + 1}</div>
                <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 12, lineHeight: 1.6, whiteSpace: "pre-line" }}>{q.question}</p>
                {q.code && (
                  <pre style={{ background: "#1e1e2e", color: "#cdd6f4", borderRadius: 6, padding: "12px 14px", fontSize: 12, marginBottom: 12, overflowX: "auto" }}>
                    {q.code}
                  </pre>
                )}
                <div style={{ display: "flex", gap: 12, fontSize: 13, marginBottom: 12 }}>
                  <span style={{ color: "var(--red)" }}>
                    내 답: {result.answers[i]}번 — {q.choices.find((c) => c.num === result.answers[i])?.text ?? "미응답"}
                  </span>
                  <span style={{ color: "var(--green)" }}>
                    정답: {q.answer}번 — {q.choices.find((c) => c.num === q.answer)?.text}
                  </span>
                </div>
                <div
                  style={{
                    background: "var(--green-light)",
                    borderRadius: 6,
                    padding: "10px 14px",
                    fontSize: 13,
                    color: "var(--text)",
                    lineHeight: 1.7,
                  }}
                >
                  {q.explanation}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // 시험 진행 화면
  const q = questions[idx];
  const answered = answers.filter((a) => a !== null).length;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* 상단 바 */}
      <div
        style={{
          position: "sticky",
          top: 56,
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
          padding: "10px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          zIndex: 40,
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text2)" }}>
          {idx + 1} / {questions.length}문항
        </span>
        <span
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: isUrgent ? "var(--red)" : "var(--text)",
            background: isUrgent ? "var(--red-light)" : "var(--bg)",
            padding: "4px 14px",
            borderRadius: 8,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          ⏱ {mm}:{ss}
        </span>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "var(--text3)" }}>{answered}/{questions.length} 응답</span>
          <button
            onClick={handleSubmit}
            style={{
              padding: "7px 16px",
              background: "var(--primary)",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            제출
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "28px 24px", flex: 1, width: "100%" }}>
        {/* 문항 네비 */}
        <div style={{ display: "flex", gap: 4, marginBottom: 24, flexWrap: "wrap" }}>
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              style={{
                width: 30,
                height: 30,
                borderRadius: 6,
                border: i === idx ? "2px solid var(--primary)" : "1.5px solid var(--border)",
                background:
                  answers[i] !== null
                    ? "var(--primary-light)"
                    : flags[i]
                    ? "var(--yellow-light)"
                    : i === idx
                    ? "var(--primary-light)"
                    : "var(--surface)",
                color: i === idx || answers[i] !== null ? "var(--primary)" : flags[i] ? "var(--yellow)" : "var(--text2)",
                fontWeight: i === idx ? 700 : 500,
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* 문제 */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: "28px",
            marginBottom: 16,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <span style={{ fontSize: 13, color: "var(--text3)", fontWeight: 600 }}>문항 {idx + 1}</span>
            <button
              onClick={() => {
                const f = [...flags];
                f[idx] = !f[idx];
                setFlags(f);
              }}
              style={{
                background: flags[idx] ? "var(--yellow-light)" : "none",
                border: `1px solid ${flags[idx] ? "var(--yellow)" : "var(--border)"}`,
                borderRadius: 4,
                padding: "3px 10px",
                fontSize: 12,
                color: flags[idx] ? "var(--yellow)" : "var(--text3)",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              🚩 {flags[idx] ? "플래그 해제" : "플래그"}
            </button>
          </div>
          <p style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.7, marginBottom: q.code ? 16 : 20, whiteSpace: "pre-line" }}>
            {q.question}
          </p>
          {q.code && (
            <pre style={{ background: "#1e1e2e", color: "#cdd6f4", borderRadius: 8, padding: "14px 18px", fontSize: 13, lineHeight: 1.7, marginBottom: 20, overflowX: "auto" }}>
              {q.code}
            </pre>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {q.choices.map((c) => {
              const selected = answers[idx] === c.num;
              return (
                <button
                  key={c.num}
                  onClick={() => {
                    const a = [...answers];
                    a[idx] = c.num;
                    setAnswers(a);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    padding: "12px 16px",
                    border: `1.5px solid ${selected ? "var(--primary)" : "var(--border)"}`,
                    borderRadius: 8,
                    background: selected ? "var(--primary-light)" : "var(--bg)",
                    cursor: "pointer",
                    textAlign: "left",
                    width: "100%",
                  }}
                >
                  <span
                    style={{
                      minWidth: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: selected ? "var(--primary)" : "var(--border)",
                      color: selected ? "#fff" : "var(--text2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {c.num}
                  </span>
                  <span style={{ fontSize: 14, lineHeight: 1.6, color: "var(--text)" }}>{c.text}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 이전/다음 */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            onClick={() => setIdx(Math.max(0, idx - 1))}
            disabled={idx === 0}
            style={{
              padding: "10px 20px",
              border: "1.5px solid var(--border)",
              borderRadius: 8,
              background: "var(--surface)",
              color: idx === 0 ? "var(--text3)" : "var(--text)",
              cursor: idx === 0 ? "not-allowed" : "pointer",
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            ← 이전
          </button>
          {idx < questions.length - 1 ? (
            <button
              onClick={() => setIdx(idx + 1)}
              style={{
                padding: "10px 24px",
                background: "var(--primary)",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              다음 →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              style={{
                padding: "10px 24px",
                background: "var(--green)",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              답안 제출 ✓
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
