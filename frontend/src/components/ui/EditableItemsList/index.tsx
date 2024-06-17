import { ActionButton } from "@/components/ui/ActionButton"
import { useTranslation } from "@/hooks/useTranslation"
import { Order } from "@/types/Order"
import { Product } from "@/types/Product"
import { User } from "@/types/User"
import { ComponentType, useEffect, useState } from "react"
import styles from "./editableItemsList.module.scss"

interface EditableItemsListProps<T> {
  itemsList: T[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ItemComponent: ComponentType<{ item: T; [key: string]: any }>
  title: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  itemProps?: { [key: string]: any }
  filterProps?: Array<{
    action: (list: T[], sortIsAsc: boolean) => T[]
    targetProperty: string
    className: string
  }>
}

export const EditableItemsList = <T extends User | Product | Order>({
  itemsList,
  ItemComponent,
  title,
  itemProps = {},
  filterProps = [],
}: EditableItemsListProps<T>) => {
  const [filteredItemsList, setFilteredItemsList] = useState<T[]>([])
  const [isAscendent, setIsAscendent] = useState<boolean[]>(
    filterProps.map(() => true),
  )
  const { pages } = useTranslation()
  const text = pages.admin.usersManagement.editableItemsList

  useEffect(() => {
    setFilteredItemsList(itemsList)
  }, [itemsList])

  const filterList = (
    action: (list: T[], sortIsAsc: boolean) => T[],
    index: number,
  ) => {
    const sortIsAsc = [...isAscendent]
    sortIsAsc[index] = !sortIsAsc[index]
    setIsAscendent(sortIsAsc)

    const filteredItems = action(
      [...filteredItemsList],
      sortIsAsc[index] ?? true,
    )
    setFilteredItemsList(filteredItems)
  }

  return (
    <section className={styles.wrapper} aria-label={title}>
      <h2>{title}</h2>
      <div className={styles.container}>
        {filterProps.length > 0 &&
          filterProps.map((filterButton, index) => (
            <ActionButton
              key={index}
              action={() => filterList(filterButton.action, index)}
              text={
                isAscendent[index]
                  ? `${text[filterButton.targetProperty]} asc`
                  : `${text[filterButton.targetProperty]} des`
              }
              className={filterButton.className}
              ariaLabel='Filter button'
            />
          ))}
      </div>
      <ul className={styles.list}>
        {filteredItemsList.map((item, index) => (
          <li
            className={styles.item}
            key={(item as User).id || (item as Product).id || index}
          >
            <ItemComponent item={item} {...itemProps} />
          </li>
        ))}
      </ul>
    </section>
  )
}
