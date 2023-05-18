import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Button, UiEntity } from '@dcl/sdk/react-ecs'
import { openExternalUrl } from "~system/RestrictedActions"

export const wearableComponent = (thumbnailUrl: string, name: string, owned: boolean, marketPlaceUrl: string) => {
    return (
        <UiEntity
            uiTransform={{
                width: 230,
                height: 100,
                flexDirection: "row"
            }}
            uiBackground={{ color: Color4.Red() }}
        >
            {
                purchaseComponent(owned, marketPlaceUrl)
            }
            <UiEntity
                uiTransform={{
                    width: 100,
                    height: 100
                }}
                uiBackground={{
                    textureMode: 'nine-slices',
                    texture: {
                        src: thumbnailUrl
                    },
                    textureSlices: {
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0
                    }
                }} />
            <UiEntity
                uiTransform={{
                    width: 100,
                    height: 100
                }}
                uiText={{
                    value: name,
                    fontSize: 15

                }} />

        </UiEntity>
    )
}

const purchaseComponent = (owned: boolean, url: string) => {
    if (owned) return undefined
    return (
        <Button
            uiTransform={{ width: 100, height: 40, margin: 8, position: { right: 0, bottom: 0 }, positionType: 'absolute' }}
            value='Purchase'
            variant='primary'
            fontSize={14}
            onMouseDown={() => {
                console.log("click")
                openExternalUrl({ url: url })
            }}
        />
    )
}