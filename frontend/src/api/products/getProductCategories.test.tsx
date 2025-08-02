import axios, { AxiosResponse } from "axios"
import { describe, it, expect, vi } from "vitest"

import { getProductCategories } from "./getProductCategories"
import { PRODUCT_CATEGORIES } from "@/constants/api"
import type { Category } from "@/types/Product"
import { productCategories } from "@/__mocks__/productCategories"
import { notFoundAxiosResponse } from "@/__mocks__/api/emptyAxiosResponse"

vi.mock("axios")
const mockedGet = vi.mocked(axios.get)

describe("getProductCategories", () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL

  it("resolves successfully", async () => {
    const axiosResponse = {
      data: productCategories,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {},
    } as unknown as AxiosResponse<Category[]>

    mockedGet.mockResolvedValue(axiosResponse)

    const result = await getProductCategories()

    expect(mockedGet).toHaveBeenCalledWith(`${baseUrl}${PRODUCT_CATEGORIES}`)
    expect(result).toBe(axiosResponse)
  })

  it("throws if is not succesful", async () => {
    const axiosResponse = notFoundAxiosResponse as unknown as AxiosResponse<
      Category[]
    >

    mockedGet.mockResolvedValue(axiosResponse)

    await expect(getProductCategories()).rejects.toThrow(
      "getProductCategories: Unexpected status 404",
    )
  })

  it("throws network error", async () => {
    const networkError = new Error("Network error")
    mockedGet.mockRejectedValue(networkError)

    await expect(getProductCategories()).rejects.toBe(networkError)
  })
})
