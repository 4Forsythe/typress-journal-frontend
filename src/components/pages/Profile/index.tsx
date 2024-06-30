import React from 'react'
import { useRouter } from 'next/router'

import clsx from 'clsx'
import { GoPaperAirplane as FollowIcon } from 'react-icons/go'
import { FaRegGem as RatingIcon } from 'react-icons/fa'
import { FiUsers as SubscriberIcon } from 'react-icons/fi'
import { Tooltip } from '@/components/Tooltip'
import { Avatar } from '@/components/Avatar'
import { PostCard } from '@/components/PostCard'
import { CommentCard } from '@/components/CommentCard'

import { api } from '@/utils/api'
import { UserType } from '@/utils/api/types/user'
import { PostsType } from '@/utils/api/types/post'
import { CommentsType } from '@/utils/api/types/comment'

import styles from './Profile.module.scss'

interface ProfileProps {
  user: UserType
}

export const Profile: React.FC<ProfileProps> = ({ user }) => {
  const router = useRouter()
  const hash = router.asPath.split('#')[1]

  const [targetTab, setTargetTab] = React.useState((hash === 'favorite' && 2) || 0)

  const [posts, setPosts] = React.useState<PostsType>()
  const [comments, setComments] = React.useState<CommentsType>()

  const ratePerPost = user.totalPosts * 80
  const ratePerComment = user.totalComments * 8

  const getPosts = async () => {
    const data = await api().post.getAll({ author: user.id })
    setPosts(data)
  }

  const getComments = async () => {
    const data = await api().comment.getAll({ user: user.id })
    setComments(data)
  }

  React.useEffect(() => {
    if (targetTab === 0) {
      getPosts()
    }
    if (targetTab === 1) {
      getComments()
    }
  }, [targetTab])

  const onDecline = (number: number, words: string[]) => {
    const index =
      number % 100 > 4 && number % 100 < 20
        ? 2
        : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]

    return `${number} ${words[index]}`
  }

  const tabs = [
    user.totalPosts ? onDecline(user.totalPosts, ['статья', 'статьи', 'статей']) : 'Статьи',
    user.totalComments
      ? onDecline(user.totalComments, ['комментарий', 'комментария', 'комментариев'])
      : 'Комментарии',
    'Закладки',
  ]

  return (
    <article className={styles.wrapper}>
      <div className={styles.head}>
        <Avatar username={user.username} />
        <div className={styles.info}>
          <h1 className={styles.username}>{user.username}</h1>
          <div className={styles.meta}>
            <button className={styles.subscribe}>
              <FollowIcon />
              Подписаться
            </button>
            <Tooltip
              description={
                <div className={styles.rating}>
                  <h5>Рейтинг пользователя</h5>
                  <ul className={styles.ratingItems}>
                    <li className={styles.ratingItem}>
                      за посты:
                      <span
                        className={clsx({
                          [styles.positive]: ratePerPost,
                          [styles.negative]: !ratePerPost,
                        })}
                      >
                        {ratePerPost}
                      </span>
                    </li>
                    <li className={styles.ratingItem}>
                      за комментарии:
                      <span
                        className={clsx({
                          [styles.positive]: ratePerComment,
                          [styles.negative]: !ratePerComment,
                        })}
                      >
                        {ratePerComment}
                      </span>
                    </li>
                  </ul>
                </div>
              }
            >
              <RatingIcon />
              {user.totalPosts * 80 + user.totalComments * 8}
            </Tooltip>
            <Tooltip description="Читатели могут подписаться на авторов, за которыми им интересно следить.">
              <SubscriberIcon />
              Пока нет подписчиков
            </Tooltip>
          </div>
        </div>
      </div>
      <div className={styles.tabs}>
        {tabs.map((tab, index) => (
          <button
            className={clsx(styles.tab, { [styles.target]: targetTab === index })}
            key={index}
            onClick={() => setTargetTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className={styles.container}>
        {targetTab === 0 && posts?.items.map((post) => <PostCard post={post} key={post.id} />)}
        {targetTab === 1 &&
          comments?.items.map((comment) => <CommentCard comment={comment} key={comment.id} />)}
      </div>
    </article>
  )
}
