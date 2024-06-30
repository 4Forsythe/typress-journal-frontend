import React from 'react'

import { setCookie } from 'nookies'
import { SubmitHandler } from 'react-hook-form'
import { IoCloseOutline as CloseIcon } from 'react-icons/io5'
import { LoginForm } from './Login'
import { RegisterForm } from './Register'
import { ModalLayout } from '@/layouts/ModalLayout'

import { api } from '@/utils/api'
import { LoginUserDto, RegisterUserDto, UserType } from '@/utils/api/types/user'
import { useAppDispatch } from '@/redux/hooks'
import { setAuthModal, setUserData } from '@/redux/features/user'

import styles from './AuthForm.module.scss'

export const AuthForm: React.FC = () => {
  const [method, setMethod] = React.useState<'login' | 'register'>('login')
  const [message, setMessage] = React.useState('')

  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<LoginUserDto | RegisterUserDto> = async (dto) => {
    try {
      let data: UserType

      if (method === 'register') {
        await api().user.register(dto as RegisterUserDto)
        data = await api().user.login(dto as LoginUserDto)
      } else {
        data = await api().user.login(dto as LoginUserDto)
      }

      setCookie(null, 'token', data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      })

      setMessage('')

      dispatch(setUserData(data))
      dispatch(setAuthModal(false))
    } catch (error: any) {
      console.error(error)
      if (error.response) {
        setMessage(error.response.data.message)
      }
    }
  }

  return (
    <ModalLayout onClose={() => dispatch(setAuthModal(false))}>
      <div className={styles.container}>
        <div>
          <h2 className={styles.head}>Войти в Typress</h2>
          <p className={styles.description}>
            Станьте контент-мейкером, участником обсуждений или повседневным обывателем современной
            субкультуры!
          </p>
          {method === 'login' && (
            <LoginForm
              message={message}
              onSubmit={onSubmit}
              changeMethod={() => setMethod('register')}
            />
          )}
          {method === 'register' && (
            <RegisterForm
              message={message}
              onSubmit={onSubmit}
              changeMethod={() => setMethod('login')}
            />
          )}
        </div>
        <p className={styles.privacy}>
          При входе вы принимаете условия передачи данных и политику конфиденциальности
        </p>
        <button
          className={styles.closer}
          type="button"
          onClick={() => dispatch(setAuthModal(false))}
        >
          <CloseIcon className={styles.icon} />
        </button>
      </div>
    </ModalLayout>
  )
}
