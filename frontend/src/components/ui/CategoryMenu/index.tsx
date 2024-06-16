import { ActionButton } from "@/components/ui/ActionButton"
import { useMenuOptions } from "@/hooks/useMenuOptions"
import { useProductCategory } from "@/hooks/useProductCategory"
import { useTranslation } from "@/hooks/useTranslation"
import { Category } from "@/types/Product"
import { camelCase } from "@/utils/camelCase"
import { FC, MouseEvent } from "react"
import styles from "./categoryMenu.module.scss"

export const CategoryMenu: FC = () => {
  const { setSortCategory, sortCategory, categories } = useProductCategory()
  const { components } = useTranslation()
  const { setShowMobileMenu } = useMenuOptions()

  const onSelect = (e: MouseEvent<HTMLButtonElement>, item?: Category) => {
    e.preventDefault()
    if (item) {
      setSortCategory(item.name)
    } else {
      setSortCategory(undefined)
    }
    setShowMobileMenu(false)
  }

  return (
    <nav className={styles.categories} aria-label='product categories selector'>
      <ul className={styles.list}>
        <li className={styles.item}>
          <ActionButton
            action={(e) => onSelect(e as MouseEvent<HTMLButtonElement>)}
            text={components.categoryMenu.all}
            className={
              sortCategory === undefined ? "navigationActive" : "navigation"
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
