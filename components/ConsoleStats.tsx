import { calcApr, fromGwei } from '../lib/utils'
import { Loan } from '../models/Loan'

export interface IConsoleStats {
  loans: Loan[]
}

const ConsoleStats = ({ loans }: IConsoleStats) => {
  const activeLoans = loans.filter((loan: Loan) => loan.status === 'escrow')
  const settledLoans = loans.filter((loan: Loan) => loan.status !== 'escrow')

  const totalLoans = activeLoans.length + settledLoans.length

  const activePrinciple = activeLoans.reduce((tracker, loan) => {
    return tracker + fromGwei(loan.loanPrincipalAmount)
  }, 0)
  const settledPrinciple = settledLoans.reduce((tracker, loan) => {
    return tracker + fromGwei(loan.loanPrincipalAmount)
  }, 0)

  const activeRepayment = activeLoans.reduce((tracker, loan) => {
    return tracker + fromGwei(loan.maximumRepaymentAmount)
  }, 0)
  const settledRepayment = settledLoans.reduce((tracker, loan) => {
    return tracker + fromGwei(loan.maximumRepaymentAmount)
  }, 0)

  const activeDuration =
    activeLoans.reduce((tracker, loan) => {
      return tracker + loan.loanDuration / 86400
    }, 0) / activeLoans.length
  const settledDuration =
    settledLoans.reduce((tracker, loan) => {
      return tracker + loan.loanDuration / 86400
    }, 0) / settledLoans.length
  const totalDuration =
    loans.reduce((tracker, loan) => {
      return tracker + loan.loanDuration / 86400
    }, 0) / loans.length

  const activeProfit = activeRepayment - activePrinciple
  const settledProfit = settledRepayment - settledPrinciple

  const activeAverage =
    activeLoans.reduce((track, loan) => {
      const apy = Math.round(
        calcApr(
          loan.loanPrincipalAmount,
          loan.maximumRepaymentAmount,
          loan.loanDuration / 86400
        )
      )
      return track + loan.loanPrincipalAmount * apy
    }, 0) /
    (activePrinciple * 10 ** 18)

  const settledAverage =
    settledLoans.reduce((track, loan) => {
      const apy = Math.round(
        calcApr(
          loan.loanPrincipalAmount,
          loan.maximumRepaymentAmount,
          loan.loanDuration / 86400
        )
      )
      return track + loan.loanPrincipalAmount * apy
    }, 0) /
    (settledPrinciple * 10 ** 18)

  const totalAverage =
    loans.reduce((track, loan) => {
      const apy = Math.round(
        calcApr(
          loan.loanPrincipalAmount,
          loan.maximumRepaymentAmount,
          loan.loanDuration / 86400
        )
      )
      return track + loan.loanPrincipalAmount * apy
    }, 0) /
    ((settledPrinciple + activePrinciple) * 10 ** 18)

  const valueClass = 'text-right text-primary'

  return (
    <div className='flex justify-center flex-1'>
      <div className='flex flex-col p-4 border-2 border-white mt-28 rounded-xl'>
        <div className='grid grid-cols-1 gap-12 md:grid-cols-2'>
          <div className=''>
            <div className='text-2xl border-b-2 border-white/50'>
              Loan count
            </div>
            <div className='grid grid-cols-2 gap-4 mt-4 text-xl'>
              <div className=''>Active</div>
              <div className={valueClass}>{activeLoans.length}</div>
              <div className=''>Settled</div>
              <div className={valueClass}>{settledLoans.length}</div>
              <div className=''>Total loans</div>
              <div className='text-right text-primary'>{totalLoans}</div>
            </div>
          </div>
          <div className=''>
            <div className='text-2xl border-b-2 border-white/50'>Principle</div>
            <div className='grid grid-cols-2 gap-4 mt-4 text-xl'>
              <div className=''>Active </div>
              <div className={valueClass}>
                {activePrinciple.toFixed(2)}{' '}
                <span className='text-white'>ETH</span>
              </div>
              <div className=''>Settled</div>
              <div className={valueClass}>
                {settledPrinciple.toFixed(2)}{' '}
                <span className='text-white'>ETH</span>
              </div>
              <div className=''>Total principle</div>
              <div className={valueClass}>
                {(activePrinciple + settledPrinciple).toFixed(2)}{' '}
                <span className='text-white'>ETH</span>
              </div>
            </div>
          </div>
          <div className=''>
            <div className='text-2xl border-b-2 border-white/50'>Profit</div>
            <div className='grid grid-cols-2 gap-4 mt-4 text-xl'>
              <div className=''>Active </div>
              <div className={valueClass}>
                {activeProfit.toFixed(2)}{' '}
                <span className='text-white'>ETH</span>
              </div>
              <div className=''>Settled</div>
              <div className={valueClass}>
                {settledProfit.toFixed(2)}{' '}
                <span className='text-white'>ETH</span>
              </div>
              <div className=''>Total profit</div>
              <div className={valueClass}>
                {(activeProfit + settledProfit).toFixed(2)}{' '}
                <span className='text-white'>ETH</span>
              </div>
            </div>
          </div>
          <div className=''>
            <div className='text-2xl border-b-2 border-white/50'>Margin</div>
            <div className='grid grid-cols-2 gap-4 mt-4 text-xl'>
              <div className=''>Active </div>
              <div className={valueClass}>
                {((activeProfit / activePrinciple) * 100).toFixed(2)}{' '}
                <span className='text-white'>%</span>
              </div>
              <div className=''>Settled</div>
              <div className={valueClass}>
                {((settledProfit / settledPrinciple) * 100).toFixed(2)}{' '}
                <span className='text-white'>%</span>
              </div>
              <div className=''>Total margin</div>
              <div className={valueClass}>
                {(
                  ((settledProfit + activeProfit) /
                    (settledPrinciple + activePrinciple)) *
                  100
                ).toFixed(2)}{' '}
                <span className='text-white'>%</span>
              </div>
            </div>
          </div>
          <div className=''>
            <div className='text-2xl border-b-2 border-white/50'>APY</div>
            <div className='grid grid-cols-2 gap-4 mt-4 text-xl'>
              <div className=''>Active </div>
              <div className={valueClass}>
                {activeAverage.toFixed(2)} <span className='text-white'>%</span>
              </div>
              <div className=''>Settled</div>
              <div className={valueClass}>
                {settledAverage.toFixed(2)}{' '}
                <span className='text-white'>%</span>
              </div>
              <div className=''>Total APY</div>
              <div className={valueClass}>
                {totalAverage.toFixed(2)} <span className='text-white'>%</span>
              </div>
            </div>
          </div>

          <div className=''>
            <div className='text-2xl border-b-2 border-white/50'>
              Average duration
            </div>
            <div className='grid grid-cols-2 gap-4 mt-4 text-xl'>
              <div className=''>Active </div>
              <div className={valueClass}>{activeDuration.toFixed(2)}</div>
              <div className=''>Settled</div>
              <div className={valueClass}>{settledDuration.toFixed(2)}</div>
              <div className=''>Total APY</div>
              <div className={valueClass}>{totalDuration.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConsoleStats
