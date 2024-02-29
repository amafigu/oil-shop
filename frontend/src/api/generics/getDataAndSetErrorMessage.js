import { SHORT_MESSAGE_TIMEOUT } from "#constants/time"
import axios from "axios"

export const getDataAndSetErrorMessage = async (
  dataId,
  apiUrl,
  setErrorMessage,
) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}${apiUrl}/${dataId}`,
      { withCredentials: true },
    )
    return response
  } catch (error) {
    console.error(error)
    if (typeof setErrorMessage === "function") {
      if (error.response && error.response.data.message) {
        console.error(error.response.data.message)
        setErrorMessage(
          `Error by updating data: ${error.response.data.message}`,
        )
        setTimeout(() => setErrorMessage(null), SHORT_MESSAGE_TIMEOUT)
        return
      } else {
        console.error(error)
        setErrorMessage("Error by updating data")
        setTimeout(() => setErrorMessage(null), SHORT_MESSAGE_TIMEOUT)
        return
      }
    }
  }
}
