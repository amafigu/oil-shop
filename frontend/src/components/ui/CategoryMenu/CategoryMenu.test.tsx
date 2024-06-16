import { productCategories, sortCategory } from "@/__mocks__/productCategories"
import { components } from "@/__mocks__/translate"
import { CategoryMenu } from "@/components/ui/CategoryMenu"
import { useMenuOptions } from "@/hooks/useMenuOptions"
import { useProductCategory } from "@/hooks/useProductCategory"
import { useTranslation } from "@/hooks/useTranslation"
import { camelCase } from "@/utils/camelCase"
import { fireEvent, render, screen } from "@testing-library/react"

jest.mock("@/hooks/useTranslation")
jest.mock("@/hooks/useProductCategory")
jest.mock("@/hooks/useMenuOptions")

describe("<CategoryMenu />", () => {
  const setSortCategory = jest.fn()
  const setShowMobileMenu = jest.fn()
  const setShowProductsSearchBar = jest.fn()

  beforeEach(() => {
    ;(useTranslation as jest.Mock).mockReturnValue({ components })
    ;(useMenuOptions as jest.Mock).mockReturnValue({
      showMobileMenu: true,
      setShowMobileMenu,
      showProductsSearchBar: true,
      setShowProductsSearchBar,
    })
    ;(useProductCategory as jest.Mock).mockReturnValue({
      setSortCategory,
      categories: productCategories,
      sortCategory,
    })
  })

  test("renders All Products option", () => {
    render(<CategoryMenu />)
    expect(screen.getByText(components.categoryMenu.all)).toBeInTheDocument()
  })

  test("renders categories correctly", () => {
    render(<CategoryMenu />)
    productCategories.forEach((category) => {
      const categoryKey = camelCase(category.name, " ")
      expect(
        screen.getByText(
          components.categoryMenu[
            categoryKey as keyof typeof components.categoryMenu
          ],
        ),
      ).toBeInTheDocument()
    })
  })

  test("calls setSortCategory when a category is clicked", () => {
    render(<CategoryMenu />)
    const categoryKey = camelCase(productCategories[0]?.name ?? "", " ")
    const categoryButton = screen.getByText(
      components.categoryMenu[
        categoryKey as keyof typeof components.categoryMenu
      ],
    )
    fireEvent.click(categoryButton)
    expect(setSortCategory).toHaveBeenCalledWith(productCategories[0]?.name)
  })
})
