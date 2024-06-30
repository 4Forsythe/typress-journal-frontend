import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { CategoriesType } from '@/utils/api/types/category'

import styles from './Flows.module.scss'

interface FlowsProps {
  categories: CategoriesType
}

export const Flows: React.FC<FlowsProps> = ({ categories }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <h1 className={styles.title}>Потоки</h1>
        <p className={styles.description}>Все темы, о которых мы пишем в журнале</p>
      </div>
      <div className={styles.container}>
        <section className={styles.group}>
          <div className={styles.groupContainer}>
            <h4 className={styles.groupTopic}>Все потоки</h4>
            <div className={styles.groupContent}>
              {categories.items.map((category) => (
                <Link className={styles.item} href={`/flows/${category.id}`} key={category.id}>
                  <Image
                    className={styles.icon}
                    width={40}
                    height={40}
                    src={category.icon}
                    alt={category.title}
                  />
                  {category.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
