import ReactEcs, { Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'

import { getWearables, WearableResponse } from '../scripts'
import { categories as wearableCategories } from '../scripts/data/wearables'
import { WearableComponent } from './components/wearable'
import { capitalizeString, CategoryComponent } from './components/category'

const categories = ['sport', 'elegant', 'fun', 'classic', 'retro', 'business', 'futuristic']
let wearables: WearableResponse = getWearables('sport', 1)
let outfits: Record<string, string> = {}
let selectedCategory: string | undefined

const uiComponent = () => {
  return <UiEntity
      uiTransform={{
        positionType: 'absolute',
        position: { right: 0, top: 0 },
        width: 300,
        height: '100%',
        flexDirection: "column",
        display: 'flex',
        padding: { top: '80px' }
      }}
      uiBackground={{ color: Color4.fromHexString('#23242cff') }}
    >
      { !selectedCategory
        ? <UiEntity uiTransform={{ flexDirection: "column", margin: { top: 16 } }}>
          {categories.map(c => <CategoryComponent name={c} onClick={() => handleCategory(c)} />)}
        </UiEntity>
        : <UiEntity uiTransform={{ flexDirection: "column" }}>
            <UiEntity
            uiTransform={{ width: '100%', height: 40, flexDirection: 'row', position: { top: 8 }, alignItems: 'center' }}
          >
            <UiEntity
              onMouseDown={() => handleCategory(undefined)}
              uiTransform={{ width: 12, height: 12, margin: { left: 16, right: 8  } }}
              uiBackground={{ textureMode: 'nine-slices', texture: { src: 'https://i.postimg.cc/pdf0Rg1Q/BackIcn.png' }, textureSlices: { top: 0, bottom: 0, left: 0, right: 0 } }}
            />
            <Label uiTransform={{ width: 60, height: 20 }} fontSize={16} value={`${capitalizeString(selectedCategory)} outfit`} textAlign='middle-left' />
            <UiEntity
              uiTransform={{ width: 14, height: 14, position: { right: 30 }, positionType: 'absolute' }}
              uiBackground={{ textureMode: 'nine-slices', texture: { src: 'https://i.postimg.cc/GpSGGKN8/RetryIcn.png' }, textureSlices: { top: 0, bottom: 0, left: 0, right: 0 } }}
            />
          </UiEntity>
          {wearableCategories.map(wearableCategories => <WearableComponent category={selectedCategory!} wearableCategory={wearableCategories} wearables={wearables[wearableCategories]} /> )}
        </UiEntity>
      }
      </UiEntity>
}

export function updateBackpack(wearablesUrn: { wearablesUrn: string[]}) {
  return update(wearablesUrn)
}

type UpdateFn = (urn: { wearablesUrn: string[]}) => void
let update: UpdateFn
export function setupUi(updateBackpack: { update: UpdateFn }) {
  ReactEcsRenderer.setUiRenderer(uiComponent)
  update = updateBackpack.update
  updateBackpack.update({ wearablesUrn: Object.values(outfits) })
  resetOutfit()
}

export const updateOutfit = (value: Record<string, string>) => {
  const urns = Object.values(value)
  const oldUrns = Object.values(outfits)
  const isDiff = !!urns.find(u => !oldUrns.includes(u))
  if (isDiff) {
    outfits = { ...outfits, ...value }
    updateBackpack({ wearablesUrn: Object.values(outfits) })
  }
}


function resetOutfit() {
  const preOutfit: Record<string, string> = {}
  for (const c of wearableCategories) {
    preOutfit[c] = wearables[c] && wearables[c][0].urn || ''
  }
  updateOutfit(preOutfit)
}

function handleCategory(category?: string) {
  selectedCategory = category
  if (category) {
    wearables = getWearables(category, 1)
    resetOutfit()
  }
}
