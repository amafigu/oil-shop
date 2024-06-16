/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Product {
  id: number
  name: string
  price: number
  size: number
  details: string
  description: string
  categoryId: number
  image?: string
  brand?: string
  category?: { name: string }
}

export interface Category {
  id: number
  name: string
}

export interface ProductContextType {
  products: Product[]
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
  onCreateProduct: (data: {
    e: React.FormEvent
    data: any
    file: File | null | undefined
  }) => Promise<void>
  onUpdateProduct: (data: {
    key: string
    id: number
    initialData: any
    updatedData: any
    setUpdatedData: React.Dispatch<React.SetStateAction<any>>
    file: File
  }) => Promise<void>
  onDeleteProduct: (e: React.MouseEvent, id: number) => Promise<void>
  sortCategory: string | undefined
  setSortCategory: React.Dispatch<React.SetStateAction<string | undefined>>
  categories: Category[]
}
