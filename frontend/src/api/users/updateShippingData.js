import { SHIPPING_DATA } from "#constants/api"
import axios from "axios"

export const updateShippingData = async (userId, propertyObj) => {
  const response = await axios.put(
    `${process.env.REACT_APP_API_URL}${SHIPPING_DATA}/${userId}`,
    propertyObj,
    { withCredentials: true },
  )
  return response
}
