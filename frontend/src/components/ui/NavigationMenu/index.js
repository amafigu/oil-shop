import { useActiveCategory } from "#hooks/useActiveCategory"
import { useMenuMobile } from "#hooks/useMenuMobile"
import { useProductCategoryByUrlQuery } from "#hooks/useProductCategoryByUrlQuery"
import { useTranslation } from "#hooks/useTranslation"
import { scrollToTop } from "#utils/render"
import { toCamelCase } from "#utils/stringManipulation"
import { accessTranslationWithPathString } from "#utils/translation"
import { useNavigate } from "react-router-dom"
import styles from "./navigationMenu.module.scss"

export const NavigationMenu = ({ items, navigationProperty }) => {
  const { setCategory } = useProductCategoryByUrlQuery()
  const { components } = useTranslation()
  const activeCategory = useActiveCategory()
  const { setShowMobileMenu } = useMenuMobile()
  const navigate = useNavigate()

  const onSelect = (e, item) => {
    e.preventDefault()
    if (item.type === "category") {
      setCategory(item.path)
    }
    setShowMobileMenu(false)
    navigate(item.path)
    scrollToTop()
  }
  console.log(activeCategory)
  console.log(navigationProperty)
  console.log(items)
  const setClassName = (item) => {
    return `${styles.item} ${
      activeCategory === item[navigationProperty] ? styles.active : ""
    }`
  }

  return (
    <nav className={styles.navigationMenu} aria-label='navigation menu'>
      <ul className={styles.itemsList}>
        {items &&
          items.length > 0 &&
          items.map((item, index) => (
            <li
              role='button'
              key={index}
              onClick={(e) => onSelect(e, item)}
              className={setClassName(item)}
            >
              {item.type === "link"
                ? accessTranslationWithPathString(components, item.label)
                : components.navigationMenu[toCamelCase(item.label, "_")]}
            </li>
          ))}
      </ul>
    </nav>
  )
}
