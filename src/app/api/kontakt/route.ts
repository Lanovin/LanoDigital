import { NextResponse } from "next/server";
import { z } from "zod";
import { getContent } from "@/content/store";

/**
 * Kontaktní formulář. Validace přes Zod; odeslání e-mailu přes Resend,
 * když je nastavený RESEND_API_KEY. Bez klíče se zpráva jen zaloguje –
 * formulář tak funguje i na lokálním vývoji.
 */
const Schema = z.object({
  jmeno: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  firma: z.string().trim().max(200).optional().or(z.literal("")),
  zajem: z.enum(["system", "web", "oboji", "nevim"]).default("web"),
  zprava: z.string().trim().min(10).max(4000),
  termin: z.string().trim().max(300).optional().or(z.literal("")),
  web: z.string().max(0).optional().or(z.literal("")), // honeypot – musí být prázdný
});

const ZAJEM: Record<z.infer<typeof Schema>["zajem"], string> = {
  system: "AI systém / automatizace",
  web: "Webové stránky",
  oboji: "Obojí",
  nevim: "Ještě neví",
};

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Neplatný požadavek." }, { status: 400 });
  }

  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Zkontrolujte prosím vyplněná pole." }, { status: 400 });
  }
  const d = parsed.data;

  const text = [
    `Jméno: ${d.jmeno}`,
    `E-mail: ${d.email}`,
    `Firma: ${d.firma || "neuvedeno"}`,
    `Zájem: ${ZAJEM[d.zajem]}`,
    `Termín: ${d.termin || "neuvedeno"}`,
    "",
    d.zprava,
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO ?? (await getContent()).site.owner.email;
  const from = process.env.CONTACT_FROM ?? "LanoDigital <onboarding@resend.dev>";

  if (!apiKey) {
    console.log("[kontakt] (bez RESEND_API_KEY, jen log)\n" + text);
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: d.email,
        subject: `Poptávka z webu: ${d.jmeno} (${ZAJEM[d.zajem]})`,
        text,
      }),
    });
    if (!res.ok) {
      console.error("[kontakt] Resend odpověděl", res.status, await res.text());
      return NextResponse.json({ ok: false, error: "E-mail se nepodařilo odeslat. Zkuste to prosím znovu nebo napište přímo." }, { status: 502 });
    }
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[kontakt]", err);
    return NextResponse.json({ ok: false, error: "E-mail se nepodařilo odeslat." }, { status: 502 });
  }
}
