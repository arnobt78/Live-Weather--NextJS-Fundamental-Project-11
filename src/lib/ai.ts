/**
 * lib/ai.ts — non-streaming AI text (Server / Route Handlers only)
 *
 * Walkthrough:
 * - `generateWithAI` tries providers in order until one returns text (see env keys in README).
 * - Used when streaming isn’t available or as fallback from `/api/ai/*` routes.
 * - Each `try*` helper is isolated: missing key → null, HTTP error → null, empty text → null.
 */

/** Google Generative Language API — JSON response, extract first candidate text part. */
async function tryGemini(prompt: string): Promise<string | null> {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  if (!apiKey) return null;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { maxOutputTokens: 1024, temperature: 0.7 },
    }),
  });
  if (!res.ok) return null;
  const data = (await res.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  return typeof text === "string" && text.length > 0 ? text : null;
}

/** Groq OpenAI-compatible chat completions (fast Llama). */
async function tryGroq(prompt: string): Promise<string | null> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return null;
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1024,
      temperature: 0.7,
    }),
  });
  if (!res.ok) return null;
  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const text = data.choices?.[0]?.message?.content;
  return typeof text === "string" && text.length > 0 ? text : null;
}

/** OpenRouter aggregates many models; here uses a free-tier model id. */
async function tryOpenRouter(prompt: string): Promise<string | null> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return null;
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "openrouter/free",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1024,
      temperature: 0.7,
    }),
  });
  if (!res.ok) return null;
  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const text = data.choices?.[0]?.message?.content;
  return typeof text === "string" && text.length > 0 ? text : null;
}

/**
 * Generate text using AI with fallback chain: Gemini → Groq → OpenRouter.
 */
export async function generateWithAI(prompt: string): Promise<string | null> {
  const fromGemini = await tryGemini(prompt);
  if (fromGemini) return fromGemini;
  const fromGroq = await tryGroq(prompt);
  if (fromGroq) return fromGroq;
  return tryOpenRouter(prompt);
}
