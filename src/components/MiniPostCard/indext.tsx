import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { LuBookmark as BookmarkIcon } from 'react-icons/lu'
import { FaRegComments as CommentIcon } from 'react-icons/fa'

import { PostType } from '@/utils/api/types/post'

import styles from './MiniPostCard.module.scss'

interface PostCardProps {
  post: PostType
}

export const MiniPostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <article className={styles.card}>
      <div className={styles.container}>
        <div className={styles.cover}>
          <Image fill objectFit="cover" priority src={post.category.imageUrl} alt={post.title} />
        </div>
        <div className={styles.content}>
          <div className={styles.meta}>
            <Link className={styles.link} href={`/flows/${post.category.id}`}>
              {post.category.title}
            </Link>
            <span className={styles.timestamp}>
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
          <Link className={styles.head} href={`/news/${post.id}`}>
            <h3 className={styles.title}>{post.title}</h3>
          </Link>
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
      </div>
    </article>
  )
}
