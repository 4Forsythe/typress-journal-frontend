import React from 'react'

import { UseFormRegister } from 'react-hook-form'
import { IoCloseOutline as CloseIcon } from 'react-icons/io5'

import { CreatePostDto } from '@/utils/api/types/post'

import styles from './PostSectionForm.module.scss'

interface PostSectionFormProps {
  index: number
  register: UseFormRegister<CreatePostDto>
  onRemove: () => void
}

export const PostSectionForm: React.FC<PostSectionFormProps> = ({ index, register, onRemove }) => {
  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h5 className={styles.title}>Раздел</h5>
        <button className={styles.closer} onClick={onRemove}>
          <CloseIcon />
        </button>
      </div>
      <input
        className={styles.headerField}
        {...register(`sections.${index}.title`, {
          required: 'Это обязательное поле',
          minLength: { value: 5, message: 'Минимальная длина подзаголовка 5 символов' },
          maxLength: { value: 70, message: 'Максимальная длина подзаголовка 70 символов' },
        })}
        type="text"
        placeholder="Заголовок"
        autoComplete="off"
      />
      <textarea
        className={styles.textField}
        {...register(`sections.${index}.content`, {
          required: 'Это обязательное поле',
          minLength: { value: 32, message: 'Минимальная длина описания раздела 32 символа' },
          maxLength: { value: 720, message: 'Максимальная длина описания раздела 720 символов' },
        })}
        placeholder="Описание вашего раздела"
        autoComplete="off"
      />
    </div>
  )
}
