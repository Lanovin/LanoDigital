import "server-only";
import crypto from "node:crypto";
import { cookies } from "next/headers";

/**
 * Přihlášení do administrace.
 *
 * Jedno heslo v `.env.local`, žádná databáze uživatelů — web spravuje jeden
 * člověk. Po přihlášení se do cookie uloží podepsaný lístek s platností;
 * ověřuje se podpisem, takže ho nejde vyrobit ani upravit bez znalosti hesla.
 *
 * Bez `ADMIN_PASSWORD` je administrace **vypnutá**. Kdyby se místo toho
 * pustila bez hesla, stačilo by web nasadit a kdokoli by mohl přepsat texty.
 */

export const ADMIN_COOKIE = "lanodigital_admin";
const MAX_AGE_SECONDS = 60 * 60 * 12;

function password(): string | null {
  const p = process.env.ADMIN_PASSWORD;
  return p && p.length > 0 ? p : null;
}

export function isAdminEnabled(): boolean {
  return password() !== null;
}

function key(): Buffer {
  return crypto
    .createHash("sha256")
    .update(`${password() ?? ""}::${process.env.ADMIN_SECRET ?? "lanodigital"}`)
    .digest();
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", key()).update(payload).digest("hex");
}

export function createToken(): string {
  const expires = String(Date.now() + MAX_AGE_SECONDS * 1000);
  return `${expires}.${sign(expires)}`;
}

export function verifyToken(token: string | undefined): boolean {
  if (!token || !isAdminEnabled()) return false;
  const [expires, signature] = token.split(".");
  if (!expires || !signature) return false;
  if (!/^\d+$/.test(expires) || Number(expires) < Date.now()) return false;
  const expected = sign(expires);
  // srovnání v konstantním čase, ať se podpis nedá uhodnout po znacích
  if (signature.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(signature, "hex"), Buffer.from(expected, "hex"));
}

/** Ověření hesla při přihlášení — také v konstantním čase. */
export function checkPassword(candidate: unknown): boolean {
  const real = password();
  if (!real || typeof candidate !== "string") return false;
  const a = crypto.createHash("sha256").update(candidate).digest();
  const b = crypto.createHash("sha256").update(real).digest();
  return crypto.timingSafeEqual(a, b);
}

/** Je aktuální návštěvník přihlášený? */
export async function isLoggedIn(): Promise<boolean> {
  const jar = await cookies();
  return verifyToken(jar.get(ADMIN_COOKIE)?.value);
}

export const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: MAX_AGE_SECONDS,
  secure: process.env.NODE_ENV === "production",
};
