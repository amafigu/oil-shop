import { ActionButton } from "#components/ui/ActionButton"
import { useTranslation } from "#hooks/useTranslation"
import { useEffect, useState } from "react"
import styles from "./editableItemsList.module.scss"

export const EditableItemsList = ({
  itemsList,
  ItemComponent,
  title,
  itemProps = {},
  filterProps = [],
}) => {
  const [filteredItemsList, setFilteredItemsList] = useState([])
  const [isAscendent, setIsAscendent] = useState(filterProps.map(() => true))
  const { pages } = useTranslation()
  const text = pages.admin.usersManagement.editableItemsList

  useEffect(() => {
    setFilteredItemsList(itemsList)
  }, [itemsList])

  const filterList = (action, index) => {
    const sortIsAsc = [...isAscendent]
    sortIsAsc[index] = !sortIsAsc[index]
    setIsAscendent(sortIsAsc)

    const filteredItems = action([...filteredItemsList], sortIsAsc[index])
    setFilteredItemsList(filteredItems)
  }

  return (
    <section className={styles.wrapper} aria-label={title}>
      <h2>{title}</h2>
      <div className={styles.container}>
        {filteredItemsList &&
          filterProps &&
          filterProps.length > 0 &&
          filterProps.map((filterButton, index) => {
            return (
              <ActionButton
                action={() => filterList(filterButton.action, index)}
                text={
                  isAscendent[index] === true
                    ? text[filterButton.targetProperty]
                    : text["reverse"]
                }
                className={filterButton.className}
                ariaLabel='Filter button'
                key={index}
              />
            )
          })}
      </div>

      {
        <ul className={styles.list}>
          {filteredItemsList &&
            filteredItemsList.map((item, index) => (
              <li className={styles.item} key={item.id || index}>
                <ItemComponent item={item} {...itemProps} />
              </li>
            ))}
        </ul>
      }
    </section>
  )
}
