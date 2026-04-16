import skinJson from './skin.json'
import photo from './waltons-primeline.png'
import type { SkinData } from '../../components/PhotoCalculator'

export const skin = skinJson as unknown as SkinData

export const photos = {
  full: photo,
  thumb: photo,
}
