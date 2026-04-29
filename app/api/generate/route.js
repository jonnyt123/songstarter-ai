import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const body = await req.json();
  const { theme, mood, perspective, context } = body;

  try {
    // Step 1: Blueprint
    const blueprint = await client.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        {
          role: "system",
          content: "You are a professional songwriter.",
        },
        {
          role: "user",
          content: `
Theme: ${theme}
Mood: ${mood}
Perspective: ${perspective}
Context: ${context}

Generate:
- Core message
- Key moment
- Emotional shift

Be specific and avoid generic language.
          `,
        },
      ],
    });

    const blueprintText = blueprint.choices[0].message.content;

    // Step 2: Lyrics
    const lyrics = await client.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        {
          role: "system",
          content: "You write high-quality, original song lyrics.",
        },
        {
          role: "user",
          content: `
Write lyrics:

Verse 1:
- Specific imagery
- Natural flow

Chorus:
- Catchy and repeatable

Avoid clichés.

Blueprint:
${blueprintText}
          `,
        },
      ],
    });

    return Response.json({
      blueprint: blueprintText,
      lyrics: lyrics.choices[0].message.content,
    });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}