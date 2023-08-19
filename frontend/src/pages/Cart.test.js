import useCartContext from "#context/cartContext"
import useLocaleContext from "#context/localeContext"
import "@testing-library/jest-dom"
import { fireEvent, render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import Cart from "./Cart"

jest.mock("#context/cartContext")
jest.mock("#context/localeContext")

test("renders products correctly", () => {
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

  useLocaleContext.mockReturnValue({
    translate: {
      pages: {
        cart: {
          deleteButton: "Delete",
        },
      },
    },
  })

  const { getByText } = render(
    <MemoryRouter>
      <Cart />
    </MemoryRouter>,
  )
  expect(getByText("Test Product")).toBeInTheDocument()
})

test("removes product correctly", () => {
  const mockRemoveProduct = jest.fn()

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

  useLocaleContext.mockReturnValue({
    translate: {
      pages: {
        cart: {
          deleteButton: "Delete",
          orderSummary: "Order Summary",
          orderSubtotal: "Order Subtotal",
          orderShipping: "Shipping",
          orderTotal: "Total",
        },
      },
    },
  })

  const { getByText } = render(
    <MemoryRouter>
      <Cart />
    </MemoryRouter>,
  )

  fireEvent.click(getByText("Delete"))

  expect(mockRemoveProduct).toHaveBeenCalledWith("Test Product")
})
