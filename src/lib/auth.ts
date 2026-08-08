// Uses the Web Crypto API (globalThis.crypto) rather than node:crypto so this
// module works in both the Node.js runtime (API routes) and the Edge runtime
// (middleware).

export const ADMIN_COOKIE = "perfetto_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "Perfettopk";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin#123";
const SESSION_SECRET =
  process.env.SESSION_SECRET || "perfetto-dev-secret-change-me";

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function sign(value: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(SESSION_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return toHex(sig);
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

export function verifyCredentials(username: string, password: string): boolean {
  return (
    constantTimeEqual(username, ADMIN_USERNAME) &&
    constantTimeEqual(password, ADMIN_PASSWORD)
  );
}

export async function createSessionToken(): Promise<string> {
  const expires = Date.now() + SESSION_TTL_MS;
  const payload = `${expires}`;
  const sig = await sign(payload);
  return `${payload}.${sig}`;
}

export async function verifySessionToken(
  token: string | undefined | null
): Promise<boolean> {
  if (!token) return false;
  const [expiresStr, sig] = token.split(".");
  if (!expiresStr || !sig) return false;
  const expected = await sign(expiresStr);
  if (!constantTimeEqual(sig, expected)) return false;
  const expires = Number(expiresStr);
  if (!Number.isFinite(expires)) return false;
  return Date.now() < expires;
}
