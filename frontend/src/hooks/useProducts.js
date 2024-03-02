import useProductContext from "#context/productContext"
import { useEffect, useState } from "react"

export const useProducts = () => {
  const [sourceProducts, setSourceProducts] = useState([])
  const { products, setProducts, isLoading } = useProductContext()

  useEffect(() => {
    const getList = async () => {
      try {
        const contextProducts = products
        if (contextProducts) {
          setSourceProducts(contextProducts)
        }
      } catch (error) {
        console.error(error)
      }
    }
    getList()
  }, [products])
  return { sourceProducts, setProducts, isLoading }
}
