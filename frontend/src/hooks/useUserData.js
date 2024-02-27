import { API_USERS_CURRENT_USER } from "#constants/api"
import { SHORT_MESSAGE_TIMEOUT } from "#constants/time"
import useUserContext from "#context/userContext"
import { useTranslation } from "#hooks/useTranslation"
import { getDataAndSetErrorMessage } from "#utils/dataManipulation"
import { useEffect, useState } from "react"

export const useUserData = () => {
  const [notification, setNotification] = useState(null)
  const initialUserData = {
    firstName: "",
    lastName: "",
    email: "",
    image: "",
  }
  const [nonUpdatedUserData, setNonUpdatedUserData] = useState({
    ...initialUserData,
  })
  const { translate } = useTranslation()
  const errorText = translate.errors.requests
  const { setUser, userId, isLoading } = useUserContext()
  useEffect(() => {
    let timeoutId

    async function getOriginalUserData() {
      if (!isLoading) {
        try {
          const userData = await getDataAndSetErrorMessage(
            userId,
            API_USERS_CURRENT_USER,
            setNotification,
          )
          if (!userData) {
            const errorMessage =
              errorText.user && errorText.user.getUserData
                ? `${errorText.user.getUserData}`
                : "Error getting user data"
            setNotification(errorMessage)
            timeoutId = setTimeout(
              () => setNotification(null),
              SHORT_MESSAGE_TIMEOUT,
            )
            return
          }
          if (userData.status === 200) {
            setUser(userData.data)
            setNonUpdatedUserData(userData.data)
          }
        } catch (error) {
          setNotification("Error by getting user data")
          timeoutId = setTimeout(
            () => setNotification(null),
            SHORT_MESSAGE_TIMEOUT,
          )
          console.error(error)
        }
      }
    }
    getOriginalUserData()
    return () => clearTimeout(timeoutId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, isLoading])

  return {
    notification,
    nonUpdatedUserData,
    setNonUpdatedUserData,
    setNotification,
    setUser,
    userId,
  }
}
