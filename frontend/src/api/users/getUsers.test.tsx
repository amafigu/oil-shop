import axios, { AxiosResponse } from "axios"
import { describe, it, expect, vi } from "vitest"

import { getUsers } from "./getUsers"
import { baseUrl, USERS } from "@/constants/api"
import type { User } from "@/types/User"
import { users } from "@/__mocks__/users"
import { notFoundAxiosResponse } from "@/__mocks__/api/emptyAxiosResponse"
import { successfulAxiosResponseWithoutData } from "@/__mocks__/api/successfulAxiosResponse"

vi.mock("axios")
const mockedGet = vi.mocked(axios.get)

describe("getUsers", () => {
  it("resolves when status is 200", async () => {
    const axiosResponse = {
      ...successfulAxiosResponseWithoutData,
      data: users,
    } as unknown as AxiosResponse<User[]>

    mockedGet.mockResolvedValue(axiosResponse)

    const result = await getUsers()

    expect(mockedGet).toHaveBeenCalledWith(`${baseUrl}${USERS}`, {
      withCredentials: true,
    })
    expect(result).toBe(axiosResponse)
  })

  it("throws error if is not succesful", async () => {
    const axiosResponse = notFoundAxiosResponse as unknown as AxiosResponse<
      User[]
    >
    mockedGet.mockResolvedValue(axiosResponse)

    await expect(getUsers()).rejects.toThrow(
      `Error with status ${axiosResponse.status} by getting users`,
    )
  })

  it("throws network error", async () => {
    const networkError = new Error("Network error")
    mockedGet.mockRejectedValue(networkError)

    await expect(getUsers()).rejects.toBe(networkError)
  })
})
