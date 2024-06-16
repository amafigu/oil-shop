import { getUserRoles } from "@/api/users/getUserRoles"
import { CURRENT_ADMIN, CURRENT_CUSTOMER } from "@/constants/routes"
import { useUserContext } from "@/context/userContext"
import { Role } from "@/types/User"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const useVerifyUserRole = () => {
  const { user, isLoading } = useUserContext()
  const [roles, setRoles] = useState<Role[]>([])
  const navigate = useNavigate()

  const fetchRoles = async () => {
    try {
      const userRoles = await getUserRoles()
      if (userRoles && userRoles.status === 200) {
        setRoles(userRoles.data)
      }
    } catch (error) {
      console.error("Error by fetching roles")
    }
  }

  useEffect(() => {
    if (!isLoading) {
      fetchRoles()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const verifyUserRole = () => {
    const adminRole = roles.find((role) => role.name === "admin")
    const adminId = adminRole ? adminRole.id : null
    const customerRole = roles.find((role) => role.name === "customer")
    const customeId = customerRole ? customerRole.id : null

    if (isLoading || !user) {
      return
    } else {
      if (user.roleId === adminId) {
        navigate(CURRENT_ADMIN)
      } else if (user.roleId === customeId) {
        navigate(CURRENT_CUSTOMER)
      }
    }
  }

  return { verifyUserRole }
}
