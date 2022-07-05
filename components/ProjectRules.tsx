import { OfferRule } from '../models/OfferRules'
import FormInput from './FormInput'

interface IProjectRule {
  projectRule: OfferRule
  projectName: string
}

const ProjectRules = ({ projectRule, projectName }: IProjectRule) => {
  return (
    <div className='mt-12'>
      <div className='text-2xl hover:underline'>{projectName}</div>

      <div className='w-full sm:w-96'>
        <FormInput
          label='Duration (days)'
          name='duration'
          value={projectRule.duration.toString()}
          readonly
        />
        <FormInput
          label='Max bid (ETH)'
          name='maxBid'
          value={projectRule.maxBid.toString()}
          readonly
        />
        <FormInput
          label='Min rate (%)'
          name='minRate'
          value={projectRule.minRate.toString()}
          readonly
        />
      </div>
    </div>
  )
}

export default ProjectRules
