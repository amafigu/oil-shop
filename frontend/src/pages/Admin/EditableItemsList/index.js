import { useEffect } from "react"
import styles from "./editableItemsList.module.scss"

export const EditableItemsList = ({
  itemsList,
  ItemComponent,
  title,
  itemProps = {},
}) => {
  useEffect(() => {}, [itemsList])
  return (
    <section className={styles.section} aria-label={title}>
      <h2>{title}</h2>
      {
        <ul className={styles.itemsList}>
          {itemsList &&
            itemsList.map((item, index) => (
              <li className={styles.item} key={item.id || index}>
                <ItemComponent
                  item={item}
                  renderItemProps={["firstName", "lastName", "email", "image"]}
                  {...itemProps}
                />
              </li>
            ))}
        </ul>
      }
    </section>
  )
}
