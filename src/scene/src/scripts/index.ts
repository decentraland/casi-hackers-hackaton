import { Wearable } from '../categories/types';
import { wearables, categories } from './data/wearables'

export type WearableResponse = { [key: string]: Wearable[]}

export function getWearables(name: string, value: number): WearableResponse {
  const response = wearables
    .filter($ => $.ai_tags.find(tag => tag.name === name))
    .map($ => {
      const tagValue = $.ai_tags.find(b => b.name === name)?.value
      const diff = Math.abs(Number(value) - Number(tagValue))
      return { ...$, diff, tagValue, ai_tags: [] }
    })
    .sort((a, b) => a.diff - b.diff)
    .reduce((acc: WearableResponse, $) => {
      const category = $.category
      if (!categories.includes(category)) return acc
      acc[category] = acc[category] || []
      acc[category].push($)
      return acc
    }, {})
    return response
}