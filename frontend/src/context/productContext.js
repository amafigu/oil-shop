import { getProducts } from "#api/products/getProducts"
import { onCreateProduct } from "#utils/onCreateProduct"
import { onDeleteProduct } from "#utils/onDeleteProduct"
import { onUpdateProduct } from "#utils/onUpdateProduct"
import { createContext, useContext, useEffect, useState } from "react"

export const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await getProducts()
        if (response && response.status === 200) {
          setProducts(response.data)
        }
      } catch (error) {
        console.error(error)
      }
    }
    getAllProducts()
  }, [])

  const deleteProduct = async (e, productId, setNotification) => {
    try {
      const response = await onDeleteProduct(e, productId, setNotification)
      if (response && response.status === 200) {
        setProducts(products.filter((product) => product.id !== productId))
      }
    } catch (err) {
      console.error("Failed to delete product:", err)
    }
  }

  const addProduct = async (e, product, setNotification, file) => {
    try {
      const response = await onCreateProduct(e, product, setNotification, file)

      if (response && response.status === 201) {
        const newProduct = response.data.product
        setProducts([...products, newProduct])
      }
    } catch (err) {
      console.error("Failed to add product:", err)
    }
  }

  const updateProduct = async (
    e,
    key,
    productId,
    itemInitialAttributes,
    updatedProductData,
    setUpdatedProductData,
    setNotification,
    file,
  ) => {
    try {
      const response = await onUpdateProduct(
        e,
        key,
        productId,
        itemInitialAttributes,
        updatedProductData,
        setUpdatedProductData,
        setNotification,
        file,
      )
      if (response && response.status === 200) {
        const updatedProduct = response.data.product
        setProducts((prevProducts) => {
          return prevProducts.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product,
          )
        })
      }
    } catch (err) {
      console.error("Failed to update product:", err)
    }
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

const useProductContext = () => useContext(ProductContext)
export default useProductContext
