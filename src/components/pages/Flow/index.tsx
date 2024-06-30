import React from 'react'
import Link from 'next/link'

import { LuPencilLine as WriteIcon } from 'react-icons/lu'
import { PostCard } from '@/components/PostCard'

import { CategoriesType, CategoryType } from '@/utils/api/types/category'
import { PostsType } from '@/utils/api/types/post'

import styles from './Flow.module.scss'
import { Content, ContentLayout, Sidebar } from '@/layouts/ContentLayout'
import Image from 'next/image'
import { SideFeatures } from '@/components/SideFeatures'

interface FlowProps {
  category: CategoryType
  posts: PostsType
  categories: CategoriesType
}

export const Flow: React.FC<FlowProps> = ({ category, posts, categories }) => {
  return (
    <article className={styles.wrapper}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.cover}>
            <Image
              className={styles.illustration}
              width={0}
              height={0}
              sizes="100vw"
              src={category.imageUrl}
              style={{ width: '100%', height: 'auto' }}
              alt={`Обложка потока "${category.title}"`}
            />
          </div>
          <div className={styles.topic}>
            <div className={styles.icon}>
              <Image
                className={styles.illustration}
                width={104}
                height={104}
                src={category.icon}
                alt={category.title}
              />
            </div>
            <div className={styles.head}>
              <h1 className={styles.title}>{category.title}</h1>
              <p className={styles.description}>{category.description}</p>
            </div>
          </div>
        </header>
        <ContentLayout>
          <>
            <Content>
              <div className={styles.content}>
                <Link className={styles.form} href={`/write`}>
                  <WriteIcon className={styles.icon} />
                  <span className={styles.text}>Написать пост или вопрос...</span>
                </Link>
                {!!posts.items.length &&
                  posts.items.map((post) => <PostCard key={post.id} post={post} />)}
              </div>
            </Content>
            <Sidebar>
              <SideFeatures title="Что еще почитать" items={categories.items} />
            </Sidebar>
          </>
        </ContentLayout>
      </div>
    </article>
  )
}
