/**
 * Hravá animace „systém funguje“: kulička (úkol) přijede z pošty,
 * projde AI agentem, kolečkem, kontrolní bránou a spadne do správné
 * přihrádky. Čistě SVG + SMIL, žádný JS, respektuje reduced-motion.
 */
export function MarbleRun({ className = "" }: { className?: string }) {
  const DUR = "9s";
  // Trať – souřadnice ve viewBoxu 0 0 900 340
  const track =
    "M 40 72 C 130 72, 165 128, 245 132 L 300 132 L 380 132 C 432 132, 440 204, 492 206 L 556 206 C 598 206, 606 168, 650 168 L 704 168 C 762 168, 774 236, 800 250 L 800 296";

  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 900 340"
        className="w-full h-auto overflow-visible"
        role="img"
        aria-label="Animace: požadavek přijde poštou, projde AI agentem a kontrolou a skončí roztříděný v přihrádce."
      >
        <defs>
          <linearGradient id="mr-ball" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff6ea" />
            <stop offset="1" stopColor="#efbd8c" />
          </linearGradient>
          <filter id="mr-shadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#5a2a0a" floodOpacity="0.35" />
          </filter>
          <marker id="mr-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="var(--ink)" />
          </marker>
          <style>{`
            @keyframes mr-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.08); } }
            @keyframes mr-glow { 0%, 6%, 100% { opacity: 0; } 3% { opacity: 1; } }
            @keyframes mr-eye { 0%, 92%, 100% { transform: scaleY(1); } 95% { transform: scaleY(0.1); } }
            @keyframes mr-lever { 0%, 64%, 74%, 100% { transform: rotate(0deg); } 68% { transform: rotate(-28deg); } }
            @keyframes mr-bin { 0%, 90%, 100% { transform: translateY(0); } 94% { transform: translateY(4px); } }
            @keyframes mr-rail { to { stroke-dashoffset: -28; } }
            .mr-station { transform-box: fill-box; transform-origin: center; }
            .mr-eye { transform-box: fill-box; transform-origin: center; animation: mr-eye 4s ease-in-out infinite; }
            .mr-lever { transform-box: fill-box; transform-origin: 0% 100%; animation: mr-lever ${DUR} ease-in-out infinite; }
            .mr-bin { transform-box: fill-box; animation: mr-bin ${DUR} ease-in-out infinite; }
            .mr-glow { animation: mr-glow ${DUR} linear infinite; }
            .mr-rail { animation: mr-rail 1.4s linear infinite; }
            @media (prefers-reduced-motion: reduce) {
              .mr-eye, .mr-lever, .mr-bin, .mr-glow, .mr-rail { animation: none !important; }
            }
          `}</style>
        </defs>

        {/* koleje */}
        <path d={track} fill="none" stroke="var(--ink)" strokeOpacity="0.22" strokeWidth="10" strokeLinecap="round" />
        <path d={track} fill="none" stroke="var(--cream)" strokeOpacity="0.9" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 8" className="mr-rail" />

        {/* 1 · Pošta – schránka */}
        <g transform="translate(6 30)">
          <rect x="0" y="0" width="70" height="52" rx="12" fill="var(--cream)" stroke="var(--ink)" strokeWidth="2" />
          <path d="M8 12 L35 32 L62 12" fill="none" stroke="var(--ink)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 40 L26 26 M62 40 L44 26" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
          <rect x="0" y="0" width="70" height="52" rx="12" fill="var(--rust)" opacity="0" className="mr-glow" />
          <text x="35" y="70" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--ink-2)" letterSpacing="1.5">POŠTA</text>
        </g>

        {/* 2 · AI agent – hlava robota */}
        <g transform="translate(296 62)">
          <rect x="0" y="0" width="88" height="82" rx="18" fill="var(--ink)" filter="url(#mr-shadow)" />
          <line x1="44" y1="-14" x2="44" y2="0" stroke="var(--ink)" strokeWidth="3" />
          <circle cx="44" cy="-18" r="5" fill="var(--rust)">
            <animate attributeName="r" values="4;6;4" dur="1.6s" repeatCount="indefinite" />
          </circle>
          <rect x="12" y="16" width="64" height="30" rx="10" fill="var(--paper)" />
          <rect className="mr-eye" x="24" y="24" width="10" height="14" rx="3" fill="var(--ink)" />
          <rect className="mr-eye" x="54" y="24" width="10" height="14" rx="3" fill="var(--ink)" />
          <path d="M28 60 Q44 70 60 60" fill="none" stroke="var(--paper)" strokeWidth="3" strokeLinecap="round" />
          {/* výřez v boxu, kudy kulička projíždí */}
          <rect x="-2" y="64" width="92" height="12" rx="6" fill="var(--paper)" />
          <text x="44" y="104" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--ink-2)" letterSpacing="1.5">AI AGENT</text>
        </g>

        {/* 3 · Ozubené kolo – zpracování */}
        <g transform="translate(492 246)">
          <g className="animate-spin-slow" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
            {Array.from({ length: 10 }).map((_, i) => (
              <rect key={i} x="-6" y="-46" width="12" height="16" rx="3" fill="var(--rust)" transform={`rotate(${i * 36})`} />
            ))}
            <circle r="34" fill="var(--rust)" />
            <circle r="24" fill="var(--paper)" />
            <circle r="9" fill="var(--rust)" />
          </g>
          <text x="0" y="66" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--ink-2)" letterSpacing="1.5">ZPRACOVÁNÍ</text>
        </g>

        {/* 4 · Kontrolní brána – páka s fajfkou */}
        <g transform="translate(628 100)">
          <rect x="0" y="0" width="44" height="60" rx="10" fill="var(--cream)" stroke="var(--ink)" strokeWidth="2" />
          <path d="M11 30 L20 39 L34 22" fill="none" stroke="var(--moss)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <g className="mr-lever" transform="translate(44 60)">
            <rect x="0" y="-6" width="36" height="6" rx="3" fill="var(--ink)" />
            <circle cx="36" cy="-3" r="6" fill="var(--rust)" />
          </g>
          <text x="22" y="-10" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--ink-2)" letterSpacing="1.5">KONTROLA</text>
        </g>

        {/* 5 · Přihrádky */}
        <g transform="translate(730 292)">
          {[
            { x: 0, label: "AKCE", fill: "var(--rust)" },
            { x: 48, label: "INFO", fill: "var(--sky)" },
            { x: 96, label: "ŠUM", fill: "var(--ink-3)" },
          ].map((b, i) => (
            <g key={b.label} className={i === 1 ? "mr-bin" : undefined} transform={`translate(${b.x} 0)`}>
              <path d="M0 0 L40 0 L36 36 L4 36 Z" fill={b.fill} />
              <rect x="0" y="-4" width="40" height="6" rx="2" fill="var(--ink)" />
              <text x="20" y="30" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="var(--cream)" letterSpacing="1">{b.label}</text>
            </g>
          ))}
        </g>

        {/* kulička(y) – animateMotion po trati */}
        <path id="mr-track" d={track} fill="none" stroke="none" />
        {[0, -4.5].map((delay) => (
          <g key={delay}>
            <circle r="11" fill="url(#mr-ball)" stroke="var(--ink)" strokeWidth="2" filter="url(#mr-shadow)">
              <animateMotion dur={DUR} repeatCount="indefinite" begin={`${delay}s`} calcMode="spline" keyTimes="0;1" keySplines="0.35 0 0.65 1">
                <mpath href="#mr-track" />
              </animateMotion>
              <animate attributeName="opacity" values="0;1;1;1;0" keyTimes="0;0.04;0.9;0.97;1" dur={DUR} begin={`${delay}s`} repeatCount="indefinite" />
            </circle>
            <path d="M-4 0 L-1 3 L4 -3" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0">
              <animateMotion dur={DUR} repeatCount="indefinite" begin={`${delay}s`} calcMode="spline" keyTimes="0;1" keySplines="0.35 0 0.65 1">
                <mpath href="#mr-track" />
              </animateMotion>
              <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.66;0.7;0.97;1" dur={DUR} begin={`${delay}s`} repeatCount="indefinite" />
            </path>
          </g>
        ))}
      </svg>
    </div>
  );
}
