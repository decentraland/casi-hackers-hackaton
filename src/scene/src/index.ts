import { executeTask } from '@dcl/sdk/ecs'
import { getUserData } from "~system/UserIdentity"
import { backpackV3 } from './avatar/backpackv3'
import { setupUi } from './ui'
import { createAmbient } from './ambient'

createAmbient(true, true)

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

