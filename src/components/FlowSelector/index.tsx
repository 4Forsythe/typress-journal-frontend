import React from 'react'

import clsx from 'clsx'
import { IoIosArrowUp as DropIcon } from 'react-icons/io'

import { CategoryType } from '@/utils/api/types/category'

import styles from './FlowSelector.module.scss'

interface FlowSelectorProps {
  options: CategoryType[]
  category: CategoryType
  setCategory: React.Dispatch<React.SetStateAction<CategoryType>>
}

export const FlowSelector: React.FC<FlowSelectorProps> = ({ options, category, setCategory }) => {
  const [isDropdown, setIsDropdown] = React.useState(false)

  const onSelect = (option: CategoryType) => {
    setCategory(option)
    setIsDropdown(false)
  }

  return (
    <div className={styles.select}>
      <button className={styles.control} onClick={() => setIsDropdown(!isDropdown)}>
        <h5 className={styles.title}>{category.title}</h5>
        <DropIcon className={clsx(styles.icon, { [styles.droped]: isDropdown })} />
      </button>
      {isDropdown && (
        <div className={styles.dropdown}>
          <ul className={styles.options}>
            {options.map((option) => (
              <li
                className={clsx(styles.option, { [styles.selected]: option === category })}
                key={option.id}
                onClick={() => onSelect(option)}
              >
                <span>{option.title}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
