import React from 'react'
import Link from 'next/link'

import clsx from 'clsx'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '@/components/Button'
import { Comment } from '@/components/Comment'

import { api } from '@/utils/api'
import { CommentType, CommentsType, CreateCommentDto } from '@/utils/api/types/comment'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { selectUser, setAuthModal } from '@/redux/features/user'

import styles from './Comments.module.scss'

type CommentSorterType = {
  type: string
  property: 'DESC' | 'ASC'
}

interface PostCommentsProps {
  postId: number
  authorId: number
}

const sorts: CommentSorterType[] = [
  {
    type: 'Новые',
    property: 'DESC',
  },
  {
    type: 'Старые',
    property: 'ASC',
  },
]

export const PostComments: React.FC<PostCommentsProps> = ({ postId, authorId }) => {
  const [comments, setComments] = React.useState<CommentsType>()
  const [targetOrder, setTargetOrder] = React.useState<'ASC' | 'DESC'>(sorts[0].property)
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setFocus,
    formState: { isValid, isSubmitting },
  } = useForm<CreateCommentDto>({ mode: 'onChange' })

  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const commentsRef = React.useRef<HTMLDivElement>(null)

  const getComments = async () => {
    try {
      const data = await api().comment.getAll({ post: postId, take: 50, order: targetOrder })
      setComments(data)
    } catch (error) {
      console.error('Get comments', error)
    }
  }

  React.useEffect(() => {
    getComments()
  }, [targetOrder])

  const onDecline = (count: number) => {
    const cases = [2, 0, 1, 1, 1, 2]
    return `${count} комментар${
      ['ий', 'ия', 'иев'][count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]]
    }`
  }

  const onSubmit: SubmitHandler<CreateCommentDto> = async (dto: CreateCommentDto) => {
    try {
      if (!user) {
        dispatch(setAuthModal(true))
      } else {
        if (dto.commentId) {
          await api().comment.update(dto.commentId, { content: dto.content, postId })
        } else {
          await api().comment.create({ content: dto.content, postId })
        }

        reset()
        getComments()
      }
    } catch (error) {
      console.error('Create comment:', error)
    }
  }

  const onEdit = (comment: CommentType) => {
    commentsRef.current?.scrollIntoView({ behavior: 'smooth' })
    setValue('commentId', comment.id)
    setValue('content', comment.content)
    setFocus('content')
  }

  const onRemove = async (commentId: number) => {
    try {
      await api().comment.remove(commentId)
      getComments()
    } catch (error) {
      console.error('Remove comment:', error)
    }
  }

  return (
    <section className={styles.wrapper} ref={commentsRef} id="comments">
      <div className={styles.topic}>
        <span className={styles.label}>Оставьте комментарий</span>
      </div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <textarea
          className={styles.answerField}
          {...register('content', {
            required: 'Это обязательное поле',
            minLength: { value: 4, message: 'Минимальная длина комментария 4 символа' },
            maxLength: { value: 1200, message: 'Максимальная длина комментария 1200 символов' },
          })}
          placeholder="Прокомментировать статью"
          autoComplete="off"
        />
        <div className={styles.footer}>
          <p className={styles.notation}>
            Комментарии проходят модерацию по{' '}
            <Link className={styles.link} href="/">
              правилам журнала
            </Link>
          </p>
          <Button type="submit" disabled={!isValid || isSubmitting}>
            Отправить
          </Button>
        </div>
      </form>
      {!!comments?.total && (
        <>
          <div className={styles.meta}>
            <div className={styles.sorters}>
              {sorts.map((sort) => (
                <button
                  key={sort.property}
                  className={clsx(styles.sorter, {
                    [styles.target]: targetOrder === sort.property,
                  })}
                  onClick={() => setTargetOrder(sort.property)}
                >
                  {sort.type}
                </button>
              ))}
            </div>
            <span className={styles.counter}>{onDecline(comments.total)}</span>
          </div>
          <div className={styles.list}>
            {comments.items.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                authorId={authorId}
                onEdit={(comment) => onEdit(comment)}
                onRemove={() => onRemove(comment.id)}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
