import { translate } from "@/__mocks__/translate"
import { CartProvider } from "@/context/cartContext"
import { useUserContext } from "@/context/userContext"
import { useTranslation } from "@/hooks/useTranslation"
import { Cart } from "@/pages/Cart"
import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"

jest.mock("@/hooks/useTranslation")
jest.mock("@/context/userContext")

function renderCart() {
  render(
    <MemoryRouter>
      <CartProvider>
        <Cart />
      </CartProvider>
    </MemoryRouter>,
  )
}

describe("Cart should", () => {
  let mockRemoveProduct: jest.Mock

  beforeEach(() => {
    window.scrollTo = jest.fn()
    mockRemoveProduct = jest
      .fn()(useUserContext as jest.Mock)
      .mockReturnValue({})(useTranslation as jest.Mock)
      .mockReturnValue({ translate })
  })

  test("call remove product", () => {
    renderCart()
    const button = screen.getByLabelText("Delete Test Product from cart")
    fireEvent.click(button)
    expect(mockRemoveProduct).toHaveBeenCalledWith("Test Product")
  })

  test("render products correctly", () => {
    renderCart()
    expect(screen.getByText("Test Product")).toBeInTheDocument()
    expect(screen.getByText("10 €")).toBeInTheDocument()
    expect(screen.getByText("100 ml")).toBeInTheDocument()
  })
})
