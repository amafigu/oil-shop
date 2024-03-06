import { ToggleButton } from "#components/ui/ToggleButton"
import { STYLES } from "#constants/styles"
import { useTranslation } from "#hooks/useTranslation"
import { useEffect, useState } from "react"
import styles from "./editableItemsList.module.scss"

export const EditableItemsList = ({
  itemsList,
  ItemComponent,
  title,
  itemProps = {},
}) => {
  const [showList, setShowList] = useState(false)
  const { components } = useTranslation()
  useEffect(() => {}, [itemsList])

  return (
    <section className={styles.section} aria-label={title}>
      <h2>{title}</h2>
      <ToggleButton
        isVisible={showList}
        onToggle={setShowList}
        hideBtnText={components.editableItemsList.hideButton.toUpperCase()}
        showBtnText={components.editableItemsList.showButton.toUpperCase()}
        classCss={STYLES.BUTTONS.SHOW_HIDE}
      />
      {
        <ul className={styles.itemsList}>
          {showList &&
            itemsList &&
            itemsList.map((item, index) => (
              <li className={styles.item} key={item.id || index}>
                <ItemComponent item={item} {...itemProps} />
              </li>
            ))}
        </ul>
      }
    </section>
  )
}
