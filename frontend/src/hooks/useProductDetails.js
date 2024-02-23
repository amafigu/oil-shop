import { LONG_MESSAGE_TIMEOUT, ROUTES_SHOP } from "#constants/constants"
import useLocaleContext from "#context/localeContext"
import { getProductByName } from "#utils/products"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const useProductDetails = () => {
  const [product, setProduct] = useState(null)
  const [notification, setNotification] = useState(null)
  const { translate } = useLocaleContext()
  const text = translate.pages.productsDetails
  const navigate = useNavigate()
  const { productName } = useParams()

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

  return { product, notification }
}
