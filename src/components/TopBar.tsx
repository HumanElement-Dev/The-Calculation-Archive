import { useState } from 'react'

interface TopBarProps {
  infoPanelOpen: boolean
  onToggleInfo: () => void
}

// ─── Small icon button ────────────────────────────────────────────────────────

function IconBtn({
  onClick,
  active,
  title,
  children,
}: {
  onClick?: () => void
  active?: boolean
  title?: string
  children: React.ReactNode
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      title={title}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 30,
        height: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: active
          ? 'rgba(255,255,255,0.08)'
          : hovered
          ? 'rgba(255,255,255,0.05)'
          : 'transparent',
        border: 'none',
        borderRadius: 6,
        color: active
          ? 'rgba(255,255,255,0.85)'
          : hovered
          ? 'rgba(255,255,255,0.65)'
          : 'rgba(255,255,255,0.35)',
        cursor: 'pointer',
        transition: 'color 0.15s ease, background 0.15s ease',
        flexShrink: 0,
      }}
    >
      {children}
    </button>
  )
}

// ─── TopBar ───────────────────────────────────────────────────────────────────

export default function TopBar({ infoPanelOpen, onToggleInfo }: TopBarProps) {
  const [favHovered, setFavHovered] = useState(false)

  return (
    <div
      style={{
        height: 48,
        background: 'var(--panel-bg)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        flexShrink: 0,
        zIndex: 20,
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

      {/* ── Right nav ─────────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>

        {/* Explore pill — always active (current view) */}
        <button
          style={{
            height: 30,
            padding: '0 12px',
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            background: 'rgba(255,255,255,0.10)',
            border: '1px solid rgba(255,255,255,0.14)',
            borderRadius: 7,
            color: 'rgba(255,255,255,0.85)',
            fontFamily: "'DM Mono', monospace",
            fontSize: 12,
            fontWeight: 500,
            cursor: 'default',
            letterSpacing: '0.02em',
            flexShrink: 0,
          }}
        >
          {/* 2×2 grid icon */}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <rect x="1"   y="1"   width="4" height="4" rx="0.8" fill="currentColor" opacity="0.9" />
            <rect x="7"   y="1"   width="4" height="4" rx="0.8" fill="currentColor" opacity="0.6" />
            <rect x="1"   y="7"   width="4" height="4" rx="0.8" fill="currentColor" opacity="0.6" />
            <rect x="7"   y="7"   width="4" height="4" rx="0.8" fill="currentColor" opacity="0.35" />
          </svg>
          Explore
        </button>

        {/* Favorites — stub */}
        <button
          onMouseEnter={() => setFavHovered(true)}
          onMouseLeave={() => setFavHovered(false)}
          style={{
            height: 30,
            padding: '0 10px',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'transparent',
            border: 'none',
            borderRadius: 7,
            color: favHovered ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.38)',
            fontFamily: "'DM Mono', monospace",
            fontSize: 12,
            cursor: 'pointer',
            letterSpacing: '0.02em',
            transition: 'color 0.15s ease',
            flexShrink: 0,
          }}
        >
          {/* Heart icon */}
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path
              d="M6.5 10.8S1.2 7.4 1.2 4.4a2.6 2.6 0 0 1 5.3-.4 2.6 2.6 0 0 1 5.3.4C11.8 7.4 6.5 10.8 6.5 10.8z"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeLinejoin="round"
            />
          </svg>
          Favorites
        </button>

        {/* Separator */}
        <div
          style={{
            width: 1,
            height: 18,
            background: 'rgba(255,255,255,0.10)',
            margin: '0 6px',
            flexShrink: 0,
          }}
        />

        {/* Info panel toggle */}
        <IconBtn
          onClick={onToggleInfo}
          active={infoPanelOpen}
          title={infoPanelOpen ? 'Hide info panel' : 'Show info panel'}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
            <line x1="7" y1="6.5" x2="7" y2="10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            <circle cx="7" cy="4.5" r="0.75" fill="currentColor" />
          </svg>
        </IconBtn>

        {/* Settings — stub */}
        <IconBtn title="Settings">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.2" />
            <path
              d="M7 1.5v1M7 11.5v1M1.5 7h1M11.5 7h1M3.2 3.2l.7.7M10.1 10.1l.7.7M10.1 3.2l-.7.7M3.9 10.1l-.7.7"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </IconBtn>

        {/* Spacer before avatar */}
        <div style={{ width: 4 }} />

        {/* Avatar */}
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.75)',
            letterSpacing: '0.04em',
            flexShrink: 0,
            cursor: 'default',
            userSelect: 'none',
          }}
        >
          RW
        </div>
      </div>
    </div>
  )
}
