import { useState } from 'react'
import Stage from './components/Stage'
import SkinEditor from './components/SkinEditor'
import { skin as sharpSkin, photos as sharpPhotos } from './skins/sharp-qt8d'

export default function App() {
  const [editorOpen, setEditorOpen] = useState(false)

  if (editorOpen) {
    return (
      <SkinEditor
        skin={sharpSkin}
        photo={sharpPhotos.full}
        onClose={() => setEditorOpen(false)}
      />
    )
  }

  return (
    <>
      <Stage />
      <button
        onClick={() => setEditorOpen(true)}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          background: 'rgba(255,255,255,0.08)',
          color: 'rgba(255,255,255,0.5)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 6,
          padding: '8px 14px',
          fontSize: 11,
          fontFamily: "'DM Mono', monospace",
          cursor: 'pointer',
          letterSpacing: '0.1em',
        }}
      >
        Edit Skin
      </button>
    </>
  )
}
