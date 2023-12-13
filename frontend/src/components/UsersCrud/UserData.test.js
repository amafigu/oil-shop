require("dotenv").config()
import useLocaleContext from "#context/localeContext"
import useUserContext from "#context/userContext"
import { render } from "@testing-library/react"
import React from "react"
import UserData from "./UserData"

jest.mock("#context/userContext")
jest.mock("#context/localeContext")

describe("UserData should", () => {
  const translate = {
    errors: {
      requests: {
        user: {
          getUserData: "Error getting user data",
        },
      },
    },
    components: {
      buttons: {
        actions: {
          user: {
            hide: "Hide user data",
            show: "Show user data",
          },
        },
      },
      crud: {
        buttons: {
          edit: "Edit",
          save: "Save",
        },
        forms: {
          commonProperties: {
            email: "Email",
            firstName: "First name",
            imageUrl: "Image Url",
            lastName: "Last name",
          },
        },
      },
    },
  }

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
  // TODO: "test CRUD functionality"
})
