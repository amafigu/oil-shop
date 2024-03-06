import { API_SHIPPING_DATA } from "#constants/api"

import axios from "axios"

export const createUserShippingDataRequest = async (userId, data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}${API_SHIPPING_DATA}/${userId}`,
    data,
  )
  return response
}
