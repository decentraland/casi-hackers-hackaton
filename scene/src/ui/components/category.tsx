import ReactEcs, { Button } from '@dcl/sdk/react-ecs'

export const categoryComponent = (name: string, cb: (category: string) => void) => {
    return (
        <Button
            uiTransform={{ width: 100, height: 40 }}
            value="name"
            fontSize={14}
            onMouseDown={() => {
                console.log("click")
                cb(name)
            }}
        />
    )
}