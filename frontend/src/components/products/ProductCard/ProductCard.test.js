import product from "#__mocks__/product"
import translate from "#__mocks__/translate"
import useCartContext from "#context/cartContext"
import { useTranslation } from "#hooks/useTranslation"
import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"
import React from "react"
import { MemoryRouter } from "react-router-dom"
import { ProductCard } from "./ProductCard"

jest.mock("#hooks/useTranslation")
jest.mock("#context/cartContext")

function renderCard() {
  render(
    <MemoryRouter>
      <ProductCard product={product} />
    </MemoryRouter>,
  )
}

describe("ProductCard", () => {
  let mockAddProduct
  beforeEach(() => {
    mockAddProduct = jest.fn()
    useCartContext.mockReturnValue({
      addProduct: mockAddProduct,
    })
    useTranslation.mockReturnValue({ translate })
  })

  test("renders product name correctly", () => {
    renderCard()
    expect(screen.getByText(product.name)).toHaveTextContent(product.name)
  })

  test("renders product price correctly", () => {
    renderCard()
    expect(
      screen.getByText(
        `${translate.components.products.oil.price} €${product.price}`,
      ),
    ).toBeInTheDocument()
  })

  test("renders product size correctly", () => {
    renderCard()
    expect(
      screen.getByText(
        `${translate.components.products.oil.size}: ${product.size} ml`,
      ),
    ).toBeInTheDocument()
  })

  test("add product button is clickable", () => {
    renderCard()
    const button = screen.getByLabelText("Add to cart button")
    fireEvent.click(button)
    expect(mockAddProduct).toHaveBeenCalledTimes(1)
  })
})
