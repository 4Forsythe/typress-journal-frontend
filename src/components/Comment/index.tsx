import React from 'react'
import Link from 'next/link'

import { Avatar } from '@/components/Avatar'

import { CommentType } from '@/utils/api/types/comment'
import { useAppSelector } from '@/redux/hooks'
import { selectUser } from '@/redux/features/user'

import styles from './Comment.module.scss'

interface CommentProps {
  comment: CommentType
  authorId: number
  onEdit: (comment: CommentType) => void
  onRemove: () => void
}

export const Comment: React.FC<CommentProps> = React.memo(
  ({ comment, authorId, onEdit, onRemove }) => {
    const user = useAppSelector(selectUser)

    const date = new Date(comment.createdAt)
    const creationDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
    const creationTime = `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`

    return (
      <article className={styles.wrapper}>
        <Link href={`/user/${comment.user?.id}`}>
          <Avatar username={comment.user?.username as string} small />
        </Link>
        <div className={styles.container}>
          <div className={styles.header}>
            <Link className={styles.username} href={`/user/${comment.user?.id}`}>
              {comment.user?.username}
            </Link>
            {authorId === comment.user?.id && <span className={styles.badge}>Автор поста</span>}
            <span className={styles.timestamp}>
              {creationDate}, {creationTime}
            </span>
          </div>
          <div className={styles.content}>
            <p className={styles.text}>{comment.content}</p>
          </div>
          {user?.id === comment.user?.id && (
            <div className={styles.controls}>
              <button className={styles.controlsButton} onClick={() => onEdit(comment)}>
                Имзенить
              </button>
              <button className={styles.controlsButton} onClick={onRemove}>
                Удалить
              </button>
            </div>
          )}
        </div>
      </article>
    )
  }
)
