import { useProductContext } from "@/context/productContext"
import { useTranslation } from "@/hooks/useTranslation"
import { Product } from "@/types/Product"
import { filterProductsProps } from "@/utils/filterProductsProps"
import { ChangeEvent, FC, useEffect, useState } from "react"
import { ListProductForm } from "../ListProductForm"
import styles from "./editableProductsList.module.scss"

export const EditableProductsList: FC = () => {
  const [filteredItemsList, setFilteredItemsList] = useState<Product[]>([])
  const { pages } = useTranslation()
  const { products } = useProductContext()
  const text = pages.admin.usersManagement.editableItemsList

  useEffect(() => {
    setFilteredItemsList(products || [])
  }, [products])

  const selectFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(e.target.value)
    if (index >= 0 && index < filterProductsProps.length) {
      const filterAction = filterProductsProps[index]?.action
      if (filterAction && filteredItemsList) {
        const sortedItems = filterAction([...filteredItemsList])
        setFilteredItemsList(sortedItems)
      }
    }
  }

  return (
    <>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.filterColumn}>
            <div className={styles.selector}>
              <label className={styles.label} htmlFor='filterOptions'></label>
              <select
                className={styles.select}
                name='filterOptions'
                id='filterOptions'
                onChange={selectFilter}
                defaultValue=''
              >
                <option value='' disabled>
                  {`${text.sortBy} ...`}
                </option>
                {filterProductsProps.map((filterButton, index) => (
                  <option key={index} value={index}>
                    {filterButton.isAsc
                      ? `${text[filterButton.targetProperty]}: ${
                          text.ascendent
                        }`
                      : `${text[filterButton.targetProperty]}: ${
                          text.descendent
                        }`}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.listColumn}>
            <ul className={styles.list}>
              {filteredItemsList.map((item, index) => (
                <li className={styles.item} key={item.id || index}>
                  <ListProductForm item={item} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
