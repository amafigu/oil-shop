import { deleteUserById } from "#api/users/deleteUserById"
import { NORMAL_MESSAGE_TIMEOUT } from "#constants/time"

export const onDeleteUser = async (e, userId, setNotification, setCounter) => {
  e.preventDefault()
  try {
    const response = await deleteUserById(userId)

    if (response && response.status === 200) {
      if (setNotification) {
        setNotification("user deleted")
        setTimeout(() => {
          setNotification(null)
        }, NORMAL_MESSAGE_TIMEOUT)
      }
      if (setCounter) {
        setTimeout(() => {
          setCounter((prevCount) => Number(prevCount) + 1)
        }, 500)
      }
    }
  } catch (error) {
    console.error(error)
  }
}
