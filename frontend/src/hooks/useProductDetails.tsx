import { getProductById } from "@/api/products/getProductById"
import { SHOP } from "@/constants/routes"
import { useNotificationContext } from "@/context/notificationContext"
import { Product } from "@/types/Product"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const useProductDetails = () => {
  const [product, setProduct] = useState<Product | undefined>(undefined)
  const [quantity, setQuantity] = useState(1)
  const { onSetNotification } = useNotificationContext()
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const response = await getProductById(Number(id))
        if (response?.status === 200) {
          setProduct(response.data)
        }
      } catch (error) {
        navigate(SHOP)
        onSetNotification(
          "Can not navigate to product, please try with another item",
        )
      }
    }
    getProductDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return { product, quantity, setQuantity }
}
