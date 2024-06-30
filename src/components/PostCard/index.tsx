import React from 'react'
import Link from 'next/link'

import clsx from 'clsx'
import { LuBookmark as BookmarkIcon } from 'react-icons/lu'
import { FaRegEye as ViewsIcon, FaRegComments as CommentIcon } from 'react-icons/fa'

import { PostType } from '@/utils/api/types/post'

import styles from './PostCard.module.scss'

interface PostCardProps {
  post: PostType
  contrasted?: boolean
}

export const PostCard: React.FC<PostCardProps> = ({ post, contrasted }) => {
  return (
    <article className={clsx(styles.card, { [styles.contrasted]: contrasted })}>
      <div className={styles.container}>
        <div className={styles.meta}>
          {(post.author && post.category) || !post.author ? (
            <Link className={styles.link} href={`/flows/${post.category.id}`}>
              {post.category.title}
            </Link>
          ) : (
            <Link className={styles.link} href={`/user/${post.author.id}`}>
              {post.author.username}
            </Link>
          )}
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          <span className={styles.views}>
            <ViewsIcon className={styles.icon} />
            {post.views}
          </span>
        </div>
        <Link className={styles.head} href={`/news/${post.id}`}>
          <h3 className={styles.title}>{post.title}</h3>
        </Link>
        <p className={styles.description}>{post.subtitle}</p>
        <div className={styles.actions}>
          <Link className={styles.action} href={`/news/${post.id}#comments`}>
            <CommentIcon className={styles.icon} />
            {post.totalComments > 0 && post.totalComments}
          </Link>
          <button className={styles.action}>
            <BookmarkIcon className={styles.icon} />
          </button>
        </div>
      </div>
    </article>
  )
}
