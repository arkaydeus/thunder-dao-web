// import * as React from 'React'

type Props = {
  label: string
  name: string
  value?: string
  disabled?: boolean
  type?: string
  register?: any
  readonly?: boolean
  min?: number
  step?: number
}

const FormInput: React.FC<Props> = ({
  label,
  name,
  value,
  disabled,
  type,
  register,
  readonly,
  min,
  step
}) => {
  return (
    // <div className="w-2/5 bg-slate-500">
    <div className='mt-5 lg:w-full'>
      <label className='items-center text-lg xl:flex text-primary'>
        <div className='my-2 w-[16rem]'>{label}</div>
        <input
          disabled={disabled}
          value={value}
          className='flex-1 w-full p-2 transition-all duration-700 border-2 rounded-lg xl:ml-4 outline-0 focus:border-opacity-100 border-primary border-opacity-20 text-primary bg-back1'
          type={type}
          name={name}
          readOnly={readonly}
          min={min}
          step={step}
          {...register}
        ></input>
      </label>
    </div>
  )
}

export default FormInput
