import { product } from "@/__mocks__/product"
import { translate } from "@/__mocks__/translate"
import { AddProductToCartButton } from "@/components/products/AddProductToCartButton"
import { CartContext, useCartContext } from "@/context/cartContext"
import { useTranslation } from "@/hooks/useTranslation"
import { CartContextType } from "@/types/Cart"
import { fireEvent, render, screen } from "@testing-library/react"
import { ReactNode } from "react"

jest.mock("@/hooks/useTranslation")
jest.mock("@/context/cartContext")

interface MockProviderProps {
  mockedFn: jest.Mock
  children: ReactNode
}

const MockProvider = ({ mockedFn, children }: MockProviderProps) => {
  const value: CartContextType = {
    cart: [],
    addProduct: mockedFn,
    updateProductQuantity: jest.fn(),
    removeProduct: jest.fn(),
    getAllProductsQuantity: 0,
    setCart: jest.fn(),
  }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

describe("AddProductToCartButton", () => {
  let addProductFnMocked: jest.Mock

  beforeEach(() => {
    addProductFnMocked = jest.fn()
    ;(useCartContext as jest.Mock).mockReturnValue({
      addProduct: addProductFnMocked,
    })
    ;(useTranslation as jest.Mock).mockReturnValue({ translate })
  })

  test("fires addProduct function correctly when clicked", () => {
    render(
      <MockProvider mockedFn={addProductFnMocked}>
        <AddProductToCartButton
          product={product}
          classname={"addButton"}
          quantity={1}
        />
      </MockProvider>,
    )

    const button = screen.getByLabelText("Add item to cart")
    fireEvent.click(button)
    expect(addProductFnMocked).toHaveBeenCalledTimes(1)
    expect(addProductFnMocked).toHaveBeenCalledWith(product, 1)
  })
})
