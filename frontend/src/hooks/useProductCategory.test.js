import { productCategories } from "#__mocks__/productCategories"
import { ProductContext } from "#context/productContext"
import { act, renderHook } from "@testing-library/react"
import { useState } from "react"
import { useProductCategory } from "./useProductCategory"

const ContextWrapper = ({ children }) => {
  const [sortCategory, setSortCategory] = useState("roll")

  return (
    <ProductContext.Provider
      value={{
        sortCategory,
        setSortCategory,
        categories: productCategories,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

describe("useProductCategory does", () => {
  test("use product context", () => {
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
      result.current.setSortCategory("difuser")
    })
    expect(result.current.sortCategory).toBe("difuser")
  })
})
