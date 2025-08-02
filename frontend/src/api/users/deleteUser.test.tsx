import axios, { AxiosResponse } from "axios"
import { describe, it, expect, vi } from "vitest"

import { deleteUserById } from "./deleteUserById"
import { USERS } from "@/constants/api"
import { user } from "@/__mocks__/user"
import {
  deleteAxiosResponse,
  notFoundAxiosResponse,
} from "@/__mocks__/api/emptyAxiosResponse"

vi.mock("axios")
const mockedDelete = vi.mocked(axios.delete)

describe("deleteUserById", () => {
  const baseUrl = notFoundAxiosResponse

  it("resolves when status is 200", async () => {
    const axiosResponse = deleteAxiosResponse as unknown as AxiosResponse<void>

    mockedDelete.mockResolvedValue(axiosResponse)

    const result = await deleteUserById(user.id)

    expect(mockedDelete).toHaveBeenCalledWith(`${baseUrl}${USERS}/${user.id}`, {
      withCredentials: true,
    })
    expect(result).toBe(axiosResponse)
  })

  it("throws error if is not succesful", async () => {
    const axiosResponse =
      notFoundAxiosResponse as unknown as AxiosResponse<void>
    mockedDelete.mockResolvedValue(axiosResponse)

    await expect(deleteUserById(user.id)).rejects.toThrow(
      `deleteUserById: Unexpected status ${axiosResponse.status}`,
    )
  })

  it("throws network error", async () => {
    const networkError = new Error("Network error")
    mockedDelete.mockRejectedValue(networkError)

    await expect(deleteUserById(user.id)).rejects.toBe(networkError)
  })
})
