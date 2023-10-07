import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { titleCase } from "../utils/utils"
import styles from "./sidebar.module.scss"

const Sidebar = ({ setCategory, setMenuOpen, productCategories }) => {
  const [activeCategory, setActiveCategory] = useState("all")
  const navigate = useNavigate()
  const location = useLocation()

  const setMobileMenuOpen = (bool) => {
    if (setMenuOpen) {
      setMenuOpen(bool)
    }
    return bool
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const category = params.get("category") || "all"
    setActiveCategory(category)
  }, [location.search])

  const renderedCategories = productCategories
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((category) => (
      <li
        key={category.name}
        onClick={() => {
          setCategory(category.name)
          setMobileMenuOpen(false)
          navigate(`/shop?category=${category.name}`)
          window.scrollTo(0, 0)
        }}
        className={`${styles.sidebarItem} ${
          activeCategory === category.name ? styles.activeCategory : ""
        }`}
      >
        {titleCase(category.name, "_")}
      </li>
    ))

  return renderedCategories
}

export default Sidebar
