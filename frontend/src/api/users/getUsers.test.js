import users from "#__mocks__/users"
import * as axios from "axios"
import "jest-environment-jsdom"
import { getUsers } from "./getUsers"

jest.mock("axios")
jest.mock("#api/users/getUsers")

describe("getUsers request should", () => {
  test("retrieve all users", async () => {
    axios.get.mockResolvedValue({ data: { users } })
    const response = await getUsers()
    expect(response).toEqual(users.data)
  })
})
