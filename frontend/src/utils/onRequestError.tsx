import { NotificationContextType } from "@/types/Notification"
import { AxiosError } from "axios"

interface ResponseData {
  message?: string
  errors?: { message: string }[]
}

export const onRequestError = (
  error: AxiosError<ResponseData>,
  setNotification: NotificationContextType["onSetNotification"],
  message = "Error by handling request",
) => {
  const errorMessage = error?.response?.data?.message
  const errorDetails = error?.response?.data?.errors?.[0]?.message

  if (setNotification) {
    if (errorDetails) {
      setNotification(`Error: ${errorDetails}`)
      return
    }
    if (errorMessage) {
      setNotification(`Error: ${errorMessage}`)
      return
    }
    if (error.message) {
      setNotification(error.message)
      return
    }
    setNotification(message)
  }
}
