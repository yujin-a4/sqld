"use client";
import { useState, useCallback } from "react";
import type { Question } from "@/data/questions";
import { useQuizStore } from "@/store/useQuizStore";
import AiExplain from "./AiExplain";

interface Props {
  questions: Question[];
  chapterTitle: string;
}

const DIFF_COLOR: Record<string, string> = {
  빈출: "var(--red)",
  상: "var(--orange)",
  중: "var(--primary)",
  하: "var(--green)",
};
const DIFF_BG: Record<string, string> = {
  빈출: "var(--red-light)",
  상: "var(--orange-light)",
  중: "var(--primary-light)",
  하: "var(--green-light)",
};

export default function QuizPlayer({ questions, chapterTitle }: Props) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplain, setShowExplain] = useState(false);
  const [showAi, setShowAi] = useState(false);
  const [results, setResults] = useState<(boolean | null)[]>(Array(questions.length).fill(null));

  const { toggleBookmark, isBookmarked, addWrongAnswer, recordSolve } = useQuizStore();

  const q = questions[idx];
  const isCorrect = selected !== null ? selected === q.answer : null;
  const bookmarked = isBookmarked(q.id);

  const handleSelect = useCallback(
    (num: number) => {
      if (selected !== null) return; // 이미 선택함
      setSelected(num);
      setShowExplain(true);
      const correct = num === q.answer;
      recordSolve(q.id, correct);
      if (!correct) {
        addWrongAnswer({
          questionId: q.id,
          chapterId: q.chapterId,
          myAnswer: num,
          correctAnswer: q.answer,
          solvedAt: new Date().toISOString(),
        });
      }
      const newResults = [...results];
      newResults[idx] = correct;
      setResults(newResults);
    },
    [selected, q, idx, results, addWrongAnswer, recordSolve]
  );

  const handleNext = () => {
    if (idx < questions.length - 1) {
      setIdx(idx + 1);
      setSelected(null);
      setShowExplain(false);
      setShowAi(false);
    }
  };
  const handlePrev = () => {
    if (idx > 0) {
      setIdx(idx - 1);
      setSelected(null);
      setShowExplain(false);
      setShowAi(false);
    }
  };

  const solved = results.filter((r) => r !== null).length;
  const correct = results.filter((r) => r === true).length;

  return (
    <div>
      {/* 진행 표시 */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 13, color: "var(--text2)", fontWeight: 600 }}>
            {idx + 1} / {questions.length}
          </span>
          <span style={{ fontSize: 13, color: "var(--text2)" }}>
            맞춤 <strong style={{ color: "var(--green)" }}>{correct}</strong> / 풀기 {solved}
          </span>
        </div>
        <div style={{ height: 4, background: "var(--border)", borderRadius: 2, overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              background: "var(--primary)",
              borderRadius: 2,
              width: `${((idx + 1) / questions.length) * 100}%`,
              transition: "width .3s",
            }}
          />
        </div>
        {/* 문항 점 네비게이션 */}
        <div style={{ display: "flex", gap: 4, marginTop: 8, flexWrap: "wrap" }}>
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => { setIdx(i); setSelected(null); setShowExplain(false); setShowAi(false); }}
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                border: i === idx ? "2px solid var(--primary)" : "1.5px solid var(--border)",
                background:
                  results[i] === true
                    ? "var(--green-light)"
                    : results[i] === false
                    ? "var(--red-light)"
                    : i === idx
                    ? "var(--primary-light)"
                    : "var(--surface)",
                cursor: "pointer",
                fontSize: 10,
                fontWeight: 700,
                color:
                  results[i] === true
                    ? "var(--green)"
                    : results[i] === false
                    ? "var(--red)"
                    : "var(--text3)",
              }}
            >
              {results[i] === true ? "✓" : results[i] === false ? "✗" : i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* 문제 카드 */}
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          padding: "28px 28px 24px",
          marginBottom: 16,
        }}
      >
        {/* 헤더 */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                padding: "3px 8px",
                borderRadius: 4,
                background: DIFF_BG[q.difficulty],
                color: DIFF_COLOR[q.difficulty],
              }}
            >
              {q.difficulty}
            </span>
            {q.tags?.map((t) => (
              <span
                key={t}
                style={{
                  fontSize: 11,
                  color: "var(--text3)",
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  padding: "2px 7px",
                  borderRadius: 4,
                }}
              >
                #{t}
              </span>
            ))}
          </div>
          <button
            onClick={() => toggleBookmark(q.id)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 18,
              lineHeight: 1,
              color: bookmarked ? "#f59e0b" : "var(--text3)",
            }}
            title={bookmarked ? "북마크 해제" : "북마크"}
          >
            {bookmarked ? "★" : "☆"}
          </button>
        </div>

        {/* 질문 */}
        <p style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.7, marginBottom: q.code ? 16 : 20, whiteSpace: "pre-line" }}>
          {q.question}
        </p>

        {/* SQL 코드 블록 */}
        {q.code && (
          <pre
            style={{
              background: "#1e1e2e",
              color: "#cdd6f4",
              borderRadius: 8,
              padding: "14px 18px",
              fontSize: 13,
              lineHeight: 1.7,
              marginBottom: 20,
              overflowX: "auto",
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            }}
          >
            {q.code}
          </pre>
        )}

        {/* 보기 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {q.choices.map((c) => {
            const isSelected = selected === c.num;
            const isAnswer = c.num === q.answer;
            let bg = "var(--bg)";
            let border = "var(--border)";
            let color = "var(--text)";
            if (selected !== null) {
              if (isAnswer) { bg = "var(--green-light)"; border = "var(--green)"; color = "var(--green)"; }
              else if (isSelected) { bg = "var(--red-light)"; border = "var(--red)"; color = "var(--red)"; }
            }
            return (
              <button
                key={c.num}
                onClick={() => handleSelect(c.num)}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  padding: "12px 16px",
                  border: `1.5px solid ${border}`,
                  borderRadius: 8,
                  background: bg,
                  cursor: selected !== null ? "default" : "pointer",
                  textAlign: "left",
                  transition: "all .15s",
                  width: "100%",
                }}
              >
                <span
                  style={{
                    minWidth: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: selected !== null && isAnswer ? "var(--green)" : selected !== null && isSelected ? "var(--red)" : "var(--border)",
                    color: selected !== null && (isAnswer || isSelected) ? "#fff" : "var(--text2)",
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
                <span style={{ fontSize: 14, lineHeight: 1.6, color }}>{c.text}</span>
                {selected !== null && isAnswer && (
                  <span style={{ marginLeft: "auto", color: "var(--green)", fontSize: 16, flexShrink: 0 }}>✓</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 해설 영역 */}
      {showExplain && (
        <div
          style={{
            background: isCorrect ? "var(--green-light)" : "var(--red-light)",
            border: `1px solid ${isCorrect ? "var(--green)" : "var(--red)"}`,
            borderRadius: 10,
            padding: "18px 22px",
            marginBottom: 16,
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: isCorrect ? "var(--green)" : "var(--red)",
              marginBottom: 8,
            }}
          >
            {isCorrect ? "✓ 정답입니다!" : `✗ 오답 — 정답은 ④번`
              .replace("④", ["①","②","③","④"][q.answer - 1])}
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text)" }}>{q.explanation}</p>

          {/* 보기별 해설 */}
          {q.choiceExplanations && (
            <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
              {([1, 2, 3, 4] as const).map((n) => {
                const ex = q.choiceExplanations?.[n];
                if (!ex) return null;
                return (
                  <div key={n} style={{ fontSize: 13, color: "var(--text2)", paddingLeft: 12, borderLeft: `2px solid var(--border)` }}>
                    <strong>{"①②③④"[n - 1]}</strong> {ex}
                  </div>
                );
              })}
            </div>
          )}

          {/* AI 해설 버튼 */}
          {!showAi && (
            <button
              onClick={() => setShowAi(true)}
              style={{
                marginTop: 14,
                padding: "8px 16px",
                background: "var(--primary)",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              ✨ Claude AI 해설 보기
            </button>
          )}
          {showAi && <AiExplain question={q} myAnswer={selected!} />}
        </div>
      )}

      {/* 이전/다음 버튼 */}
      <div style={{ display: "flex", gap: 10, justifyContent: "space-between" }}>
        <button
          onClick={handlePrev}
          disabled={idx === 0}
          style={{
            padding: "10px 20px",
            border: "1.5px solid var(--border)",
            borderRadius: 8,
            background: "var(--surface)",
            color: idx === 0 ? "var(--text3)" : "var(--text)",
            fontWeight: 600,
            fontSize: 14,
            cursor: idx === 0 ? "not-allowed" : "pointer",
          }}
        >
          ← 이전
        </button>
        {selected === null ? (
          <span style={{ fontSize: 13, color: "var(--text3)", alignSelf: "center" }}>
            보기를 선택하세요
          </span>
        ) : idx < questions.length - 1 ? (
          <button
            onClick={handleNext}
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
            다음 문제 →
          </button>
        ) : (
          <span style={{ fontSize: 14, fontWeight: 700, color: "var(--green)", alignSelf: "center" }}>
            🎉 단원 완료! ({correct}/{questions.length} 정답)
          </span>
        )}
      </div>
    </div>
  );
}
