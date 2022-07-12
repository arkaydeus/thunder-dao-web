export type OfferRule = {
  duration: number
  maxBid: number
  minRate: number
  canOffer?: boolean
}

export type OfferRules = Record<string, OfferRule>
