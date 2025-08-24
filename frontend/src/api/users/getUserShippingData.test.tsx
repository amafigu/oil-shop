import axios, { AxiosResponse } from "axios"
import { describe, it, expect, vi } from "vitest"

import { getUserShippingData } from "./getUserShippingData"
import { baseUrl, SHIPPING_DATA } from "@/constants/api"
import type { Product } from "@/types/Product"
import { product } from "@/__mocks__/product"
import { notFoundWithUndefinedData } from "@/__mocks__/api/emptyAxiosResponse"
import { successfulAxiosResponseWithoutData } from "@/__mocks__/api/successfulAxiosResponse"

const mockedGet = vi.mocked(axios.get)

describe("getUserShippingData", () => {
  it("resolves successfully", async () => {
    const axiosResponse = {
      ...successfulAxiosResponseWithoutData,
      data: product,
    } as unknown as AxiosResponse<Product | undefined>

    mockedGet.mockResolvedValue(axiosResponse)

    const result = await getUserShippingData(product.id)

    expect(mockedGet).toHaveBeenCalledWith(
      `${baseUrl}${SHIPPING_DATA}/${product.id}`,
      { validateStatus: expect.any(Function) },
    )
    expect(result).toBe(axiosResponse)
  })

  it("is undefined when not found", async () => {
    const axiosResponse = notFoundWithUndefinedData as unknown as AxiosResponse<
      Product | undefined
    >

    mockedGet.mockResolvedValue(axiosResponse)

    const result = await getUserShippingData(product.id)

    expect(result).toBe(axiosResponse)
  })

  it("throws if is not succesful or 404", async () => {
    const axiosResponse = {
      data: product,
      status: 500,
      statusText: "Error",
      headers: {},
      config: {},
    } as unknown as AxiosResponse<Product>

    mockedGet.mockResolvedValue(axiosResponse)

    await expect(getUserShippingData(product.id)).rejects.toThrow(
      `getUserShippingData: Unexpected status ${axiosResponse.status}`,
    )
  })

  it("throws network error", async () => {
    const networkError = new Error("Network error")
    mockedGet.mockRejectedValue(networkError)

    await expect(getUserShippingData(product.id)).rejects.toBe(networkError)
  })
})
