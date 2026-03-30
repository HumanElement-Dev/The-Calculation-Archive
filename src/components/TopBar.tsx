interface TopBarProps {
  infoPanelOpen: boolean
  onToggleInfo: () => void
}

export default function TopBar({ infoPanelOpen, onToggleInfo }: TopBarProps) {
  return (
    <div
      style={{
        height: 48,
        background: 'var(--panel-bg)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        flexShrink: 0,
        zIndex: 20,
        gap: 12,
      }}
    >
      {/* ── Logo ──────────────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
        <div
          style={{
            width: 28,
            height: 28,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {/* 2×2 grid icon */}
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <rect x="1"   y="1"   width="4.5" height="4.5" rx="1" fill="rgba(255,255,255,0.55)" />
            <rect x="7.5" y="1"   width="4.5" height="4.5" rx="1" fill="rgba(255,255,255,0.3)" />
            <rect x="1"   y="7.5" width="4.5" height="4.5" rx="1" fill="rgba(255,255,255,0.3)" />
            <rect x="7.5" y="7.5" width="4.5" height="4.5" rx="1" fill="rgba(255,255,255,0.15)" />
          </svg>
        </div>

        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 13,
            fontWeight: 500,
            color: 'var(--text-primary)',
            letterSpacing: '0.025em',
          }}
        >
          Calculator Archive
        </span>
      </div>

      {/* ── Right actions ─────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {/* Info panel toggle */}
        <button
          onClick={onToggleInfo}
          title={infoPanelOpen ? 'Hide info panel' : 'Show info panel'}
          style={{
            height: 30,
            padding: '0 11px',
            background: infoPanelOpen
              ? 'rgba(255,255,255,0.10)'
              : 'rgba(255,255,255,0.04)',
            border: `1px solid ${
              infoPanelOpen
                ? 'rgba(255,255,255,0.18)'
                : 'rgba(255,255,255,0.08)'
            }`,
            borderRadius: 6,
            color: infoPanelOpen
              ? 'rgba(255,255,255,0.85)'
              : 'rgba(255,255,255,0.38)',
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            transition: 'all 0.18s ease',
            letterSpacing: '0.08em',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle
              cx="6" cy="6" r="5"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <line
              x1="6" y1="5.5" x2="6" y2="9"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <circle cx="6" cy="3.5" r="0.7" fill="currentColor" />
          </svg>
          <span>INFO</span>
        </button>
      </div>
    </div>
  )
}
