import React from 'react'
import Link from 'next/link'

import { CommentType } from '@/utils/api/types/comment'

import styles from './CommentCard.module.scss'

interface CommentCardProps {
  comment: CommentType
}

export const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  return (
    <article className={styles.card}>
      <Link className={styles.article} href={`/news/${comment.post?.id}`}>
        {comment.post?.title}
      </Link>
      <Link href={`/news/${comment.post?.id}#comments`}>
        <p className={styles.content}>{comment.content}</p>
      </Link>
      <div className={styles.meta}>
        <span>
          {new Date(comment.createdAt).toLocaleString(undefined, {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </article>
  )
}
