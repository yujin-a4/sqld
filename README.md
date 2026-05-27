# SQLD.zip — SQLD 자격증 문제은행 · 모의고사

SQLD(SQL Developer) 시험 대비 웹 서비스. 문제 풀이부터 Claude AI 해설까지 한 곳에서.

## 주요 기능

| 기능 | 설명 |
|------|------|
| 📚 문제은행 | 단원별 문제 풀기, 즉시 정오 확인, 상세 해설 |
| 🖥️ 모의고사 | 40문항 / 50분 CBT 모드, 타이머, 플래그, 성적표 |
| 📝 오답노트 | 틀린 문제 자동 저장, 재풀기 |
| ✨ AI 해설 | Claude API 스트리밍으로 문제별 맞춤 해설 |

## 시험 범위

- **1과목** — 데이터 모델링의 이해 (16문항)
- **2과목** — SQL 기본 및 활용 (24문항)

## 기술 스택

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS**
- **Zustand** (오답노트·북마크 상태 관리, localStorage 영속)
- **Anthropic Claude API** (claude-sonnet-4-6, 스트리밍 해설)
- **AlaSQL** (브라우저 내 SQL 실습, 예정)

## 로컬 실행

```bash
npm install
cp .env.local.example .env.local  # API 키 입력
npm run dev
```

`http://localhost:3000` 에서 확인.

## 환경 변수

```
ANTHROPIC_API_KEY=sk-ant-...
```

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
