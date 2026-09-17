import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isLoggedIn } from "@/lib/admin-auth";
import { checkStorage, getContent, resetContent, saveContent } from "@/content/store";

async function guard() {
  if (await isLoggedIn()) return null;
  return NextResponse.json({ ok: false, error: "Nepřihlášeno." }, { status: 401 });
}

/** Po zápisu se musí přegenerovat statické stránky, jinak by web ukazoval staré texty. */
function refreshSite() {
  revalidatePath("/", "layout");
}

export async function GET() {
  const denied = await guard();
  if (denied) return denied;
  return NextResponse.json({ ok: true, content: await getContent(), uloziste: await checkStorage() });
}

export async function PUT(req: Request) {
  const denied = await guard();
  if (denied) return denied;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Neplatný JSON." }, { status: 400 });
  }

  const result = await saveContent((body as { content?: unknown })?.content ?? body);
  if (!result.ok) return NextResponse.json(result, { status: 500 });

  refreshSite();
  return NextResponse.json({ ok: true, content: await getContent() });
}

export async function DELETE() {
  const denied = await guard();
  if (denied) return denied;

  const result = await resetContent();
  if (!result.ok) return NextResponse.json(result, { status: 500 });

  refreshSite();
  return NextResponse.json({ ok: true, content: await getContent() });
}
