import React from 'react'

import clsx from 'clsx'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '@/components/Button'

import { RegisterUserDto } from '@/utils/api/types/user'

import styles from './AuthForm.module.scss'

interface RegisterFormProps {
  message: string
  onSubmit: SubmitHandler<RegisterUserDto>
  changeMethod: () => void
}

export const RegisterForm: React.FC<RegisterFormProps> = React.memo(
  ({ message, onSubmit, changeMethod }) => {
    const {
      register,
      handleSubmit,
      formState: { isValid, isSubmitting },
    } = useForm<RegisterUserDto>({ mode: 'onChange' })

    return (
      <div className={styles.auth}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          {message && <span className={styles.notification}>{message}</span>}
          <input
            className={styles.input}
            {...register('username', {
              required: 'Это обязательное поле',
              minLength: { value: 6, message: 'Минимальная длина имени 6 символов' },
              maxLength: { value: 20, message: 'Максимальная длина имени 20 символов' },
            })}
            type="text"
            placeholder="Имя и фамилия"
            spellCheck="false"
            autoComplete="off"
          />
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
            className={styles.input}
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
            Зарегистрироваться
          </Button>
        </form>
        <button className={styles.switch} onClick={changeMethod}>
          Войти
        </button>
      </div>
    )
  }
)
