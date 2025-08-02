import { CURRENT_ADMIN, CURRENT_CUSTOMER, LOGIN } from "@/constants/routes"
import { useUserContext } from "@/context/useUserContext"
import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

export const useVerifyUserRole = () => {
  const { user, isLoading } = useUserContext()
  const navigate = useNavigate()

  const verifyUserRole = useCallback(() => {
    if (isLoading) {
      return
    } else {
      if (user?.role?.name === "admin") {
        navigate(CURRENT_ADMIN)
      } else if (user?.role?.name === "customer") {
        navigate(CURRENT_CUSTOMER)
      } else {
        navigate(LOGIN)
      }
    }
  }, [isLoading, user, navigate])

  return { verifyUserRole }
}
