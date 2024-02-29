import { getProductByName } from "#api/products/getProductByName"
import { ROUTES_SHOP } from "#constants/routes"
import { LONG_MESSAGE_TIMEOUT } from "#constants/time"
import { useTranslation } from "#hooks/useTranslation"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const useProductDetails = () => {
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [notification, setNotification] = useState(null)
  const { productName } = useParams()
  const { translate } = useTranslation()
  const text = translate.pages.productsDetails
  const navigate = useNavigate()

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const response = await getProductByName(productName)
        if (response.status === 200) {
          setProduct(response.data)
        }
      } catch (error) {
        setNotification(text.errorByGettingProduct)
        setTimeout(() => navigate(ROUTES_SHOP), LONG_MESSAGE_TIMEOUT)
        setTimeout(() => setNotification(null), LONG_MESSAGE_TIMEOUT)
      }
    }
    getProductDetails()
  }, [productName, text.errorByGettingProduct, navigate])

  return { product, notification, quantity, setQuantity }
}
