import { baseUrl, USERS } from "@/constants/api"
import { User } from "@/types/User"
import axios, { AxiosResponse } from "axios"

export async function getUserById(id: number): Promise<AxiosResponse<User>> {
  const url = `${baseUrl}${USERS}/${id}`
  try {
    const response = await axios.get(url, {
      withCredentials: true,
    })
    if (response.status === 200 || response.status === 404) {
      return response as AxiosResponse<User>
    }
    throw new Error(`Error with status ${response.status} by getting user`)
  } catch (error) {
    console.error("Error by getting user", error)
    throw error
  }
}
