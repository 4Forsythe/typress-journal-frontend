import React from 'react'

import clsx from 'clsx'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '@/components/Button'

import { LoginUserDto } from '@/utils/api/types/user'

import styles from './AuthForm.module.scss'

interface LoginFormProprs {
  message: string
  onSubmit: SubmitHandler<LoginUserDto>
  changeMethod: () => void
}

export const LoginForm: React.FC<LoginFormProprs> = React.memo(
  ({ message, onSubmit, changeMethod }) => {
    const {
      register,
      handleSubmit,
      formState: { isValid, isSubmitting },
    } = useForm<LoginUserDto>({ mode: 'onChange' })

    return (
      <div className={styles.auth}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          {message && <span className={styles.notification}>{message}</span>}
          <input
            className={clsx(styles.input, { [styles.error]: message })}
            {...register('email', {
              required: 'Это обязательное поле',
              pattern: {
                value: /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/,
                message: 'Указан неверный формат эл. почты',
              },
            })}
            onChange={(event) => {
              event.target.value = event.target.value.toLowerCase()
            }}
            type="email"
            placeholder="Электронная почта"
            spellCheck="false"
            autoComplete="off"
          />
          <input
            className={clsx(styles.input, { [styles.error]: message })}
            {...register('password', {
              required: 'Это обязательное поле',
              maxLength: { value: 30, message: 'Максимальная длина пароля 30 символов' },
              minLength: { value: 8, message: 'Минимальная длина пароля 8 символов' },
            })}
            type="password"
            placeholder="Пароль"
            autoComplete="off"
          />
          <Button type="submit" disabled={!isValid || isSubmitting}>
            Войти
          </Button>
        </form>
        <button className={styles.switch} onClick={changeMethod}>
          Зарегистрироваться
        </button>
      </div>
    )
  }
)
