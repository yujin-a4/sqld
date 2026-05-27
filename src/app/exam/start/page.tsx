import { QUESTIONS } from "@/data/questions";
import ExamSession from "@/components/ExamSession";

// 시험 문항 선택 로직 (서버에서 랜덤 섞기)
function pickExamQuestions() {
  const sub1 = QUESTIONS.filter((q) => q.chapterId.startsWith("1"));
  const sub2 = QUESTIONS.filter((q) => q.chapterId.startsWith("2"));

  const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);

  const picked1 = shuffle(sub1).slice(0, Math.min(16, sub1.length));
  const picked2 = shuffle(sub2).slice(0, Math.min(24, sub2.length));

  return shuffle([...picked1, ...picked2]);
}

export default function ExamStartPage() {
  const questions = pickExamQuestions();
  const EXAM_MINUTES = 50;

  return <ExamSession questions={questions} totalMinutes={EXAM_MINUTES} />;
}
