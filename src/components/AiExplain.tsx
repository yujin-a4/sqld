"use client";
import { useState, useEffect, useRef } from "react";
import type { Question } from "@/data/questions";

interface Props {
  question: Question;
  myAnswer: number;
}

export default function AiExplain({ question, myAnswer }: Props) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    const fetch = async () => {
      try {
        const res = await window.fetch("/api/explain", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            questionId: question.id,
            question: question.question,
            code: question.code,
            choices: question.choices,
            answer: question.answer,
            myAnswer,
            explanation: question.explanation,
          }),
        });
        if (!res.ok || !res.body) throw new Error("서버 오류");
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        setLoading(false);
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          // SSE 파싱
          const lines = chunk.split("\n");
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6).trim();
              if (data === "[DONE]") break;
              try {
                const json = JSON.parse(data);
                if (json.delta) setText((prev) => prev + json.delta);
              } catch {}
            }
          }
        }
      } catch (e: unknown) {
        setLoading(false);
        setError(e instanceof Error ? e.message : "오류 발생");
      }
    };

    fetch();
  }, [question, myAnswer]);

  return (
    <div
      style={{
        marginTop: 16,
        padding: "16px 18px",
        background: "var(--surface)",
        border: "1px solid var(--primary-light)",
        borderRadius: 8,
        borderLeft: "3px solid var(--primary)",
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: "var(--primary)",
          letterSpacing: ".06em",
          marginBottom: 10,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        ✨ CLAUDE AI 해설
        {loading && (
          <span style={{ fontWeight: 400, color: "var(--text3)", animation: "pulse 1s infinite" }}>
            생성 중...
          </span>
        )}
      </div>
      {error ? (
        <p style={{ color: "var(--red)", fontSize: 13 }}>{error}</p>
      ) : (
        <div
          style={{
            fontSize: 14,
            lineHeight: 1.8,
            color: "var(--text)",
            whiteSpace: "pre-wrap",
            minHeight: loading ? 40 : undefined,
          }}
        >
          {text}
          {loading && !text && (
            <span style={{ color: "var(--text3)" }}>▋</span>
          )}
        </div>
      )}
    </div>
  );
}
