import { ActionButton } from "#components/ui/ActionButton"
import { STYLES } from "#constants/styles"
import { useActiveCategory } from "#hooks/useActiveCategory"
import { useActivePageLink } from "#hooks/useActivePageLink"
import { useMenuOptions } from "#hooks/useMenuOptions"
import { useProductCategoryByUrlQuery } from "#hooks/useProductCategoryByUrlQuery"
import { useTranslation } from "#hooks/useTranslation"
import { camelCase } from "#utils/camelCase"
import { scrollToTop } from "#utils/scrollToTop"
import { translateByPath } from "#utils/translateByPath"
import { useNavigate } from "react-router-dom"
import styles from "./navigationMenu.module.scss"

export const NavigationMenu = ({ items, className }) => {
  const { setCategory } = useProductCategoryByUrlQuery()
  const { components } = useTranslation()
  const activeCategory = useActiveCategory()
  const { activePageLink, setActivePageLink } = useActivePageLink()
  const { setShowMobileMenu } = useMenuOptions()
  const navigate = useNavigate()

  const onSelect = (e, item) => {
    e.preventDefault()
    if (item.type === "category") {
      setCategory(item.path)
    }
    if (item.type === "link") {
      setActivePageLink(item.label)
    }

    setShowMobileMenu(false)
    navigate(item.path)
    scrollToTop()
  }

  return (
    <nav className={styles[className]} aria-label='navigation menu'>
      <ul className={styles.list}>
        {items &&
          items.length > 0 &&
          items.map((item, index) => (
            <li className={styles.item} key={index}>
              <ActionButton
                action={(e) => onSelect(e, item)}
                text={
                  item.type === "link"
                    ? translateByPath(components.navigationMenu, item.label)
                    : components.navigationMenu[camelCase(item.label, "_")]
                }
                className={
                  item.label === activePageLink || item.label === activeCategory
                    ? `${STYLES.LINKS.NAVIGATION_MENU_ACTIVE_LINK}`
                    : `${STYLES.LINKS.NAVIGATION_MENU_LINK}`
                }
                aria-label='navigation item'
              />
            </li>
          ))}
      </ul>
    </nav>
  )
}
