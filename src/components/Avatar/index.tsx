import React from 'react'

import clsx from 'clsx'

import styles from './Avatar.module.scss'

interface AvatarProps {
  username: string
  small?: boolean
}

export const Avatar: React.FC<AvatarProps> = ({ username, small }) => {
  const initials = username
    .split(' ')
    .slice(0, 2)
    .map((initial: string) => initial[0])
    .join('')
    .toUpperCase()

  return (
    <div className={clsx(styles.wrapper, { [styles.medium]: !small, [styles.small]: small })}>
      <span>{initials}</span>
    </div>
  )
}
