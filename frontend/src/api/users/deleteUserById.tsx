import { baseUrl, USERS } from "@/constants/api"
import axios, { AxiosResponse } from "axios"

export async function deleteUserById(id: number): Promise<AxiosResponse<void>> {
  const url = `${baseUrl}${USERS}/${id}`

  try {
    const response = await axios.delete<void>(url, {
      withCredentials: true,
    })
    if (response?.status !== 200) {
      throw new Error(`deleteUserById: Unexpected status ${response.status}`)
    }
    return response
  } catch (error) {
    console.error(`Error by deleting user with id:${id}`, error)
    throw error
  }
}
