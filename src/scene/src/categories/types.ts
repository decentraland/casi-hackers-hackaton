export type Wearable = {
    urn: string
    name: string
    thumbnail: string
    marketplace: string
    category: string
    tags: string[]
    description: string
}

export type Outfit = Wearable[]

/*
             {
                "urn": "urn:decentraland:ethereum:collections-v1:cybermike_cybersoldier_set:cybersoldier_nightvision_eyewear",
                "name": "CYBERSOLDIER NIGHT VISION GOGGLES - Winter Soldier Collection - FROM CYBERMIKE",
                "description": "By Cybermike - Live Free or Die Hard",
                "thumbnail": "https://peer.decentraland.org/content/contents/QmXt6sNkTgzeEbECW8KKzCRC9bm8k4yARZsy5UYV2qTJpQ",
                "marketplace": "https://market.decentraland.org/contracts/0x24d538a6265b006d4b53c45ba91af5ef60dca6cb/items/cybersoldier_nightvision_eyewear",
                "category": "eyewear",
                "tags": [
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
*/