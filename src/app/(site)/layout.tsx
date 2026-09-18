import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { getContent } from "@/content/store";

/**
 * Jak dlouho smí být vykreslená stránka stará.
 *
 * Po uložení v administraci se stránky přegenerují hned — ale jen tam, kde
 * se uložilo. Když se obsah změní jinde (v administraci u sebe na počítači,
 * nebo přímo v Supabase), nasazený web o tom neví a dál by servíroval to,
 * co si upekl naposled. Tahle minuta je pojistka: i beze změny na místě se
 * obsah načte znovu nejpozději za minutu.
 */
export const revalidate = 60;

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
