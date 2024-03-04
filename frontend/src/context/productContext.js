import { getAllProductsList } from "#api/products/getAllProductsList"
import { createContext, useContext, useEffect, useState } from "react"

export const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await getAllProductsList()
        if (response) {
          setProducts(response)
        }
      } catch (error) {
        console.error(error)
      }
    }
    getProducts()
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
