import { baseUrl, USER_ROLE } from "@/constants/api"
import axios from "axios"

export async function getUserRole(roleId: number) {
  try {
    const response = await axios.get(`${baseUrl}${USER_ROLE}/${roleId}`, {
      withCredentials: true,
    })
    if (response.status !== 200) {
      throw new Error(`Api request error by getting user`)
    }
    return response
  } catch (error) {
    console.error("Error by getting user role", error)
    throw error
  }
}
