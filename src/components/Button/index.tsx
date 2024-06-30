import React from 'react'

import clsx from 'clsx'

import styles from './Button.module.scss'

interface ButtonProps {
  children: string
  className?: string
  type: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({ children, className, type, disabled, onClick }) => {
  return (
    <button
      className={clsx(className, styles.wrapper, {
        [styles.button]: type === 'button',
        [styles.submit]: type === 'submit',
      })}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
