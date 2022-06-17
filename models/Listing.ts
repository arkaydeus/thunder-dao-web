export type Listing = {
  id: string
  date: {
    listed: string
  }
  nft: {
    id: string
    address: string
    name: string
    project: {
      name: string
    }
  }
  borrower: {
    address: string
  }
  terms: {
    loan: {
      duration: string
      repayment: string
      principal: string
      currency: string
    }
  }
  nftfi: {
    contract: {
      name: string
    }
  }
  artworkUrl?: string
}
