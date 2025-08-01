import { uploadFile } from "@/api/aws/uploadFile"
import { createProduct } from "@/api/products/createProduct"
import { deleteProductById } from "@/api/products/deleteProductById"
import { getProductCategories } from "@/api/products/getProductCategories"
import { getProducts } from "@/api/products/getProducts"
import { updateProduct } from "@/api/products/updateProduct"
import { useNotificationContext } from "@/context/notificationContext"
import {
  Category,
  CreateProduct,
  EditProduct,
  Product,
} from "@/types/Product"
import { onRequestError } from "@/utils/onRequestError"
import { createProductSchema } from "@/utils/productsValidation"
import {
  convertDataToExpectedProductTypes,
  validate,
} from "@/utils/verifyTypes"
import { verifyUploadedImageUrl } from "@/utils/verifyUploadedImageUrl"
import {
  Dispatch,
  FormEvent,
  MouseEvent,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import { ProductContext } from "./ProductContext"

type Props = {
 children: ReactNode
}

export function ProductProvider({ children }: Props) {
  const [sortCategory, setSortCategory] = useState<string | undefined>("")
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const { onSetNotification, setNotification } = useNotificationContext()

  const fetchProducts = useCallback(async () => {
    try {
      const response = await getProducts()
      if (response && response.status === 200) {
        setProducts(response.data)
      }
    } catch (error) {
      onSetNotification(error.message)
      console.error(error)
    }
  },[onSetNotification])

  const fetchCategories = useCallback(async () => {
    try {
      const response = await getProductCategories()
      if (response && response.status === 200) {
        setCategories(response.data)
      }
    } catch (error) {
      onSetNotification(error.message)
      console.error(error)
    }
  },[onSetNotification])

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [fetchProducts, fetchCategories])

 

  const onDeleteProduct = useCallback(async (e: MouseEvent, id: number): Promise<void> => {
    e.preventDefault()
    try {
      const response = await deleteProductById(id)
      if (response && response.status === 200) {
        setProducts((prevState) => prevState?.filter((item) => item.id !== id))
      }
    } catch (error) {
      onSetNotification("Error by deleting product")
      console.error("Error by deleting product:", error)
    }
  },[onSetNotification])

  const onCreateProduct = useCallback(async ({
    e,
    data,
    file,
  }: {
    e: FormEvent
    data: CreateProduct
    file?: File | null | undefined
  }): Promise<void> => {
    e.preventDefault()
    try {
      const typedItem = await convertDataToExpectedProductTypes({
        data,
        file,
        verifyImgUrl: verifyUploadedImageUrl,
        upload: uploadFile,
      })

      const validatedProduct = await validate({
        item: typedItem,
        schema: createProductSchema,
      })
      const response = await createProduct(validatedProduct)

      if (response && response.status === 201) {
        const newProduct = response.data.product
        setProducts((prevState) => prevState && [...prevState, newProduct])
        onSetNotification(`Product ${newProduct.name} created successfully`)
      }
    } catch (error) {
      console.error("Error by creating product:", error)
      onRequestError(error, setNotification)
    }
  }, [onSetNotification,setNotification])

  const onUpdateProduct = useCallback(async ({
    id,
    initialData,
    updatedData,
    setUpdatedData,
  }: {
    id: number
    initialData: EditProduct
    updatedData: EditProduct
    setUpdatedData: Dispatch<SetStateAction<EditProduct>>
  }) => {
    
    try {
      const response = await updateProduct(id, updatedData as Product)
      if (response && response.status === 200) {
        const updatedProduct = response.data.product
        setProducts((prevProducts) =>
          prevProducts?.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product,
          ),
        )
      }
    } catch (error) {
      console.error("Error by updating product:", error)
      setUpdatedData(initialData)
      onRequestError(error, onSetNotification)
    }
  }, [onSetNotification])

   const value = useMemo(
    () => ({
      products,
      setProducts,
      onCreateProduct,
      onUpdateProduct,
      onDeleteProduct,
      sortCategory,
      setSortCategory,
      categories,
    }),
    [
      products,
      onCreateProduct,
      onUpdateProduct,
      onDeleteProduct,
      sortCategory,
      setSortCategory,
      categories,
    ]
  )
  return (
    <ProductContext.Provider
      value={value}
    >
      {children}
    </ProductContext.Provider>
  )
}

