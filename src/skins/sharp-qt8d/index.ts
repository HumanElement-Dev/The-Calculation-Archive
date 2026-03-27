import skinJson from './skin.json'
import photo from './sharp-qt8d.png'
import type { SkinData } from '../../components/PhotoCalculator'

// Cast the JSON to SkinData so TS narrows string literals like textAlign
export const skin = skinJson as unknown as SkinData

export const photos = {
  full: photo,
  thumb: photo,
}
