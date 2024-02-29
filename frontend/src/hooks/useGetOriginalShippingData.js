import { getDataAndSetErrorMessage } from "#api/generics/getDataAndSetErrorMessage"
import { API_SHIPPING_DATA } from "#constants/api"
import useUserContext from "#context/userContext"
import { useEffect, useState } from "react"

export const useGetOriginalShippingData = () => {
  const { userId, isLoading } = useUserContext()
  const initialShippingData = {
    street: "",
    number: "",
    details: "",
    postalCode: "",
    city: "",
    state: "",
    country: "",
  }
  const [nonUpdatedShippingData, setNonUpdatedShippingData] = useState({
    ...initialShippingData,
  })

  useEffect(() => {
    async function getOriginalShippingData() {
      if (!isLoading) {
        const shippingData = await getDataAndSetErrorMessage(
          userId,
          API_SHIPPING_DATA,
        )
        if (!shippingData) {
          return
        }
        if (shippingData.status === 200) {
          setNonUpdatedShippingData(shippingData.data)
        }
      }
    }
    getOriginalShippingData()
  }, [userId, isLoading])

  return { nonUpdatedShippingData, setNonUpdatedShippingData, userId }
}
