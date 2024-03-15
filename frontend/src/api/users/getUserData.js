import axios from "axios"

export const getUserData = async (url, withCredentials) => {
  const userDataResponse = await axios.get(url, { withCredentials })
  if (userDataResponse && userDataResponse.status === 200) {
    const user = userDataResponse.data
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }
  }
  return userDataResponse
}
