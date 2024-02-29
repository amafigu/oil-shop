import { SHORT_MESSAGE_TIMEOUT } from "#constants/time"
import axios from "axios"

export const createDataRequest = async (dataObject, apiUrl, setMessage) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}${apiUrl}`,
      dataObject,
      { withCredentials: true },
    )
    setMessage(`Item Created`)
    setTimeout(() => setMessage(null), SHORT_MESSAGE_TIMEOUT)
    return response
  } catch (error) {
    if (error.response && error.response.data) {
      if (error.response.data.message) {
        setMessage(`${error.response.data.message}`)
        setTimeout(() => setMessage(null), SHORT_MESSAGE_TIMEOUT)
      }

      if (error.response.data.errors) {
        setMessage(`${error.response.data.errors[0].message}`)
        setTimeout(() => setMessage(null), SHORT_MESSAGE_TIMEOUT)
      }
    }
    console.error(error)
  }
}
