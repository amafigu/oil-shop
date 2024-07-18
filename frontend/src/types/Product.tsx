import { Dispatch, FormEvent, MouseEvent, SetStateAction } from "react"

export interface Product {
  id: number
  name: string
  price: number
  size: number
  details: string
  description: string
  categoryId: number
  image: string
  brand: string
  category: { name: string }
}

export interface Category {
  id: number
  name: string
}

export interface CreateProduct {
  name: string
  categoryId: number
  description: string
  price: number
  details: string
  size: number
  image: string
  brand: string
}

export interface EditProduct {
  name: string
  description: string
  price: number
  details: string
  size: number
  image: string
  brand: string
}

export interface ProductContextType {
  products: Product[]
  setProducts: Dispatch<SetStateAction<Product[]>>
  onCreateProduct: (data: {
    e: FormEvent<HTMLFormElement>
    data: CreateProduct
    file?: File | null | undefined
  }) => Promise<void>
  onUpdateProduct: (data: {
    id: number
    initialData: EditProduct
    updatedData: EditProduct
    setUpdatedData: Dispatch<SetStateAction<EditProduct>>
  }) => Promise<void>
  onDeleteProduct: (e: MouseEvent, id: number) => Promise<void>
  sortCategory: string | undefined
  setSortCategory: Dispatch<SetStateAction<string | undefined>>
  categories: Category[]
}
