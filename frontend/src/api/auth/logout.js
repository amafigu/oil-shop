import { API_LOGOUT } from "#constants/api"
import {
  LOCAL_STORAGE_CART,
  LOCAL_STORAGE_GUEST_ID,
} from "#constants/localStorage"
import { ROUTES_LOGIN } from "#constants/routes"
import { REDIRECT_TIMEOUT } from "#constants/time"
import axios from "axios"

export const logout = async (navigate, setIsLoggedIn) => {
  try {
    const logoutResponse = await axios.post(
      `${process.env.REACT_APP_API_URL}${API_LOGOUT}`,
      {},
      {
        withCredentials: true,
      },
    )
    if (logoutResponse.status === 200) {
      setIsLoggedIn(false)
      setTimeout(() => navigate(ROUTES_LOGIN), REDIRECT_TIMEOUT)
      localStorage.removeItem(LOCAL_STORAGE_CART)
      localStorage.removeItem(LOCAL_STORAGE_GUEST_ID)
    }
  } catch (error) {
    console.error(error)
  }
}
