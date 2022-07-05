import Link from 'next/link'
import { calcApr, valueOrAny } from '../lib/utils'
import { Loan } from '../models/Loan'

const COL_CLASS = `flex flex-row justify-between items-center sm:flex-1`

const niceDateTime = (value: string) => {
  const isoDate = new Date(value).toISOString()
  return isoDate.slice(0, 10) + ' ' + isoDate.slice(11, 19)
}

const timeBlock = (value: string) => {
  const isoDate = new Date(value).toISOString()
  const dateStr = isoDate.slice(0, 10)
  const timeStr = isoDate.slice(11, 19)
  return (
    <div className='flex flex-col items-end sm:items-center'>
      <div>{dateStr}</div>
      <div>{timeStr}</div>
    </div>
  )
}

const LoanItems = ({ loans }: { loans: Loan[] | undefined }) => {
  if (!loans) return <></>
  const sortedLoans = loans.sort((a: Loan, b: Loan) => {
    return (
      new Date(b.loanStartTime).getTime() - new Date(a.loanStartTime).getTime()
    )
  })

  return (
    <div>
      {sortedLoans.map(loan => {
        return (
          <Link
            key={loan.loanId}
            href={`https://app.nftfi.com/assets/${loan.nftCollateralContract}/${loan.nftCollateralId}`}
          >
            <div className='flex flex-col flex-1 px-4 py-3 text-sm border-b-2 sm:flex-row hover:cursor-pointer'>
              <div className={COL_CLASS}>
                <span className='font-bold sm:hidden'>Token ID</span>
                <span className='flex-1 text-right sm:text-center'>
                  {valueOrAny(loan.nftCollateralId)}
                </span>
              </div>
              <div className={COL_CLASS}>
                <span className='font-bold sm:hidden'>Due time</span>
                <span className='flex-1 text-right sm:text-center'>
                  {timeBlock(loan.loanStartTime)}
                </span>
              </div>
              <div className={COL_CLASS}>
                <span className='font-bold sm:hidden'>Status</span>
                <span className='flex-1 text-right sm:text-center'>
                  {valueOrAny(loan.status)}
                </span>
              </div>
              <div className={COL_CLASS}>
                <span className='font-bold sm:hidden'>Duration (days)</span>
                <span className='flex-1 text-right sm:text-center'>
                  {valueOrAny(loan.loanDuration / 86400)}
                </span>
              </div>
              <div className={COL_CLASS}>
                <span className='font-bold sm:hidden'>Loan value (ETH)</span>
                <span className='flex-1 text-right sm:text-center'>
                  {valueOrAny(loan.loanPrincipalAmount / 10 ** 18)}
                </span>
              </div>
              <div className={COL_CLASS}>
                <span className='font-bold sm:hidden'>Repayment (ETH)</span>
                <span className='flex-1 text-right sm:text-center'>
                  {valueOrAny(
                    (loan.maximumRepaymentAmount / 10 ** 18).toFixed(2)
                  )}
                </span>
              </div>
              <div className={COL_CLASS}>
                <span className='font-bold sm:hidden'>Profit</span>
                <span className='flex-1 text-right sm:text-center'>
                  {valueOrAny(
                    (
                      loan.maximumRepaymentAmount / 10 ** 18 -
                      loan.loanPrincipalAmount / 10 ** 18
                    ).toFixed(2)
                  )}
                </span>
              </div>
              <div className={COL_CLASS}>
                <span className='font-bold sm:hidden'>APY %</span>
                <span className='flex-1 text-right sm:text-center'>
                  {valueOrAny(
                    Math.round(
                      calcApr(
                        loan.loanPrincipalAmount,
                        loan.maximumRepaymentAmount,
                        loan.loanDuration / 86400
                      ) ?? 0
                    )
                  )}
                </span>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default LoanItems
