import fs from "node:fs";

/**
 * Rozměry JPEG souboru přečtené z hlavičky (marker SOF).
 *
 * Proč vlastní parser a ne knihovna: potřebujeme to na jednom místě, na jeden
 * formát a jen při buildu. Díky tomu se screenshoty dají kdykoli přefotit
 * a stránka se přizpůsobí sama — nikde se nedrží ručně opsaná výška, která
 * by se po prvním přefocení rozešla se skutečností.
 */
export function jpegSize(file: string): { width: number; height: number } | null {
  let buf: Buffer;
  try {
    buf = fs.readFileSync(file);
  } catch {
    return null;
  }
  if (buf.length < 4 || buf.readUInt16BE(0) !== 0xffd8) return null;

  let off = 2;
  while (off + 9 < buf.length) {
    if (buf[off] !== 0xff) {
      off++;
      continue;
    }
    const marker = buf[off + 1];
    // značky bez délky
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      off += 2;
      continue;
    }
    if (marker === 0xd9 || marker === 0xda) break; // konec / začátek dat
    const len = buf.readUInt16BE(off + 2);
    const isSof =
      marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
    if (isSof) {
      return { height: buf.readUInt16BE(off + 5), width: buf.readUInt16BE(off + 7) };
    }
    if (len < 2) break;
    off += 2 + len;
  }
  return null;
}
