import { React } from "react"
import { useNavigate } from "react-router-dom"
import { titleCase } from "../utils/utils"
import styles from "./sidebar.module.scss"

const Sidebar = ({ setCategory, setMenuOpen, productCategories }) => {
  const navigate = useNavigate()

  const setMayBeMenuOpen = (bool) => {
    if (setMenuOpen) {
      setMenuOpen(bool)
    }
    return bool
  }

  const renderedCategories = productCategories
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((category) => (
      <li
        key={category.name}
        onClick={() => {
          setCategory(category.name)
          setMayBeMenuOpen(false)
          navigate(`/shop?category=${category.name}`)
          window.scrollTo(0, 0)
        }}
        className={styles.sidebarItem}
      >
        {titleCase(category.name, "_")}
      </li>
    ))

  return renderedCategories
}

export default Sidebar
