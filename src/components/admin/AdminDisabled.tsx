/**
 * Administrace bez hesla se nespustí. Kdyby se pustila, mohl by texty
 * po nasazení přepsat kdokoli, kdo adresu uhodne.
 *
 * Návod se řídí tím, kde web běží. Rada „vytvořte .env.local a restartujte
 * npm run dev“ je na nasazeném webu k ničemu — tam se proměnné nastavují
 * v hostingu a je potřeba nasadit znovu.
 */
export function AdminDisabled() {
  const naVercelu = Boolean(process.env.VERCEL);
  const nasazeno = naVercelu || process.env.NODE_ENV === "production";

  return (
    <div className="grid min-h-dvh place-items-center bg-paper px-4 py-10">
      <div className="w-full max-w-lg border border-line-strong bg-cream p-6 sm:p-8">
        <p className="font-mono text-[11px] uppercase tracking-wider text-rust-deep">Administrace je vypnutá</p>
        <h1 className="mt-3 font-display text-2xl font-bold text-ink">Chybí heslo.</h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-2">
          Administrace se zapne až tehdy, když nastavíte proměnnou{" "}
          <code className="bg-white px-1 font-mono text-xs">ADMIN_PASSWORD</code>. Bez ní by texty mohl přepsat kdokoli,
          kdo adresu uhodne.
        </p>

        {naVercelu ? <NavodVercel /> : nasazeno ? <NavodHosting /> : <NavodLokalne />}

        <p className="mt-5 border-t border-line pt-4 text-xs leading-relaxed text-ink-3">
          Heslo patří jen mezi proměnné prostředí, nikdy do kódu. Spolu s ním nastavte i{" "}
          <code className="font-mono">SUPABASE_URL</code> a <code className="font-mono">SUPABASE_SECRET_KEY</code>,
          jinak administrace texty neuloží.
        </p>
      </div>
    </div>
  );
}

function Krok({ cislo, children }: { cislo: number; children: React.ReactNode }) {
  return (
    <li className="text-sm leading-relaxed text-ink-2">
      <span className="font-semibold text-ink">{cislo}.</span> {children}
    </li>
  );
}

function NavodVercel() {
  return (
    <ol className="mt-5 space-y-3">
      <Krok cislo={1}>
        Ve Vercelu otevřete projekt → <b className="text-ink">Settings</b> →{" "}
        <b className="text-ink">Environment Variables</b>.
      </Krok>
      <Krok cislo={2}>
        Přidejte proměnnou <code className="bg-white px-1 font-mono text-xs">ADMIN_PASSWORD</code> s vlastním heslem.
        Zaškrtněte všechna prostředí (Production, Preview, Development).
      </Krok>
      <Krok cislo={3}>
        Otevřete <b className="text-ink">Deployments</b>, u posledního nasazení dejte{" "}
        <b className="text-ink">Redeploy</b>. Přidání proměnné samo o sobě web nepřegeneruje.
      </Krok>
    </ol>
  );
}

function NavodHosting() {
  return (
    <ol className="mt-5 space-y-3">
      <Krok cislo={1}>
        V nastavení hostingu přidejte proměnnou prostředí{" "}
        <code className="bg-white px-1 font-mono text-xs">ADMIN_PASSWORD</code> s vlastním heslem.
      </Krok>
      <Krok cislo={2}>Restartujte aplikaci, aby se proměnná načetla.</Krok>
    </ol>
  );
}

function NavodLokalne() {
  return (
    <ol className="mt-5 space-y-3">
      <Krok cislo={1}>
        Vytvořte v kořeni projektu soubor <code className="bg-white px-1 font-mono text-xs">.env.local</code>.
      </Krok>
      <Krok cislo={2}>
        Vložte do něj řádek:
        <pre className="mt-2 overflow-x-auto border border-line bg-white p-3 font-mono text-xs">
          ADMIN_PASSWORD=vase-tajne-heslo
        </pre>
      </Krok>
      <Krok cislo={3}>
        Restartujte server (<code className="bg-white px-1 font-mono text-xs">npm run dev</code>) a načtěte tuhle
        stránku znovu.
      </Krok>
    </ol>
  );
}
