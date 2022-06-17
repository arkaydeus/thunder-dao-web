import { calcApr, fromGwei } from '../lib/utils'
import { Loan } from '../models/Loan'

interface ILoanSummary {
  loans: Loan[]
}

const LoanSummary = ({ loans }: ILoanSummary) => {
  const totalLoans = loans.length
  const totalVal = loans.reduce((track, loan) => {
    return track + loan.loanPrincipalAmount
  }, 0)

  const totalRepayment = loans.reduce((track, loan) => {
    return track + loan.maximumRepaymentAmount
  }, 0)

  const apyAverage =
    loans.reduce((track, loan) => {
      const apy = Math.round(
        calcApr(
          loan.loanPrincipalAmount,
          loan.maximumRepaymentAmount,
          loan.loanDuration / 86400
        )
      )
      return track + loan.loanPrincipalAmount * apy
    }, 0) / totalVal

  return (
    <div className='mt-8'>
      <div className='grid justify-between grid-cols-1 p-4 text-center border-2 border-white text-md md:text-center md:grid-cols-2 xl:grid-cols-2'>
        <div className='flex'>
          <div className='flex-1'>Loans: </div>
          <div className='flex-1 text-primary'>{totalLoans}</div>
        </div>
        <div className='flex'>
          <div className='flex-1'>Vol weighted APY: </div>
          <div className='flex-1 text-primary'>{apyAverage.toFixed(2)} %</div>
        </div>
        <div className='flex'>
          <div className='flex-1'>Leant: </div>
          <div className='flex-1 text-primary'>
            {' '}
            {fromGwei(totalVal).toFixed(2)} ETH
          </div>
        </div>
        <div className='flex'>
          <div className='flex-1'>Repayment: </div>
          <div className='flex-1 text-primary'>
            {fromGwei(totalRepayment).toFixed(2)} ETH
          </div>
        </div>
        <div className='flex'>
          <div className='flex-1'>Profit: </div>
          <div className='flex-1 text-primary'>
            {fromGwei(totalRepayment - totalVal).toFixed(2)} ETH
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoanSummary
