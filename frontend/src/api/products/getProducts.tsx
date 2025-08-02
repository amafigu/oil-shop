import axios, { AxiosResponse } from "axios"
import { baseUrl, PRODUCTS } from "@/constants/api"
import type { Product } from "@/types/Product"

export async function getProducts(): Promise<AxiosResponse<Product[]>> {
  try {
    const url = `${baseUrl}${PRODUCTS}`
    const response = await axios.get<Product[]>(url)

    if (response.status !== 200) {
      throw new Error(`Got status ${response.status}`)
    }

    return response
  } catch (error) {
    console.error("Error fetching products", error)
    throw error
  }
}
