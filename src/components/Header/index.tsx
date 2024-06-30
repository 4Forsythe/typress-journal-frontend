import React from 'react'
import Link from 'next/link'

import { FaRegUser as UserIcon } from 'react-icons/fa'
import { Avatar } from '@/components/Avatar'
import { AuthForm } from '@/components/AuthForm'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { selectAuth, selectUser, setAuthModal } from '@/redux/features/user'

import styles from './Header.module.scss'

export const Header: React.FC = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const isAuth = useAppSelector(selectAuth)

  return (
    <>
      {isAuth && <AuthForm />}
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.navbar}>
            <Link className={styles.logotype} href="/">
              Typress
            </Link>
            <div className={styles.spacer}></div>
            <nav className={styles.menu}>
              <Link className={styles.write} href="/write">
                Написать статью
              </Link>
              {user ? (
                <Link href={`/user/${user.id}`}>
                  <Avatar username={user.username} small />
                </Link>
              ) : (
                <button
                  className={styles.register}
                  type="button"
                  onClick={() => dispatch(setAuthModal(true))}
                >
                  <UserIcon />
                </button>
              )}
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}
