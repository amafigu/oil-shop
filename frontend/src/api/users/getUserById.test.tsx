import axios, { AxiosResponse } from "axios"
import { describe, it, expect, vi } from "vitest"

import { getUserById } from "./getUserById"
import { baseUrl, USERS } from "@/constants/api"
import type { User } from "@/types/User"
import { user } from "@/__mocks__/user"
import { notFoundWithUndefinedData } from "@/__mocks__/api/emptyAxiosResponse"
import { successfulAxiosResponseWithoutData } from "@/__mocks__/api/successfulAxiosResponse"
import { errorAxiosResponse } from "@/__mocks__/api/errorAxiosResponse"

vi.mock("axios")
const mockedGet = vi.mocked(axios.get)

describe("getUserById", () => {
  it("resolves successfully", async () => {
    const axiosResponse = {
      ...successfulAxiosResponseWithoutData,
      data: user,
    } as unknown as AxiosResponse<User>

    mockedGet.mockResolvedValue(axiosResponse)

    const result = await getUserById(user.id)

    expect(mockedGet).toHaveBeenCalledWith(`${baseUrl}${USERS}/${user.id}`, {
      withCredentials: true,
    })
    expect(result).toBe(axiosResponse)
  })

  it("is undefined when not found", async () => {
    const axiosResponse = notFoundWithUndefinedData as unknown as AxiosResponse<
      User | undefined
    >
    console.log(axiosResponse)
    mockedGet.mockResolvedValue(axiosResponse)

    const result = await getUserById(user.id)

    expect(result).toBe(axiosResponse)
  })

  it("throws if is not succesful or 404", async () => {
    const axiosResponse = {
      ...errorAxiosResponse,
      data: user,
    } as unknown as AxiosResponse<User>

    mockedGet.mockResolvedValue(axiosResponse)

    await expect(getUserById(user.id)).rejects.toThrow(
      `Error with status ${axiosResponse.status} by getting user`,
    )
  })

  it("throws network error", async () => {
    const networkError = new Error("Network error")
    mockedGet.mockRejectedValue(networkError)

    await expect(getUserById(user.id)).rejects.toBe(networkError)
  })
})
