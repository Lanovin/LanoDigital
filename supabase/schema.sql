-- ════════════════════════════════════════════════════════════════════
--  LanoDigital — tabulka pro texty webu
--
--  Kam s tím: Supabase → váš projekt → SQL Editor → New query →
--  vložit celý tenhle soubor → Run.
--
--  Spustit jde i opakovaně, nic to nerozbije ani nepřepíše.
-- ════════════════════════════════════════════════════════════════════

create table if not exists public.site_content (
  -- Řádek je vždycky jen jeden, s id 'default'. Sloupec existuje proto,
  -- aby šlo později přidat druhou jazykovou verzi nebo testovací obsah.
  id         text        primary key default 'default',
  -- Celý obsah webu jako JSON. Tvar popisuje src/content/schema.ts.
  content    jsonb       not null,
  updated_at timestamptz not null default now()
);

-- ── Zabezpečení ─────────────────────────────────────────────────────
-- Zapneme RLS a nepřidáme žádné pravidlo. Tím se tabulka uzavře úplně:
-- anon i přihlášení uživatelé se k ní nedostanou. Web k ní přistupuje
-- servisním klíčem, který RLS obchází a je jen na serveru.
alter table public.site_content enable row level security;

-- Pro jistotu odebereme práva rolím, které do tabulky nemají co mluvit.
revoke all on public.site_content from anon, authenticated;

-- ── Časové razítko ──────────────────────────────────────────────────
-- updated_at posílá i aplikace, ale trigger zaručí, že bude správně
-- i při ruční úpravě přímo v Supabase.
create or replace function public.site_content_touch()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists site_content_touch on public.site_content;
create trigger site_content_touch
  before update on public.site_content
  for each row execute function public.site_content_touch();

-- ── Kontrola ────────────────────────────────────────────────────────
-- Po spuštění by tohle mělo vrátit prázdnou tabulku (zatím bez řádku):
-- select id, updated_at from public.site_content;
