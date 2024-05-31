import cartItem from "#__mocks__/cartItem"
import { translate } from "#__mocks__/translate"
import useUserContext from "#context/userContext"
import { useCart } from "#hooks/useCart"
import { useTranslation } from "#hooks/useTranslation"
import { Cart } from "#pages/Cart"
import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"
import React from "react"
import { MemoryRouter } from "react-router-dom"

jest.mock("#hooks/useCart")
jest.mock("#hooks/useTranslation")
jest.mock("#context/userContext")

function renderCart() {
  render(
    <MemoryRouter>
      <Cart />
    </MemoryRouter>,
  )
}
describe("Cart should", () => {
  let mockRemoveProduct
  beforeEach(() => {
    window.scrollTo = jest.fn()
    mockRemoveProduct = jest.fn()

    useUserContext.mockReturnValue({})
    useCart.mockReturnValue({
      cart: [cartItem],
      removeProduct: mockRemoveProduct,
      updateProductQuantity: jest.fn(),
    })
    useTranslation.mockReturnValue({
      translate,
    })
  })

  test("call remove product", () => {
    renderCart()
    fireEvent.click(screen.getByLabelText("Delete Test Product from cart"))
    expect(mockRemoveProduct).toHaveBeenCalledWith("Test Product")
  })
  test("render products correctly", () => {
    renderCart()
    useCart.mockReturnValue({
      cart: [
        {
          product: {
            name: "Test Product",
            image: "image.jpg",
            description: "Description",
            size: 100,
            price: 10,
          },
          quantity: 2,
        },
      ],
      removeProduct: jest.fn(),
      updateProductQuantity: jest.fn(),
    })

    expect(screen.getByText("Test Product")).toBeInTheDocument()
  })
})
