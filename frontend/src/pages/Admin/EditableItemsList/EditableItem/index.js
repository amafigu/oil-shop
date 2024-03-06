import { ActionButton } from "#components/ui/ActionButton"
import NotificationCard from "#components/ui/NotificationCard"
import { STYLES } from "#constants/styles"
import { useTranslation } from "#hooks/useTranslation"
import { setFileToUpload } from "#utils/dataManipulation"
import { useState } from "react"
import { EditableItemInput } from "./EditableItemInput"
import styles from "./editableItem.module.scss"

export const EditableItem = ({
  item,
  renderItemProps,
  setCounter,
  onSave,
  onDelete,
}) => {
  const itemInitialAttributes = renderItemProps.reduce((acc, val) => {
    acc[val] = item[val]
    return acc
  }, {})

  const [updatedItemData, setUpdatedItemData] = useState({
    ...itemInitialAttributes,
  })
  const [nonUpdatedItemData, setNonUpdatedItemData] = useState({
    ...itemInitialAttributes,
  })
  const [file, setFile] = useState(null)
  const [notification, setNotification] = useState(null)
  const { components } = useTranslation()

  return (
    <article className={styles.editableItem} aria-label='editable item'>
      {notification && <NotificationCard message={notification} />}
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={updatedItemData.image || ""}
            alt='element'
          />
        </div>
        <ActionButton
          action={(e) => onDelete(e, item.id, setNotification, setCounter)}
          text={components.editableItem.deleteButton}
          className={STYLES.BUTTONS.ACTION}
        />
      </div>
      {
        <form className={styles.form}>
          {Object.keys(itemInitialAttributes).map((key) => (
            <EditableItemInput
              label={key}
              name={key}
              updatedPropertyData={updatedItemData}
              onChange={
                key === "image"
                  ? (e) => setFileToUpload(e, setFile)
                  : (e) =>
                      setUpdatedItemData({
                        ...updatedItemData,
                        [e.target.name]: e.target.value,
                      })
              }
              onSave={
                key === "image"
                  ? (e) =>
                      onSave(
                        e,
                        key,
                        item.id,
                        updatedItemData,
                        nonUpdatedItemData,
                        setUpdatedItemData,
                        setNonUpdatedItemData,
                        setNotification,
                        file,
                      )
                  : (e) =>
                      onSave(
                        e,
                        key,
                        item.id,
                        updatedItemData,
                        nonUpdatedItemData,
                        setUpdatedItemData,
                        setNonUpdatedItemData,
                        setNotification,
                      )
              }
              classCss={STYLES.FORMS.FIELD}
              key={key}
              file={file}
            />
          ))}
        </form>
      }
    </article>
  )
}
