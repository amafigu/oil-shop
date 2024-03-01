import { translate } from "#__mocks__/translate"
import useUserContext from "#context/userContext"
import { useTranslation } from "#hooks/useTranslation"
import { render } from "@testing-library/react"
import React from "react"
import { UserData } from "./UserData"

jest.mock("#context/userContext")
jest.mock("#hooks/useTranslation")

describe("UserData should", () => {
  useTranslation.mockReturnValue({ translate })

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
