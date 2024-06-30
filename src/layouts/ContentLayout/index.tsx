import React from 'react'

import styles from './ContentLayout.module.scss'

interface ContentLayoutProps {
  children: React.ReactElement | string
}

export const ContentLayout: React.FC<ContentLayoutProps> = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>
}

export const Content: React.FC<ContentLayoutProps> = ({ children }) => {
  return <div className={styles.content}>{children}</div>
}

export const Sidebar: React.FC<ContentLayoutProps> = ({ children }) => {
  return <aside className={styles.sidebar}>{children}</aside>
}
