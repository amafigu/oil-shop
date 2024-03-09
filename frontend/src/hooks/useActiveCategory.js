import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

export const useActiveCategory = () => {
  const [activeCategory, setActiveCategory] = useState(null)
  const location = useLocation()
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const category = params.get("category") || "all"
    setActiveCategory(category)
  }, [location.search])

  return activeCategory
}
