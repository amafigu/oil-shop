import { SHORT_MESSAGE_TIMEOUT } from "@/constants/time"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const onValidationError = (error: any, setNotification: any) => {
  console.error(error)
  if (error && error.issues) {
    if (setNotification) {
      setNotification(error.issues[0].message)
      setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
    }
  } else {
    if (setNotification) {
      setNotification(
        "There is an invalid value in your fields, please try with other values",
      )
      setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
    }
  }
}
