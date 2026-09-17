import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdminEnabled, isLoggedIn } from "@/lib/admin-auth";
import { checkStorage, getContent } from "@/content/store";
import { DEFAULT_CONTENT } from "@/content/defaults";
import { Editor } from "@/components/admin/Editor";
import { AdminDisabled } from "@/components/admin/AdminDisabled";

export const metadata: Metadata = { title: "Administrace", robots: { index: false, follow: false } };

/** Administrace se nikdy nepředgeneruje — vždycky se ptá na přihlášení. */
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!isAdminEnabled()) return <AdminDisabled />;
  if (!(await isLoggedIn())) redirect("/admin/login");

  const [content, uloziste] = await Promise.all([getContent(), checkStorage()]);
  return <Editor initial={content} defaults={DEFAULT_CONTENT} uloziste={uloziste} />;
}
