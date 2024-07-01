import { ActionButton } from "@/components/ui/ActionButton"
import { useProductContext } from "@/context/productContext"
import { useTranslation } from "@/hooks/useTranslation"
import { Product } from "@/types/Product"
import { FC, useEffect, useState } from "react"
import { EditableProductForm } from "../EditableProductForm"
import styles from "./editableProductsList.module.scss"

interface EditableProductsListProps {
  filterProps?: Array<{
    action: (list: Product[], sortIsAsc: boolean) => Product[]
    targetProperty: string
    className: string
  }>
}

export const EditableProductsList: FC<EditableProductsListProps> = ({
  filterProps = [],
}) => {
  const [filteredItemsList, setFilteredItemsList] = useState<Product[]>([])
  const [isAscendent, setIsAscendent] = useState<boolean[]>(
    filterProps.map(() => true),
  )
  const { pages } = useTranslation()
  const text = pages.admin.productManagement.editableItemsList
  const { products } = useProductContext()
  useEffect(() => {
    setFilteredItemsList(products)
  }, [products])

  const filterList = (
    action: (list: Product[], sortIsAsc: boolean) => Product[],
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
    <section className={styles.wrapper}>
      <h2>{text.title}</h2>
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
          <li className={styles.item} key={item.id || index}>
            <EditableProductForm item={item} />
          </li>
        ))}
      </ul>
    </section>
  )
}
