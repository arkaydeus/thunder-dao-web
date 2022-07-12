// import * as React from 'React'

type Props = {
  label: string
  name: string
  disabled?: boolean
  type?: string
  register?: any
  readonly?: boolean
  min?: number
  step?: number
  checked?: boolean
}

const Toggle: React.FC<Props> = ({
  label,
  name,
  disabled,
  register,
  readonly,
  min,
  step,
  checked
}) => {
  return (
    <div className='mt-5 lg:w-full'>
      <label className='flex items-center justify-between text-lg text-primary '>
        <div className='my-2 w-[16rem]'>{label}</div>

        <label className='relative inline-flex items-center cursor-pointer xl:ml-4'>
          <input
            disabled={disabled}
            className='sr-only peer'
            type='checkbox'
            name={name}
            readOnly={readonly}
            min={min}
            step={step}
            checked={checked}
            {...register}
          ></input>
          <div className="w-11 h-6  peer-checked:bg-primary  peer-checked:bg-opacity-30 bg-primary bg-opacity-10 peer-focus:outline-none transition-all duration-700 peer-focus:ring-1 peer-focus:ring-primary/20 rounded-full peer  peer-checked:after:translate-x-full  after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-primary after:bg-opacity-50 peer-checked:after:bg-opacity-100 peer-checked:after:bg-primary after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
        </label>
      </label>
    </div>
  )
}

export default Toggle
