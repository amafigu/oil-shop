import { uploadToS3 } from "#api/aws/uploadToS3"
import { createUserRequest } from "#api/users/createUserRequest"
import { PROCESS_TIMEOUT, SHORT_MESSAGE_TIMEOUT } from "#constants/time"
import { validateUserProperties } from "#utils/validateUserProperties"

export const onCreateUser = async (e, user, setMessage, file, setCounter) => {
  e.preventDefault()
  try {
    let image
    if (file) {
      image = await uploadToS3(file)
      user = { ...user, image: image }
    }
    const validUser = validateUserProperties(user, setMessage)
    const request = await createUserRequest(validUser)
    if (request && request.status === 201) {
      setMessage(`User created sucessfully!`)
      setTimeout(() => setMessage(null), SHORT_MESSAGE_TIMEOUT)
      setTimeout(
        () => setCounter((prevCount) => prevCount + 1),
        PROCESS_TIMEOUT,
      )
      return request
    }
    if (request && request.status === 422) {
      setMessage(
        `Error by creating data: Can not add user, this is already existent. Please try with another email.`,
      )
      setTimeout(() => setMessage(null), SHORT_MESSAGE_TIMEOUT)
    }
  } catch (error) {
    console.error(error)
    if (error.response && error.response.data.message) {
      console.error(error.response.data.message)
      setMessage(`Error by creating user: ${error.response.data.message}`)
      setTimeout(() => setMessage(null), SHORT_MESSAGE_TIMEOUT)
    } else {
      setMessage("Error by creating user")
      setTimeout(() => setMessage(null), SHORT_MESSAGE_TIMEOUT)
    }
  }
}
