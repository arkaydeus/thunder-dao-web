export type OfferRule = {
  duration: number
  maxBid: number
  minRate: number
}

export type OfferRules = Record<string, OfferRule>
