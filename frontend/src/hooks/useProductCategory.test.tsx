import { productCategories } from "@/__mocks__/productCategories"
import { ProductContext } from "@/context/productContext"
import { ProductContextType } from "@/types/Product"
import { act, renderHook } from "@testing-library/react"
import { FC, ReactNode, useState } from "react"
import { vi } from "vitest"
import { useProductCategory } from "./useProductCategory"

interface ContextWrapperProps {
  children: ReactNode
}

const ContextWrapper: FC<ContextWrapperProps> = ({ children }) => {
  const [sortCategory, setSortCategory] = useState<string | undefined>("roll")

  const contextValue: ProductContextType = {
    sortCategory,
    setSortCategory,
    categories: productCategories,
    products: [],
    setProducts: vi.fn(),
    onCreateProduct: vi.fn(),
    onUpdateProduct: vi.fn(),
    onDeleteProduct: vi.fn(),
  }

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  )
}

describe("useProductCategory hook", () => {
  test("uses product context correctly", () => {
    const { result } = renderHook(() => useProductCategory(), {
      wrapper: ContextWrapper,
    })

    expect(result.current.categories).toEqual(productCategories)
    expect(result.current.sortCategory).toBe("roll")

    act(() => {
      result.current.setSortCategory("essential oil")
    })
    expect(result.current.sortCategory).toBe("essential oil")

    act(() => {
      result.current.setSortCategory("diffuser")
    })
    expect(result.current.sortCategory).toBe("diffuser")
  })
})
