import { baseUrl, USERS } from "@/constants/api"
import { CreateUser, User } from "@/types/User"
import axios, { AxiosResponse } from "axios"

export async function createUser(
  user: CreateUser,
): Promise<AxiosResponse<{ user: User }>> {
  const url = `${baseUrl}${USERS}`

  try {
    const response = await axios.post<{ user: User }>(url, user, {
      withCredentials: true,
    })

    if (response.status !== 201) {
      throw new Error(`createUser: Unexpected status ${response.status}`)
    }

    return response
  } catch (error) {
    console.error("Error by creating user", error)
    throw error
  }
}
