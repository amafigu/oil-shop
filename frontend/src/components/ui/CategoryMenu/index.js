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
    if (item) {
      setSortCategory(item.name)
    } else {
      setSortCategory(null)
    }
    setShowMobileMenu(false)
  }

  return (
    <nav className={styles.categories} aria-label='product categories selector'>
      <ul className={styles.list}>
        <li className={styles.item}>
          <ActionButton
            action={(e) => onSelect(e)}
            text={components.categoryMenu.all}
            className={
              sortCategory === null ? "navigationActive" : "navigation"
            }
            aria-label='category filter item'
          />
        </li>
        {categories &&
          categories.map((item, index) => {
            return (
              <li className={styles.item} key={index}>
                <ActionButton
                  action={(e) => onSelect(e, item)}
                  text={components.categoryMenu[camelCase(item.name, " ")]}
                  className={
                    item.name === sortCategory
                      ? "navigationActive"
                      : "navigation"
                  }
                  aria-label='category filter item'
                />
              </li>
            )
          })}
      </ul>
    </nav>
  )
}
