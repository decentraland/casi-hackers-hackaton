import { AvatarAnchorPointType, AvatarAttach, AvatarShape, CameraModeArea, CameraType, Transform, engine } from "@dcl/sdk/ecs";

export function backpackV3() {
    const AVATAR_ID = 'backpackV3'

    const rootEntity = engine.addEntity()
    const avatarEntity = engine.addEntity()
    const cameraModeAreaEntity = engine.addEntity()
    const rootAnchorEntity = engine.addEntity()

    let emoteTimestamp = 0;

    AvatarShape.create(avatarEntity, {
        emotes: [],
        id: AVATAR_ID,
        wearables: []
    })
    Transform.create(avatarEntity, { parent: rootEntity })
    Transform.create(rootEntity, { position: { x: 0, y: 1.3, z: 2.5 }, parent: rootAnchorEntity })

    AvatarAttach.create(rootAnchorEntity, {
        anchorPointId: AvatarAnchorPointType.AAPT_POSITION
    })

    CameraModeArea.create(cameraModeAreaEntity, { area: { x: 16, y: 16, z: 16 }, mode: CameraType.CT_FIRST_PERSON })
    Transform.create(cameraModeAreaEntity, { position: { x: 8, y: 0, z: 8 } })

    function update(opt: UpdateOpt) {
        const avatar = AvatarShape.getMutable(avatarEntity)

        if (!!opt.wearablesUrn)
            avatar.wearables = opt.wearablesUrn

        if (!!opt.name)
            avatar.name = opt.name

        if (!!opt.emote) {
            avatar.expressionTriggerId = opt.emote
            avatar.expressionTriggerTimestamp = emoteTimestamp
            emoteTimestamp++
        }

        if (!!opt.bodyShape)
            avatar.bodyShape = opt.bodyShape

    }

    return { update }
}

export type UpdateOpt = {
    wearablesUrn?: string[]
    name?: string
    emote?: string
    bodyShape?: string
}

/**
 * EMOTES:
 * wave
 * fistpump
 * robot
 * raiseHand
 * clap
 * money
 * kiss
 * tik
 * hammer
 * teknotonix
 * dontsee
 * handsair
 * shrug
 * disco
 * dab
 * headexplode
 */