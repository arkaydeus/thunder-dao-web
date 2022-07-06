import Router from 'next/router'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNftfiContext } from '../context/NftfiContext'
import { OfferRule } from '../models/OfferRules'
import Button from './Button'
import FormInput from './FormInput'

interface IProjectRule {
  projectRule: OfferRule
  projectName: string
}

const ProjectRulesForm = ({ projectRule, projectName }: IProjectRule) => {
  const [failSafe, setFailSafe] = useState<boolean>(false)

  const { updateRule } = useNftfiContext()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<OfferRule>({
    defaultValues: projectRule
  })
  const onSubmit = async (data: OfferRule) => {
    console.log(data)
    updateRule(projectName, data)
    setFailSafe(false)
    Router.push('/projects')
  }

  return (
    <div className='mt-12'>
      <div className='text-2xl'>{projectName}</div>

      <div className='w-full sm:w-96'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label='Duration (days)'
            name='duration'
            type='number'
            register={register('duration', {
              required: 'You must specify a duration',
              valueAsNumber: true
            })}
          />
          {errors?.duration && (
            <p className='my-2 text-right text-secondary/70'>
              {errors?.duration.message}
            </p>
          )}
          <FormInput
            label='Max bid (ETH)'
            name='maxBid'
            type='number'
            min={0}
            step={0.1}
            register={register('maxBid', {
              required: 'You must specify a max bid',
              valueAsNumber: true
            })}
          />
          {errors?.maxBid && (
            <p className='my-2 text-right text-secondary/70'>
              {errors?.maxBid.message}
            </p>
          )}
          <FormInput
            label='Min rate (%)'
            name='minRate'
            type='number'
            min={0}
            step={0.1}
            register={register('minRate', {
              required: 'You must specify a min rate',
              valueAsNumber: true
            })}
          />
          {errors?.minRate && (
            <p className='my-2 text-right text-secondary/70'>
              {errors?.minRate.message}
            </p>
          )}
          {!failSafe && (
            <div className='flex justify-end mt-8'>
              {/* <div className='my-2 w-[16rem]'>Submitting</div> */}
              <Button
                className='w-full'
                onClick={() => {
                  setFailSafe(true)
                }}
              >
                submit and send live immediately
              </Button>
            </div>
          )}
          {failSafe && (
            <div className='flex flex-col justify-end mt-8'>
              <div className='text-red-500'>
                WARNING: Hitting ACTIVATE will immediately send the above
                settings live and could result in offers being made instantly.
              </div>

              <Button className='w-full' type='submit' primary>
                activate
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default ProjectRulesForm
