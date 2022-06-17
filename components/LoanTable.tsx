import { Loan } from '../models/Loan'
import LoanItems from './LoanItems'

interface ILoanTable {
  loans: Loan[]
}

const LoanTable = ({ loans }: ILoanTable) => {
  return (
    <div className='mt-16 border-t-2 shadow-md border-x-2'>
      <div className='flex-row hidden p-4 text-sm font-bold border-b-2 sm:flex'>
        <div className='flex-1 text-center '>Token ID</div>
        <div className='flex-1 text-center '>Due time</div>
        <div className='flex-1 text-center '>Status</div>
        <div className='flex-1 text-center '>Duration (days)</div>
        <div className='flex-1 text-center '>Loan val (ETH)</div>
        <div className='flex-1 text-center '>Repayment (ETH)</div>
        <div className='flex-1 text-center '>APY %</div>
      </div>
      <LoanItems loans={loans} />
    </div>
  )
}

export default LoanTable
