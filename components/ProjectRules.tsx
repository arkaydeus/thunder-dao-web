import { OfferRule } from '../models/OfferRules'
import FormInput from './FormInput'
import Toggle from './Toggle'

interface IProjectRule {
  projectRule: OfferRule
  projectName: string
}

const ProjectRules = ({ projectRule, projectName }: IProjectRule) => {
  console.log(projectName, JSON.stringify(projectRule))

  return (
    <div className='mt-12'>
      <div className='text-2xl hover:underline'>{projectName}</div>

      <div className='w-full sm:w-96'>
        <Toggle
          label='Can offer?'
          name='canOffer'
          checked={projectRule.canOffer}
        />

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
