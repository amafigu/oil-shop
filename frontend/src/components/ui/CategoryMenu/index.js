import { ActionButton } from "#components/ui/ActionButton"
import { useMenuOptions } from "#hooks/useMenuOptions"
import { useProductCategory } from "#hooks/useProductCategory"
import { useTranslation } from "#hooks/useTranslation"
import { camelCase } from "#utils/camelCase"
import styles from "./categoryMenu.module.scss"

export const CategoryMenu = () => {
  const { setSortCategory, sortCategory, categories } = useProductCategory()
  const { components } = useTranslation()
  const { setShowMobileMenu } = useMenuOptions()

  const onSelect = (e, item) => {
    e.preventDefault()
    setSortCategory(item.name)
    setShowMobileMenu(false)
  }

  return (
    <nav className={styles.categories} aria-label='product categories selector'>
      <ul className={styles.list}>
        {categories &&
          categories.map((item, index) => {
            return (
              <li className={styles.item} key={index}>
                <ActionButton
                  action={(e) => onSelect(e, item)}
                  text={components.navigationMenu[camelCase(item.name, " ")]}
                  className={
                    item.name === sortCategory
                      ? "navigationActive"
                      : "navigation"
                  }
                  aria-label='navigation item'
                />
              </li>
            )
          })}
      </ul>
    </nav>
  )
}
