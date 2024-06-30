import React from 'react'

import clsx from 'clsx'
import { Menu } from '@/components/SideMenu'

import styles from './MainLayout.module.scss'

interface MainLayoutProps {
  size?: 'small' | 'normal' | 'large'
  children: React.ReactElement | string
}

export const MainLayout: React.FC<MainLayoutProps> = ({ size = 'normal', children }) => {
  return (
    <div className={styles.wrapper}>
      <Menu />
      <main className={styles.main}>
        <div
          className={clsx(styles.container, {
            [styles.small]: size === 'small',
            [styles.medium]: size === 'normal',
            [styles.large]: size === 'large',
          })}
        >
          {children}
        </div>
      </main>
    </div>
  )
}
