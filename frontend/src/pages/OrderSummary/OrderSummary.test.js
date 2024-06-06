import { translate } from "#__mocks__/translate"
import useCartContext from "#context/cartContext"
import { useUserContext } from "#context/userContext"
import { useTranslation } from "#hooks/useTranslation"
import { OrderSummary } from "#pages/OrderSummary"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"

jest.mock("#hooks/useTranslation")
jest.mock("#context/cartContext")
jest.mock("#context/userContext")

describe("Order Summary page should", () => {
  beforeAll(() => {
    useTranslation.mockReturnValue({ translate })
    useCartContext.mockReturnValue({ cart: jest.fn() })
    useUserContext.mockReturnValue({ id: 248 })
  })

  test("render correctly", () => {
    render(
      <MemoryRouter>
        <OrderSummary />
      </MemoryRouter>,
    )
    expect(screen.getByLabelText("Order details")).toBeInTheDocument()
  })
})
