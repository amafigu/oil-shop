import axios, { AxiosResponse } from "axios"
import { baseUrl, PRODUCTS } from "@/constants/api"

export async function deleteProductById(
  id: number,
): Promise<AxiosResponse<void>> {
  const url = `${baseUrl}${PRODUCTS}/${id}`

  try {
    const response = await axios.delete<void>(url, {
      withCredentials: true,
    })
    if (response.status !== 200) {
      throw new Error(`deleteProductById: Unexpected status ${response.status}`)
    }
    return response
  } catch (error) {
    console.error(`Error deleting product ${id}`, error)
    throw error
  }
}
