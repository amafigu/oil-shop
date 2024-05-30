import { LAST_ORDER } from "#constants/api"
import axios from "axios"

export const getLastOrderItems = async (userId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}${LAST_ORDER}/${userId}`,
    )
    return response
  } catch (error) {
    throw error
  }
}
