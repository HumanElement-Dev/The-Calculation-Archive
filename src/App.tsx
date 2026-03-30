import { useState } from 'react'
import TopBar      from './components/TopBar'
import Sidebar     from './components/Sidebar'
import Stage       from './components/Stage'
import InfoPanel   from './components/InfoPanel'
import BrowseStrip from './components/BrowseStrip'
import { CALCULATORS } from './data/calculators'

export default function App() {
  const [activeId,       setActiveId]       = useState('ti30')
  const [infoPanelOpen,  setInfoPanelOpen]  = useState(true)

  const activeMeta = CALCULATORS.find((c) => c.id === activeId)!

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--app-bg)',
        overflow: 'hidden',
      }}
    >
      {/* ── Top bar ───────────────────────────────────────────────────────── */}
      <TopBar
        infoPanelOpen={infoPanelOpen}
        onToggleInfo={() => setInfoPanelOpen((v) => !v)}
      />

      {/* ── Body row ──────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>
        <Sidebar activeId={activeId} onSelect={setActiveId} />

        {/* Calculator hero — gets all remaining space */}
        <Stage activeId={activeId} />

        {/* Info panel slides in from the right */}
        <InfoPanel
          calc={activeMeta}
          isOpen={infoPanelOpen}
          onClose={() => setInfoPanelOpen(false)}
        />
      </div>

      {/* ── Browse strip ──────────────────────────────────────────────────── */}
      <BrowseStrip activeId={activeId} onSelect={setActiveId} />
    </div>
  )
}
