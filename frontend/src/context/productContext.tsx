import { uploadFile } from "@/api/aws/uploadFile"
import { createProduct } from "@/api/products/createProduct"
import { deleteProductById } from "@/api/products/deleteProductById"
import { getProductCategories } from "@/api/products/getProductCategories"
import { getProducts } from "@/api/products/getProducts"
import { updateProduct } from "@/api/products/updateProduct"
import { useNotificationContext } from "@/context/notificationContext"
import { Category, Product, ProductContextType } from "@/types/Product"
import { onRequestError } from "@/utils/onRequestError"
import { onValidationError } from "@/utils/onValidationError"
import {
  createProductSchema,
  updateProductSchema,
} from "@/utils/productsValidation"
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
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

export const ProductContext = createContext<ProductContextType | undefined>(
  undefined,
)

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [sortCategory, setSortCategory] = useState<string>("")
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const { onSetNotification, setNotification } = useNotificationContext()

  const fetchProducts = async () => {
    try {
      const response = await getProducts()
      if (response && response.status === 200) {
        setProducts(response.data)
      }
    } catch (error) {
      onSetNotification(error.message)
      console.error(error)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await getProductCategories()
      if (response && response.status === 200) {
        setCategories(response.data)
      }
    } catch (error) {
      onSetNotification(error.message)
      console.error(error)
    }
  }

  useEffect(() => {
    fetchProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onDeleteProduct = async (e: MouseEvent, id: number) => {
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
  }

  const onCreateProduct = async ({
    e,
    data,
    file,
  }: {
    e: FormEvent
    data: Product
    file: File | null | undefined
  }) => {
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
        onError: onValidationError,
        onNotification: setNotification,
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
  }

  const onUpdateProduct = async ({
    key,
    id,
    initialData,
    updatedData,
    setUpdatedData,
    file,
  }: {
    key: string
    id: number
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialData: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updatedData: any
    setUpdatedData: Dispatch<SetStateAction<Product>>
    file: File
  }) => {
    try {
      const validProperty = await extractValidProperty(key, updatedData, file)
      const validatedProperty = (await validateProduct(validProperty)) ?? {}
      const response = await updateProduct(id, validatedProperty as Product)
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
    }
  }

  const extractValidProperty = async (
    key: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updatedProductData: any,
    file: File | null,
  ) => {
    if (key === "image" && file) {
      const image = await uploadFile(file)
      return { [key]: image }
    } else {
      const value = updatedProductData[key]
      if (key === "price" || key === "size") {
        return { [key]: Number(value) }
      } else {
        return { [key]: value }
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validateProduct = async (property: any) => {
    try {
      if (updateProductSchema) {
        return updateProductSchema.parse(property)
      }
    } catch (error) {
      onValidationError(error, setNotification)
      console.error("Error by validating property:", error)
    }
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        onCreateProduct,
        onUpdateProduct,
        onDeleteProduct,
        sortCategory,
        setSortCategory,
        categories,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const useProductContext = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error("useProductContext shoudl be within a Provider")
  }
  return context
}
