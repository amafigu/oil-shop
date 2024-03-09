import { getProductCategories } from "#api/products/getProductCategories"
import { useEffect, useState } from "react"

export const useGetProductCategories = () => {
  const [notification, setNotification] = useState(null)
  const [productCategories, setProductCategories] = useState("")

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await getProductCategories()
        if (response && response.status === 200) {
          setProductCategories(response.data)
        }
      } catch (error) {
        setNotification("Can not get product categories")
        console.error("Can not get product categories ", error)
      }
    }
    getCategories()
  }, [])

  return { productCategories, notification }
}
