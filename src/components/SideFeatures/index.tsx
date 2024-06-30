import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { GoArrowRight as MoreIcon } from 'react-icons/go'

import { CategoryType } from '@/utils/api/types/category'

import styles from './SideFeatures.module.scss'

interface SideFeaturesProps {
  title: string
  items: CategoryType[]
}

export const SideFeatures: React.FC<SideFeaturesProps> = ({ title, items }) => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.head}>{title}</h2>
        <div className={styles.items}>
          {items.map((item) => (
            <Link className={styles.item} key={item.id} href={`/flows/${item.id}`}>
              <Image
                className={styles.icon}
                width={40}
                height={40}
                priority
                src={item.icon}
                alt={item.title}
              />
              <h3 className={styles.text}>{item.title}</h3>
            </Link>
          ))}
          <Link className={styles.more} href="/flows">
            Смотреть все
            <MoreIcon className={styles.icon} />
          </Link>
        </div>
      </div>
    </section>
  )
}
