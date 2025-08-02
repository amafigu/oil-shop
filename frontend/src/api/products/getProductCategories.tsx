import axios, { AxiosResponse } from "axios"
import { baseUrl, PRODUCT_CATEGORIES } from "@/constants/api"
import type { Category } from "@/types/Product"

export async function getProductCategories(): Promise<
  AxiosResponse<Category[]>
> {
  const url = `${baseUrl}${PRODUCT_CATEGORIES}`
  try {
    const response = await axios.get<Category[]>(url)
    if (response.status !== 200) {
      throw new Error(
        `getProductCategories: Unexpected status ${response.status}`,
      )
    }
    return response
  } catch (err) {
    console.error("Error fetching categories", err)
    throw err
  }
}
