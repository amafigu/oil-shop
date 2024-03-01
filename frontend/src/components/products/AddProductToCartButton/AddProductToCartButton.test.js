import product from "#__mocks__/product"
import { translate } from "#__mocks__/translate"
import useCartContext, { CartContext } from "#context/cartContext"
import { useTranslation } from "#hooks/useTranslation"
import { fireEvent, render, screen } from "@testing-library/react"
import { AddProductToCartButton } from "./"

jest.mock("#hooks/useTranslation")
jest.mock("#context/cartContext")

function renderButton(mockedFn) {
  const value = {
    addProduct: mockedFn,
  }
  render(
    <CartContext.Provider value={value}>
      <AddProductToCartButton
        product={product}
        classname={"addButton"}
        quantity={1}
      />
    </CartContext.Provider>,
  )
}

describe("AddProductToCartButton should", () => {
  let addProductFnMocked
  beforeEach(() => {
    addProductFnMocked = jest.fn()
    useCartContext.mockReturnValue({
      addProduct: addProductFnMocked,
    })
    useTranslation.mockReturnValue({ translate })
  })

  test("fire add product to cart correctly", () => {
    renderButton(addProductFnMocked)

    const button = screen.getByLabelText("Add to cart button")
    fireEvent.click(button)
    expect(addProductFnMocked).toHaveBeenCalledTimes(1)
  })
})
