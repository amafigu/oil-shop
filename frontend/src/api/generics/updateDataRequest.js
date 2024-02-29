import { SHORT_MESSAGE_TIMEOUT } from "#constants/time"
import axios from "axios"

export const updateDataRequest = async (
  dataId,
  updatedData,
  apiUrl,
  setErrorMessage,
) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}${apiUrl}/${dataId}`,
      updatedData,
      { withCredentials: true },
    )
    return response
  } catch (error) {
    if (error.response && error.response.data) {
      if (error.response.data.message) {
        setErrorMessage(`${error.response.data.message}`)
        setTimeout(() => setErrorMessage(null), SHORT_MESSAGE_TIMEOUT)
      }

      if (error.response.data.errors) {
        setErrorMessage(`${error.response.data.errors[0].message}`)
        setTimeout(() => setErrorMessage(null), SHORT_MESSAGE_TIMEOUT)
      }
    }
    console.error(error)
  }
}
