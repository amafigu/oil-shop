import { getProducts } from "#api/products/getProducts"
import { useNotificationContext } from "#context/notificationContext"
import { useEffect, useState } from "react"

export const useGetProducts = () => {
  const [products, setProducts] = useState([])
  const { onSetNotification } = useNotificationContext()

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

  useEffect(() => {
    fetchProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { products, setProducts }
}
