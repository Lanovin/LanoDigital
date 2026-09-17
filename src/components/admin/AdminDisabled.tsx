/**
 * Administrace bez hesla se nespustí. Kdyby se pustila, mohl by texty
 * po nasazení přepsat kdokoli, kdo adresu uhodne.
 */
export function AdminDisabled() {
  return (
    <div className="grid min-h-dvh place-items-center bg-paper px-4">
      <div className="w-full max-w-lg border border-line-strong bg-cream p-6 sm:p-8">
        <p className="font-mono text-[11px] uppercase tracking-wider text-rust-deep">Administrace je vypnutá</p>
        <h1 className="mt-3 font-display text-2xl font-bold text-ink">Chybí heslo.</h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-2">
          Administrace se zapne až tehdy, když si nastavíte heslo. Bez něj by texty mohl přepsat kdokoli, kdo adresu
          uhodne.
        </p>
        <ol className="mt-5 space-y-3 text-sm text-ink-2">
          <li>
            <span className="font-semibold text-ink">1.</span> Vytvořte v kořeni projektu soubor{" "}
            <code className="bg-white px-1 font-mono text-xs">.env.local</code>.
          </li>
          <li>
            <span className="font-semibold text-ink">2.</span> Vložte do něj řádek:
            <pre className="mt-2 overflow-x-auto border border-line bg-white p-3 font-mono text-xs">
              ADMIN_PASSWORD=vase-tajne-heslo
            </pre>
          </li>
          <li>
            <span className="font-semibold text-ink">3.</span> Restartujte server (
            <code className="bg-white px-1 font-mono text-xs">npm run dev</code>) a načtěte tuhle stránku znovu.
          </li>
        </ol>
        <p className="mt-5 border-t border-line pt-4 text-xs leading-relaxed text-ink-3">
          Soubor <code className="font-mono">.env.local</code> se needituje přes git, takže heslo nikam neuteče.
        </p>
      </div>
    </div>
  );
}
