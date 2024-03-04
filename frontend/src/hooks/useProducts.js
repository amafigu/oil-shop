import useProductContext from "#context/productContext"
import { useEffect } from "react"

export const useProducts = () => {
  const { products, setProducts, isLoading } = useProductContext()

  useEffect(() => {}, [products])
  return { products, setProducts, isLoading }
}
