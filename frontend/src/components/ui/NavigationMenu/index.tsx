import { ActionButton } from "#components/ui/ActionButton"
import { navigationMenuItems } from "#constants/navigation"
import { useActivePageLink } from "#hooks/useActivePageLink"
import { useMenuOptions } from "#hooks/useMenuOptions"
import { useTranslation } from "#hooks/useTranslation"
import { translateByPath } from "#utils/translateByPath"
import { useNavigate } from "react-router-dom"
import styles from "./navigationMenu.module.scss"

export const NavigationMenu = () => {
  const { activePageLink, setActivePageLink } = useActivePageLink()
  const { components } = useTranslation()
  const { setShowMobileMenu } = useMenuOptions()
  const navigate = useNavigate()

  const onSelect = (e, item) => {
    e.preventDefault()
    setActivePageLink(item.label)
    navigate(item.path)
    setShowMobileMenu(false)
  }

  return (
    <nav className={styles.pages} aria-label='navigation menu'>
      <ul className={styles.list}>
        {navigationMenuItems &&
          navigationMenuItems.map((item, index) => {
            return (
              <li className={styles.item} key={index}>
                <ActionButton
                  action={(e) => onSelect(e, item)}
                  text={translateByPath(components.navigationMenu, item.label)}
                  className={
                    item.label === activePageLink
                      ? "navigationActive"
                      : "navigation"
                  }
                  aria-label='page navigation item'
                />
              </li>
            )
          })}
      </ul>
    </nav>
  )
}
