import React from 'react'

import styles from './ModalLayout.module.scss'

interface ModalLayoutProps {
  children: React.ReactElement | string
  onClose: () => void
}

export const ModalLayout: React.FC<ModalLayoutProps> = ({ children, onClose }) => {
  React.useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.removeProperty('overflow')
    }
  }, [])

  return (
    <div className={styles.modal}>
      <div className={styles.overlay} onClick={onClose} />
      {children}
    </div>
  )
}
