import { Loan } from '../models/Loan'
import LoanItems from './LoanItems'

interface ILoanTable {
  loans: Loan[]
}

const LoanTable = ({ loans }: ILoanTable) => {
  return (
    <div className='mt-16 border-t-2 shadow-md border-x-2'>
      <div className='flex-row hidden p-4 text-sm font-black text-center border-b-2 sm:flex'>
        <div className='flex-1 '>Token ID</div>
        <div className='flex-1 '>Due time</div>
        <div className='flex-1 '>Status</div>
        <div className='flex-1 '>Duration (days)</div>
        <div className='flex-1 '>Loan val (ETH)</div>
        <div className='flex-1 '>Repayment (ETH)</div>
        <div className='flex-1 '>Profit (ETH)</div>
        <div className='flex-1 '>APY %</div>
      </div>
      <LoanItems loans={loans} />
    </div>
  )
}

export default LoanTable
