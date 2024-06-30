import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { GoArrowUpRight as LinkIcon, GoImage as PictureIcon } from 'react-icons/go'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { Button } from '@/components/Button'
import { FlowSelector } from '@/components/FlowSelector'
import { PostSectionForm } from '@/components/PostSectionForm'

import { api } from '@/utils/api'
import { PostType, CreatePostDto } from '@/utils/api/types/post'
import { CategoriesType, CategoryType } from '@/utils/api/types/category'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { selectUser, setAuthModal } from '@/redux/features/user'

import styles from './WriteForm.module.scss'

interface WriteFormProps {
  post?: PostType
  categories: CategoriesType
}

export const WriteForm: React.FC<WriteFormProps> = ({ post, categories }) => {
  const router = useRouter()
  const [message, setMessage] = React.useState('')
  const [category, setCategory] = React.useState<CategoryType>(
    categories.items.find((category) => category.id === (post ? post.category.id : 1)) ||
      categories.items[0]
  )

  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CreatePostDto>({
    mode: 'onChange',
    defaultValues: {
      title: post?.title,
      subtitle: post?.subtitle,
      content: post?.content,
      sections: post?.sections,
      keywords: post?.keywords?.join(', '),
    },
  })

  console.log(getValues())

  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)

  const { fields, append, remove } = useFieldArray({
    name: 'sections',
    control,
  })

  const onSubmit: SubmitHandler<CreatePostDto> = async (dto: CreatePostDto) => {
    try {
      if (!user) {
        dispatch(setAuthModal(true))
      } else {
        const data: CreatePostDto = {
          title: dto.title,
          subtitle: dto.subtitle,
          content: dto.content,
          category: category.id,
          sections: dto.sections?.map((section) => ({
            title: section.title,
            content: section.content,
          })),
          keywords: dto.keywords
            ? (dto.keywords as string).split(/\s|,\s/).map((keyword) => keyword.trim())
            : undefined,
        }

        if (!post) {
          const { id } = await api().post.create(data)
          router.push(`/news/${id}`)
        } else {
          await api().post.update(post.id, data)
          router.push(`/news/${post.id}`)
        }

        setMessage('')
      }
    } catch (error: any) {
      console.error(error)
      if (error.response) {
        setMessage(error.response.data.message)
      }
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>{post ? 'Редактировать статью' : 'Написать статью'}</h2>
        <div className={styles.header}>
          <FlowSelector options={categories.items} category={category} setCategory={setCategory} />
          <Link className={styles.link} href="/rules">
            Правила
            <LinkIcon className={styles.icon} />
          </Link>
        </div>
        <p className={styles.description}>
          Вы можете написать текст на любую интересную вам тему. Но сначала прочитайте наши правила,
          иначе ваш пост может быть удален модерацией.
        </p>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.main}>
            <input
              className={styles.headerField}
              {...register('title', {
                required: 'Это обязательное поле',
                minLength: { value: 5, message: 'Минимальная длина заголовка 5 символов' },
                maxLength: { value: 100, message: 'Максимальная длина заголовка 100 символов' },
              })}
              type="text"
              placeholder="Заголовок"
              autoComplete="off"
            />
            <textarea
              className={styles.textField}
              {...register('subtitle', {
                maxLength: { value: 480, message: 'Максимальная длина описания 480 символов' },
              })}
              placeholder="Подзаголовок"
              autoComplete="off"
            />
            <textarea
              className={styles.textField}
              {...register('content', {
                required: 'Это обязательное поле',
                minLength: { value: 32, message: 'Минимальная длина описания 32 символа' },
                maxLength: { value: 1180, message: 'Максимальная длина описания 1180 символов' },
              })}
              placeholder="Описание вашей истории"
              autoComplete="off"
            />
          </div>
          {!!fields.length && (
            <div className={styles.sections}>
              {fields.map((field, index) => (
                <PostSectionForm
                  key={field.id}
                  index={index}
                  register={register}
                  onRemove={() => remove(index)}
                />
              ))}
            </div>
          )}
          <div className={styles.action}>
            <Button
              type="button"
              onClick={() =>
                append({
                  title: '',
                  content: '',
                })
              }
              disabled={fields.length >= 4}
            >
              Добавить раздел
            </Button>
          </div>
          <div className={styles.media}>
            <span className={styles.subtitle}>Добавьте иллюстрацию к своей истории</span>
            <input className={styles.previewField} id="preview" type="file" />
            <label className={styles.mediaContainer} htmlFor="preview">
              <PictureIcon className={styles.icon} />
              Добавить
            </label>
          </div>
          <div className={styles.keywords}>
            <span className={styles.subtitle}>
              Добавьте ключевые слова через запятую с пробелом
            </span>
            <input
              className={styles.headerField}
              {...register('keywords', {
                maxLength: {
                  value: 120,
                  message: 'Максимальная длина тегов 120 символов',
                },
              })}
              placeholder="Теги (необязательно)"
            />
          </div>
          <div className={styles.action}>
            <Button type="submit" disabled={!isValid || isSubmitting}>
              {post ? 'Сохранить изменения' : 'Опубликовать текст'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
