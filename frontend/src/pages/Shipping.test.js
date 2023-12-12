import useCartContext from "#context/cartContext"
import useLocaleContext from "#context/localeContext"
import useUserContext from "#context/userContext"
import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import React from "react"
import { MemoryRouter } from "react-router-dom"
import Shipping from "./Shipping"

jest.mock("#context/cartContext")
jest.mock("#context/localeContext")
jest.mock("#context/userContext")

beforeAll(() => {
  window.scrollTo = jest.fn()
})

describe("Shipping page should ", () => {
  test("renders correctly", () => {
    useCartContext.mockReturnValue({
      cart: [],
    })

    useLocaleContext.mockReturnValue({
      translate: {
        pages: {
          shipping: {},
        },
      },
    })

    useUserContext.mockReturnValue({
      user: null,
      isLoggedIn: false,
      isLoading: false,
    })

    const { container } = render(
      <MemoryRouter>
        <Shipping />
      </MemoryRouter>,
    )
    expect(container).toBeInTheDocument()
  })
})
