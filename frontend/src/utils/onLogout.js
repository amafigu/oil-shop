import { logout } from "#api/auth/logout"
import { LOCAL_STORAGE_CART } from "#constants/localStorage"
import { ROUTES_LOGIN } from "#constants/routes"
import { REDIRECT_TIMEOUT } from "#constants/time"

export const onLogout = async (navigate, setIsLoggedIn) => {
  try {
    const logoutResponse = await logout()
    if (logoutResponse && logoutResponse.status === 200) {
      setIsLoggedIn(false)
      setTimeout(() => navigate(ROUTES_LOGIN), REDIRECT_TIMEOUT)
      localStorage.removeItem(LOCAL_STORAGE_CART)
    }
  } catch (error) {
    throw error
  }
}
