import useCartContext from "#context/cartContext"
import useLocaleContext from "#context/localeContext"
import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import ProductCard from "./index"

jest.mock("#context/localeContext")
jest.mock("#context/cartContext")

test("renders name correctly", () => {
  const product = {
    name: "Test Product",
    image: "image.jpg",
    size: "15",
    price: "25",
    description: "description",
    category: "massageOil",
  }

  useLocaleContext.mockReturnValue({
    translate: {
      components: {
        products: {
          oil: { size: "size", price: "price" },
        },
        addOneToCartButton: {
          text: "Add to cart",
        },
      },
    },
  })

  useCartContext.mockReturnValue({
    addProduct: jest.fn(),
    updateProductQuantity: jest.fn(),
    removeProduct: jest.fn(),
    getAllProductsQuantity: 0,
    cart: [],
  })

  const { getByText } = render(
    <MemoryRouter>
      <ProductCard {...product} />
    </MemoryRouter>,
  )

  expect(getByText(product.name)).toBeInTheDocument()
})
