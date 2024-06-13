import { productCategories, sortCategory } from "#__mocks__/productCategories"
import { components } from "#__mocks__/translate"
import { useMenuOptions } from "#hooks/useMenuOptions"
import { useProductCategory } from "#hooks/useProductCategory"
import { useTranslation } from "#hooks/useTranslation"
import { render, screen } from "@testing-library/react"
import { CategoryMenu } from "./index"

jest.mock("#hooks/useTranslation")
jest.mock("#hooks/useProductCategory")
jest.mock("#hooks/useMenuOptions")

describe("<CategoryMenu /> does", () => {
  beforeEach(() => {
    const setSortCategory = jest.fn()
    const showMobileMenu = true
    const setShowMobileMenu = jest.fn()
    const showProductsSearchBar = true
    const setShowProductsSearchBar = jest.fn()
    useTranslation.mockReturnValue({ components })
    useMenuOptions.mockReturnValue({
      showMobileMenu,
      setShowMobileMenu,
      showProductsSearchBar,
      setShowProductsSearchBar,
    })
    useProductCategory.mockReturnValue({
      setSortCategory,
      productCategories,
      sortCategory,
    })
  })

  test("render All Products option", () => {
    render(<CategoryMenu />)
    expect(screen.getByText("All Products")).toBeInTheDocument()
  })
})
