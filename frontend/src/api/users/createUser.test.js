import user from "#__mocks__/user"
import * as axios from "axios"
import "jest-environment-jsdom"
import { createUser } from "./createUser"

jest.mock("axios")
jest.mock("#api/users/getUsers")

describe("createUserRequest", () => {
  test("should call the and return data on success", async () => {
    axios.post.mockResolvedValue({ data: { user }, status: 201 })
    const response = await createUser({
      firstName: "Test firstName",
      lastName: "Test lastname",
      email: "test@mail.com",
      password: "!A123456",
    })
    console.log(response)
    expect(response.status).toEqual(201)
  })
})
