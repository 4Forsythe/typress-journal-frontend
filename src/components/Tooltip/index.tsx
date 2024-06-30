import React from 'react'

import styles from './Tooltip.module.scss'

interface TooltipProps {
  children: string | React.ReactNode
  description: string | React.ReactNode
}

export const Tooltip: React.FC<TooltipProps> = ({ children, description }) => {
  const [isVisible, setIsVisible] = React.useState(false)

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <span className={styles.pill}>{children}</span>
      {isVisible && <div className={styles.description}>{description}</div>}
    </div>
  )
}
