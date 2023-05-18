import { executeTask } from '@dcl/sdk/ecs'
import { getUserData } from "~system/UserIdentity"
import { backpackV3 } from './avatar/backpackv3'
import { setupUi } from './ui'
import { Outfit } from './categories/types'

let outfits: Map<string, Outfit>

const backpack = backpackV3()

executeTask(async () => {
  const userData = await getUserData({})
  if (!!userData.data) {
    backpack.update({
      name: userData.data.displayName,
      wearablesUrn: userData.data.avatar?.wearables,
      bodyShape: userData.data.avatar?.bodyShape
    })

    setupUi(outfits, (outfitCategory) => {
      const outfit = outfits.get(outfitCategory)
      const urns = outfit!.map(o => o.urn)
      backpack.update({
        wearablesUrn: urns,
      })
    })
  }
})

outfits = new Map<string, Outfit>()
outfits.set("sports", [
  {
    urn: "urn:decentraland:ethereum:collections-v1:cybermike_cybersoldier_set:cybersoldier_nightvision_eyewear",
    name: "CYBERSOLDIER NIGHT VISION GOGGLES - Winter Soldier Collection - FROM CYBERMIKE",
    description: "By Cybermike - Live Free or Die Hard",
    thumbnail: "https://peer.decentraland.org/content/contents/QmXt6sNkTgzeEbECW8KKzCRC9bm8k4yARZsy5UYV2qTJpQ",
    marketplace: "https://market.decentraland.org/contracts/0x24d538a6265b006d4b53c45ba91af5ef60dca6cb/items/cybersoldier_nightvision_eyewear",
    category: "eyewear",
    tags: [
      "cyber Suit",
      "cyber armour",
      "winter collection",
      "nightvision",
      "cybermike",
      "cybersoldier",
      "goggles",
      "exclusive"
    ]
  },
  {
    urn: "urn:decentraland:ethereum:collections-v1:halloween_2020:hwn_2020_cult_supreme_feet",
    name: "Evil Cult Supreme Boots - Halloween 2020",
    description: "Exclusive Halloween 2020 Collection. Awarded as Treasure Hunt prize.",
    thumbnail: "https://peer.decentraland.org/content/contents/QmQG2p3rPG9pJNn28NQRJDhcdszL8mjK3andLmnEmEfmDU",
    marketplace: "https://market.decentraland.org/contracts/0xfeb52cbf71b9adac957c6f948a6cf9980ac8c907/items/hwn_2020_cult_supreme_feet",
    category: "feet",
    tags: [
      "feet",
      "cult",
      "halloween",
      "supreme",
      "boots",
      "decentraland",
      "2020",
      "exclusive"
    ]
  },
  {
    urn: "urn:decentraland:matic:collections-v2:0xf1483f042614105cb943d3dd67157256cd003028:1",
    name: "Santa Earrings",
    description: "Lets santa drop xmas presents for those wearing Xmas-ray vision",
    thumbnail: "https://peer.decentraland.org/content/contents/QmckaNXLAnpfSDoE2EsFzRMFPBijnAaLqTwyy8oA12sToE",
    marketplace: "https://market.decentraland.org/contracts/0xf1483f042614105cb943d3dd67157256cd003028/items/1",
    category: "earring",
    tags: []
  },
  {
    urn: "urn:decentraland:matic:collections-v2:0xf1483f042614105cb943d3dd67157256cd003028:16",
    name: "Krampus-Jetpack",
    description: "Lets Krampus fly around and deliver presents",
    thumbnail: "https://peer.decentraland.org/content/contents/QmRCPYbVkY33J9GXMwby5LreQCfL2dX18mkdFN3tqVjNpJ",
    marketplace: "https://market.decentraland.org/contracts/0xf1483f042614105cb943d3dd67157256cd003028/items/16",
    category: "upper_body",
    tags: []
  }
])