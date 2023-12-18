import product from "#__mocks__/product"
import useCartContext from "#context/cartContext"
import useLocaleContext from "#context/localeContext"
import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import React from "react"
import { MemoryRouter } from "react-router-dom"
import ProductCard from "./index"

jest.mock("#context/localeContext")
jest.mock("#context/cartContext")

describe("ProductCard should ", () => {
  test("renders properties value correctly", () => {
    const translate = {
      components: {
        products: {
          oil: { size: "size", price: "price" },
        },
        addOneToCartButton: {
          text: "Add to cart",
        },
      },
    }

    useLocaleContext.mockReturnValue({ translate })

    useCartContext.mockReturnValue({
      addProduct: jest.fn(),
      updateProductQuantity: jest.fn(),
      removeProduct: jest.fn(),
      getAllProductsQuantity: 0,
      cart: [],
    })

    const { getByText } = render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>,
    )

    expect(getByText(product.name)).toBeInTheDocument()
    expect(
      getByText(`${translate.components.products.oil.price} €${product.price}`),
    ).toBeInTheDocument()
    expect(getByText(product.description)).toBeInTheDocument()
    expect(
      getByText(
        `${translate.components.products.oil.size}: ${product.size} ml`,
      ),
    ).toBeInTheDocument()
  })
})
