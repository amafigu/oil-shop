import translate from "#__mocks__/translate"
import useCartContext from "#context/cartContext"
import useUserContext from "#context/userContext"
import { useTranslation } from "#hooks/useTranslation"
import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"
import React from "react"
import { MemoryRouter } from "react-router-dom"
import Cart from "./Cart"

jest.mock("#context/cartContext")
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
    useCartContext.mockReturnValue({
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
      removeProduct: mockRemoveProduct,
      updateProductQuantity: jest.fn(),
    })
    useTranslation.mockReturnValue({
      translate,
    })
  })

  test("removes product correctly", () => {
    renderCart()
    fireEvent.click(screen.getByText("Delete"))
    expect(mockRemoveProduct).toHaveBeenCalledWith("Test Product")
  })
  test("render products correctly", () => {
    renderCart()
    useCartContext.mockReturnValue({
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

    useTranslation.mockReturnValue({
      translate: {
        pages: {
          cart: {
            deleteButton: "Delete",
          },
        },
      },
    })

    expect(screen.getByText("Test Product")).toBeInTheDocument()
  })
})
