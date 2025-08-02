import { LOGIN } from "@/constants/routes"
import { useUserContext } from "@/context/useUserContext"
import { useNavigate } from "react-router-dom"

export const useVerifyIsLoggedIn = () => {
  const { isLoading, isLoggedIn } = useUserContext()
  const navigate = useNavigate()

  const verifyIsLoggedIn = () => {
    if (isLoading) {
      return
    } else {
      if (!isLoggedIn) {
        navigate(LOGIN)
      } else {
        return
      }
    }
  }

  return { verifyIsLoggedIn }
}
