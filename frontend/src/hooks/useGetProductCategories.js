import { getProductCategories } from "#api/products/getProductCategories"
import { useEffect, useState } from "react"

export const useGetProductCategories = () => {
  const [productCategories, setProductCategories] = useState("")
  useEffect(() => {
    const fetchProductCategories = async () => {
      try {
        const productCategoriesResponse = await getProductCategories()
        setProductCategories(productCategoriesResponse.data)
      } catch (error) {
        console.error("Can not get product categories ", error)
      }
    }
    fetchProductCategories()
  }, [])

  return { productCategories }
}
