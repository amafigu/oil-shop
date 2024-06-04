import { uploadFile } from "#api/aws/uploadFile"
import { createProduct } from "#api/products/createProduct"
import { deleteProductById } from "#api/products/deleteProductById"
import { getProductCategories } from "#api/products/getProductCategories"
import { getProducts } from "#api/products/getProducts"
import { updateProduct } from "#api/products/updateProduct"
import { useNotificationContext } from "#context/notificationContext"
import { onValidationError } from "#utils/onValidationError"
import {
  createProductSchema,
  updateProductSchema,
} from "#utils/productsValidation"
import { createContext, useContext, useEffect, useState } from "react"

export const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
  const [sortCategory, setSortCategory] = useState(undefined)
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
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

  const onDeleteProduct = async (id) => {
    try {
      const response = await deleteProductById(id)
      if (response && response.status === 200) {
        setProducts((prevState) => prevState.filter((item) => item.id !== id))
      }
    } catch (error) {
      onSetNotification(error.message)
      console.error(error.message, error)
    }
  }

  const onCreateProduct = async ({ product, file, setNotification }) => {
    try {
      const typedProduct = await typeData(product, file)
      const validatedProduct = await validateProduct(typedProduct)
      const response = await createProduct(validatedProduct)

      if (response && response.status === 201) {
        const newProduct = response.data.product
        setProducts((prevProducts) => [...prevProducts, newProduct])
        onSetNotification(`Product ${product.name} created successfully`)
      }
    } catch (error) {
      console.error("Failed to add product:", error)
    }
  }

  const typeData = async (product, file) => {
    const image = await checkImage(file)
    return {
      ...product,
      image,
      details: String(product.details),
      description: String(product.description),
      categoryId: Number(product.categoryId),
      size: Number(product.size),
      price: Number(product.price),
    }
  }

  const checkImage = async (file) => {
    if (file) {
      const imageUrl = await uploadFile(file)
      return String(imageUrl)
    } else {
      return ""
    }
  }

  const validateProduct = async (product) => {
    try {
      if (createProductSchema) {
        return createProductSchema.parse(product)
      } else {
        return
      }
    } catch (error) {
      console.error("Error by validating product", error)
      onValidationError(error, setNotification)
    }
  }

  const onUpdateProduct = async ({
    key,
    id,
    initialData,
    updatedData,
    setUpdatedData,
    file,
  }) => {
    try {
      const validProperty = await extractValidProperty(key, updatedData, file)
      const validatedProperty = await validateProperty(validProperty)
      const response = await updateProduct(id, validatedProperty)
      if (response && response.status === 200) {
        const updatedProduct = response.data.product
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product,
          ),
        )
      }
    } catch (error) {
      console.error("Error updating product:", error)
      setUpdatedData(initialData)
    }
  }

  const extractValidProperty = async (key, updatedProductData, file) => {
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

  const validateProperty = async (property) => {
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

export const useProductContext = () => useContext(ProductContext)
