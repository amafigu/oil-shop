import { baseUrl, USERS } from "@/constants/api"
import { User } from "@/types/User"
import axios, { AxiosResponse } from "axios"

export async function getUsers(): Promise<AxiosResponse<User[]>> {
  const url = `${baseUrl}${USERS}`
  try {
    const response = await axios.get(url, {
      withCredentials: true,
    })
    if (response.status !== 200) {
      throw new Error(`Error with status ${response.status} by getting users`)
    }
    return response
  } catch (error) {
    console.error("Error by getting users")
    throw error
  }
}
