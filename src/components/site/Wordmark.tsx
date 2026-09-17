/**
 * Slovní značka. Název se bere z administrace a rozdělí se na dvě části
 * podle velkých písmen ("LanoDigital" → "Lano" + "Digital"), aby druhá
 * polovina mohla být oranžová. Když se rozdělit nedá, vykreslí se vcelku.
 */
function split(name: string): [string, string] {
  const m = name.match(/^(.+?)([A-ZÁ-Ž][^A-ZÁ-Ž]*)$/);
  return m ? [m[1], m[2]] : [name, ""];
}

export function Wordmark({
  name = "LanoDigital",
  className = "",
  light = false,
}: {
  name?: string;
  className?: string;
  light?: boolean;
}) {
  const [head, tail] = split(name);
  return (
    <span
      className={`inline-flex items-baseline gap-[2px] font-display font-extrabold tracking-[-0.04em] ${className}`}
      aria-label={name}
    >
      <span className={light ? "text-cream" : "text-ink"}>{head}</span>
      {tail && <span className={light ? "text-paper" : "text-rust"}>{tail}</span>}
      <span
        aria-hidden
        className={`ml-[3px] inline-block size-[0.42em] translate-y-[-0.05em] rounded-full ${
          light ? "bg-paper" : "bg-rust"
        }`}
      />
    </span>
  );
}
