import axios, { AxiosResponse } from "axios"
import { baseUrl, PRODUCTS } from "@/constants/api"
import type { Product } from "@/types/Product"

export async function updateProduct(
  productId: number,
  product: Product,
): Promise<AxiosResponse<{ product: Product }>> {
  const url = `${baseUrl}${PRODUCTS}/${productId}`
  try {
    const response = await axios.put<{ product: Product }>(url, product, {
      withCredentials: true,
    })
    if (response.status !== 200) {
      throw new Error(`updateProduct: Unexpected status ${response.status}`)
    }
    return response
  } catch (error) {
    console.error(`Error updating product ${productId}`, error)
    throw error
  }
}
