import { getProducts } from "#api/products/getProducts"
import { createContext, useContext, useEffect, useState } from "react"

export const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [counter, setCounter] = useState(0)

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
  }, [counter])

  return (
    <ProductContext.Provider
      value={{ counter, setCounter, products, setProducts }}
    >
      {children}
    </ProductContext.Provider>
  )
}

const useProductContext = () => useContext(ProductContext)
export default useProductContext
