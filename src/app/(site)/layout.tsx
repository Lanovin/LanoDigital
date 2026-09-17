import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { getContent } from "@/content/store";

/** Layout veřejného webu: navigace nahoře, patička dole. */
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const c = await getContent();
  return (
    <div className="flex min-h-dvh flex-col">
      <Nav name={c.site.name} nav={c.site.nav} cta={c.site.cta} />
      <main className="flex-1">{children}</main>
      <Footer site={c.site} footer={c.footer} />
    </div>
  );
}
