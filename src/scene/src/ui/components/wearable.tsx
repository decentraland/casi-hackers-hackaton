import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Button, Label, UiEntity } from '@dcl/sdk/react-ecs'
import { Wearable } from '../../categories/types';
import { updateOutfit } from '..';
import { mappedCategories } from '../../scripts/data/wearables';
import { updateMarketplaceUrl } from '../..';

export let indexWearable = new Map<string, number>()
export const WearableComponent = ({ category, wearableCategory, wearables }: { category: string, wearableCategory: string; wearables: Wearable[] }) => {
  if (!wearables?.length) return null
  const index =(indexWearable.get(category + wearableCategory) ?? 0) % (wearables.length - 1)
  if (!wearables[index]) return null
  const { thumbnail, name, marketplace } = wearables[index]
  return (
    <UiEntity
      uiTransform={{ width: '100%', height: 200, padding: 14, flexDirection: 'column' }}
    >
      <UiEntity uiTransform={{ width: '100%', height: 1, margin: { top: 0, bottom: 16 } }} uiBackground={{ color: Color4.fromHexString('#716B7CFF') }} />
      <UiEntity uiTransform={{ width: '100%', height: '100%' }} >
        <UiEntity uiTransform={{ width: 90, height: 90 }} uiBackground={{ color: Color4.fromHexString('#43404AFF') }}>
          <UiEntity
            uiTransform={{ width: '90%', height: '90%' }}
            uiBackground={{ textureMode: 'nine-slices', texture: { src: thumbnail }, textureSlices: { top: 0, bottom: 0, left: 0, right: 0 } }}
          />
        </UiEntity>
        <UiEntity
          uiTransform={{ flexDirection: 'column', width: 60, height: '100%', alignItems: 'center', margin: { left: 16 } }}
        >
          <Label fontSize={14} uiTransform={{ height: 15, width: '100%', margin: { bottom: 6, top: 6 } }} value={mappedCategories[wearableCategory]} textAlign='middle-left'/>
          <Label fontSize={16} uiTransform={{ height: 15, width: '100%', margin: { bottom: 6, top: 6 } }} value={name.slice(0, 10)} textAlign='middle-left'/>
          {purchaseComponent(false, marketplace)}
        </UiEntity>
        <UiEntity
          uiTransform={{ flexDirection: 'row', width: '30', height: '100%', position: { right: 0 }, positionType: 'absolute' }}
        >
          <UiEntity
            onMouseDown={() => {
              let newIndex = (index + 1) % (wearables.length - 1)
              if (!wearables[newIndex]) {
                newIndex = 0
              }
              indexWearable.set(category + wearableCategory, newIndex)
              updateOutfit({ [wearableCategory]: wearables[newIndex].urn })
            }}
            uiTransform={{ width: 14, height: 14, margin: { top: 2, right: 4 } }}
            uiBackground={{ textureMode: 'nine-slices', texture: { src: 'https://i.postimg.cc/GpSGGKN8/RetryIcn.png' }, textureSlices: { top: 0, bottom: 0, left: 0, right: 0 } }}
          />
          <Label value='x' uiTransform={{ width: 10, height: 10 }} fontSize={16}/>
        </UiEntity>
      </UiEntity>
    </UiEntity>
    )
  }

  const purchaseComponent = (owned: boolean, url: string) => {
    if (owned) return undefined
    return (
      <Button
      uiTransform={{ height: 25, width: 80, margin: { left: 20, top: 6 }}}
      uiBackground={{ color: Color4.fromHexString('#FF7439FF')}}
      value='Buy'
      variant='primary'
      fontSize={14}
      onMouseDown={() => {
        updateMarketplaceUrl(url)
      }}
      />
      )
    }