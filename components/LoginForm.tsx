import Image from 'next/image'
import { useForm } from 'react-hook-form'
import FormInput from '../components/FormInput'
import { useAuth } from '../context/AuthContext'
import Logo from '../public/logo.svg'

import Button from '../components/Button'

type LoginFormData = {
  email: string
  password: string
}

const LoginForm = () => {
  const { login, userId, loggedIn } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({})
  const onSubmit = async (data: LoginFormData) => {
    login(data.email, data.password)
  }

  return (
    <div className='flex flex-col items-center'>
      <div className=' m-20 xl:w-[600px]  bg-black/40 p-8 rounded-xl'>
        <div className='flex items-center justify-between'>
          <div className='text-2xl text-white'>Thunder DAO login</div>
          <div className='w-10 m-l-2'>
            <Image src={Logo} alt='logo' />
          </div>
        </div>
        <div className='text-white'>{loggedIn && userId}</div>
        <div className='mt-12'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              label='Username (email)'
              name='email'
              type='email'
              register={register('email', {
                required: 'You must specify an email address',
                pattern: {
                  value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Please enter a valid email'
                }
              })}
            />
            {errors?.email && (
              <p className='my-2 text-right text-secondary/70'>
                {errors?.email.message}
              </p>
            )}
            <FormInput
              label='Password'
              name='password'
              type='password'
              register={register('password', {
                required: 'You must specify a password',
                minLength: {
                  value: 8,
                  message: 'Password must have at least 8 characters'
                }
              })}
            />
            {errors?.password && (
              <p className='my-2 text-right text-secondary/70'>
                {errors?.password.message}
              </p>
            )}
            <div className='flex justify-end mt-8'>
              <Button type='submit' primary>
                submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
