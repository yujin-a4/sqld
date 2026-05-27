"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WrongAnswer {
  questionId: string;
  chapterId: string;
  myAnswer: number;
  correctAnswer: number;
  solvedAt: string; // ISO date
}

interface QuizStore {
  // 오답노트
  wrongAnswers: WrongAnswer[];
  addWrongAnswer: (wa: WrongAnswer) => void;
  removeWrongAnswer: (questionId: string) => void;
  clearWrongAnswers: () => void;

  // 북마크
  bookmarks: string[]; // questionId[]
  toggleBookmark: (questionId: string) => void;
  isBookmarked: (questionId: string) => boolean;

  // 최근 정답 기록 (questionId → 최근 맞음 여부)
  solvedHistory: Record<string, boolean[]>; // 최대 5회
  recordSolve: (questionId: string, correct: boolean) => void;
}

export const useQuizStore = create<QuizStore>()(
  persist(
    (set, get) => ({
      wrongAnswers: [],
      addWrongAnswer: (wa) =>
        set((s) => ({
          wrongAnswers: [
            wa,
            ...s.wrongAnswers.filter((x) => x.questionId !== wa.questionId),
          ],
        })),
      removeWrongAnswer: (id) =>
        set((s) => ({
          wrongAnswers: s.wrongAnswers.filter((x) => x.questionId !== id),
        })),
      clearWrongAnswers: () => set({ wrongAnswers: [] }),

      bookmarks: [],
      toggleBookmark: (id) =>
        set((s) => ({
          bookmarks: s.bookmarks.includes(id)
            ? s.bookmarks.filter((b) => b !== id)
            : [...s.bookmarks, id],
        })),
      isBookmarked: (id) => get().bookmarks.includes(id),

      solvedHistory: {},
      recordSolve: (id, correct) =>
        set((s) => {
          const prev = s.solvedHistory[id] ?? [];
          return {
            solvedHistory: {
              ...s.solvedHistory,
              [id]: [...prev.slice(-4), correct],
            },
          };
        }),
    }),
    { name: "sqld-quiz-store" }
  )
);
