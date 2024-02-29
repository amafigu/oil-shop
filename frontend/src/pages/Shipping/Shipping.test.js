import translate from "#__mocks__/translate"
import useCartContext from "#context/cartContext"
import useUserContext from "#context/userContext"
import { useTranslation } from "#hooks/useTranslation"
import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import React from "react"
import { MemoryRouter } from "react-router-dom"
import { Shipping } from "."

jest.mock("#context/cartContext")
jest.mock("#hooks/useTranslation")
jest.mock("#context/userContext")

describe("Shipping page should", () => {
  beforeAll(() => {
    window.scrollTo = jest.fn()
    useTranslation.mockReturnValue({ translate })
    useCartContext.mockReturnValue({
      cart: [],
    })
    useUserContext.mockReturnValue({
      user: null,
      isLoggedIn: false,
      isLoading: false,
    })
  })
  test("renders correctly", () => {
    useTranslation.mockReturnValue({
      translate: {
        pages: {
          shipping: {},
        },
      },
    })

    const { container } = render(
      <MemoryRouter>
        <Shipping />
      </MemoryRouter>,
    )
    expect(container).toBeInTheDocument()
  })
})
