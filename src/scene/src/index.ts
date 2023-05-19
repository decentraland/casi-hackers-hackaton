import { openExternalUrl } from "~system/RestrictedActions"
import { InputAction, PointerEventType, engine, executeTask, inputSystem } from '@dcl/sdk/ecs'
import { getUserData } from "~system/UserIdentity"
import { backpackV3 } from './avatar'
import { setupUi } from './ui'
import { createAmbient } from './ambient'

createAmbient(true, true)

// TODO: super hacky system because openExternalUrl is not working on the UI
export let marketplaceUrl: string | undefined
export const updateMarketplaceUrl = (url: string) =>  marketplaceUrl = url
engine.addSystem(() => {
  if (marketplaceUrl && inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_DOWN)) {
    openExternalUrl({ url: marketplaceUrl }).then((resp) => {
      if (resp.success) {
        marketplaceUrl = undefined
      }
    })
  }
})

executeTask(async () => {
  const backpack = backpackV3()
  const userData = await getUserData({})
  if (!!userData.data) {
    backpack.update({
      name: userData.data.displayName,
      wearablesUrn: userData.data.avatar?.wearables,
      bodyShape: userData.data.avatar?.bodyShape
    })
    setupUi(backpack)
  }
})

