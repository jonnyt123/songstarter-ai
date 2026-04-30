import OpenAI from "openai";

export async function POST(req) {
  try {
    const { theme, mood, perspective, context } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      throw new Error("Missing OPENAI_API_KEY");
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: "You are a professional songwriter." },
        {
          role: "user",
          content: `
Write song lyrics with:

Verse 1 (8–10 lines)
Chorus (4–6 lines)

Theme: ${theme}
Mood: ${mood}
Perspective: ${perspective}
Context: ${context}

Avoid clichés. Use specific imagery.
          `,
        },
      ],
    });

    const lyrics = response?.choices?.[0]?.message?.content;
    if (!lyrics) throw new Error("No lyrics generated");

    return Response.json({ lyrics });
  } catch (err) {
    console.error("API ERROR:", err);
    return Response.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}