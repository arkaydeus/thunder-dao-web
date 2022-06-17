export const calcApr = (
  principal: number,
  repayment: number,
  duration: number
) => {
  return ((repayment * 100) / principal - 100) * (365 / duration)
}

export const getMetadata = async (contractId: string, tokenId: string) => {
  try {
    const response = await fetch(
      `https://api.nftfi.com/asset/${contractId}/${tokenId}`
    )

    return await response.json()
  } catch (error) {
    console.error(error)
  }
}

export const getArtwork = async (contractId: string, tokenId: string) => {
  const metadata = await getMetadata(contractId, tokenId)

  if (metadata) {
    return metadata.imageUrl
  }
}

export const valueOrAny = (value: string | number) => {
  return value || 'Any'
}
