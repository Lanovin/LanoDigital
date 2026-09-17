import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdminEnabled, isLoggedIn } from "@/lib/admin-auth";
import { AdminDisabled } from "@/components/admin/AdminDisabled";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = { title: "Přihlášení", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (!isAdminEnabled()) return <AdminDisabled />;
  if (await isLoggedIn()) redirect("/admin");
  return <LoginForm />;
}
