import { notFound } from "next/navigation";
import { CHAPTERS } from "@/data/chapters";
import { QUESTIONS } from "@/data/questions";
import QuizPlayer from "@/components/QuizPlayer";
import Link from "next/link";

interface Props {
  params: Promise<{ chapterId: string }>;
}

export async function generateStaticParams() {
  return CHAPTERS.map((ch) => ({ chapterId: ch.id }));
}

export default async function ChapterQuizPage({ params }: Props) {
  const { chapterId } = await params;
  const chapter = CHAPTERS.find((c) => c.id === chapterId);
  if (!chapter) notFound();

  const questions = QUESTIONS.filter((q) => q.chapterId === chapterId);
  if (questions.length === 0) {
    return (
      <div style={{ maxWidth: 700, margin: "80px auto", textAlign: "center", padding: "0 24px" }}>
        <p style={{ fontSize: 32, marginBottom: 12 }}>🚧</p>
        <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{chapter.title}</h1>
        <p style={{ color: "var(--text2)", marginBottom: 24 }}>아직 문제가 준비되지 않았습니다.</p>
        <Link
          href="/quiz"
          style={{ color: "var(--primary)", fontWeight: 600, textDecoration: "none" }}
        >
          ← 문제은행으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "36px 24px" }}>
      <div style={{ marginBottom: 24 }}>
        <Link
          href="/quiz"
          style={{ fontSize: 13, color: "var(--text3)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4, marginBottom: 12 }}
        >
          ← 문제은행
        </Link>
        <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 4 }}>
          {chapter.title}
        </h1>
        <p style={{ fontSize: 13, color: "var(--text3)" }}>{chapter.description} · {questions.length}문항</p>
      </div>
      <QuizPlayer questions={questions} chapterTitle={chapter.title} />
    </div>
  );
}
