import { CURRENT_ADMIN, CURRENT_CUSTOMER } from "#constants/routes"
import { useUserContext } from "#context/userContext"
import { useNavigate } from "react-router-dom"

export const useVerifyUserRole = () => {
  const { user, isLoading } = useUserContext()
  const navigate = useNavigate()

  const verifyUserRole = async () => {
    if (isLoading) {
      return
    } else {
      if (user.role.name === "admin") {
        navigate(CURRENT_ADMIN)
      } else if (user.role.name === "customer") {
        navigate(CURRENT_CUSTOMER)
      }
    }
  }

  return { verifyUserRole }
}
