import type { Metadata } from "next";
import { Reveal, SectionHeading } from "@/components/site/Section";
import { ContactPanel } from "@/components/kontakt/ContactPanel";
import { getContent } from "@/content/store";

export async function generateMetadata(): Promise<Metadata> {
  const { kontakt } = await getContent();
  return { title: kontakt.metaTitle, description: kontakt.metaDescription };
}

export default async function KontaktPage() {
  const { kontakt, site } = await getContent();

  return (
    <div className="container-x pt-12 sm:pt-20">
      <SectionHeading title={kontakt.title} lead={kontakt.lead} />
      <Reveal delay={0.1} className="mt-12">
        <ContactPanel t={kontakt} email={site.owner.email} />
      </Reveal>
    </div>
  );
}
