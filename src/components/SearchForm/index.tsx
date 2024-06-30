import React from 'react'
import { useRouter } from 'next/router'

import qs from 'qs'
import { FiSearch as SearchIcon } from 'react-icons/fi'
import { SubmitHandler, useForm } from 'react-hook-form'
import { PostCard } from '@/components/PostCard'

import { api } from '@/utils/api'
import { PostsType, PostParamsType } from '@/utils/api/types/post'

import styles from './SearchForm.module.scss'

export const SearchForm: React.FC = () => {
  const router = useRouter()
  const { q: value } = router.query
  const [posts, setPosts] = React.useState<PostsType>()

  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<PostParamsType>({ mode: 'onChange' })

  React.useEffect(() => {
    const onFetch = async () => {
      try {
        if (value) {
          const data = await api().post.getAll({ query: value as string })
          setPosts(data)
        }
      } catch (error) {
        console.error('Search posts:', error)
      }
    }

    onFetch()
  }, [])

  const onSubmit: SubmitHandler<PostParamsType> = async (dto: PostParamsType) => {
    try {
      const query = qs.stringify({ q: dto.query })
      if (query) {
        router.push(`?${query}`)
        const data = await api().post.getAll({ query: dto.query })
        setPosts(data)
      }
    } catch (error) {
      console.error('Search posts:', error)
    }
  }

  const onDecline = (count: number) => {
    const cases = [2, 0, 1, 1, 1, 2]
    return ['результат', 'результата', 'результатов'][
      count % 100 > 4 && count % 100 < 20 ? 2 : cases[count % 10 < 5 ? count % 10 : 5]
    ]
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.search}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <input
              className={styles.searchField}
              {...register('query', {
                required: 'Это обязательное поле',
              })}
              type="text"
              defaultValue={value}
              placeholder="Введите запрос..."
              spellCheck="false"
              autoComplete="off"
            />
            <button className={styles.submit} type="submit" disabled={!isValid || isSubmitting}>
              <SearchIcon className={styles.icon} />
            </button>
          </form>
          {posts && (
            <span className={styles.counter}>{`${posts.total} ${onDecline(posts.total)}`}</span>
          )}
        </div>
        {!!posts?.items.length && (
          <div className={styles.items}>
            {posts.items.map((post) => (
              <PostCard key={post.id} post={post} contrasted />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
