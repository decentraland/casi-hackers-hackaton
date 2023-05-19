import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Label, UiEntity } from '@dcl/sdk/react-ecs'

export function capitalizeString(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const categoriesImage: Record<string, string> = {
  sport: 'https://i.postimg.cc/PqFSQ7r1/Frame-2961-1.png',
  elegant: 'https://i.postimg.cc/1tkMLNFt/Elegant-Icn.png',
  fun: 'https://i.postimg.cc/3rGt2nMD/Frame-2961.png',
  classic: 'https://i.postimg.cc/wxbsTd4X/Frame-2961-3.png',
  futuristic: 'https://i.postimg.cc/gJXNSKnQ/Frame-2963.png',
  nature: 'https://i.postimg.cc/d3GnvtR9/Frame-2964.png',
  retro: 'https://i.postimg.cc/pr790D5G/Frame-2961-4.png',
  Christmas: 'https://i.postimg.cc/3Rk02Sd4/1324728.png'
}

export const CategoryComponent = (props: { name: string, onClick: () => void }) => {
  return (
    <UiEntity uiTransform={{ width: '100%', height: 80, alignItems: 'center', margin: 16 }} onMouseDown={props.onClick} >
      <UiEntity uiTransform={{ width: '90%', height: 80, alignItems: 'center' }} uiBackground={{ color: Color4.fromHexString('#37373fFF') }}>
        <UiEntity
            uiTransform={{ width: '40', height: '40', margin: { left: 8 } }}
            uiBackground={{ textureMode: 'nine-slices', texture: { src: categoriesImage[props.name] }, textureSlices: { top: 0, bottom: 0, left: 0, right: 0 } }}
          />
        <Label value={capitalizeString(props.name)} uiTransform={{ width: 10, height: 20, margin: { left: 4 } }} fontSize={16} textAlign='middle-left'/>
        <Label value=">" uiTransform={{ width: '85%', height: 20, position: { right: 16 }, }}  fontSize={16} textAlign='middle-right'/>
      </UiEntity>
    </UiEntity>
    )
  }