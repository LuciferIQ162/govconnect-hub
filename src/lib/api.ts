export type Match = { content: string; metadata?: Record<string, any> };

export const BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

export async function runIngest(): Promise<number> {
  const res = await fetch(`${BASE}/ingest`, { method: "POST" });
  const json = await res.json();
  return json.added ?? 0;
}

export async function runQuery(query: string, k = 5): Promise<Match[]> {
  const res = await fetch(`${BASE}/query`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, k }),
  });
  const json = await res.json();
  return json.matches ?? [];
}
