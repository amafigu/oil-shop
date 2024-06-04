import { useProductContext } from "#context/productContext"
import { useEffect } from "react"

export const useProductCategory = () => {
  const { sortCategory, setSortCategory, categories } = useProductContext()

  useEffect(() => {
    if (sortCategory) {
      setSortCategory(sortCategory)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortCategory])

  return { sortCategory, setSortCategory, categories }
}
