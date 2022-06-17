import { ReactNode } from 'react'

export interface IButtonProps {
  children?: ReactNode
  primary?: boolean
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  visible?: boolean
}

const Button = ({
  children,
  onClick,
  primary,
  className,
  type,
  visible = true
}: IButtonProps) => {
  const buttonColor = primary
    ? 'border-primary border-2 bg-primary'
    : 'border-primary border-2 bg-transparent'
  const textColor = primary ? 'text-black' : 'text-primary'
  return visible ? (
    <button
      type={type || 'button'}
      className={`${buttonColor} ${textColor} px-4 py-2 my-2 overflow-x-hidden text-sm justify-center  uppercase transition-all duration-150 rounded-md bg-bl drop-shadow-md hover:drop-shadow-lg hover:scale-110 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  ) : (
    <></>
  )
}

export default Button
