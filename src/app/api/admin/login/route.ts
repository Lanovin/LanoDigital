import { NextResponse } from "next/server";
import { ADMIN_COOKIE, checkPassword, cookieOptions, createToken, isAdminEnabled } from "@/lib/admin-auth";

/** Jednoduchá brzda proti hádání hesla: po několika pokusech se čeká. */
const attempts = new Map<string, { count: number; until: number }>();

function throttle(ip: string): number {
  const now = Date.now();
  const rec = attempts.get(ip);
  if (rec && rec.until > now) return Math.ceil((rec.until - now) / 1000);
  return 0;
}

function fail(ip: string) {
  const rec = attempts.get(ip) ?? { count: 0, until: 0 };
  rec.count += 1;
  if (rec.count >= 5) {
    rec.until = Date.now() + Math.min(15 * 60_000, 2 ** (rec.count - 5) * 30_000);
  }
  attempts.set(ip, rec);
}

export async function POST(req: Request) {
  if (!isAdminEnabled()) {
    return NextResponse.json(
      { ok: false, error: "Administrace není zapnutá. Nastavte ADMIN_PASSWORD v .env.local a restartujte server." },
      { status: 503 },
    );
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const wait = throttle(ip);
  if (wait > 0) {
    return NextResponse.json({ ok: false, error: `Moc pokusů. Zkuste to za ${wait} s.` }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Neplatný požadavek." }, { status: 400 });
  }

  const heslo = (body as { heslo?: unknown })?.heslo;
  if (!checkPassword(heslo)) {
    fail(ip);
    return NextResponse.json({ ok: false, error: "Špatné heslo." }, { status: 401 });
  }

  attempts.delete(ip);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, createToken(), cookieOptions);
  return res;
}
