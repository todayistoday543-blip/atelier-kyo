import Anthropic from "@anthropic-ai/sdk";

let cachedClient: Anthropic | null = null;

export function getAnthropicClient(): Anthropic {
  if (cachedClient) return cachedClient;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("Anthropic env not configured. Set ANTHROPIC_API_KEY (server-side only).");
  }

  cachedClient = new Anthropic({ apiKey });
  return cachedClient;
}

// Default model for Claude Design. Sonnet 4.6 hits the best
// quality / cost balance for design copy and translations.
// Switch to opus for high-stakes brand direction work.
export const CLAUDE_DESIGN_MODEL = "claude-sonnet-4-6";
export const CLAUDE_DESIGN_MAX_TOKENS = 4096;
