import translate from "#__mocks__/translate" // Change this line
import useLocaleContext from "#context/localeContext"
import useUserContext from "#context/userContext"
import { render } from "@testing-library/react"
import React from "react"
import UserData from "./UserData"

jest.mock("#context/userContext")
jest.mock("#context/localeContext")

describe("UserData should", () => {
  useLocaleContext.mockReturnValue({ translate })

  beforeEach(() => {
    useUserContext.mockReturnValue({
      setUser: jest.fn(),
      userId: "48",
      isLoading: false,
    })
  })

  test("renders without crashing", () => {
    render(<UserData />)
  })

  // TODO: "shows form when toggle button is clicked"
  // TODO: "hides form when toggle button is clicked again"
  // TODO: "shows edit button when toggle button is clicked"
  // TODO: "test CRUD functionality with EditableInput component"
})
