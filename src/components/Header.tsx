"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/quiz", label: "문제은행" },
  { href: "/exam", label: "모의고사" },
  { href: "/wrong", label: "오답노트" },
];

export default function Header() {
  const path = usePathname();
  return (
    <header
      style={{
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 24px",
          height: 56,
          display: "flex",
          alignItems: "center",
          gap: 32,
        }}
      >
        <Link
          href="/"
          style={{
            fontWeight: 800,
            fontSize: 17,
            color: "var(--primary)",
            textDecoration: "none",
            letterSpacing: "-0.02em",
          }}
        >
          SQLD<span style={{ color: "var(--text3)", fontWeight: 400 }}>.zip</span>
        </Link>

        <nav style={{ display: "flex", gap: 4, flex: 1 }}>
          {NAV.map((n) => {
            const active = path.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                style={{
                  padding: "6px 14px",
                  borderRadius: 6,
                  fontSize: 14,
                  fontWeight: active ? 700 : 500,
                  color: active ? "var(--primary)" : "var(--text2)",
                  background: active ? "var(--primary-light)" : "transparent",
                  textDecoration: "none",
                  transition: "all .15s",
                }}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <span
          style={{
            fontSize: 12,
            color: "var(--text3)",
            background: "var(--yellow-light)",
            color: "var(--yellow)",
            padding: "3px 10px",
            borderRadius: 20,
            fontWeight: 600,
          }}
        >
          Oracle 기준
        </span>
      </div>
    </header>
  );
}
