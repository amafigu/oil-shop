import axios, { AxiosResponse } from "axios"
import { describe, it, expect, vi } from "vitest"

import { createUser } from "./createUser"
import { USERS } from "@/constants/api"
import type { User } from "@/types/User"
import { user } from "@/__mocks__/user"
import { notFoundAxiosResponse } from "@/__mocks__/api/emptyAxiosResponse"

vi.mock("axios")
const mockedPost = vi.mocked(axios.post)

describe("createUser", () => {
  const baseUrl = notFoundAxiosResponse

  it("resolves with data when status is 201", async () => {
    const payload = { user }
    const axiosResponse = {
      data: payload,
      status: 201,
      statusText: "Created",
      headers: {},
      config: {},
    } as unknown as AxiosResponse<{ user: User }>

    mockedPost.mockResolvedValue(axiosResponse)

    const result = await createUser(user)

    expect(mockedPost).toHaveBeenCalledWith(`${baseUrl}${USERS}`, user, {
      withCredentials: true,
    })
    expect(result).toBe(axiosResponse)
  })

  it("throws if status is not 201", async () => {
    const axiosResponse = notFoundAxiosResponse as unknown as AxiosResponse<{
      user: User
    }>

    mockedPost.mockResolvedValue(axiosResponse)

    await expect(createUser(user)).rejects.toThrow(
      `createUser: Unexpected status ${axiosResponse.status}`,
    )
  })

  it("re-throws network or other errors", async () => {
    const networkError = new Error("Network down")
    mockedPost.mockRejectedValue(networkError)

    await expect(createUser(user)).rejects.toBe(networkError)
  })
})
