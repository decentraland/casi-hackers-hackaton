import ReactEcs, { ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { wearableComponent } from './components/wearable'
import { categoryComponent } from './components/category'
import { Outfit, Wearable } from '../categories/types'

// change to event
let onChangeCallback: (outfit: string) => void
let outfits: Map<string, Outfit>

let wearables: Wearable[] = []

const uiWearables =
  wearables.map(w => wearableComponent(w.thumbnail, w.name, false, w.marketplace))


const uiComponent = () => (
  <UiEntity>
    <UiEntity
      uiTransform={{
        width: 400,
        height: 200,
        flexDirection: "column",
        display: 'flex',
        margin: { top: '200px' }
      }}
    ></UiEntity>
    {
      uiWearables
    }
  </UiEntity>
)

export function setupUi(_outfits: Map<string, Outfit>, callback: (outfitCategory: string) => void) {
  ReactEcsRenderer.setUiRenderer(uiComponent)
  outfits = _outfits
  onChangeCallback = callback

  // TODO: borrar
  onOutfitChanged("sports")
}

function onOutfitChanged(name: string) {
  wearables = outfits.get(name)!
  onChangeCallback(name)
}