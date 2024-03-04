import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

export const useProductCategoryByUrlQuery = () => {
  const [category, setCategory] = useState("")
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const queryCategory = params.get("category")

  useEffect(() => {
    if (queryCategory) {
      setCategory(queryCategory)
    } else {
      setCategory("all")
    }
  }, [queryCategory])

  return { category, setCategory }
}
