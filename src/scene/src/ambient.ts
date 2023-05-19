import { GltfContainer, Transform, engine } from "@dcl/sdk/ecs";

export function createAmbient(createDome: boolean, createEmptyScene: boolean) {
    if (createDome) {
        const dome = engine.addEntity()
        GltfContainer.create(dome, { src: 'models/dome.glb' })
        Transform.create(dome, { position: { x: 8, y: 0, z: 8 } })
    }

    if (createEmptyScene) {
        const empty = engine.addEntity()
        GltfContainer.create(empty, { src: 'models/emptyscene.glb' })
        Transform.create(empty, { position: { x: 8, y: 0, z: 8 } })
    }
}