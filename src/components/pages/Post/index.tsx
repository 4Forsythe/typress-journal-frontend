import React from 'react'
import Link from 'next/link'

import { FaRegBookmark as BookmarkIcon } from 'react-icons/fa6'
import { FaRegEye as ViewsIcon, FaRegComment as CommentIcon } from 'react-icons/fa'
import { Avatar } from '@/components/Avatar'
import { PostComments } from '@/components/PostComments'

import { PostType } from '@/utils/api/types/post'

import styles from './Post.module.scss'

interface PostProps {
  post: PostType
}

export const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <article className={styles.wrapper}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.topic}>
            <Link className={styles.category} href={`/flows/${post.category.id}`}>
              {post.category.title}
            </Link>
            <span className={styles.meta}>{new Date(post.createdAt).toLocaleDateString()}</span>
            <span className={styles.meta}>
              <ViewsIcon className={styles.icon} />
              {post.views}
            </span>
            <span className={styles.meta}>{post.author.username}</span>
          </div>
          <h1 className={styles.title}>{post.title}</h1>
          <h3 className={styles.synipsis}>{post.subtitle}</h3>
          <div className={styles.actions}>
            <Link className={styles.action} href={`/news/${post.id}#comments`}>
              <CommentIcon />
              {post.totalComments > 0 ? post.totalComments : 'Комментарии'}
            </Link>
            <button className={styles.action}>
              <BookmarkIcon />
              Сохранить
            </button>
          </div>
          <Link className={styles.author} href={`/user/${post.author.id}`}>
            <Avatar username={post.author.username} small />
            <div className={styles.authorInfo}>
              <span className={styles.authorName}>{post.author.username}</span>
              <p className={styles.authorCaption}>автор этой статьи</p>
            </div>
          </Link>
        </header>
        <div className={styles.sections}>
          <section className={styles.section}>
            <p className={styles.paragraph}>{post.content}</p>
          </section>
          {post.sections?.map((section, index) => (
            <section className={styles.section} key={index}>
              <h2 className={styles.title}>{section.title}</h2>
              <p className={styles.paragraph}>{section.content}</p>
            </section>
          ))}
        </div>
        <footer className={styles.footer}>
          <div className={styles.keywords}>
            <span className={styles.label}>
              {post.keywords ? 'Ключевые слова' : 'Ключевых слов нет'}
            </span>
            {post.keywords?.length && (
              <ul className={styles.tagbar}>
                {post.keywords.map((keyword, index) => (
                  <li className={styles.tag} key={index}>
                    <Link href={`/search?q=${keyword}`}>{keyword}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </footer>
        <PostComments postId={post.id} authorId={post.author.id} />
      </div>
    </article>
  )
}
