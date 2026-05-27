import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "SQLD 문제은행 · 모의고사",
  description: "SQLD 자격증 시험 대비 문제은행, 모의고사, AI 해설 서비스",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen" style={{ background: "var(--bg)" }}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
