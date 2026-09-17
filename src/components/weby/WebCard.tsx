import path from "node:path";
import fs from "node:fs";
import { jpegSize } from "@/lib/image-size";
import type { WebRef } from "@/content/schema";
import { SitePreview, type Shot } from "./SitePreview";

/**
 * Serverová obálka náhledu: najde na disku screenshoty a změří je, aby
 * `next/image` znal poměr stran. Když soubor chybí, pošle `null` a náhled
 * se vykreslí stylizovaně — stránka se kvůli chybějícímu obrázku nerozbije.
 */
function findShot(name: string): Shot {
  for (const ext of ["jpg", "jpeg", "png", "webp"]) {
    const rel = `/weby/${name}.${ext}`;
    const abs = path.join(process.cwd(), "public", rel);
    if (!fs.existsSync(abs)) continue;
    const size = ext === "jpg" || ext === "jpeg" ? jpegSize(abs) : null;
    return { src: rel, width: size?.width ?? 1100, height: size?.height ?? 2200 };
  }
  return null;
}

export function WebPreview({
  web,
  priority = false,
  note = true,
}: {
  web: WebRef;
  priority?: boolean;
  note?: boolean;
}) {
  return (
    <SitePreview
      name={web.name}
      url={web.url}
      display={web.display}
      accent={web.accent}
      live={web.live}
      liveNote={web.liveNote}
      poster={findShot(web.slug)}
      full={findShot(`${web.slug}-full`)}
      mobile={findShot(`${web.slug}-mobile`)}
      note={note}
      priority={priority}
    />
  );
}
