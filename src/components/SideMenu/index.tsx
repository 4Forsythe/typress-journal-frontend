import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import clsx from 'clsx'
import { FiType } from 'react-icons/fi'
import { IoMdBook } from 'react-icons/io'
import { BsBookmarks } from 'react-icons/bs'
import { TbExclamationMark } from 'react-icons/tb'
import { FaRegNewspaper, FaChartBar } from 'react-icons/fa'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { selectUser, setAuthModal } from '@/redux/features/user'

import styles from './SideMenu.module.scss'

const pages = [
  { content: 'Лента', icon: <FaRegNewspaper />, path: '/' },
  { content: 'Тренды', icon: <FaChartBar />, path: '/trends' },
]
const flows = [
  { content: 'Знакомство', icon: <TbExclamationMark />, path: '/introduction' },
  { content: 'Наши правила', icon: <IoMdBook />, path: '/community-rules' },
  { content: 'Обо всем', icon: <FiType />, path: '/about-us' },
]

export const Menu: React.FC = () => {
  const router = useRouter()

  console.log(router.asPath)

  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)

  return (
    <aside className={styles.menu}>
      <div className={styles.container}>
        <nav className={styles.navbar}>
          <section className={styles.tabs}>
            <h4 className={styles.head}>Вкладки</h4>
            {pages.map((page, index) => (
              <Link
                className={clsx(styles.tab, { [styles.selected]: router.pathname === page.path })}
                href={page.path}
                key={index}
              >
                <span className={styles.icon}>{page.icon}</span>
                <span className={styles.text}>{page.content}</span>
              </Link>
            ))}
            {user ? (
              <Link
                className={clsx(styles.tab, {
                  [styles.selected]: router.asPath === `/user/${user.id}#favorite`,
                })}
                href={`/user/${user.id}#favorite`}
              >
                <span className={styles.icon}>
                  <BsBookmarks />
                </span>
                <span className={styles.text}>Закладки</span>
              </Link>
            ) : (
              <button className={styles.tab} onClick={() => dispatch(setAuthModal(true))}>
                <span className={styles.icon}>
                  <BsBookmarks />
                </span>
                <span className={styles.text}>Закладки</span>
              </button>
            )}
          </section>
          <section className={styles.tabs}>
            <h4 className={styles.head}>Потоки</h4>
            {flows.map((flow, index) => (
              <Link
                className={clsx(styles.tab, { [styles.selected]: router.pathname === flow.path })}
                href={flow.path}
                key={index}
              >
                <span className={styles.icon}>{flow.icon}</span>
                <span className={styles.text}>{flow.content}</span>
              </Link>
            ))}
          </section>
        </nav>
      </div>
    </aside>
  )
}
