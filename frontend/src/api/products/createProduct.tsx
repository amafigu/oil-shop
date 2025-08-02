import axios, { AxiosResponse } from "axios"
import { PRODUCTS } from "@/constants/api"
import type { Product } from "@/types/Product"

export async function createProduct(
  product: Product,
): Promise<AxiosResponse<{ product: Product }>> {
  const url = `${import.meta.env.VITE_APP_API_URL}${PRODUCTS}`
  try {
    const response = await axios.post<{ product: Product }>(url, product, {
      withCredentials: true,
    })
    if (response.status !== 201) {
      throw new Error(`createProduct: Unexpected status ${response.status}`)
    }

    return response
  } catch (error) {
    console.error("Error by creating product", error)
    throw error
  }
}
