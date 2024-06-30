export type CategoryType = {
  id: number
  title: string
  icon: string
  imageUrl: string
  description: string
  createdAt: string
  updatedAt: string
}

export class CategoryParamsType {
  sortBy?: 'title' | 'random'
  order?: 'ASC' | 'DESC'
  skip?: number
  take?: number
}

export type CategoriesType = {
  items: CategoryType[]
  total: number
}
