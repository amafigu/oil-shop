import { product } from "@/__mocks__/product"
import { commonProperties, components } from "@/__mocks__/translate"
import { ProductCard } from "@/components/products/ProductCard"
import { CartContext } from "@/context/cartContext"
import { useTranslation } from "@/hooks/useTranslation"
import { CartContextType } from "@/types/Cart"
import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"
import { ReactNode } from "react"
import { MemoryRouter } from "react-router-dom"

jest.mock("@/hooks/useTranslation")

interface MockProviderProps {
  children: ReactNode
  addProduct: jest.Mock
}

const MockCartProvider = ({ children, addProduct }: MockProviderProps) => {
  const value: CartContextType = {
    cart: [],
    addProduct,
    updateProductQuantity: jest.fn(),
    removeProduct: jest.fn(),
    getAllProductsQuantity: 0,
    setCart: jest.fn(),
  }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

describe("ProductCard", () => {
  let mockAddProduct: jest.Mock

  beforeEach(() => {
    mockAddProduct = jest.fn()
    ;(useTranslation as jest.Mock).mockReturnValue({
      commonProperties,
      components,
    })
  })

  function renderCard() {
    render(
      <MemoryRouter>
        <MockCartProvider addProduct={mockAddProduct}>
          <ProductCard product={product} />
        </MockCartProvider>
      </MemoryRouter>,
    )
  }

  test("renders product name correctly", () => {
    renderCard()
    expect(screen.getByText(product.name)).toHaveTextContent(product.name)
  })

  test("renders product price correctly", () => {
    renderCard()
    expect(screen.getByText(`${product.price} €`)).toBeInTheDocument()
  })

  test("renders product size correctly", () => {
    renderCard()
    expect(screen.getByText(`${product.size} ml`)).toBeInTheDocument()
  })

  test("add product button is clickable", () => {
    renderCard()
    const button = screen.getByLabelText("Add product to your shop cart")
    fireEvent.click(button)
    expect(mockAddProduct).toHaveBeenCalledTimes(1)
    expect(mockAddProduct).toHaveBeenCalledWith(product, 1)
  })
})
