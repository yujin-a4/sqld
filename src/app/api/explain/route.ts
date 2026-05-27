import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { question, code, choices, answer, myAnswer, explanation } = body;

  const choiceText = choices
    .map((c: { num: number; text: string }) => `${c.num}. ${c.text}`)
    .join("\n");

  const isCorrect = myAnswer === answer;

  const prompt = `당신은 SQLD(SQL Developer) 자격증 시험 전문 강사입니다. 친절하고 명확하게 한국어로 설명해주세요.

## 문제
${question}
${code ? `\n\`\`\`sql\n${code}\n\`\`\`` : ""}

## 보기
${choiceText}

## 정답: ${answer}번
## 수험생 선택: ${myAnswer}번 (${isCorrect ? "정답" : "오답"})

## 기본 해설
${explanation}

---

위 내용을 바탕으로 다음을 포함한 친절한 AI 해설을 작성해주세요:
1. **왜 정답인지** 핵심 원리를 쉽게 설명
2. ${!isCorrect ? `**왜 수험생이 선택한 ${myAnswer}번이 틀렸는지** 구체적으로 설명\n3.` : "3."} **시험에서 자주 나오는 함정 포인트** 정리
4. **기억법 또는 핵심 요약** (한 줄로)

마크다운 없이 일반 텍스트로 작성해주세요. 300자 이내로 간결하게 써주세요.`;

  try {
    const stream = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 600,
      stream: true,
      messages: [{ role: "user", content: prompt }],
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            const data = JSON.stringify({ delta: event.delta.text });
            controller.enqueue(encoder.encode(`data: ${data}\n\n`));
          }
          if (event.type === "message_stop") {
            controller.enqueue(encoder.encode("data: [DONE]\n\n"));
            controller.close();
          }
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Claude API error:", error);
    return new Response(JSON.stringify({ error: "AI 해설 생성에 실패했습니다." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
