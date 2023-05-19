import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Button, Label, UiEntity } from '@dcl/sdk/react-ecs'

export function capitalizeString(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const CategoryComponent = (props: { name:string, onClick: () => void }) => {
  return (
    <UiEntity uiTransform={{ width: '100%', height: 80, alignItems: 'center', margin: 16 }} onMouseDown={props.onClick} >
      <UiEntity uiTransform={{ width: '90%', height: 80, alignItems: 'center' }} uiBackground={{ color: Color4.fromHexString('#37373fFF') }}>
        <Label value={capitalizeString(props.name)} uiTransform={{ width: 10, height: 20, margin: { left: 16 } }}  fontSize={16} textAlign='middle-left'/>
        <Label value=">" uiTransform={{ width: '85%', height: 20, position: { right: 0 }, }}  fontSize={16} textAlign='middle-right'/>
      </UiEntity>
    </UiEntity>
    )
  }