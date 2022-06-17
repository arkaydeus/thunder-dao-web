export type Loan = {
  activeTransactionHash: string | null
  activeTransactionName: string | null
  assetCategory: string
  assetName: string
  borrower: string
  contractName: string
  imageUrl: string
  lender: string
  liquidated: boolean
  loanDueTime: string
  loanDuration: number
  loanERC20Denomination: string
  loanId: number
  loanInterestRateForDurationInBasisPoints: number
  loanPrincipalAmount: number
  loanStartTime: string
  maximumRepaymentAmount: number
  nftCollateralContract: string
  nftCollateralId: string
  nftKey: string
  repaid: boolean
  smartNftId: string
  status: string
  __v: number
  _id: string
}
